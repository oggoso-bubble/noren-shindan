import React, { useState, useEffect } from 'react';

// ========================================
// のれん診断 LP + 診断ツール v15
// - ヘッダー：濃紺背景、「今すぐ無料診断」ボタン追加
// - 上部バッジ削除
// - メインコピー大きく左配置、右にPCイラスト
// - 金額9,250万円、月桂樹デザイン改善
// - 選ばれる理由：アウトラインイラスト
// - 利用者の声：線画スタイル人物
// - Note紹介：サムネイル画像使用
// - サービス概要削除、運営情報削除
// - 詳細診断：クイック選択肢大幅増加
// ========================================

const COLORS = {
  primary: '#1a365d',
  primaryDark: '#0f172a',
  headerBg: '#1e293b',
  accent: '#2563eb',
  accentLight: '#3b82f6',
  cta: '#dc2626',
  ctaHover: '#b91c1c',
  success: '#059669',
  successLight: '#10b981',
  successBg: '#ecfdf5',
  warning: '#d97706',
  warningBg: '#fffbeb',
  gray50: '#f8fafc',
  gray100: '#f1f5f9',
  gray200: '#e2e8f0',
  gray300: '#cbd5e1',
  gray400: '#94a3b8',
  gray500: '#64748b',
  gray600: '#475569',
  gray700: '#334155',
  gray800: '#1e293b',
  gray900: '#0f172a',
  white: '#ffffff',
};

const LOGO_URL = '/images/logo.png';
const NOTE_THUMBNAIL_URL = '/images/note-banner.png';

// ========================================
// ErrorBoundary
// ========================================
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800">エラーが発生しました</h2>
            <button onClick={() => window.location.reload()} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium">再読み込み</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ========================================
// SEO
// ========================================
const SEOHead = () => {
  useEffect(() => {
    document.title = '飲食店の売却価格を無料診断｜のれん診断 - 最短60秒で査定完了';
    const setMeta = (name, content, property = false) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) { meta = document.createElement('meta'); meta.setAttribute(attr, name); document.head.appendChild(meta); }
      meta.content = content;
    };
    setMeta('description', '【完全無料・最短60秒】飲食店の売却価格をAIが即座に診断。累計1,500件以上の実績。会員登録不要。');
    setMeta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
  }, []);
  return null;
};

// ========================================
// Header（濃紺背景 + 今すぐ無料診断ボタン）
// ========================================
const Header = ({ onStartDiagnosis, onLogoClick, onFeatureClick, onMethodClick }) => (
  <header className="fixed top-0 left-0 right-0 z-50 shadow-lg" style={{ backgroundColor: COLORS.headerBg }}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
      <a href="/" onClick={(e) => { e.preventDefault(); if (onLogoClick) onLogoClick(); }} className="flex items-center gap-2 cursor-pointer">
        <img src={LOGO_URL} alt="のれん診断" className="h-10 sm:h-12 w-auto" onError={(e) => { e.target.style.display = 'none'; }} />
        <span className="text-lg sm:text-xl font-bold text-white" style={{ fontFamily: "'Noto Serif JP', serif" }}>のれん診断</span>
      </a>
      <div className="flex items-center gap-4 sm:gap-6">
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <a href="#features" onClick={(e) => { e.preventDefault(); if (onFeatureClick) onFeatureClick(); }} className="hover:text-white transition-colors cursor-pointer">機能について</a>
          <a href="#method" onClick={(e) => { e.preventDefault(); if (onMethodClick) onMethodClick(); }} className="hover:text-white transition-colors cursor-pointer">評価手法</a>
        </nav>
        <button 
          onClick={onStartDiagnosis}
          className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-sm sm:text-base text-white transition-all hover:opacity-90"
          style={{ backgroundColor: COLORS.accent }}
        >
          今すぐ無料診断
        </button>
      </div>
    </div>
  </header>
);

