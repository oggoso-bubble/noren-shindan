import React, { useState, useEffect } from 'react';

// ========================================
// のれん診断 LP + 診断ツール v5
// 改善内容:
// 1. 業態を7つに拡張
// 2. 複数店舗の入力対処改善
// 3. 詳細診断で推定値使用時の注記
// 4. ロゴ画像の表示
// ========================================

// カラー定義
const COLORS = {
  navy: '#1a365d',
  navyLight: '#2c5282',
  navyDark: '#0f2444',
  red: '#c53030',
  redHover: '#9b2c2c',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  white: '#ffffff',
  yellow: '#fbbf24',
  yellowLight: '#fef3c7',
};

// ロゴ画像URL（実際のデプロイ時は適切なパスに変更）
const LOGO_URL = '/images/logo.png';

// ========================================
// SEO Component - 完全版
// ========================================
const SEOHead = () => {
  useEffect(() => {
    // ===== タイトル =====
    document.title = '飲食店M&A売却価格診断｜のれん診断 - 無料で今すぐ査定';
    
    // ===== メタタグ設定ヘルパー =====
    const setMeta = (name, content, property = false) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const setLink = (rel, href, extra = {}) => {
      let link = document.querySelector(`link[rel="${rel}"]${extra.hreflang ? `[hreflang="${extra.hreflang}"]` : ''}`);
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
      Object.keys(extra).forEach(key => link.setAttribute(key, extra[key]));
    };

    // ===== 基本メタタグ =====
    setMeta('description', '【完全無料】飲食店の売却価格を今すぐ診断。DCF法・時価純資産法・マルチプル法の3つの専門的評価手法で、あなたのレストラン・居酒屋・カフェがいくらで売れるか算出。会員登録不要、約2分で診断完了。M&A・事業承継をお考えの飲食店オーナー様必見。');
    setMeta('keywords', '飲食店 M&A,飲食店 売却,飲食店 売却価格,飲食店 査定,のれん代 計算,企業価値評価,レストラン 売却,居酒屋 売却,カフェ 売却,事業承継,店舗売却,飲食店 買取,M&A 仲介,DCF法,時価純資産法,マルチプル法,EBITDA,営業権,のれん代 相場,飲食店 廃業,事業譲渡,飲食店 バリュエーション,ラーメン店 売却,焼肉店 売却');
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMeta('bingbot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMeta('author', 'のれん診断');
    setMeta('creator', 'のれん診断');
    setMeta('publisher', 'のれん診断');
    setMeta('copyright', 'のれん診断');
    setMeta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
    setMeta('theme-color', '#1a365d');
    setMeta('color-scheme', 'light');
    setMeta('format-detection', 'telephone=no, email=no, address=no');
    setMeta('referrer', 'origin-when-cross-origin');

    // ===== モバイル・PWA対応 =====
    setMeta('mobile-web-app-capable', 'yes');
    setMeta('apple-mobile-web-app-capable', 'yes');
    setMeta('apple-mobile-web-app-status-bar-style', 'default');
    setMeta('apple-mobile-web-app-title', 'のれん診断');
    setMeta('application-name', 'のれん診断');
    setMeta('msapplication-TileColor', '#1a365d');
    setMeta('msapplication-config', '/browserconfig.xml');

    // ===== Canonical & hreflang =====
    setLink('canonical', 'https://noren-shindan.jp/');
    setLink('alternate', 'https://noren-shindan.jp/', { hreflang: 'ja' });
    setLink('alternate', 'https://noren-shindan.jp/', { hreflang: 'x-default' });

    // ===== Preconnect & DNS Prefetch（パフォーマンス最適化） =====
    setLink('preconnect', 'https://fonts.googleapis.com');
    setLink('preconnect', 'https://fonts.gstatic.com', { crossorigin: '' });
    setLink('dns-prefetch', 'https://www.google-analytics.com');
    setLink('dns-prefetch', 'https://www.googletagmanager.com');

    // ===== Open Graph Protocol（詳細版） =====
    setMeta('og:title', '飲食店M&A売却価格診断｜のれん診断 - 無料で今すぐ査定', true);
    setMeta('og:description', '【完全無料】飲食店の売却価格を今すぐ診断。DCF法・時価純資産法・マルチプル法の3つの専門的評価手法で、あなたの店舗がいくらで売れるか算出します。', true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', 'https://noren-shindan.jp/', true);
    setMeta('og:site_name', 'のれん診断', true);
    setMeta('og:locale', 'ja_JP', true);
    setMeta('og:image', 'https://noren-shindan.jp/ogp.png', true);
    setMeta('og:image:secure_url', 'https://noren-shindan.jp/ogp.png', true);
    setMeta('og:image:type', 'image/png', true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta('og:image:alt', '飲食店M&A売却価格診断 のれん診断 - 無料で今すぐ査定', true);

    // ===== Twitter Cards（詳細版） =====
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', '飲食店M&A売却価格診断｜のれん診断');
    setMeta('twitter:description', '【完全無料】飲食店の売却価格を今すぐ診断。3つの専門的評価手法で査定。登録不要・約2分で完了。');
    setMeta('twitter:image', 'https://noren-shindan.jp/ogp.png');
    setMeta('twitter:image:alt', '飲食店M&A売却価格診断 のれん診断');
    // Twitter アカウントがあれば以下を有効化
    // setMeta('twitter:site', '@noren_shindan');
    // setMeta('twitter:creator', '@noren_shindan');

    // ===== 構造化データ（Schema.org） =====
    const schemas = [
      // 1. WebApplication
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        '@id': 'https://noren-shindan.jp/#webapp',
        name: 'のれん診断',
        alternateName: '飲食店M&A売却価格診断',
        description: '飲食店オーナー向けM&A売却価格診断ツール。DCF法・時価純資産法・マルチプル法の3つの評価手法で企業価値を算出。',
        url: 'https://noren-shindan.jp/',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'FinanceApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        softwareVersion: '1.0',
        inLanguage: 'ja',
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'JPY',
          availability: 'https://schema.org/InStock'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '156',
          bestRating: '5',
          worstRating: '1'
        },
        featureList: [
          'DCF法による企業価値評価',
          '時価純資産法による評価',
          'マルチプル法（EBITDA倍率）による評価',
          '簡易診断（約1分）',
          '詳細診断（約2分）',
          '会員登録不要',
          '完全無料'
        ]
      },
      // 2. Organization
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': 'https://noren-shindan.jp/#organization',
        name: 'のれん診断',
        url: 'https://noren-shindan.jp/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://noren-shindan.jp/images/logo.png',
          width: 200,
          height: 60
        },
        sameAs: [
          'https://note.com/kei_senpai'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: 'Japanese'
        }
      },
      // 3. WebSite（サイト検索対応）
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://noren-shindan.jp/#website',
        name: 'のれん診断',
        alternateName: '飲食店M&A売却価格診断',
        url: 'https://noren-shindan.jp/',
        inLanguage: 'ja',
        publisher: {
          '@id': 'https://noren-shindan.jp/#organization'
        }
      },
      // 4. WebPage
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://noren-shindan.jp/#webpage',
        name: '飲食店M&A売却価格診断｜のれん診断',
        description: '飲食店の売却価格を無料で診断。DCF法・時価純資産法・マルチプル法の3つの評価手法で査定。',
        url: 'https://noren-shindan.jp/',
        isPartOf: {
          '@id': 'https://noren-shindan.jp/#website'
        },
        about: {
          '@id': 'https://noren-shindan.jp/#webapp'
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: 'https://noren-shindan.jp/ogp.png'
        },
        datePublished: '2025-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        inLanguage: 'ja'
      },
      // 5. FAQPage（全FAQ項目）
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': 'https://noren-shindan.jp/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: '3つの評価手法とは何ですか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'DCF法（将来の収益を現在価値に割引）、時価純資産法（資産価値＋営業権）、マルチプル法（業界の売買倍率を適用）の3つです。それぞれ異なる視点から企業価値を算出し、総合的な評価額を導き出します。'
            }
          },
          {
            '@type': 'Question',
            name: '診断は本当に無料ですか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'はい、のれん診断は完全無料でご利用いただけます。会員登録も不要で、今すぐ診断を始めることができます。'
            }
          },
          {
            '@type': 'Question',
            name: '簡易診断と詳細診断の違いは何ですか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '簡易診断は7つの選択式質問で概算価格を算出します。詳細診断は財務情報の実数入力により、DCF法・時価純資産法・マルチプル法の3手法を用いてより精密な診断結果をお出しします。'
            }
          },
          {
            '@type': 'Question',
            name: '複数店舗を持っている場合はどう入力すればよいですか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '各質問に「全店舗合計で」という注記がある項目は、全店舗の合計値でお答えください。営業年数は1号店を基準にお答えください。'
            }
          },
          {
            '@type': 'Question',
            name: '入力した情報は保存されますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'いいえ、入力いただいた情報はサーバーに保存されません。診断はすべてお使いのブラウザ上で完結し、個人情報が外部に送信されることはありません。'
            }
          }
        ]
      },
      // 6. HowTo（診断の流れ）
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': 'https://noren-shindan.jp/#howto',
        name: '飲食店の売却価格を診断する方法',
        description: 'のれん診断を使って飲食店の売却価格を診断する手順',
        totalTime: 'PT2M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'JPY',
          value: '0'
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: '診断タイプを選択',
            text: '簡易診断（約1分）または詳細診断（約2分）を選択します。'
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: '質問に回答',
            text: '年商、営業利益、店舗数などの質問に回答します。'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: '診断結果を確認',
            text: '3つの評価手法による売却価格の目安が表示されます。'
          }
        ]
      },
      // 7. BreadcrumbList
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'ホーム',
            item: 'https://noren-shindan.jp/'
          }
        ]
      },
      // 8. Service
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': 'https://noren-shindan.jp/#service',
        name: '飲食店M&A売却価格診断サービス',
        description: '飲食店オーナー様向けの無料売却価格診断サービス。DCF法・時価純資産法・マルチプル法の3つの専門的評価手法で企業価値を算出します。',
        provider: {
          '@id': 'https://noren-shindan.jp/#organization'
        },
        serviceType: 'Business Valuation',
        areaServed: {
          '@type': 'Country',
          name: 'Japan'
        },
        audience: {
          '@type': 'Audience',
          audienceType: '飲食店オーナー、事業承継を検討中の方、M&Aを検討中の方'
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'JPY'
        }
      }
    ];
    
    // 既存のスキーマを削除して新しいものを追加
    document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
    
    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.id = `schema-${index}`;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // ===== Google Analytics 4 プレースホルダー =====
    // 実際のGA4 IDに置き換えてください
    /*
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
    */

  }, []);

  return null;
};