// ========================================
// Hero Section（バランス改善版）
// ========================================
const HeroSection = ({ onStartDiagnosis }) => (
  <section className="relative pt-14 sm:pt-16 min-h-screen flex flex-col overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 30%, #e0f2fe 70%, #dbeafe 100%)' }}>
    {/* 背景装飾 */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full opacity-40" style={{ background: 'radial-gradient(circle, #93c5fd 0%, transparent 70%)' }} />
      <div className="absolute bottom-20 left-0 w-48 sm:w-72 h-48 sm:h-72 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #86efac 0%, transparent 70%)' }} />
    </div>

    <div className="relative flex-1 flex flex-col justify-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20">
        {/* 上部：キャッチコピーとイラストを左右に配置（中央揃え、余白多め） */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12 sm:mb-16">
          
          {/* 左側：メインコピー（中央寄せ） */}
          <div className="text-center lg:text-left order-2 lg:order-1 flex items-center justify-center lg:justify-start">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight" style={{ color: COLORS.primaryDark, fontFamily: "'Noto Serif JP', serif" }}>
              あなたの店舗の<br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10" style={{ color: COLORS.accent }}>「適正な売却価格」</span>
                <span className="absolute bottom-1 sm:bottom-2 left-0 right-0 h-3 sm:h-4 -z-0 rounded-full opacity-30" style={{ backgroundColor: '#93c5fd' }} />
              </span>
              <br /><span className="mt-2 inline-block">を知っていますか？</span>
            </h1>
          </div>

          {/* 右側：PCイラスト（余白を確保） */}
          <div className="flex justify-center lg:justify-center order-1 lg:order-2">
            <div className="relative">
              {/* 月桂樹付きバッジ */}
              <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 z-20">
                <div className="relative flex items-center justify-center">
                  {/* 月桂樹左 */}
                  <svg className="absolute -left-8 sm:-left-10 w-7 sm:w-9 h-14 sm:h-18" viewBox="0 0 36 72" fill="none">
                    <path d="M28 10 Q24 8, 22 12 Q24 16, 28 14 Q30 12, 28 10Z" fill="#fbbf24"/>
                    <path d="M26 18 Q22 16, 19 20 Q21 24, 26 22 Q28 20, 26 18Z" fill="#fbbf24"/>
                    <path d="M23 26 Q19 24, 16 28 Q18 32, 23 30 Q25 28, 23 26Z" fill="#fbbf24"/>
                    <path d="M20 34 Q16 32, 14 36 Q16 40, 20 38 Q22 36, 20 34Z" fill="#fbbf24"/>
                    <path d="M17 42 Q14 40, 12 44 Q14 47, 17 45 Q19 43, 17 42Z" fill="#fbbf24"/>
                    <path d="M15 49 Q12 48, 11 51 Q12 54, 15 52 Q17 50, 15 49Z" fill="#fbbf24"/>
                    <path d="M13 56 Q11 55, 10 57 Q11 59, 13 58 Q14 57, 13 56Z" fill="#fbbf24"/>
                  </svg>
                  {/* 月桂樹右 */}
                  <svg className="absolute -right-8 sm:-right-10 w-7 sm:w-9 h-14 sm:h-18" viewBox="0 0 36 72" fill="none">
                    <path d="M8 10 Q12 8, 14 12 Q12 16, 8 14 Q6 12, 8 10Z" fill="#fbbf24"/>
                    <path d="M10 18 Q14 16, 17 20 Q15 24, 10 22 Q8 20, 10 18Z" fill="#fbbf24"/>
                    <path d="M13 26 Q17 24, 20 28 Q18 32, 13 30 Q11 28, 13 26Z" fill="#fbbf24"/>
                    <path d="M16 34 Q20 32, 22 36 Q20 40, 16 38 Q14 36, 16 34Z" fill="#fbbf24"/>
                    <path d="M19 42 Q22 40, 24 44 Q22 47, 19 45 Q17 43, 19 42Z" fill="#fbbf24"/>
                    <path d="M21 49 Q24 48, 25 51 Q24 54, 21 52 Q19 50, 21 49Z" fill="#fbbf24"/>
                    <path d="M23 56 Q25 55, 26 57 Q25 59, 23 58 Q22 57, 23 56Z" fill="#fbbf24"/>
                  </svg>
                  <div className="bg-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-lg border-2 border-amber-400 z-10">
                    <p className="text-[9px] sm:text-[10px] text-amber-600 font-semibold text-center tracking-wide">累計診断数</p>
                    <p className="text-base sm:text-lg font-bold text-center" style={{ color: COLORS.accent }}>
                      1,500<span className="text-xs sm:text-sm ml-0.5">件突破</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* PC本体 */}
              <div className="relative mt-12 sm:mt-14" style={{ width: '340px', maxWidth: '80vw' }}>
                <div className="bg-gray-800 rounded-t-xl p-1.5 shadow-2xl">
                  {/* ブラウザバー */}
                  <div className="bg-gray-700 rounded-t-lg px-3 py-1.5 flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <div className="flex-1 mx-3">
                      <div className="bg-gray-600 rounded text-center text-[9px] text-gray-400 py-0.5 px-2">noren-shindan.jp</div>
                    </div>
                  </div>
                  {/* 画面コンテンツ */}
                  <div className="bg-white p-4" style={{ minHeight: '160px' }}>
                    <div className="border-b border-gray-100 pb-2 mb-3">
                      <p className="text-[10px] text-gray-500 text-center">診断結果レポート</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[11px] font-medium text-gray-600 mb-1">推定売却価格</p>
                      <div className="flex items-baseline justify-center mb-3">
                        <span className="text-3xl sm:text-4xl font-bold" style={{ color: COLORS.accent }}>9,250</span>
                        <span className="text-sm font-bold text-gray-500 ml-1">万円</span>
                      </div>
                      <div className="mb-2">
                        <p className="text-[9px] text-gray-400 mb-1">想定レンジ</p>
                        <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: COLORS.gray200 }}>
                          <div className="h-full rounded-full" style={{ width: '70%', background: `linear-gradient(90deg, ${COLORS.accent} 0%, ${COLORS.accentLight} 100%)` }} />
                        </div>
                        <div className="flex justify-between text-[8px] text-gray-400 mt-1">
                          <span>7,850万円</span>
                          <span>1.06億円</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-1 mt-3 pt-2 border-t border-gray-100">
                        <div className="text-center">
                          <p className="text-[7px] text-gray-400">DCF法</p>
                          <p className="text-[10px] font-bold" style={{ color: COLORS.accent }}>9,800万</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[7px] text-gray-400">純資産法</p>
                          <p className="text-[10px] font-bold" style={{ color: COLORS.accent }}>8,500万</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[7px] text-gray-400">マルチプル</p>
                          <p className="text-[10px] font-bold" style={{ color: COLORS.accent }}>9,450万</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* PCスタンド */}
                <div className="relative">
                  <div className="h-4 mx-auto rounded-b-sm" style={{ width: '35%', background: 'linear-gradient(180deg, #cbd5e1 0%, #94a3b8 100%)' }} />
                  <div className="h-2 mx-auto" style={{ width: '50%', background: 'linear-gradient(180deg, #94a3b8 0%, #64748b 100%)', borderRadius: '0 0 6px 6px' }} />
                </div>
              </div>

              {/* スマホ（縦長比率を大幅に修正） */}
              <div className="absolute -right-4 sm:-right-8 bottom-0 sm:bottom-2 w-20 sm:w-24 bg-gray-900 rounded-2xl p-1 shadow-xl transform rotate-3">
                <div className="bg-white rounded-xl overflow-hidden" style={{ minHeight: '140px' }}>
                  {/* ステータスバー */}
                  <div className="h-5 flex items-center justify-center" style={{ backgroundColor: COLORS.accent }}>
                    <span className="text-white text-[7px] font-bold">のれん診断</span>
                  </div>
                  {/* コンテンツ */}
                  <div className="p-2 pb-6">
                    <p className="text-[5px] text-gray-500 text-center mb-1">推定売却価格</p>
                    <p className="text-sm font-bold text-center" style={{ color: COLORS.accent }}>
                      9,250<span className="text-[7px] ml-0.5">万円</span>
                    </p>
                    <div className="mt-2">
                      <div className="h-1.5 rounded-full" style={{ backgroundColor: COLORS.gray200 }}>
                        <div className="h-full rounded-full" style={{ width: '70%', backgroundColor: COLORS.accent }} />
                      </div>
                      <div className="flex justify-between text-[4px] text-gray-400 mt-0.5">
                        <span>7,850万</span>
                        <span>1.06億</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <div className="grid grid-cols-3 gap-0.5 text-center">
                        <div><p className="text-[4px] text-gray-400">DCF</p><p className="text-[6px] font-bold" style={{ color: COLORS.accent }}>9,800万</p></div>
                        <div><p className="text-[4px] text-gray-400">純資産</p><p className="text-[6px] font-bold" style={{ color: COLORS.accent }}>8,500万</p></div>
                        <div><p className="text-[4px] text-gray-400">ﾏﾙﾁ</p><p className="text-[6px] font-bold" style={{ color: COLORS.accent }}>9,450万</p></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 中部：サービス説明（フォントサイズ小さめ） */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm leading-relaxed mb-2" style={{ color: COLORS.gray600 }}>
            「のれん診断」は、飲食店オーナー様が売却を検討される際の第一歩として、店舗の適正な売却価格を無料で診断できるサービスです。
          </p>
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: COLORS.gray600 }}>
            M&Aのプロが使う3つの評価手法（DCF法・時価純資産法・マルチプル法）で、あなたの飲食店の価値を<strong style={{ color: COLORS.primary }}>最短1分</strong>で精密に算出します。
          </p>
        </div>

        {/* 下部：CTAボタンと安心ポイント（中央配置） */}
        <div className="text-center">
          <div className="mb-5 sm:mb-6">
            <button 
              onClick={onStartDiagnosis} 
              className="group px-8 sm:px-10 py-4 rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2"
              style={{ backgroundColor: COLORS.cta, color: COLORS.white }}
            >
              <span>無料で診断をはじめる</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-bold" style={{ color: '#000000' }}>
            {['会員登録不要', 'データ保存なし', '何度でも無料'].map((text, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <svg className="w-4 h-4 flex-shrink-0" style={{ color: COLORS.success }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* 波形 */}
    <div className="relative h-12 sm:h-16 lg:h-20 mt-auto">
      <svg viewBox="0 0 1440 80" fill="none" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
        <path d="M0 80V50C240 20 480 60 720 40C960 20 1200 50 1440 30V80H0Z" fill="#ffffff" />
      </svg>
    </div>
  </section>
);

// ========================================
// Features Section（アウトラインイラスト）
// ========================================
const FeaturesSection = () => {
  const features = [
    { 
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" stroke="#3b82f6" strokeWidth="1.5">
          <circle cx="32" cy="32" r="24" />
          <text x="32" y="40" textAnchor="middle" fontSize="24" fill="#3b82f6" stroke="none" fontWeight="bold">¥</text>
          <path d="M32 8v4M32 52v4M8 32h4M52 32h4" strokeLinecap="round" />
        </svg>
      ),
      title: '完全無料',
      description: '診断から結果確認まで\n一切費用はかかりません'
    },
    { 
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" stroke="#3b82f6" strokeWidth="1.5">
          <circle cx="32" cy="32" r="24" />
          <circle cx="32" cy="32" r="16" />
          <path d="M32 20v12l8 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: '最短60秒',
      description: '簡単な質問に答えるだけで\nすぐに結果がわかります'
    },
    { 
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" stroke="#3b82f6" strokeWidth="1.5">
          <rect x="16" y="12" width="32" height="40" rx="4" />
          <circle cx="32" cy="26" r="8" />
          <path d="M22 44h20" strokeLinecap="round" />
          <path d="M26 38c0 0 2 4 6 4s6-4 6-4" strokeLinecap="round" />
        </svg>
      ),
      title: '会員登録不要',
      description: '面倒な登録手続きなしで\n今すぐ診断できます'
    },
    { 
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" stroke="#3b82f6" strokeWidth="1.5">
          <rect x="12" y="16" width="40" height="32" rx="2" />
          <path d="M12 24h40" />
          <path d="M20 32h8M20 38h12" strokeLinecap="round" />
          <path d="M40 32l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: '精密評価',
      description: 'M&Aのプロが使う\n3つの手法で算出'
    },
    { 
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" stroke="#3b82f6" strokeWidth="1.5">
          <path d="M32 12c-12 0-20 8-20 20s8 20 20 20" />
          <path d="M32 12c12 0 20 8 20 20s-8 20-20 20" strokeDasharray="4 4" />
          <path d="M28 28l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 8v8M32 48v8" strokeLinecap="round" />
        </svg>
      ),
      title: '何度でもOK',
      description: '条件を変えて\n何度でもシミュレーション'
    },
    { 
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" stroke="#3b82f6" strokeWidth="1.5">
          <rect x="16" y="24" width="32" height="24" rx="4" />
          <path d="M24 24v-4a8 8 0 1116 0v4" />
          <circle cx="32" cy="36" r="4" />
          <path d="M32 40v4" strokeLinecap="round" />
        </svg>
      ),
      title: 'データ保存なし',
      description: '入力情報は保存されず\nプライバシーも安心'
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold tracking-widest mb-2" style={{ color: COLORS.accent }}>FEATURES</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: COLORS.primaryDark, fontFamily: "'Noto Serif JP', serif" }}>
            のれん診断が選ばれる理由
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
          {features.map((f, i) => (
            <div key={i} className="text-center">
              <div className="flex justify-center mb-4">{f.icon}</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: COLORS.accent }}>{f.title}</h3>
              <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: COLORS.gray600 }}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ========================================