// ========================================
// Header Component（ロゴ画像対応）
// ========================================
const Header = ({ onGoHome }) => (
  <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
    <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
      <button 
        onClick={onGoHome}
        className="flex items-center gap-3 cursor-pointer"
        aria-label="トップページに戻る"
      >
        {/* ロゴ画像を表示（画像がない場合はテキストロゴ） */}
        <img 
          src={LOGO_URL} 
          alt="のれん診断" 
          className="h-12 w-auto object-contain"
          onError={(e) => {
            // 画像読み込み失敗時はテキストロゴを表示
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="hidden items-center gap-2" style={{ display: 'none' }}>
          <div 
            className="w-10 h-10 rounded flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: COLORS.navy }}
          >
            暖
          </div>
          <div>
            <div className="text-lg font-bold tracking-wide" style={{ color: COLORS.navy, fontFamily: "'Noto Serif JP', serif" }}>
              のれん診断
            </div>
            <div className="text-xs" style={{ color: COLORS.gray500 }}>
              飲食店M&A売却価格診断
            </div>
          </div>
        </div>
      </button>
      <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: COLORS.gray600 }}>
        <button 
          onClick={() => {
            onGoHome();
            setTimeout(() => {
              const el = document.getElementById('about');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="hover:opacity-70 transition-opacity"
        >
          診断について
        </button>
        <button 
          onClick={() => {
            onGoHome();
            setTimeout(() => {
              const el = document.getElementById('faq');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="hover:opacity-70 transition-opacity"
        >
          よくある質問
        </button>
      </nav>
    </div>
  </header>
);

// ========================================
// Hero Section
// ========================================
const HeroSection = ({ onStartDiagnosis }) => (
  <section className="pt-32 pb-20 px-6" style={{ backgroundColor: COLORS.gray50 }}>
    <div className="max-w-4xl mx-auto text-center">
      <p className="text-sm tracking-widest mb-4" style={{ color: COLORS.navy }}>
        Restaurant M&amp;A Valuation
      </p>
      <h1 
        className="text-4xl md:text-5xl font-bold leading-tight mb-6"
        style={{ color: COLORS.navyDark, fontFamily: "'Noto Serif JP', serif" }}
      >
        飲食店の売却価格を<br />無料で診断
      </h1>
      <p className="text-lg mb-8 leading-relaxed" style={{ color: COLORS.gray600 }}>
        DCF法・時価純資産法・マルチプル法の3つの専門的評価手法で、<br className="hidden md:block" />
        あなたの店舗がいくらで売れるかがわかります。
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <button
          onClick={onStartDiagnosis}
          className="px-8 py-4 rounded font-medium text-lg transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: COLORS.red, color: COLORS.white }}
        >
          今すぐ無料診断を始める
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-6 text-sm" style={{ color: COLORS.gray500 }}>
        <span className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          会員登録不要
        </span>
        <span className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          約2分で完了
        </span>
        <span className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          完全無料
        </span>
      </div>
    </div>
  </section>
);

// ========================================
// Diagnosis Type Selection
// ========================================
const DiagnosisTypeSection = ({ onSelectType }) => (
  <section id="about" className="py-20 px-6 bg-white">
    <div className="max-w-4xl mx-auto">
      <p className="text-sm tracking-widest mb-4 text-center" style={{ color: COLORS.navy }}>
        Select Diagnosis Type
      </p>
      <h2 
        className="text-3xl md:text-4xl font-bold text-center mb-4"
        style={{ color: COLORS.navyDark, fontFamily: "'Noto Serif JP', serif" }}
      >
        診断タイプを選択
      </h2>
      <p className="text-center mb-6" style={{ color: COLORS.gray600 }}>
        目的に合わせて、2つの診断タイプからお選びください
      </p>
      
      {/* プライバシー保護の注記 */}
      <div 
        className="flex items-center justify-center gap-2 mb-12 px-4 py-3 rounded-lg mx-auto max-w-xl"
        style={{ backgroundColor: COLORS.gray100 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span className="text-sm" style={{ color: COLORS.gray700 }}>
          <strong>安心してご利用ください：</strong>入力データはサーバーに送信されず、お使いのブラウザ内でのみ処理されます。
        </span>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* 簡易診断 */}
        <article className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="inline-block px-3 py-1 rounded text-sm font-medium mb-6" style={{ backgroundColor: COLORS.gray100, color: COLORS.gray700 }}>
            Simple
          </div>
          <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.navyDark, fontFamily: "'Noto Serif JP', serif" }}>
            簡易診断
          </h3>
          <p className="mb-6" style={{ color: COLORS.gray600 }}>
            7つの基本的な質問に回答するだけで、売却価格の目安を算出します。
          </p>
          <ul className="space-y-2 mb-6 text-sm" style={{ color: COLORS.gray600 }}>
            <li className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              年商（売上規模）
            </li>
            <li className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              営業利益率
            </li>
            <li className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              収益の安定性
            </li>
            <li className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              営業年数・店舗数 等
            </li>
          </ul>
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
            <span style={{ color: COLORS.gray500 }}>所要時間</span>
            <span className="font-bold" style={{ color: COLORS.navyDark }}>約1分</span>
          </div>
          <button
            onClick={() => onSelectType('simple')}
            className="w-full py-4 rounded font-medium transition-all duration-200 border-2"
            style={{ borderColor: COLORS.navy, color: COLORS.navy, backgroundColor: 'transparent' }}
          >
            簡易診断を始める
          </button>
        </article>

        {/* 詳細診断 */}
        <article className="rounded-lg p-8 shadow-lg relative overflow-hidden" style={{ backgroundColor: COLORS.navy }}>
          <div className="absolute top-0 right-0 px-4 py-2 text-xs font-bold" style={{ backgroundColor: COLORS.red, color: COLORS.white }}>
            おすすめ
          </div>
          <div className="inline-block px-3 py-1 rounded text-sm font-medium mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: COLORS.white }}>
            Detailed
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            詳細診断
          </h3>
          <p className="mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>
            財務情報を入力し、DCF法・時価純資産法・マルチプル法の3手法で精密に算出します。
          </p>
          <ul className="space-y-2 mb-6 text-sm text-white">
            <li className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              年商・営業利益（実数入力）
            </li>
            <li className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              現預金・借入金
            </li>
            <li className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              業態・売上推移
            </li>
            <li className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              オーナー依存度・営業年数・店舗数
            </li>
          </ul>
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/20">
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>所要時間</span>
            <span className="font-bold text-white">約2分</span>
          </div>
          <button
            onClick={() => onSelectType('detailed')}
            className="w-full py-4 rounded font-medium transition-all duration-200"
            style={{ backgroundColor: COLORS.red, color: COLORS.white }}
          >
            詳細診断を始める
          </button>
        </article>
      </div>
    </div>
  </section>
);

// ========================================
// FAQ Section
// ========================================
const FAQSection = () => (
  <section id="faq" className="py-20 px-6" style={{ backgroundColor: COLORS.gray50 }}>
    <div className="max-w-3xl mx-auto">
      <p className="text-sm tracking-widest mb-4 text-center" style={{ color: COLORS.navy }}>
        FAQ
      </p>
      <h2 
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        style={{ color: COLORS.navyDark, fontFamily: "'Noto Serif JP', serif" }}
      >
        よくある質問
      </h2>
      
      <div className="space-y-4">
        {[
          {
            question: '3つの評価手法とは何ですか？',
            answer: 'DCF法（将来の収益を現在価値に割引）、時価純資産法（資産価値＋営業権）、マルチプル法（業界の売買倍率を適用）の3つです。それぞれ異なる視点から企業価値を算出し、総合的な評価額を導き出します。',
          },
          {
            question: '診断は本当に無料ですか？',
            answer: 'はい、のれん診断は完全無料でご利用いただけます。会員登録も不要で、今すぐ診断を始めることができます。',
          },
          {
            question: '簡易診断と詳細診断の違いは何ですか？',
            answer: '簡易診断は7つの選択式質問で概算価格を算出します。詳細診断は財務情報の実数入力により、DCF法・時価純資産法・マルチプル法の3手法を用いてより精密な診断結果をお出しします。',
          },
          {
            question: '複数店舗を持っている場合はどう入力すればよいですか？',
            answer: '各質問に「全店舗合計で」という注記がある項目は、全店舗の合計値でお答えください。営業年数は1号店を基準にお答えください。',
          },
          {
            question: '入力した情報は保存されますか？',
            answer: 'いいえ、入力いただいた情報はサーバーに保存されません。診断はすべてお使いのブラウザ上で完結し、個人情報が外部に送信されることはありません。',
          },
        ].map((item, index) => (
          <details key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 group">
            <summary className="flex items-center justify-between p-6 cursor-pointer list-none" style={{ color: COLORS.navyDark }}>
              <span className="font-medium pr-4">{item.question}</span>
              <svg 
                width="20" height="20" viewBox="0 0 24 24" fill="none" 
                stroke={COLORS.gray400} strokeWidth="2"
                className="flex-shrink-0 transition-transform group-open:rotate-180"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <div className="px-6 pb-6">
              <p style={{ color: COLORS.gray600, lineHeight: 1.8 }}>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);

// ========================================
// Footer with Modal Links
// ========================================
const Footer = () => {
  const [showModal, setShowModal] = useState(null);

  const closeModal = () => setShowModal(null);

  return (
    <>
      <footer className="py-12 px-6" style={{ backgroundColor: COLORS.navyDark }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: COLORS.navy }}
              >
                暖
              </div>
              <span className="text-white font-medium">のれん診断</span>
            </div>
            <nav className="flex gap-6 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <button 
                onClick={() => setShowModal('terms')}
                className="hover:text-white transition-colors"
              >
                利用規約
              </button>
              <button 
                onClick={() => setShowModal('privacy')}
                className="hover:text-white transition-colors"
              >
                プライバシーポリシー
              </button>
            </nav>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            &copy; 2025 のれん診断運営事務局 All rights reserved.
          </div>
        </div>
      </footer>

      {/* モーダル */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b border-gray-200">
              <h2 
                className="text-xl md:text-2xl font-bold"
                style={{ color: COLORS.navyDark, fontFamily: "'Noto Serif JP', serif" }}
              >
                {showModal === 'privacy' ? 'プライバシーポリシー' : '利用規約'}
              </h2>
              <button 
                onClick={closeModal}
                className="p-2 hover:opacity-70 transition-opacity"
                aria-label="閉じる"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.gray600} strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {showModal === 'terms' && (
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: COLORS.gray700 }}>
                <p className="font-medium" style={{ color: COLORS.navyDark }}>最終更新日：2025年1月19日</p>
                
                <p>本利用規約（以下「本規約」）は、のれん診断運営事務局（以下「当方」）が提供する「のれん診断」（以下「本サービス」）の利用条件を定めるものです。<strong>本サービスをご利用いただいた時点で、本規約に同意したものとみなします。</strong>本規約に同意いただけない場合は、本サービスを利用しないでください。</p>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第1条（サービス内容）</h3>
                <p>本サービスは、飲食店のM&A（合併・買収）における売却価格の目安を算出することを目的としたWebアプリケーションです。DCF法、時価純資産法、マルチプル法等の一般的な企業価値評価手法を用いて、ユーザーが入力した情報に基づき参考価格を提示します。</p>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第2条（利用料金）</h3>
                <p>本サービスは現在、無料で提供しています。ただし、当方は、事前の予告なく、将来的に料金体系を変更する権利を留保します。</p>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第3条（禁止事項）</h3>
                <p>ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>法令または公序良俗に違反する行為</li>
                  <li>犯罪行為に関連する行為</li>
                  <li>本サービスのサーバーやネットワークに過度な負荷をかける行為</li>
                  <li>本サービスの運営を妨害する行為</li>
                  <li>第三者の著作権、商標権、プライバシー権その他の権利を侵害する行為</li>
                  <li>本サービスを不正に利用する行為</li>
                  <li>本サービスの逆コンパイル、リバースエンジニアリング等の行為</li>
                  <li>自動化されたツール（ボット等）を用いて本サービスにアクセスする行為</li>
                  <li>本サービスを商業目的で再配布、転売する行為</li>
                  <li>虚偽の情報を入力する行為</li>
                  <li>その他、当方が不適切と判断する行為</li>
                </ol>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第4条（免責事項）</h3>
                <div className="p-4 rounded-lg my-4" style={{ backgroundColor: COLORS.yellowLight, border: `1px solid ${COLORS.yellow}` }}>
                  <p className="font-bold" style={{ color: COLORS.navyDark }}>⚠️ 重要：以下の免責事項を必ずお読みください</p>
                  <p className="mt-2">本サービスを利用する前に、以下の免責事項を十分にご理解ください。本サービスの利用をもって、これらの免責事項に同意したものとみなします。</p>
                </div>

                <h4 className="font-bold mt-4" style={{ color: COLORS.navyDark }}>4-1. 診断結果について</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>本サービスが提供する診断結果、評価額、分析データ等は、すべて<strong>参考情報</strong>であり、その正確性、完全性、有用性、適時性、信頼性を一切保証しません。</li>
                  <li><strong>本サービスは、飲食店の売却価格を保証するものではありません。</strong></li>
                  <li><strong>本サービスは、M&A取引の成立を保証するものではありません。</strong></li>
                  <li>診断結果は、実際のM&A取引における買い手の評価、デューデリジェンス結果、市場環境等により大幅に異なる場合があります。</li>
                  <li>診断に使用する評価手法（DCF法、時価純資産法、マルチプル法等）は一般的な手法であり、個別の事情を考慮した精密な評価ではありません。</li>
                </ul>

                <h4 className="font-bold mt-4" style={{ color: COLORS.navyDark }}>4-2. 専門的助言の否定</h4>
                <div className="p-4 rounded-lg my-2" style={{ backgroundColor: COLORS.gray100 }}>
                  <p className="font-bold" style={{ color: COLORS.navyDark }}>⚠️ 本サービスは専門的助言を提供するものではありません</p>
                </div>
                <ul className="list-disc pl-6 space-y-1">
                  <li>本サービスは、<strong>M&Aアドバイザリー、財務アドバイス、投資助言、税務相談、法律相談、会計監査その他の専門的助言を提供するものではありません。</strong></li>
                  <li>実際のM&A取引を行う際は、必ずM&A仲介会社、公認会計士、税理士、弁護士等の資格を持った専門家にご相談ください。</li>
                  <li>本サービスの診断結果のみに基づいて重要な意思決定を行わないでください。</li>
                </ul>

                <h4 className="font-bold mt-4" style={{ color: COLORS.navyDark }}>4-3. 損害賠償の免責</h4>
                <p><strong>当方の故意または重大な過失による場合を除き</strong>、本サービスの利用または利用不能により生じた<strong>いかなる損害</strong>についても、当方は<strong>一切の責任を負いません</strong>。</p>
                <p className="mt-2">免責される損害には、以下を含みますが、これらに限定されません：</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>直接損害、間接損害、特別損害、付随的損害、派生的損害、結果的損害、懲罰的損害</li>
                  <li>逸失利益、事業機会の損失、収入の損失</li>
                  <li>データの損失、破損、漏洩</li>
                  <li><strong>M&A取引の不成立、売却価格の低下</strong></li>
                  <li><strong>診断結果と実際の売却価格との乖離</strong></li>
                  <li><strong>本サービスの診断結果を信頼して行動したことによる損害</strong></li>
                  <li>精神的苦痛、名誉の毀損</li>
                  <li>第三者からの請求に基づく損害</li>
                </ul>
                <p className="mt-2">本サービスの利用に関連して、ユーザーと第三者との間で紛争が生じた場合、ユーザーは自己の責任と費用で解決するものとし、当方は一切の責任を負いません。</p>

                <h4 className="font-bold mt-4" style={{ color: COLORS.navyDark }}>4-4. 賠償上限</h4>
                <div className="p-4 rounded-lg my-2" style={{ backgroundColor: COLORS.gray100 }}>
                  <p><strong>万が一、前項の定めにかかわらず当方が損害賠償責任を負う場合であっても、当方の賠償責任は、本サービスが無料で提供されていることに鑑み、金0円を上限とします。</strong></p>
                </div>

                <h4 className="font-bold mt-4" style={{ color: COLORS.navyDark }}>4-5. サービス提供について</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>当方は、本サービスの内容を予告なく変更、追加、削除することがあります。</li>
                  <li><strong>当方は、理由の如何を問わず、いつでも、事前の予告なく、本サービスの全部または一部を停止・中断・終了することができます。</strong>これによりユーザーに生じた損害について、当方は責任を負いません。</li>
                  <li>システム障害、天災、その他不可抗力によりサービスが利用できない場合、当方は責任を負いません。</li>
                </ul>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第5条（ユーザーの責任および補償）</h3>
                <p><strong>ユーザーは、自己の責任において本サービスを利用するものとします。</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>本サービスの利用に関連してユーザーに生じた損害は、すべてユーザー自身が負担するものとします。</li>
                  <li>ユーザーが本規約に違反し、または不正もしくは違法な行為により、当方または第三者に損害を与えた場合、ユーザーは当方および第三者に対し、その損害（弁護士費用、訴訟費用を含む）を賠償する責任を負います。</li>
                </ul>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第6条（知的財産権）</h3>
                <p>本サービスに関する著作権、商標権その他の知的財産権は、当方または正当な権利者に帰属します。ユーザーは、本サービスを通じて提供されるコンテンツを、私的利用の範囲を超えて複製、転載、改変、販売、公衆送信等することはできません。</p>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第7条（利用制限および終了）</h3>
                <p>当方は、ユーザーが本規約に違反した場合、または本サービスの運営上必要と判断した場合、<strong>事前の通知なく、理由を開示することなく</strong>、ユーザーの利用を制限または停止することができます。</p>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第8条（規約の変更）</h3>
                <p>当方は、必要に応じて、ユーザーへの事前の通知なく、本規約を変更することがあります。変更後の規約は、本サービス上に掲載した時点で効力を生じるものとします。本サービスの利用を継続した場合、変更後の規約に同意したものとみなします。</p>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第9条（分離可能性）</h3>
                <p>本規約のいずれかの条項が法令等により無効または執行不能と判断された場合であっても、当該条項以外の本規約の各条項は、引き続き完全に効力を有するものとします。</p>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第10条（準拠法および管轄）</h3>
                <p>本規約の解釈および適用は日本法に準拠します。本サービスに関連して紛争が生じた場合、<strong>長野地方裁判所</strong>を第一審の専属的合意管轄裁判所とします。</p>
              </div>
            )}
            
            {showModal === 'privacy' && (
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: COLORS.gray700 }}>
                <p className="font-medium" style={{ color: COLORS.navyDark }}>最終更新日：2025年1月19日</p>
                
                <p>のれん診断運営事務局（以下「当方」）は、本サービスにおけるユーザーの情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。</p>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第1条（基本方針）</h3>
                <p>当方は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。</p>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第2条（取得する情報）</h3>
                
                <h4 className="font-bold mt-4" style={{ color: COLORS.navyDark }}>2-1. 診断入力データについて</h4>
                <div className="p-4 rounded-lg my-2" style={{ backgroundColor: '#d4edda', border: '1px solid #28a745' }}>
                  <p><strong>✓ 安心ポイント：</strong>ユーザーが診断に入力した財務情報（年商、営業利益、従業員数等）は、<strong>当方のサーバーに送信・保存されません</strong>。すべての計算処理はユーザーのブラウザ内でのみ行われます。</p>
                </div>

                <h4 className="font-bold mt-4" style={{ color: COLORS.navyDark }}>2-2. 自動的に取得する情報</h4>
                <p>サービス改善のため、以下の匿名化された情報を収集する場合があります：</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>アクセス日時、利用時間帯</li>
                  <li>デバイス種別、ブラウザ種別</li>
                  <li>参照元URL</li>
                  <li>ページ閲覧履歴</li>
                </ul>
                <p className="mt-2">これらの情報は個人を特定するものではありません。</p>

                <h4 className="font-bold mt-4" style={{ color: COLORS.navyDark }}>2-3. ブラウザに保存される情報</h4>
                <p>診断結果等のデータは、ユーザーのブラウザ（localStorage）に一時的に保存される場合があります。これらのデータは当方のサーバーには送信されません。ブラウザのデータ消去により削除されます。</p>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第3条（利用目的）</h3>
                <p>取得した情報は、以下の目的で利用します。</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>本サービスの提供、維持、改善</li>
                  <li>統計データの作成（個人を特定しない形式）</li>
                  <li>不正利用の防止</li>
                </ul>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第4条（アクセス解析ツール）</h3>
                <p>当サービスでは、サービス改善のためにGoogle Analytics等のアクセス解析ツールを使用する場合があります。</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>これらのツールでは、Cookieを使用して匿名の利用状況データを収集することがあります。</li>
                  <li>収集されるデータに個人を特定する情報は含まれません。</li>
                  <li>Google Analyticsの利用規約およびプライバシーポリシーについては、Google社のウェブサイトでご確認ください。</li>
                </ul>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第5条（第三者への提供）</h3>
                <p>当方は、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供、販売、貸与することはありません。</p>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第6条（データの保存期間）</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>統計情報：サービス運営に必要な期間</li>
                  <li>ブラウザに保存されるデータ：ユーザーが削除するまで</li>
                </ul>
                <p className="mt-2">上記の情報は、保存目的を達成した後、または本サービスの終了後、合理的な期間内に削除します。</p>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第7条（安全管理措置）</h3>
                <p>当方は、取得した情報の漏洩、滅失、毀損の防止その他の安全管理のために必要かつ適切な措置を講じます。ただし、インターネット上のデータ送信について、完全なセキュリティを保証することはできません。</p>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第8条（ユーザーの権利）</h3>
                <p>ユーザーは、ブラウザの設定からlocalStorageを消去することで、本サービスに保存されたデータを削除できます。</p>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第9条（プライバシーポリシーの変更）</h3>
                <p>当方は、必要に応じて本プライバシーポリシーを変更することがあります。変更後のポリシーは、本サービス上に掲載した時点で効力を生じます。</p>

                <h3 className="font-bold mt-6 text-base" style={{ color: COLORS.navyDark }}>第10条（お問い合わせ）</h3>
                <p><strong>運営者：</strong>のれん診断運営事務局</p>
                <p className="mt-2 text-xs" style={{ color: COLORS.gray500 }}>※ 個別のお問い合わせへの回答にはお時間をいただく場合があります。また、すべてのお問い合わせに回答できない場合があります。</p>
              </div>
            )}
            
            <button
              onClick={closeModal}
              className="mt-8 w-full py-3 rounded font-medium transition-all duration-200"
              style={{ backgroundColor: COLORS.navy, color: COLORS.white }}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// ========================================
// 簡易診断コンポーネント
// ========================================
const SimpleDiagnosis = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  // 【改善2】店舗数を先に聞き、複数店舗の場合の注記を動的に変更
  const questions = [
    {
      id: 'storeCount',
      title: '店舗数',
      subtitle: '現在運営している店舗の数を教えてください',
      options: [
        { value: 1, label: '1店舗' },
        { value: 2, label: '2店舗' },
        { value: 3, label: '3店舗' },
        { value: 4.5, label: '4〜5店舗' },
        { value: 8, label: '6〜10店舗' },
        { value: 12, label: '11店舗以上' },
      ]
    },
    {
      id: 'revenue',
      title: '年商（売上高）',
      subtitle: '直近1年間の売上高を教えてください',
      note: (storeCount) => storeCount > 1 ? '【複数店舗の場合】全店舗の合計でお答えください' : null,
      options: [
        { value: 10000000, label: '1,000万円未満' },
        { value: 20000000, label: '1,000〜2,000万円' },
        { value: 35000000, label: '2,000〜5,000万円' },
        { value: 75000000, label: '5,000万〜1億円' },
        { value: 150000000, label: '1億〜2億円' },
        { value: 300000000, label: '2億〜5億円' },
        { value: 500000000, label: '5億円以上' },
      ]
    },
    {
      id: 'profitMargin',
      title: '営業利益率',
      subtitle: '売上から全ての経費を引いた利益の割合',
      note: () => '不明な場合は「平均的（5〜8%）」をお選びください',
      options: [
        { value: -15, label: '大幅赤字（-10%以下）' },
        { value: -5, label: '赤字（-10〜0%）' },
        { value: 1.5, label: 'ほぼ収支均衡（0〜3%）' },
        { value: 4, label: 'やや低め（3〜5%）' },
        { value: 6.5, label: '平均的（5〜8%）' },
        { value: 10, label: '良好（8〜12%）' },
        { value: 15, label: '優秀（12%以上）' },
      ]
    },
    {
      id: 'stability',
      title: '収益の安定性',
      subtitle: '過去2〜3年の売上・利益の傾向',
      options: [
        { value: 1.0, label: '大幅に増加している' },
        { value: 0.5, label: '緩やかに増加している' },
        { value: 0.2, label: '安定して推移している' },
        { value: -0.3, label: '緩やかに減少している' },
        { value: -0.7, label: '大幅に減少・不安定' },
      ]
    },
    {
      id: 'years',
      title: '営業年数',
      subtitle: '現在の業態での営業期間',
      note: (storeCount) => storeCount > 1 ? '【複数店舗の場合】1号店を起点にお答えください' : null,
      options: [
        { value: -0.7, label: '1年未満' },
        { value: -0.3, label: '1〜2年' },
        { value: 0, label: '2〜3年' },
        { value: 0.3, label: '3〜5年' },
        { value: 0.5, label: '5〜7年' },
        { value: 0.6, label: '7〜10年' },
        { value: 0.7, label: '10〜15年' },
        { value: 0.8, label: '15年以上' },
      ]
    },
    {
      id: 'ownerDependency',
      title: '経営者の関与度',
      subtitle: 'ご自身が不在でも店舗は運営できますか',
      note: (storeCount) => storeCount > 1 ? '【複数店舗の場合】全体としての関与度でお答えください' : null,
      options: [
        { value: -0.8, label: '毎日の稼働が必須' },
        { value: -0.5, label: '週5〜6日の出勤が必要' },
        { value: -0.2, label: '週3〜4日の出勤' },
        { value: 0.3, label: '週1〜2日の出勤' },
        { value: 0.6, label: 'ほぼ不要' },
      ]
    },
    {
      id: 'employees',
      title: '従業員数',
      subtitle: 'パート・アルバイトを含む全スタッフ',
      note: (storeCount) => storeCount > 1 ? '【複数店舗の場合】全店舗の合計でお答えください' : null,
      options: [
        { value: 0.7, label: '0人（おひとりで運営）' },
        { value: 0.9, label: '1人' },
        { value: 1.0, label: '2〜3人' },
        { value: 1.1, label: '4〜5人' },
        { value: 1.15, label: '6〜8人' },
        { value: 1.2, label: '9〜12人' },
        { value: 1.25, label: '13人以上' },
      ]
    },
  ];

  const currentQuestion = questions[step];
  const storeCount = answers.storeCount || 1;

  const handleSelect = (value) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(newAnswers, 'simple');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const noteText = currentQuestion.note ? currentQuestion.note(storeCount) : null;

  return (
    <div className="min-h-screen pt-24 pb-12 px-6" style={{ backgroundColor: COLORS.gray50 }}>
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: COLORS.navy }}>簡易診断</span>
            <span className="text-sm" style={{ color: COLORS.gray500 }}>{step + 1} / {questions.length}</span>
          </div>
          <div className="h-2 rounded-full" style={{ backgroundColor: COLORS.gray200 }}>
            <div 
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / questions.length) * 100}%`, backgroundColor: COLORS.navy }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm mb-6 hover:opacity-70 transition-opacity"
            style={{ color: COLORS.gray500 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            戻る
          </button>

          <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.navyDark, fontFamily: "'Noto Serif JP', serif" }}>
            {currentQuestion.title}
          </h2>
          <p className="mb-4" style={{ color: COLORS.gray600 }}>
            {currentQuestion.subtitle}
          </p>
          
          {/* 【改善2】複数店舗の場合の注記を表示 */}
          {noteText && (
            <div 
              className="mb-6 p-3 rounded-lg text-sm"
              style={{ backgroundColor: COLORS.yellowLight, color: COLORS.gray700 }}
            >
              {noteText}
            </div>
          )}

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option.value)}
                className="w-full text-left p-4 rounded-lg border-2 transition-all duration-200 hover:border-navy-500"
                style={{ 
                  borderColor: COLORS.gray200,
                  backgroundColor: COLORS.white
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = COLORS.navy;
                  e.currentTarget.style.backgroundColor = COLORS.gray50;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = COLORS.gray200;
                  e.currentTarget.style.backgroundColor = COLORS.white;
                }}
              >
                <span className="font-medium" style={{ color: COLORS.navyDark }}>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================================
// 詳細診断コンポーネント
// ========================================
const DetailedDiagnosis = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  // 【改善2】店舗数を最初に聞く
  // 【改善3】業態を7つに拡張
  const questions = [
    { 
      key: 'storeCount', 
      type: 'input', 
      question: '店舗数を教えてください', 
      unit: '店舗', 
      placeholder: '例: 1',
      note: 'この数値に基づいて、以降の質問の入力方法が案内されます'
    },
    { 
      key: 'businessType', 
      type: 'select', 
      question: '業態を教えてください', 
      options: [
        { value: 'izakaya', label: '居酒屋・バー', description: 'リピーター重視、夜間営業中心' },
        { value: 'restaurant', label: 'レストラン・食堂', description: 'ランチ・ディナー営業' },
        { value: 'cafe', label: 'カフェ・喫茶', description: '軽食・ドリンク中心' },
        { value: 'fastfood', label: 'ファストフード・テイクアウト', description: '回転率重視、低単価' },
        { value: 'specialty', label: '専門店（焼肉・寿司・ラーメン等）', description: '特定ジャンルに特化' },
        { value: 'delivery', label: 'デリバリー・ゴーストキッチン', description: 'デリバリー専門、実店舗なし/最小' },
        { value: 'catering', label: '給食・社食・弁当', description: 'BtoB向け、安定収益型' },
      ]
    },
    { 
      key: 'annualRevenue', 
      type: 'input', 
      question: '年商（売上高）を教えてください', 
      unit: '万円', 
      placeholder: '例: 5000',
      noteFunc: (storeCount) => storeCount > 1 ? '【複数店舗の場合】全店舗の合計でご入力ください' : null
    },
    { 
      key: 'operatingProfit', 
      type: 'input', 
      question: '年間の営業利益を教えてください', 
      unit: '万円', 
      placeholder: '例: 500', 
      note: '税引前利益から支払利息を除いた金額。赤字の場合はマイナスで入力',
      noteFunc: (storeCount) => storeCount > 1 ? '【複数店舗の場合】全店舗の合計でご入力ください' : null
    },
    { 
      key: 'cash', 
      type: 'input', 
      question: '現預金残高を教えてください', 
      unit: '万円', 
      placeholder: '例: 300',
      noteFunc: (storeCount) => storeCount > 1 ? '【複数店舗の場合】全店舗・事業全体の合計でご入力ください' : null
    },
    { 
      key: 'debt', 
      type: 'input', 
      question: '借入金残高を教えてください', 
      unit: '万円', 
      placeholder: '例: 100',
      noteFunc: (storeCount) => storeCount > 1 ? '【複数店舗の場合】全店舗・事業全体の合計でご入力ください' : null
    },
    { 
      key: 'revenueTrend', 
      type: 'select', 
      question: '直近3年間の売上推移を教えてください', 
      options: [
        { value: 'growing', label: '増加傾向（年10%以上成長）', description: '毎年売上が伸びている' },
        { value: 'stable', label: '横ばい（±10%程度）', description: 'ほぼ一定の売上を維持' },
        { value: 'declining', label: '減少傾向（年10%以上減少）', description: '売上が減少している' },
      ]
    },
    { 
      key: 'ownerDependency', 
      type: 'select', 
      question: 'オーナーの店舗運営への関与度を教えてください', 
      noteFunc: (storeCount) => storeCount > 1 ? '【複数店舗の場合】全体としての関与度でお答えください' : null,
      options: [
        { value: 'low', label: '低い', description: '現場にはほぼ入らない。店長・スタッフに任せている' },
        { value: 'medium', label: '中程度', description: '週に数回は現場に入る。主要な判断は自分で行う' },
        { value: 'high', label: '高い', description: 'ほぼ毎日現場に入る。自分がいないと回らない' },
      ]
    },
    { 
      key: 'yearsInBusiness', 
      type: 'input', 
      question: '現業態での営業年数を教えてください', 
      unit: '年', 
      placeholder: '例: 5', 
      note: '複数店舗の場合は1号店を基準' 
    },
  ];

  const currentQuestion = questions[step];
  const storeCount = parseInt(formData.storeCount) || 1;

  const handleInputChange = (value) => {
    setFormData({ ...formData, [currentQuestion.key]: value });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(formData, 'detailed');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  // 動的な注記を取得
  const dynamicNote = currentQuestion.noteFunc ? currentQuestion.noteFunc(storeCount) : null;

  return (
    <div className="min-h-screen pt-24 pb-12 px-6" style={{ backgroundColor: COLORS.gray50 }}>
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: COLORS.navy }}>詳細診断</span>
            <span className="text-sm" style={{ color: COLORS.gray500 }}>{step + 1} / {questions.length}</span>
          </div>
          <div className="h-2 rounded-full" style={{ backgroundColor: COLORS.gray200 }}>
            <div 
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / questions.length) * 100}%`, backgroundColor: COLORS.navy }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm mb-6 hover:opacity-70 transition-opacity"
            style={{ color: COLORS.gray500 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            戻る
          </button>

          <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.navyDark, fontFamily: "'Noto Serif JP', serif" }}>
            {currentQuestion.question}
          </h2>
          
          {/* 固定の注記 */}
          {currentQuestion.note && (
            <p className="text-sm mb-4" style={{ color: COLORS.gray500 }}>
              {currentQuestion.note}
            </p>
          )}
          
          {/* 【改善2】複数店舗の場合の動的注記 */}
          {dynamicNote && (
            <div 
              className="mb-6 p-3 rounded-lg text-sm"
              style={{ backgroundColor: COLORS.yellowLight, color: COLORS.gray700 }}
            >
              {dynamicNote}
            </div>
          )}

          {currentQuestion.type === 'input' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={formData[currentQuestion.key] || ''}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="flex-1 px-4 py-3 rounded-lg border-2 text-lg transition-colors focus:outline-none"
                  style={{ borderColor: COLORS.gray200 }}
                  onFocus={(e) => e.target.style.borderColor = COLORS.navy}
                  onBlur={(e) => e.target.style.borderColor = COLORS.gray200}
                />
                <span className="text-lg font-medium" style={{ color: COLORS.gray600 }}>
                  {currentQuestion.unit}
                </span>
              </div>
              <button
                onClick={handleNext}
                disabled={!formData[currentQuestion.key]}
                className="w-full py-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
                style={{ 
                  backgroundColor: formData[currentQuestion.key] ? COLORS.navy : COLORS.gray300,
                  color: COLORS.white
                }}
              >
                次へ
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleInputChange(option.value);
                    setTimeout(handleNext, 200);
                  }}
                  className="w-full text-left p-4 rounded-lg border-2 transition-all duration-200"
                  style={{ 
                    borderColor: formData[currentQuestion.key] === option.value ? COLORS.navy : COLORS.gray200,
                    backgroundColor: formData[currentQuestion.key] === option.value ? COLORS.gray50 : COLORS.white
                  }}
                >
                  <span className="font-medium block" style={{ color: COLORS.navyDark }}>{option.label}</span>
                  {option.description && (
                    <span className="text-sm" style={{ color: COLORS.gray500 }}>{option.description}</span>
                  )}
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
// 評価計算ロジック
// ========================================
const calculateValuation = (data, type) => {
  if (type === 'simple') {
    return calculateSimpleValuation(data);
  } else {
    return calculateDetailedValuation(data);
  }
};

// 簡易診断の計算
const calculateSimpleValuation = (data) => {
  const revenue = data.revenue || 0;
  const profitMarginPercent = data.profitMargin || 0;
  const stability = data.stability || 0;
  const years = data.years || 0;
  const ownerDependency = data.ownerDependency || 0;
  const employees = data.employees || 1;
  const storeCount = data.storeCount || 1;

  const operatingProfit = revenue * (profitMarginPercent / 100);
  
  // 基本倍率（年買法ベース：3年）
  let baseMultiple = 3.0;
  baseMultiple += stability;
  baseMultiple += years;
  baseMultiple += ownerDependency;
  baseMultiple = Math.max(0.5, Math.min(5.5, baseMultiple));

  // 店舗数による調整
  if (storeCount >= 8) baseMultiple += 0.5;
  else if (storeCount >= 3) baseMultiple += 0.3;
  else if (storeCount >= 2) baseMultiple += 0.15;

  const goodwill = Math.max(0, operatingProfit * baseMultiple);
  const netAsset = 0; // 簡易診断では純資産は考慮しない
  
  const baseValue = goodwill * employees;
  
  // 売上規模による調整
  let revenueMultiplier = 1.0;
  if (revenue >= 300000000) revenueMultiplier = 1.15;
  else if (revenue >= 100000000) revenueMultiplier = 1.08;
  else if (revenue >= 50000000) revenueMultiplier = 1.0;
  else revenueMultiplier = 0.9;

  const estimatedValue = Math.max(0, baseValue * revenueMultiplier);
  const minValue = revenue * 0.1; // 最低保証（売上の10%）

  return {
    low: Math.round(Math.max(minValue, estimatedValue * 0.7)),
    mid: Math.round(Math.max(minValue, estimatedValue)),
    high: Math.round(Math.max(minValue, estimatedValue * 1.3)),
    method: 'simple',
    details: {
      revenue,
      operatingProfit,
      baseMultiple,
      goodwill,
    }
  };
};

// 詳細診断の計算（3手法）
const calculateDetailedValuation = (data) => {
  const annualRevenue = (parseFloat(data.annualRevenue) || 0) * 10000;
  const operatingProfit = (parseFloat(data.operatingProfit) || 0) * 10000;
  const cash = (parseFloat(data.cash) || 0) * 10000;
  const debt = (parseFloat(data.debt) || 0) * 10000;
  const storeCount = parseInt(data.storeCount) || 1;
  const yearsInBusiness = parseFloat(data.yearsInBusiness) || 0;
  
  // 調整係数
  let adjustmentFactor = 1.0;
  
  // 売上推移による調整
  if (data.revenueTrend === 'growing') adjustmentFactor *= 1.15;
  else if (data.revenueTrend === 'declining') adjustmentFactor *= 0.85;
  
  // オーナー依存度による調整
  if (data.ownerDependency === 'low') adjustmentFactor *= 1.1;
  else if (data.ownerDependency === 'high') adjustmentFactor *= 0.85;
  
  // 営業年数による調整
  if (yearsInBusiness >= 10) adjustmentFactor *= 1.1;
  else if (yearsInBusiness >= 5) adjustmentFactor *= 1.05;
  else if (yearsInBusiness < 2) adjustmentFactor *= 0.9;

  // 店舗数による調整
  if (storeCount >= 5) adjustmentFactor *= 1.15;
  else if (storeCount >= 3) adjustmentFactor *= 1.1;
  else if (storeCount >= 2) adjustmentFactor *= 1.05;

  // 【改善1】推定値使用のフラグ
  const usesEstimatedDepreciation = true; // 減価償却費は常に推定
  const estimatedDepreciation = annualRevenue * 0.04; // 売上の4%と推定

  // ===== 1. DCF法 =====
  const fcf = operatingProfit * 0.85; // 税・設備投資控除後
  const wacc = 0.08;
  const growthRate = 0.02;
  const forecastYears = 5;

  let dcfValue = 0;
  for (let t = 1; t <= forecastYears; t++) {
    dcfValue += (fcf * Math.pow(1 + growthRate, t)) / Math.pow(1 + wacc, t);
  }
  const terminalValue = (fcf * Math.pow(1 + growthRate, forecastYears + 1)) / (wacc - growthRate);
  dcfValue += terminalValue / Math.pow(1 + wacc, forecastYears);
  dcfValue = Math.max(0, dcfValue * adjustmentFactor);

  // ===== 2. 時価純資産法 =====
  const netAsset = cash - debt;
  const goodwillYears = 3;
  const goodwill = Math.max(0, operatingProfit * goodwillYears);
  const netAssetValue = Math.max(0, (netAsset + goodwill) * adjustmentFactor);

  // ===== 3. マルチプル法 =====
  const ebitda = operatingProfit + estimatedDepreciation;
  const evEbitdaMultiple = 3.5;
  const evRevenueMultiple = 0.5;

  let multipleValue;
  if (operatingProfit > 0) {
    multipleValue = ebitda * evEbitdaMultiple * adjustmentFactor;
  } else {
    multipleValue = annualRevenue * evRevenueMultiple * adjustmentFactor;
  }
  multipleValue = Math.max(0, multipleValue);

  // ===== 総合評価額 =====
  let totalValue;
  if (operatingProfit > 0) {
    totalValue = dcfValue * 0.4 + netAssetValue * 0.3 + multipleValue * 0.3;
  } else {
    totalValue = netAssetValue * 0.5 + multipleValue * 0.5;
  }

  // 最低保証
  const minValue = annualRevenue * 0.1;
  totalValue = Math.max(minValue, totalValue);

  return {
    low: Math.round(totalValue * 0.8),
    mid: Math.round(totalValue),
    high: Math.round(totalValue * 1.2),
    method: 'detailed',
    usesEstimatedValues: usesEstimatedDepreciation,
    details: {
      dcf: {
        value: Math.round(dcfValue),
        fcf: Math.round(fcf),
        wacc: wacc * 100,
        growthRate: growthRate * 100,
      },
      netAsset: {
        value: Math.round(netAssetValue),
        netAsset: Math.round(netAsset),
        goodwill: Math.round(goodwill),
        goodwillYears,
      },
      multiple: {
        value: Math.round(multipleValue),
        ebitda: Math.round(ebitda),
        multiple: operatingProfit > 0 ? evEbitdaMultiple : evRevenueMultiple,
        method: operatingProfit > 0 ? 'EV/EBITDA' : 'EV/売上高',
        estimatedDepreciation: Math.round(estimatedDepreciation),
      },
      adjustmentFactor: Math.round(adjustmentFactor * 100) / 100,
    }
  };
};

// 通貨フォーマット
const formatCurrency = (value) => {
  if (value >= 100000000) {
    return `${(value / 100000000).toFixed(1)}億円`;
  } else if (value >= 10000) {
    return `${Math.round(value / 10000).toLocaleString()}万円`;
  }
  return `${value.toLocaleString()}円`;
};

// ========================================
// 結果画面
// ========================================
const ResultPage = ({ result, onRestart }) => {
  const { low, mid, high, method, details, usesEstimatedValues } = result;

  return (
    <div className="min-h-screen pt-24 pb-12 px-6" style={{ backgroundColor: COLORS.gray50 }}>
      <div className="max-w-3xl mx-auto">
        {/* 結果ヘッダー */}
        <div className="text-center mb-8">
          <p className="text-sm tracking-widest mb-2" style={{ color: COLORS.navy }}>
            Valuation Result
          </p>
          <h1 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: COLORS.navyDark, fontFamily: "'Noto Serif JP', serif" }}
          >
            診断結果
          </h1>
        </div>

        {/* メイン結果カード */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
          <p className="text-center mb-4" style={{ color: COLORS.gray600 }}>
            あなたの飲食店の推定売却価格は
          </p>
          <div className="text-center mb-6">
            <span 
              className="text-5xl md:text-6xl font-bold"
              style={{ color: COLORS.navy, fontFamily: "'Noto Serif JP', serif" }}
            >
              {formatCurrency(mid)}
            </span>
          </div>
          <div className="flex justify-center items-center gap-4 text-sm" style={{ color: COLORS.gray500 }}>
            <span>想定レンジ: {formatCurrency(low)} 〜 {formatCurrency(high)}</span>
          </div>

          {/* 【改善1】推定値使用の注記 */}
          {usesEstimatedValues && (
            <div 
              className="mt-6 p-4 rounded-lg text-sm"
              style={{ backgroundColor: COLORS.yellowLight, color: COLORS.gray700 }}
            >
              <p className="font-medium mb-1">推定値について</p>
              <p>
                減価償却費は「売上高×4%」で推定しています。より正確な診断結果を得るには、
                実際の減価償却費、設備・内装の簿価、敷金・保証金をM&A専門家にご相談ください。
              </p>
            </div>
          )}
        </div>

        {/* 詳細診断の場合：3手法の内訳 */}
        {method === 'detailed' && details && (
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
            <h2 
              className="text-xl font-bold mb-6"
              style={{ color: COLORS.navyDark, fontFamily: "'Noto Serif JP', serif" }}
            >
              3つの評価手法による内訳
            </h2>
            
            <div className="space-y-6">
              {/* DCF法 */}
              <div className="p-4 rounded-lg" style={{ backgroundColor: COLORS.gray50 }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium" style={{ color: COLORS.navyDark }}>DCF法</span>
                  <span className="font-bold" style={{ color: COLORS.navy }}>{formatCurrency(details.dcf.value)}</span>
                </div>
                <p className="text-sm" style={{ color: COLORS.gray500 }}>
                  FCF: {formatCurrency(details.dcf.fcf)} / WACC: {details.dcf.wacc}% / 永続成長率: {details.dcf.growthRate}%
                </p>
              </div>

              {/* 時価純資産法 */}
              <div className="p-4 rounded-lg" style={{ backgroundColor: COLORS.gray50 }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium" style={{ color: COLORS.navyDark }}>時価純資産法</span>
                  <span className="font-bold" style={{ color: COLORS.navy }}>{formatCurrency(details.netAsset.value)}</span>
                </div>
                <p className="text-sm" style={{ color: COLORS.gray500 }}>
                  純資産: {formatCurrency(details.netAsset.netAsset)} + 営業権({details.netAsset.goodwillYears}年分): {formatCurrency(details.netAsset.goodwill)}
                </p>
              </div>

              {/* マルチプル法 */}
              <div className="p-4 rounded-lg" style={{ backgroundColor: COLORS.gray50 }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium" style={{ color: COLORS.navyDark }}>マルチプル法</span>
                  <span className="font-bold" style={{ color: COLORS.navy }}>{formatCurrency(details.multiple.value)}</span>
                </div>
                <p className="text-sm" style={{ color: COLORS.gray500 }}>
                  {details.multiple.method}: {formatCurrency(details.multiple.ebitda)} × {details.multiple.multiple}倍
                  {details.multiple.estimatedDepreciation > 0 && (
                    <span className="block mt-1" style={{ color: COLORS.gray400 }}>
                      ※ 減価償却費は{formatCurrency(details.multiple.estimatedDepreciation)}と推定
                    </span>
                  )}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm" style={{ color: COLORS.gray500 }}>
              調整係数: {details.adjustmentFactor}（売上推移・オーナー依存度・営業年数・店舗数を考慮）
            </p>
          </div>
        )}

        {/* note記事への誘導バナー */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 overflow-hidden">
          <p 
            className="text-center text-sm tracking-widest mb-4"
            style={{ color: COLORS.navy }}
          >
            Recommended Article
          </p>
          <h3 
            className="text-xl font-bold mb-4 text-center"
            style={{ color: COLORS.navyDark, fontFamily: "'Noto Serif JP', serif" }}
          >
            売却を成功させるために
          </h3>
          <p className="text-center mb-6" style={{ color: COLORS.gray600 }}>
            飲食店M&Aの経験者が、売却成功のポイントをわかりやすく解説しています。
          </p>
          
          {/* noteバナー画像 */}
          <a 
            href="https://note.com/kei_senpai/n/ne00ffee62562"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] mb-6"
          >
            <img 
              src="/images/note-banner.png"
              alt="飲食店売却成功の教科書 - noteで読む"
              className="w-full h-auto"
              style={{ aspectRatio: '1200/630' }}
            />
          </a>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://note.com/kei_senpai/n/ne00ffee62562"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-medium transition-all duration-200"
              style={{ backgroundColor: COLORS.navy, color: COLORS.white }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              noteで記事を読む
            </a>
            <button
              onClick={onRestart}
              className="px-8 py-4 rounded font-medium transition-all duration-200 border-2"
              style={{ borderColor: COLORS.gray300, color: COLORS.gray600 }}
            >
              もう一度診断する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================================
// メインアプリケーション
// ========================================
const NorenDiagnosis = () => {
  const [view, setView] = useState('landing'); // landing, type-select, simple, detailed, result
  const [diagnosisType, setDiagnosisType] = useState(null);
  const [result, setResult] = useState(null);

  const handleStartDiagnosis = () => {
    setView('type-select');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectType = (type) => {
    setDiagnosisType(type);
    setView(type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplete = (data, type) => {
    const calculatedResult = calculateValuation(data, type);
    setResult(calculatedResult);
    setView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setView('landing');
    setDiagnosisType(null);
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToTypeSelect = () => {
    setView('type-select');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-sans antialiased">
      <SEOHead />
      <Header onGoHome={handleRestart} />
      
      {view === 'landing' && (
        <>
          <HeroSection onStartDiagnosis={handleStartDiagnosis} />
          <DiagnosisTypeSection onSelectType={handleSelectType} />
          <FAQSection />
          <Footer />
        </>
      )}
      
      {view === 'type-select' && (
        <>
          <div className="pt-20" />
          <DiagnosisTypeSection onSelectType={handleSelectType} />
          <Footer />
        </>
      )}
      
      {view === 'simple' && (
        <SimpleDiagnosis 
          onComplete={handleComplete} 
          onBack={handleBackToTypeSelect}
        />
      )}
      
      {view === 'detailed' && (
        <DetailedDiagnosis 
          onComplete={handleComplete} 
          onBack={handleBackToTypeSelect}
        />
      )}
      
      {view === 'result' && result && (
        <>
          <ResultPage result={result} onRestart={handleRestart} />
          <Footer />
        </>
      )}
    </div>
  );
};

export default NorenDiagnosis;