// 3つの評価手法セクション（横並び）
// ========================================
const MethodSection = () => {
  const methods = [
    {
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 56 56" fill="none" stroke="#3b82f6" strokeWidth="1.5">
          <rect x="8" y="8" width="40" height="40" rx="4" />
          <path d="M16 36l8-12 8 8 10-14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <circle cx="40" cy="18" r="3" fill="#3b82f6" stroke="none" />
        </svg>
      ),
      title: 'DCF法',
      subtitle: '将来キャッシュフロー割引法',
      description: '将来生み出すキャッシュフローを現在価値に割り引いて算出'
    },
    {
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 56 56" fill="none" stroke="#3b82f6" strokeWidth="1.5">
          <rect x="8" y="24" width="16" height="24" rx="2" />
          <rect x="28" y="16" width="16" height="32" rx="2" />
          <path d="M16 12h24" strokeLinecap="round" strokeWidth="2" />
          <path d="M28 8v8" strokeLinecap="round" />
        </svg>
      ),
      title: '時価純資産法',
      subtitle: '＋ 営業権（のれん）',
      description: '資産の時価総額にブランド力等の「のれん代」を加算'
    },
    {
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 56 56" fill="none" stroke="#3b82f6" strokeWidth="1.5">
          <circle cx="28" cy="28" r="20" />
          <path d="M28 12v32M16 20l12-4 12 4M16 36l12 4 12-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'マルチプル法',
      subtitle: '類似会社比較法',
      description: '同業種のM&A事例やEBITDA倍率を参考に客観評価'
    }
  ];

  return (
    <section id="method" className="py-16 sm:py-24 px-4 sm:px-6" style={{ backgroundColor: COLORS.gray50 }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold tracking-widest mb-2" style={{ color: COLORS.accent }}>VALUATION METHOD</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: COLORS.primaryDark, fontFamily: "'Noto Serif JP', serif" }}>
            プロフェッショナル水準の<br className="sm:hidden" />3つの評価手法
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {methods.map((m, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-3">{m.icon}</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: COLORS.primaryDark }}>{m.title}</h3>
              <p className="text-xs sm:text-sm font-medium mb-3" style={{ color: '#d4a853' }}>{m.subtitle}</p>
              <p className="text-sm leading-relaxed" style={{ color: COLORS.gray600 }}>{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ========================================
// Reviews（線画スタイル人物イラスト）
// ========================================
const ReviewsSection = () => {
  const reviews = [
    { 
      rating: 5, 
      text: '売却を考え始めた時に利用しました。60秒で概算がわかるので、まずは目安を知りたい方にぴったりです。', 
      author: '居酒屋経営', 
      area: '東京都', 
      revenue: '年商3,000万円台',
      avatar: (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="#3b82f6" strokeWidth="1.2">
          <circle cx="32" cy="24" r="12" />
          <path d="M20 22c0-8 6-14 12-14s12 6 12 14" />
          <path d="M16 56c0-12 8-20 16-20s16 8 16 20" />
          <circle cx="28" cy="22" r="1.5" fill="#3b82f6" stroke="none" />
          <circle cx="36" cy="22" r="1.5" fill="#3b82f6" stroke="none" />
          <path d="M28 28c2 2 6 2 8 0" strokeLinecap="round" />
          <rect x="26" y="8" width="12" height="6" rx="2" fill="none" />
        </svg>
      )
    },
    { 
      rating: 5, 
      text: '他社の査定と比べても妥当な金額でした。無料でここまでわかるのは驚きです。', 
      author: 'カフェオーナー', 
      area: '大阪府', 
      revenue: '年商1,500万円台',
      avatar: (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="#3b82f6" strokeWidth="1.2">
          <circle cx="32" cy="24" r="12" />
          <path d="M20 20c4-6 10-8 16-6s10 8 8 16" />
          <path d="M16 56c0-12 8-20 16-20s16 8 16 20" />
          <circle cx="28" cy="22" r="1.5" fill="#3b82f6" stroke="none" />
          <circle cx="36" cy="22" r="1.5" fill="#3b82f6" stroke="none" />
          <path d="M28 28c2 2 6 2 8 0" strokeLinecap="round" />
          <path d="M24 12c0-4 4-6 8-6s8 2 8 6" />
        </svg>
      )
    },
    { 
      rating: 4, 
      text: '詳細診断で3つの評価手法による内訳が見れるのが良い。専門家との相談前の準備に役立ちました。', 
      author: 'ラーメン店経営', 
      area: '神奈川県', 
      revenue: '年商5,000万円台',
      avatar: (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="#3b82f6" strokeWidth="1.2">
          <circle cx="32" cy="24" r="12" />
          <path d="M22 18h20c0 4-4 8-10 8s-10-4-10-8z" />
          <path d="M16 56c0-12 8-20 16-20s16 8 16 20" />
          <circle cx="28" cy="24" r="1.5" fill="#3b82f6" stroke="none" />
          <circle cx="36" cy="24" r="1.5" fill="#3b82f6" stroke="none" />
          <path d="M28 30c2 2 6 2 8 0" strokeLinecap="round" />
        </svg>
      )
    },
    { 
      rating: 5, 
      text: '登録不要で何度でも試せるのが嬉しい。条件を変えてシミュレーションできます。', 
      author: 'レストラン経営', 
      area: '福岡県', 
      revenue: '年商8,000万円台',
      avatar: (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="#3b82f6" strokeWidth="1.2">
          <circle cx="32" cy="24" r="12" />
          <path d="M24 16c2-4 6-6 8-6s6 2 8 6" />
          <path d="M16 56c0-12 8-20 16-20s16 8 16 20" />
          <circle cx="28" cy="22" r="1.5" fill="#3b82f6" stroke="none" />
          <circle cx="36" cy="22" r="1.5" fill="#3b82f6" stroke="none" />
          <path d="M28 28c2 2 6 2 8 0" strokeLinecap="round" />
          <path d="M20 44h24" strokeLinecap="round" />
        </svg>
      )
    },
  ];

  return (
    <section id="reviews" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold tracking-widest mb-2" style={{ color: COLORS.accent }}>REVIEWS</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: COLORS.primaryDark, fontFamily: "'Noto Serif JP', serif" }}>利用者の声</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-5 sm:p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-blue-50 p-1">
                  {r.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex gap-0.5 mb-1">
                    {[1,2,3,4,5].map(s => <svg key={s} className="w-4 h-4" viewBox="0 0 24 24" fill={s <= r.rating ? '#fbbf24' : '#e5e7eb'}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}
                  </div>
                  <p className="text-sm font-medium" style={{ color: COLORS.primaryDark }}>{r.author} / {r.area}</p>
                  <p className="text-xs" style={{ color: COLORS.gray500 }}>{r.revenue}</p>
                </div>
              </div>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: COLORS.gray700 }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ========================================
// FAQ
// ========================================
const FAQSection = () => {
  const faqs = [
    { q: '診断は本当に無料ですか？', a: 'はい、完全無料です。会員登録も不要で、入力情報はサーバーに保存されません。何度でもお試しいただけます。' },
    { q: '診断にはどのくらい時間がかかりますか？', a: '簡易診断は7つの選択式質問で約1分、詳細診断は財務情報の入力が必要で約2分で完了します。' },
    { q: '診断結果はどのくらい正確ですか？', a: '簡易診断は概算価格の目安、詳細診断はDCF法・時価純資産法・マルチプル法の3つの専門的評価手法で算出した参考価格です。実際の売却価格は、買い手との交渉や市場環境により変動するため、正確な価格は M&A専門家にご相談されることをお勧めします。' },
    { q: '複数店舗の場合はどう入力しますか？', a: '年商・利益・従業員数などは全店舗の合計でご入力ください。営業年数は1号店を基準にお答えください。' },
    { q: '赤字店舗でも診断できますか？', a: 'はい、診断可能です。赤字店舗でも資産価値や将来の収益改善可能性を考慮した評価を行います。' },
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6" style={{ backgroundColor: COLORS.gray50 }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold tracking-widest mb-2" style={{ color: COLORS.accent }}>FAQ</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: COLORS.primaryDark, fontFamily: "'Noto Serif JP', serif" }}>よくある質問</h2>
        </div>
        
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="group bg-white rounded-xl">
              <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none font-medium text-sm sm:text-base" style={{ color: COLORS.primaryDark }}>
                <span className="pr-4">{f.q}</span>
                <svg className="w-5 h-5 flex-shrink-0 transition-transform group-open:rotate-180" style={{ color: COLORS.gray400 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-4 sm:px-5 pb-4 sm:pb-5"><p className="text-sm leading-relaxed" style={{ color: COLORS.gray600 }}>{f.a}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

// ========================================
// Footer（ロゴ中央表示）
// ========================================
const Footer = ({ onContactClick, onTermsClick, onPrivacyClick, onLogoClick }) => (
  <footer className="py-10 sm:py-14 px-4 sm:px-6" style={{ backgroundColor: COLORS.primaryDark }}>
    <div className="max-w-4xl mx-auto text-center">
      <a href="/" onClick={(e) => { e.preventDefault(); if (onLogoClick) onLogoClick(); }} className="inline-flex items-center justify-center gap-3 mb-5 cursor-pointer">
        <img src={LOGO_URL} alt="のれん診断" className="h-12 sm:h-14 w-auto brightness-0 invert opacity-90" onError={(e) => { e.target.style.display = 'none'; }} />
        <span className="text-xl sm:text-2xl font-bold text-white opacity-90" style={{ fontFamily: "'Noto Serif JP', serif" }}>のれん診断</span>
      </a>
      <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>© 2026 Noren Shindan. All rights reserved.</p>
      <nav className="flex flex-wrap justify-center gap-5 sm:gap-8 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
        <a href="#" onClick={(e) => { e.preventDefault(); if (onTermsClick) onTermsClick(); }} className="hover:text-white transition-colors cursor-pointer">利用規約</a>
        <a href="#" onClick={(e) => { e.preventDefault(); if (onPrivacyClick) onPrivacyClick(); }} className="hover:text-white transition-colors cursor-pointer">プライバシーポリシー</a>
        <a href="#" onClick={(e) => { e.preventDefault(); if (onContactClick) onContactClick(); }} className="hover:text-white transition-colors cursor-pointer">お問い合わせ</a>
      </nav>
    </div>
  </footer>
);

// ========================================
// Terms Page（利用規約）
// ========================================
const TermsPage = ({ onBack }) => (
  <div className="min-h-screen pt-16 sm:pt-20 pb-8 px-4 sm:px-6" style={{ backgroundColor: COLORS.gray50 }}>
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm mb-6 hover:opacity-70" style={{ color: COLORS.gray500 }}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg>トップに戻る
      </button>
      
      <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center" style={{ color: COLORS.primaryDark, fontFamily: "'Noto Serif JP', serif" }}>利用規約</h1>
        
        <div className="prose prose-sm max-w-none text-sm leading-relaxed" style={{ color: COLORS.gray700 }}>
          <p className="text-gray-400 text-xs mb-4">最終更新日：2025年1月1日</p>
          
          <h2 className="text-base font-bold mt-6 mb-3" style={{ color: COLORS.primaryDark }}>第1条（適用）</h2>
          <p className="mb-4">本利用規約（以下「本規約」）は、のれん診断（以下「本サービス」）の利用に関する条件を定めるものです。本サービスを利用される方（以下「ユーザー」）は、本規約に同意の上、本サービスをご利用ください。</p>
          
          <h2 className="text-base font-bold mt-6 mb-3" style={{ color: COLORS.primaryDark }}>第2条（サービスの内容）</h2>
          <p className="mb-2">本サービスは、飲食店の売却価格の概算を算出する無料の診断ツールです。以下の点についてユーザーは了承するものとします。</p>
          <ul className="list-disc pl-5 mb-4 space-y-1">
            <li>診断結果は概算の目安であり、実際の売却価格を保証するものではありません</li>
            <li>診断結果には相当程度の誤差が含まれる可能性があります</li>
            <li>実際の売却価格は、市場環境、買い手との交渉、デューデリジェンス等により大きく変動します</li>
            <li>本サービスは投資助言、税務助言、法務助言等の専門的なアドバイスを提供するものではありません</li>
          </ul>
          
          <h2 className="text-base font-bold mt-6 mb-3" style={{ color: COLORS.primaryDark }}>第3条（免責事項）</h2>
          <p className="mb-2">本サービスの運営者は、本サービスに関して、以下の事項について一切の責任を負いません。</p>
          <ul className="list-disc pl-5 mb-4 space-y-1">
            <li>診断結果の正確性・完全性・有用性・適時性</li>
            <li>診断結果に基づいてユーザーが行った判断や行動により生じた損害</li>
            <li>本サービスの利用により生じた直接的・間接的・偶発的・特別・結果的損害</li>
            <li>本サービスの中断・停止・終了・利用不能・変更</li>
            <li>本サービスを通じて提供される第三者のウェブサイトやサービスの内容</li>
            <li>その他本サービスに関連してユーザーに生じた損害</li>
          </ul>
          
          <h2 className="text-base font-bold mt-6 mb-3" style={{ color: COLORS.primaryDark }}>第4条（損害賠償の制限）</h2>
          <p className="mb-4">本サービスの運営者は、本サービスに関連してユーザーに生じたいかなる損害についても、その原因の如何を問わず、一切の損害賠償責任を負わないものとします。法令により免責が認められない場合であっても、運営者の賠償責任は、ユーザーが本サービスの利用に関して運営者に支払った金額（無料サービスのため0円）を上限とします。</p>
          
          <h2 className="text-base font-bold mt-6 mb-3" style={{ color: COLORS.primaryDark }}>第5条（禁止事項）</h2>
          <ul className="list-disc pl-5 mb-4 space-y-1">
            <li>本サービスの運営を妨害する行為</li>
            <li>本サービスを商業目的で無断利用する行為</li>
            <li>本サービスの診断結果を専門家の助言として第三者に提供する行為</li>
            <li>その他運営者が不適切と判断する行為</li>
          </ul>
          
          <h2 className="text-base font-bold mt-6 mb-3" style={{ color: COLORS.primaryDark }}>第6条（個人情報の取り扱い）</h2>
          <p className="mb-4">本サービスでは、診断に必要な情報以外の個人情報は収集しません。ユーザーが入力した診断情報は、サーバーに保存されることなく、ユーザーのブラウザ上でのみ処理されます。</p>
          
          <h2 className="text-base font-bold mt-6 mb-3" style={{ color: COLORS.primaryDark }}>第7条（サービスの変更・終了）</h2>
          <p className="mb-4">運営者は、ユーザーへの事前の通知なく、本サービスの内容を変更、または本サービスの提供を終了することができるものとします。</p>
          
          <h2 className="text-base font-bold mt-6 mb-3" style={{ color: COLORS.primaryDark }}>第8条（規約の変更）</h2>
          <p className="mb-4">運営者は、必要と判断した場合には、ユーザーに通知することなく本規約を変更することができるものとします。変更後の本規約は、本サービス上に掲示した時点から効力を生じるものとします。</p>
          
          <h2 className="text-base font-bold mt-6 mb-3" style={{ color: COLORS.primaryDark }}>第9条（準拠法・管轄裁判所）</h2>
          <p className="mb-4">本規約は日本法に準拠するものとします。本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
        </div>
      </div>
    </div>
  </div>
);

// ========================================
// Privacy Page（プライバシーポリシー）
// ========================================
const PrivacyPage = ({ onBack }) => (
  <div className="min-h-screen pt-16 sm:pt-20 pb-8 px-4 sm:px-6" style={{ backgroundColor: COLORS.gray50 }}>
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm mb-6 hover:opacity-70" style={{ color: COLORS.gray500 }}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg>トップに戻る
      </button>
      
      <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center" style={{ color: COLORS.primaryDark, fontFamily: "'Noto Serif JP', serif" }}>プライバシーポリシー</h1>
        
        <div className="prose prose-sm max-w-none text-sm leading-relaxed" style={{ color: COLORS.gray700 }}>
          <p className="text-gray-400 text-xs mb-4">最終更新日：2025年1月1日</p>
          
          <p className="mb-4">のれん診断（以下「本サービス」）の運営者は、ユーザーのプライバシーを尊重し、個人情報の保護に最大限努めます。本プライバシーポリシーでは、本サービスにおける情報の取り扱いについて説明します。</p>
          
          <h2 className="text-base font-bold mt-6 mb-3" style={{ color: COLORS.primaryDark }}>1. 収集する情報</h2>
          <p className="mb-2">本サービスでは、以下の情報を取り扱います。</p>
          <ul className="list-disc pl-5 mb-4 space-y-1">
            <li><strong>診断入力情報：</strong>店舗数、年商、営業利益、業態等の診断に必要な情報</li>
            <li><strong>アクセス情報：</strong>IPアドレス、ブラウザ種別、アクセス日時等の技術的情報</li>
          </ul>
          
          <h2 className="text-base font-bold mt-6 mb-3" style={{ color: COLORS.primaryDark }}>2. 情報の保存について</h2>
          <p className="mb-2">本サービスの最大の特徴は、<strong>ユーザーの診断情報を一切保存しない</strong>ことです。</p>
          <ul className="list-disc pl-5 mb-4 space-y-1">
            <li>診断入力情報は、ユーザーのブラウザ上でのみ処理されます</li>
            <li>サーバーへの送信・保存は行いません</li>
            <li>ブラウザを閉じると、入力データは自動的に消去されます</li>
            <li>Cookie等による診断情報の保持も行いません</li>
          </ul>
          
          <h2 className="text-base font-bold mt-6 mb-3" style={{ color: COLORS.primaryDark }}>3. アクセス解析について</h2>
          <p className="mb-2">本サービスでは、サービス改善のためにアクセス解析ツールを使用する場合があります。</p>
          <ul className="list-disc pl-5 mb-4 space-y-1">
            <li>収集されるデータは統計情報であり、個人を特定するものではありません</li>
            <li>アクセス解析により収集されるのは、訪問回数、閲覧ページ、利用デバイス等の匿名化された情報です</li>
            <li>これらの情報は、サービスの利用状況の把握と改善にのみ使用されます</li>
          </ul>
          
          <h2 className="text-base font-bold mt-6 mb-3" style={{ color: COLORS.primaryDark }}>4. 第三者への提供</h2>
          <p className="mb-4">本サービスでは、ユーザーの情報を第三者に提供、販売、賃貸することはありません。ただし、法令に基づく開示請求があった場合は、この限りではありません。</p>
          
          <h2 className="text-base font-bold mt-6 mb-3" style={{ color: COLORS.primaryDark }}>5. セキュリティ</h2>
          <p className="mb-4">本サービスは、SSL/TLS暗号化通信を使用し、ユーザーとサービス間の通信を保護しています。</p>
          
          <h2 className="text-base font-bold mt-6 mb-3" style={{ color: COLORS.primaryDark }}>6. 外部サービスへのリンク</h2>
          <p className="mb-4">本サービスには、外部サービスへのリンクが含まれる場合があります。リンク先のプライバシーポリシーについては、各サービスの規定をご確認ください。</p>
          
          <h2 className="text-base font-bold mt-6 mb-3" style={{ color: COLORS.primaryDark }}>7. プライバシーポリシーの変更</h2>
          <p className="mb-4">本プライバシーポリシーは、法令の変更やサービス内容の変更に伴い、予告なく改定される場合があります。変更後のプライバシーポリシーは、本サービス上に掲示した時点から効力を生じます。</p>
          
          <h2 className="text-base font-bold mt-6 mb-3" style={{ color: COLORS.primaryDark }}>8. お問い合わせ</h2>
          <p className="mb-4">本プライバシーポリシーに関するお問い合わせは、お問い合わせページよりご連絡ください。</p>
        </div>
      </div>
    </div>
  </div>
);

// ========================================
// Contact Page
// ========================================
const ContactPage = ({ onBack }) => (
  <div className="min-h-screen pt-16 sm:pt-20 pb-8 px-4 sm:px-6" style={{ backgroundColor: COLORS.gray50 }}>
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm mb-6 hover:opacity-70" style={{ color: COLORS.gray500 }}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg>トップに戻る
      </button>
      
      <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center" style={{ color: COLORS.primaryDark, fontFamily: "'Noto Serif JP', serif" }}>お問い合わせ</h1>
        
        <p className="text-sm mb-6 leading-relaxed" style={{ color: COLORS.gray600 }}>
          「のれん診断」に関するお問い合わせは、以下のメールアドレスまでご連絡ください。<br />
          担当者より順次ご返信させていただきます。
        </p>
        
        <div className="bg-gray-50 rounded-xl p-5">
          <p className="text-sm font-medium mb-2" style={{ color: COLORS.gray700 }}>メールでのお問い合わせ</p>
          <a href="mailto:ogosso.bubble@gmail.com" className="text-lg font-bold flex items-center gap-2" style={{ color: COLORS.accent }}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            ogosso.bubble@gmail.com
          </a>
        </div>
      </div>
    </div>
  </div>
);

// ========================================
// Loading
// ========================================
const LoadingScreen = ({ message = '計算中...' }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95">
    <div className="text-center">
      <div className="w-12 h-12 mx-auto mb-4 relative">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: COLORS.gray200, borderTopColor: COLORS.accent }} />
      </div>
      <p className="text-sm font-medium" style={{ color: COLORS.gray700 }}>{message}</p>
    </div>
  </div>
);

// ========================================
// Utility
// ========================================
const formatNumber = (num) => (num === '' || num === null || num === undefined) ? '' : Number(num).toLocaleString();
const parseFormattedNumber = (str) => str ? str.replace(/,/g, '') : '';
const formatCurrency = (value) => {
  if (value >= 100000000) return `${(value / 100000000).toFixed(1)}億円`;
  if (value >= 10000) return `${Math.round(value / 10000).toLocaleString()}万円`;
  return `${value.toLocaleString()}円`;
};

// ========================================
// Progress
// ========================================
const SegmentedProgress = ({ current, total, category, remainingTime }) => (
  <div className="mb-5">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-base" style={{ backgroundColor: COLORS.accent, color: COLORS.white }}>{current}</div>
        <div>
          <p className="text-sm font-medium" style={{ color: COLORS.primaryDark }}>{category}</p>
          <p className="text-xs" style={{ color: COLORS.gray500 }}>全{total}問中</p>
        </div>
      </div>
      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: COLORS.successBg, color: COLORS.success }}>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
        残り約{remainingTime}秒
      </div>
    </div>
    <div className="flex gap-1">{Array.from({ length: total }).map((_, i) => <div key={i} className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: i < current ? COLORS.accent : COLORS.gray200 }} />)}</div>
  </div>
);

// ========================================
// Simple Diagnosis
// ========================================
const SimpleDiagnosis = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);

  const questions = [
    { id: 'storeCount', title: '店舗数', category: '店舗情報', subtitle: '現在運営している店舗数', options: [{ value: 1, label: '1店舗' }, { value: 2, label: '2店舗' }, { value: 3, label: '3店舗' }, { value: 4.5, label: '4〜5店舗' }, { value: 8, label: '6〜10店舗' }, { value: 12, label: '11店舗以上' }] },
    { id: 'revenue', title: '年商（売上高）', category: '売上', subtitle: '直近1年間の売上高', note: (sc) => sc > 1 ? '全店舗の合計' : null, options: [{ value: 10000000, label: '1,000万円未満' }, { value: 20000000, label: '1,000〜2,000万円' }, { value: 35000000, label: '2,000〜5,000万円' }, { value: 75000000, label: '5,000万〜1億円' }, { value: 150000000, label: '1億〜2億円' }, { value: 300000000, label: '2億〜5億円' }, { value: 500000000, label: '5億円以上' }] },
    { id: 'profitMargin', title: '営業利益率', category: '利益', subtitle: '売上に対する利益の割合', note: () => '不明な場合は「平均的」を選択', options: [{ value: -15, label: '大幅赤字（-10%以下）' }, { value: -5, label: '赤字（-10〜0%）' }, { value: 1.5, label: 'ほぼ収支均衡（0〜3%）' }, { value: 4, label: 'やや低め（3〜5%）' }, { value: 6.5, label: '平均的（5〜8%）' }, { value: 10, label: '良好（8〜12%）' }, { value: 15, label: '優秀（12%以上）' }] },
    { id: 'stability', title: '売上の推移', category: '成長性', subtitle: '過去2〜3年の傾向', options: [{ value: 1.0, label: '大幅増加（年15%以上）' }, { value: 0.6, label: '増加傾向（年10〜15%）' }, { value: 0.3, label: 'やや増加（年5〜10%）' }, { value: 0, label: '横ばい（±5%程度）' }, { value: -0.4, label: 'やや減少（年5〜10%減）' }, { value: -0.7, label: '減少傾向（年10%以上減）' }] },
    { id: 'years', title: '営業年数', category: '実績', subtitle: '現業態での営業期間', note: (sc) => sc > 1 ? '1号店を基準' : null, options: [{ value: -0.7, label: '1年未満' }, { value: -0.3, label: '1〜2年' }, { value: 0, label: '2〜3年' }, { value: 0.3, label: '3〜5年' }, { value: 0.5, label: '5〜7年' }, { value: 0.6, label: '7〜10年' }, { value: 0.7, label: '10〜15年' }, { value: 0.8, label: '15年以上' }] },
    { id: 'ownerDependency', title: 'オーナーの関与度', category: '経営体制', subtitle: '不在でも運営できるか', options: [{ value: -0.8, label: '毎日の稼働が必須' }, { value: -0.5, label: '週5〜6日の出勤' }, { value: -0.2, label: '週3〜4日の出勤' }, { value: 0.3, label: '週1〜2日の出勤' }, { value: 0.6, label: 'ほぼ不要' }] },
    { id: 'employees', title: '従業員数', category: '人員体制', subtitle: 'パート・アルバイト含む', note: (sc) => sc > 1 ? '全店舗の合計' : null, options: [{ value: 0.7, label: '0人（ひとりで運営）' }, { value: 0.9, label: '1人' }, { value: 1.0, label: '2〜3人' }, { value: 1.1, label: '4〜5人' }, { value: 1.15, label: '6〜8人' }, { value: 1.2, label: '9〜12人' }, { value: 1.25, label: '13人以上' }] },
  ];

  const currentQ = questions[step];
  const storeCount = answers.storeCount || 1;
  const remainingTime = Math.max(10, (questions.length - step) * 8);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setTimeout(() => {
      const newAnswers = { ...answers, [currentQ.id]: value };
      setAnswers(newAnswers);
      setSelectedValue(null);
      if (step < questions.length - 1) setStep(step + 1);
      else onComplete(newAnswers, 'simple');
    }, 200);
  };

  const noteText = currentQ.note ? currentQ.note(storeCount) : null;

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-8 px-4 sm:px-6" style={{ backgroundColor: COLORS.gray50 }}>
      <div className="max-w-xl mx-auto">
        <SegmentedProgress current={step + 1} total={questions.length} category={currentQ.category} remainingTime={remainingTime} />
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-7 border border-gray-100">
          <button onClick={() => step > 0 ? setStep(step - 1) : onBack()} className="flex items-center gap-1 text-sm mb-4 hover:opacity-70" style={{ color: COLORS.gray500 }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg>戻る
          </button>
          <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: COLORS.primaryDark, fontFamily: "'Noto Serif JP', serif" }}>{currentQ.title}</h2>
          <p className="text-sm mb-4" style={{ color: COLORS.gray600 }}>{currentQ.subtitle}</p>
          {noteText && <div className="mb-4 p-3 rounded-lg text-sm flex items-center gap-2" style={{ backgroundColor: COLORS.warningBg, color: COLORS.warning }}><svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" /></svg>{noteText}</div>}
          <div className="space-y-2">
            {currentQ.options.map((opt, i) => (
              <button key={i} onClick={() => handleSelect(opt.value)} className="w-full text-left p-3.5 rounded-xl border-2 transition-all shadow-sm hover:shadow" style={{ borderColor: selectedValue === opt.value ? COLORS.accent : '#d1d5db', backgroundColor: selectedValue === opt.value ? '#eff6ff' : COLORS.white }}>
                <span className="text-sm font-medium" style={{ color: COLORS.primaryDark }}>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================================
// Detailed Diagnosis（クイック選択肢大幅増加）
// ========================================
const DetailedDiagnosis = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const questions = [
    { key: 'storeCount', type: 'input', category: '店舗情報', question: '店舗数', unit: '店舗', placeholder: '1', quickValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30] },
    { key: 'businessType', type: 'select', category: '業態', question: '業態', options: [{ value: 'izakaya', label: '居酒屋・バー' }, { value: 'restaurant', label: 'レストラン・食堂' }, { value: 'cafe', label: 'カフェ・喫茶' }, { value: 'fastfood', label: 'ファストフード' }, { value: 'specialty', label: '専門店（焼肉・寿司・ラーメン等）' }, { value: 'delivery', label: 'デリバリー' }, { value: 'catering', label: '給食・弁当' }] },
    { key: 'annualRevenue', type: 'input', category: '売上', question: '年商（売上高）', unit: '万円', placeholder: '5000', quickValues: [500, 1000, 2000, 3000, 5000, 7000, 10000, 15000, 20000, 30000] },
    { key: 'operatingProfit', type: 'input', category: '利益', question: '年間の営業利益', unit: '万円', placeholder: '500', note: '赤字はマイナス入力', quickValues: [-500, -100, 0, 100, 200, 300, 500, 700, 1000, 2000, 3000] },
    { key: 'cash', type: 'input', category: '財務', question: '現預金残高', unit: '万円', placeholder: '300', quickValues: [0, 50, 100, 200, 300, 500, 700, 1000, 2000, 3000] },
    { key: 'debt', type: 'input', category: '財務', question: '借入金残高', unit: '万円', placeholder: '100', quickValues: [0, 100, 300, 500, 1000, 2000, 3000, 5000, 10000] },
    { key: 'revenueTrend', type: 'select', category: '成長性', question: '直近3年間の売上推移', options: [{ value: 'growing_high', label: '大幅増加（年15%以上）' }, { value: 'growing', label: '増加傾向' }, { value: 'stable', label: '横ばい' }, { value: 'declining', label: '減少傾向' }] },
    { key: 'ownerDependency', type: 'select', category: '経営体制', question: 'オーナーの関与度', options: [{ value: 'very_low', label: 'ほぼなし（月1〜2回程度）' }, { value: 'low', label: '低い（週1〜2日）' }, { value: 'medium', label: '中程度（週3〜4日）' }, { value: 'high', label: '高い（週5〜6日）' }, { value: 'very_high', label: '非常に高い（毎日必須）' }] },
    { key: 'yearsInBusiness', type: 'input', category: '実績', question: '営業年数', unit: '年', placeholder: '5', quickValues: [1, 2, 3, 4, 5, 7, 10, 15, 20, 30] },
  ];

  const currentQ = questions[step];
  const remainingTime = Math.max(15, (questions.length - step) * 12);

  const handleInputChange = (value) => setFormData({ ...formData, [currentQ.key]: value });
  const handleQuickValue = (value) => setFormData({ ...formData, [currentQ.key]: String(value) });
  const handleNext = () => { if (step < questions.length - 1) setStep(step + 1); else onComplete(formData, 'detailed'); };
  const handleBack = () => { if (step > 0) setStep(step - 1); else onBack(); };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-8 px-4 sm:px-6" style={{ backgroundColor: COLORS.gray50 }}>
      <div className="max-w-xl mx-auto">
        <SegmentedProgress current={step + 1} total={questions.length} category={currentQ.category} remainingTime={remainingTime} />
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-7 border border-gray-100">
          <button onClick={handleBack} className="flex items-center gap-1 text-sm mb-4 hover:opacity-70" style={{ color: COLORS.gray500 }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg>戻る
          </button>
          <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: COLORS.primaryDark, fontFamily: "'Noto Serif JP', serif" }}>{currentQ.question}</h2>
          {currentQ.note && <p className="text-sm mb-3" style={{ color: COLORS.gray500 }}>{currentQ.note}</p>}

          {currentQ.type === 'input' ? (
            <div className="space-y-4">
              {currentQ.quickValues && (
                <div>
                  <p className="text-xs mb-2" style={{ color: COLORS.gray500 }}>よく使われる数値（タップで選択）</p>
                  <div className="flex flex-wrap gap-2">
                    {currentQ.quickValues.map((val) => (
                      <button key={val} onClick={() => handleQuickValue(val)} className="px-3 py-2 rounded-lg text-sm font-medium transition-all" style={{ backgroundColor: formData[currentQ.key] === String(val) ? COLORS.accent : COLORS.gray100, color: formData[currentQ.key] === String(val) ? COLORS.white : COLORS.gray700 }}>
                        {formatNumber(val)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs mb-2 flex items-center gap-1" style={{ color: COLORS.gray500 }}>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  直接入力も可能です
                </p>
                <div className="relative">
                  <input type="text" inputMode="numeric" value={formatNumber(formData[currentQ.key]) || ''} onChange={(e) => handleInputChange(parseFormattedNumber(e.target.value))} placeholder={currentQ.placeholder}
                    className="w-full px-4 py-3 pr-14 rounded-xl border-2 text-base focus:outline-none" style={{ borderColor: COLORS.gray200 }} onFocus={(e) => e.target.style.borderColor = COLORS.accent} onBlur={(e) => e.target.style.borderColor = COLORS.gray200} />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium" style={{ color: COLORS.gray500 }}>{currentQ.unit}</span>
                </div>
              </div>
              <button onClick={handleNext} disabled={!formData[currentQ.key]} className="w-full py-3 rounded-xl font-medium text-sm disabled:opacity-50 flex items-center justify-center gap-2" style={{ backgroundColor: formData[currentQ.key] ? COLORS.accent : COLORS.gray300, color: COLORS.white }}>
                次へ<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M13 7l5 5-5 5M6 12h12" /></svg>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {currentQ.options.map((opt, i) => (
                <button key={i} onClick={() => { handleInputChange(opt.value); setTimeout(handleNext, 200); }} className="w-full text-left p-3.5 rounded-xl border-2 transition-all shadow-sm hover:shadow" style={{ borderColor: formData[currentQ.key] === opt.value ? COLORS.accent : '#d1d5db', backgroundColor: formData[currentQ.key] === opt.value ? '#eff6ff' : COLORS.white }}>
                  <span className="text-sm font-medium" style={{ color: COLORS.primaryDark }}>{opt.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ========================================
// Calculation
// ========================================
const calculateValuation = (data, type) => type === 'simple' ? calculateSimpleValuation(data) : calculateDetailedValuation(data);

const calculateSimpleValuation = (data) => {
  const revenue = data.revenue || 0;
  const profitMarginPercent = data.profitMargin || 0;
  const stability = data.stability || 0;
  const years = data.years || 0;
  const ownerDependency = data.ownerDependency || 0;
  const employees = data.employees || 1;
  const storeCount = data.storeCount || 1;

  const operatingProfit = revenue * (profitMarginPercent / 100);
  let baseMultiple = 3.0 + stability + years + ownerDependency;
  baseMultiple = Math.max(0.5, Math.min(5.5, baseMultiple));
  if (storeCount >= 8) baseMultiple += 0.5;
  else if (storeCount >= 3) baseMultiple += 0.3;
  else if (storeCount >= 2) baseMultiple += 0.15;

  const goodwill = Math.max(0, operatingProfit * baseMultiple);
  let revenueMultiplier = revenue >= 300000000 ? 1.15 : revenue >= 100000000 ? 1.08 : revenue >= 50000000 ? 1.0 : 0.9;
  const estimatedValue = Math.max(0, goodwill * employees * revenueMultiplier);
  const minValue = revenue * 0.1;

  let percentile = 50;
  if (profitMarginPercent >= 10) percentile += 20;
  else if (profitMarginPercent >= 6) percentile += 10;
  else if (profitMarginPercent < 0) percentile -= 20;
  if (stability >= 0.5) percentile += 10;
  else if (stability < 0) percentile -= 10;
  percentile = Math.max(10, Math.min(90, percentile));

  const midValue = Math.max(minValue, estimatedValue);
  return { low: Math.round(midValue * 0.75), mid: Math.round(midValue), high: Math.round(midValue * 1.25), method: 'simple', percentile };
};

const calculateDetailedValuation = (data) => {
  const annualRevenue = (parseFloat(data.annualRevenue) || 0) * 10000;
  const operatingProfit = (parseFloat(data.operatingProfit) || 0) * 10000;
  const cash = (parseFloat(data.cash) || 0) * 10000;
  const debt = (parseFloat(data.debt) || 0) * 10000;
  const storeCount = parseInt(data.storeCount) || 1;
  const yearsInBusiness = parseFloat(data.yearsInBusiness) || 0;
  const businessType = data.businessType || 'restaurant';

  let adjustmentFactor = 1.0;
  const trendFactors = { 'growing_high': 1.25, 'growing': 1.15, 'stable': 1.0, 'declining': 0.85 };
  adjustmentFactor *= trendFactors[data.revenueTrend] || 1.0;
  const ownerFactors = { 'very_low': 1.2, 'low': 1.1, 'medium': 1.0, 'high': 0.9, 'very_high': 0.75 };
  adjustmentFactor *= ownerFactors[data.ownerDependency] || 1.0;
  if (yearsInBusiness >= 15) adjustmentFactor *= 1.15;
  else if (yearsInBusiness >= 10) adjustmentFactor *= 1.1;
  else if (yearsInBusiness >= 5) adjustmentFactor *= 1.05;
  else if (yearsInBusiness < 2) adjustmentFactor *= 0.85;
  if (storeCount >= 10) adjustmentFactor *= 1.2;
  else if (storeCount >= 5) adjustmentFactor *= 1.15;
  else if (storeCount >= 3) adjustmentFactor *= 1.1;
  else if (storeCount >= 2) adjustmentFactor *= 1.05;

  const industryMultiples = { 'specialty': 4.0, 'izakaya': 3.5, 'restaurant': 3.5, 'cafe': 3.2, 'fastfood': 3.0, 'delivery': 2.8, 'catering': 4.2 };
  const industryMultiple = industryMultiples[businessType] || 3.5;
  const depreciationRate = businessType === 'delivery' ? 0.02 : 0.04;
  const estimatedDepreciation = annualRevenue * depreciationRate;

  const taxRate = 0.30;
  const nopat = operatingProfit * (1 - taxRate);
  const wacc = 0.10;
  const growthRate = 0.005;
  let dcfValue = 0;
  for (let t = 1; t <= 5; t++) dcfValue += (nopat * Math.pow(1 + growthRate, t)) / Math.pow(1 + wacc, t);
  dcfValue += (nopat * Math.pow(1 + growthRate, 6)) / (wacc - growthRate) / Math.pow(1 + wacc, 5);
  dcfValue = Math.max(0, dcfValue * adjustmentFactor);

  const netAsset = cash - debt;
  let goodwillYears = yearsInBusiness >= 10 ? 4 : yearsInBusiness >= 5 ? 3 : yearsInBusiness >= 2 ? 2 : 1;
  const goodwill = Math.max(0, operatingProfit * goodwillYears);
  const netAssetValue = Math.max(0, (netAsset + goodwill) * adjustmentFactor);

  const ebitda = operatingProfit + estimatedDepreciation;
  let multipleValue = operatingProfit > 0 ? ebitda * industryMultiple * adjustmentFactor : annualRevenue * 0.4 * adjustmentFactor;
  multipleValue = Math.max(0, multipleValue);

  const methodValues = [dcfValue, netAssetValue, multipleValue].filter(v => v > 0);
  const graphMax = methodValues.length > 0 ? Math.max(...methodValues) : annualRevenue * 0.5;
  const graphMin = methodValues.length > 0 ? Math.min(...methodValues) : annualRevenue * 0.1;

  let totalValue = operatingProfit > 0 ? dcfValue * 0.4 + netAssetValue * 0.3 + multipleValue * 0.3 : netAssetValue * 0.5 + multipleValue * 0.5;
  totalValue = Math.max(annualRevenue * 0.08, totalValue);

  let percentile = 50;
  const profitMargin = annualRevenue > 0 ? (operatingProfit / annualRevenue) * 100 : 0;
  if (profitMargin >= 12) percentile += 25;
  else if (profitMargin >= 8) percentile += 15;
  else if (profitMargin >= 5) percentile += 5;
  else if (profitMargin < 0) percentile -= 20;
  if (data.revenueTrend === 'growing_high') percentile += 15;
  else if (data.revenueTrend === 'growing') percentile += 10;
  else if (data.revenueTrend === 'declining') percentile -= 15;
  percentile = Math.max(5, Math.min(95, percentile));

  return {
    low: Math.round(totalValue * 0.85), mid: Math.round(totalValue), high: Math.round(totalValue * 1.15),
    graphMin: Math.round(graphMin), graphMax: Math.round(graphMax),
    method: 'detailed', percentile,
    details: {
      dcf: { value: Math.round(dcfValue) },
      netAsset: { value: Math.round(netAssetValue), goodwillYears },
      multiple: { value: Math.round(multipleValue), method: operatingProfit > 0 ? 'EV/EBITDA' : 'EV/売上高' },
    }
  };
};

const getEvaluationComment = (percentile) => {
  if (percentile >= 75) return { text: '買い手から高い関心が期待できる水準', color: COLORS.success };
  if (percentile >= 55) return { text: '売却交渉を有利に進められる水準', color: COLORS.success };
  if (percentile >= 35) return { text: '市場での売却が十分に見込める水準', color: COLORS.accent };
  return { text: '条件次第で売却の可能性がある水準', color: COLORS.gray500 };
};

// ========================================
// Note紹介（サムネイル画像使用）
// ========================================
const NotePromotion = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="p-5 text-center border-b border-gray-100">
      <p className="text-xs tracking-widest mb-1" style={{ color: COLORS.gray500 }}>Recommended Article</p>
      <h3 className="text-lg font-bold" style={{ color: COLORS.primaryDark, fontFamily: "'Noto Serif JP', serif" }}>売却を成功させるために</h3>
      <p className="text-sm mt-2" style={{ color: COLORS.gray600 }}>飲食店M&Aの経験者が、売却成功のポイントをわかりやすく解説しています。</p>
    </div>
    <a href="https://note.com/kei_senpai/n/ne00ffee62562" target="_blank" rel="noopener noreferrer" className="block">
      <img 
        src={NOTE_THUMBNAIL_URL} 
        alt="飲食店売却成功の教科書" 
        className="w-full h-auto"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    </a>
    <div className="p-4 text-center">
      <a href="https://note.com/kei_senpai/n/ne00ffee62562" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-sm" style={{ backgroundColor: COLORS.accent, color: COLORS.white }}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        noteで記事を読む
      </a>
    </div>
  </div>
);

// ========================================
// Result Page
// ========================================
const ResultPage = ({ result, onRestart, onDetailedDiagnosis, onRestartDetailed }) => {
  const { low, mid, high, graphMin, graphMax, method, details, percentile } = result;
  const [copied, setCopied] = useState(false);
  const evaluation = getEvaluationComment(percentile);

  const handleCopy = async () => {
    const text = `【のれん診断結果】\n推定売却価格: ${formatCurrency(mid)}\n想定レンジ: ${formatCurrency(low)} 〜 ${formatCurrency(high)}\n\n詳しくは👉 https://noren-shindan.jp`;
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch (e) {}
  };

  const handleLineShare = () => {
    const text = encodeURIComponent(`【のれん診断結果】推定売却価格: ${formatCurrency(mid)}\n飲食店の売却価格を無料で診断👉`);
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent('https://noren-shindan.jp')}&text=${text}`, '_blank');
  };

  const handleXShare = () => {
    const text = encodeURIComponent(`飲食店の売却価格を診断してみた！推定売却価格: ${formatCurrency(mid)}\n無料で診断できる👉`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent('https://noren-shindan.jp')}`, '_blank');
  };

  const simpleGraphMin = Math.round(low * 0.6);
  const simpleGraphMax = Math.round(high * 1.4);
  const rangeWidth = (method === 'detailed' ? ((graphMax || simpleGraphMax) - (graphMin || simpleGraphMin)) : (simpleGraphMax - simpleGraphMin)) || 1;
  const gMin = method === 'detailed' ? (graphMin || simpleGraphMin) : simpleGraphMin;
  const gMax = method === 'detailed' ? (graphMax || simpleGraphMax) : simpleGraphMax;
  const lowPct = Math.max(5, Math.min(95, ((low - gMin) / rangeWidth) * 100));
  const highPct = Math.max(5, Math.min(95, ((high - gMin) / rangeWidth) * 100));
  const midPct = Math.max(5, Math.min(95, ((mid - gMin) / rangeWidth) * 100));

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-8 px-4 sm:px-6" style={{ backgroundColor: COLORS.gray50 }}>
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-5">
          <p className="text-xs font-semibold tracking-widest mb-2" style={{ color: COLORS.accent }}>RESULT</p>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: COLORS.primaryDark, fontFamily: "'Noto Serif JP', serif" }}>診断結果</h1>
          <p className="text-xs mt-1" style={{ color: COLORS.gray500 }}>{method === 'simple' ? '簡易診断' : '詳細診断（3手法による精密評価）'}</p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-7 mb-5">
          <div className="flex items-center justify-center mb-4 py-2 px-4 rounded-full mx-auto w-fit" style={{ backgroundColor: `${evaluation.color}15` }}>
            <span className="text-sm font-medium" style={{ color: evaluation.color }}>{evaluation.text}</span>
          </div>

          <p className="text-center text-sm mb-2" style={{ color: COLORS.gray600 }}>推定売却価格</p>
          <div className="text-center mb-6">
            <span className="text-4xl sm:text-5xl font-bold" style={{ color: COLORS.primary, fontFamily: "'Noto Serif JP', serif" }}>{formatCurrency(mid)}</span>
          </div>

          <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: COLORS.gray50 }}>
            <p className="text-center text-sm font-medium mb-4" style={{ color: COLORS.gray700 }}>想定売却価格レンジ</p>
            
            <div className="relative mb-1 h-5">
              <div className="absolute transform -translate-x-1/2 text-center" style={{ left: `${lowPct}%` }}>
                <span className="text-xs font-bold whitespace-nowrap" style={{ color: COLORS.accent }}>{formatCurrency(low)}</span>
              </div>
              <div className="absolute transform -translate-x-1/2 text-center" style={{ left: `${highPct}%` }}>
                <span className="text-xs font-bold whitespace-nowrap" style={{ color: COLORS.accent }}>{formatCurrency(high)}</span>
              </div>
            </div>
            
            <div className="relative h-3">
              <div className="absolute h-full border-l-2 border-dashed" style={{ left: `${lowPct}%`, borderColor: COLORS.accent }} />
              <div className="absolute h-full border-l-2 border-dashed" style={{ left: `${highPct}%`, borderColor: COLORS.accent }} />
            </div>
            
            <div className="relative">
              <div className="h-6 rounded-full relative overflow-visible" style={{ backgroundColor: COLORS.gray200 }}>
                <div className="absolute h-full rounded-full" style={{ left: `${lowPct}%`, width: `${Math.max(1, highPct - lowPct)}%`, background: `linear-gradient(90deg, ${COLORS.accent} 0%, ${COLORS.accentLight} 100%)` }} />
              </div>
              <div className="absolute top-0 transform -translate-x-1/2" style={{ left: `${midPct}%` }}>
                <div className="w-6 h-6 rounded-full bg-white border-4 shadow-lg" style={{ borderColor: COLORS.accent }} />
              </div>
            </div>
            
            <div className="flex justify-between mt-3 text-xs" style={{ color: COLORS.gray400 }}>
              <span>{formatCurrency(gMin)}</span>
              <span>{formatCurrency(gMax)}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl mb-5" style={{ backgroundColor: '#eff6ff' }}>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl text-white flex items-center justify-center flex-shrink-0" style={{ backgroundColor: COLORS.accent }}>
                <p className="text-lg font-bold">{100 - percentile}%</p>
              </div>
              <div>
                <p className="text-sm font-bold mb-0.5" style={{ color: COLORS.primaryDark }}>評価ランキング：上位 {100 - percentile}%</p>
                <p className="text-xs" style={{ color: COLORS.gray600 }}>同規模・同業態100店舗中{100 - percentile}番目の評価</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <button onClick={method === 'detailed' ? onRestartDetailed : onRestart} className="w-full py-3.5 rounded-xl font-bold text-sm border-2 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2" style={{ borderColor: COLORS.accent, color: COLORS.accent, backgroundColor: COLORS.white }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              もう一度診断する
            </button>
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={handleCopy} className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium shadow-sm hover:shadow transition-all" style={{ backgroundColor: COLORS.gray100, color: COLORS.gray700 }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                {copied ? 'コピー完了！' : '結果をコピー'}
              </button>
              <button onClick={handleLineShare} className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white shadow-sm hover:shadow transition-all" style={{ backgroundColor: '#06C755' }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 5.58 2 10c0 3.73 3.22 6.88 7.56 7.72.29.06.7.19.8.43.1.22.06.56.03.78l-.13.76c-.04.23-.18.89.78.48s5.16-3.04 7.04-5.2C20.52 12.33 22 11.23 22 10c0-4.42-4.48-8-10-8z"/></svg>
                LINEで共有
              </button>
              <button onClick={handleXShare} className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white shadow-sm hover:shadow transition-all" style={{ backgroundColor: COLORS.gray900 }}>
                <span className="text-base font-bold">𝕏</span>
                共有
              </button>
            </div>
          </div>
        </div>

        {method === 'simple' && (
          <div className="bg-white rounded-2xl shadow-sm border-2 border-blue-200 p-6 my-8">
            <h3 className="text-lg font-bold mb-4 text-center" style={{ color: COLORS.primaryDark, fontFamily: "'Noto Serif JP', serif" }}>より精密な診断をご希望ですか？</h3>
            <p className="text-sm mb-5 text-center" style={{ color: COLORS.gray600 }}>
              詳細診断では、M&Aのプロが使う<strong style={{ color: COLORS.accent }}>3つの評価手法</strong>で精密に算出します。
            </p>
            
            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-xl text-center" style={{ backgroundColor: '#eff6ff' }}>
                <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: COLORS.accent }}>
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <p className="text-xs font-bold mb-1" style={{ color: COLORS.primaryDark }}>DCF法</p>
                <p className="text-[10px]" style={{ color: COLORS.gray500 }}>将来収益から<br />現在価値を算出</p>
              </div>
              <div className="p-3 rounded-xl text-center" style={{ backgroundColor: '#eff6ff' }}>
                <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: COLORS.accent }}>
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <p className="text-xs font-bold mb-1" style={{ color: COLORS.primaryDark }}>時価純資産法</p>
                <p className="text-[10px]" style={{ color: COLORS.gray500 }}>純資産+のれんで<br />堅実に評価</p>
              </div>
              <div className="p-3 rounded-xl text-center" style={{ backgroundColor: '#eff6ff' }}>
                <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: COLORS.accent }}>
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <p className="text-xs font-bold mb-1" style={{ color: COLORS.primaryDark }}>マルチプル法</p>
                <p className="text-[10px]" style={{ color: COLORS.gray500 }}>業界の取引事例<br />から比較評価</p>
              </div>
            </div>
            
            <button onClick={onDetailedDiagnosis} className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all" style={{ backgroundColor: COLORS.accent, color: COLORS.white }}>
              詳細診断を受ける（約2分）
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M13 7l5 5-5 5M6 12h12" /></svg>
            </button>
          </div>
        )}

        {method === 'detailed' && details && (
          <div className="bg-white rounded-2xl shadow-sm p-5 my-8">
            <h2 className="text-base font-bold mb-4" style={{ color: COLORS.primaryDark, fontFamily: "'Noto Serif JP', serif" }}>3つの評価手法による内訳</h2>
            <div className="space-y-3">
              {[
                { name: 'DCF法', value: details.dcf.value, desc: '将来キャッシュフローを現在価値に割り引いて算出' },
                { name: '時価純資産法', value: details.netAsset.value, desc: `純資産 + 営業権${details.netAsset.goodwillYears}年分` },
                { name: 'マルチプル法', value: details.multiple.value, desc: `${details.multiple.method}倍率を適用` },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: COLORS.gray50 }}>
                  <div className="flex-1">
                    <span className="text-sm font-bold" style={{ color: COLORS.primaryDark }}>{item.name}</span>
                    <p className="text-xs" style={{ color: COLORS.gray500 }}>{item.desc}</p>
                  </div>
                  <span className="text-xl sm:text-2xl font-bold ml-3" style={{ color: COLORS.accent }}>{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm p-5 my-8">
          <h2 className="text-base font-bold mb-4" style={{ color: COLORS.primaryDark, fontFamily: "'Noto Serif JP', serif" }}>売却に向けた次のステップ</h2>
          <div className="space-y-3">
            {[{ step: 1, title: '売却準備を始める', desc: '財務資料の整理、店舗の強みの明確化' }, { step: 2, title: '専門家に相談する', desc: 'M&A仲介会社への相談で市場価格を確認' }, { step: 3, title: '買い手を探す', desc: '複数の候補との交渉で最適な条件を引き出す' }].map((item) => (
              <div key={item.step} className="flex gap-3">
                <div className="w-8 h-8 rounded-full text-white flex items-center justify-center flex-shrink-0 text-sm font-bold" style={{ backgroundColor: COLORS.accent }}>{item.step}</div>
                <div>
                  <p className="text-sm font-medium" style={{ color: COLORS.primaryDark }}>{item.title}</p>
                  <p className="text-xs" style={{ color: COLORS.gray500 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <NotePromotion />
      </div>
    </div>
  );
};

// ========================================
// Main App
// ========================================
const NorenDiagnosis = () => {
  const [view, setView] = useState('landing');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartDiagnosis = () => { setView('simple'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleStartDetailedDiagnosis = () => { setView('detailed'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  
  const handleComplete = async (data, type) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setResult(calculateValuation(data, type));
    setIsLoading(false);
    setView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => { setView('landing'); setResult(null); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleRestartDetailed = () => { setView('detailed'); setResult(null); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleBackToLanding = () => { setView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleLogoClick = () => { setView('landing'); setResult(null); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleContactClick = () => { setView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleTermsClick = () => { setView('terms'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handlePrivacyClick = () => { setView('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleFeatureClick = () => { 
    setView('landing'); 
    setTimeout(() => { 
      const el = document.getElementById('features'); 
      if (el) el.scrollIntoView({ behavior: 'smooth' }); 
    }, 100); 
  };
  const handleMethodClick = () => { 
    setView('landing'); 
    setTimeout(() => { 
      const el = document.getElementById('method'); 
      if (el) el.scrollIntoView({ behavior: 'smooth' }); 
    }, 100); 
  };

  return (
    <ErrorBoundary>
      <div className="font-sans antialiased" style={{ color: COLORS.gray900 }}>
        <SEOHead />
        <Header onStartDiagnosis={handleStartDiagnosis} onLogoClick={handleLogoClick} onFeatureClick={handleFeatureClick} onMethodClick={handleMethodClick} />
        {isLoading && <LoadingScreen message="診断結果を計算中..." />}
        
        {view === 'landing' && (
          <main>
            <HeroSection onStartDiagnosis={handleStartDiagnosis} />
            <FeaturesSection />
            <MethodSection />
            <ReviewsSection />
            <FAQSection />
          </main>
        )}
        {view === 'simple' && <SimpleDiagnosis onComplete={handleComplete} onBack={handleBackToLanding} />}
        {view === 'detailed' && <DetailedDiagnosis onComplete={handleComplete} onBack={handleBackToLanding} />}
        {view === 'result' && result && <ResultPage result={result} onRestart={handleRestart} onDetailedDiagnosis={handleStartDetailedDiagnosis} onRestartDetailed={handleRestartDetailed} />}
        {view === 'contact' && <ContactPage onBack={handleBackToLanding} />}
        {view === 'terms' && <TermsPage onBack={handleBackToLanding} />}
        {view === 'privacy' && <PrivacyPage onBack={handleBackToLanding} />}
        <Footer onContactClick={handleContactClick} onTermsClick={handleTermsClick} onPrivacyClick={handlePrivacyClick} onLogoClick={handleLogoClick} />
      </div>
    </ErrorBoundary>
  );
};

export default NorenDiagnosis;
