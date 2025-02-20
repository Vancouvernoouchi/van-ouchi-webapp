interface Route {
  /** ページ名 */
  name: string;
  /** パス */
  pathname: string;
  /** メタデータ */
  metadata: Metadata;
  /** サイトマップでの優先度　（SEO対策用） */
  priority: Priority;
}

interface Metadata {
  /** タイトル */
  title: string;
  /** メタディスクリプション */
  description: string;
  /** 検索クエリ等を含まない正規URL　-SEOの評価を一本化するもの */
  canonical: string;
  /** URLをシェアしたときに表示される画像 */
  ogImage: string;
}

type Priority = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export const ROUTES: Record<string, Route> = {
  HOME: {
    name: "ホーム",
    pathname: "/",
    metadata: {
      title: "ホーム",
      description: "これはホームページの説明です。",
      canonical: "https://www.bloom-ryugaku.com/",
      ogImage: "",
    },
    priority: 1,
  },
  PROPERTIES: {
    name: "バンクーバーのお家",
    pathname: "/properties",
    metadata: {
      title: "バンクーバーのお家",
      description: "バンクーバーのお家に関する情報一覧です。",
      canonical: "https://www.bloom-ryugaku.com/properties",
      ogImage: "",
    },
    priority: 2,
  },
  JOBS: {
    name: "仕事探し",
    pathname: "/jobs",
    metadata: {
      title: "仕事探し",
      description: "仕事探しに関する情報一覧です。",
      canonical: "https://www.bloom-ryugaku.com/jobs",
      ogImage: "",
    },
    priority: 3,
  },
  INTERNSHIP: {
    name: "インターン・ボランティア",
    pathname: "/internship",
    metadata: {
      title: "インターン・ボランティア",
      description: "インターン・ボランティアの情報一覧です。",
      canonical: "https://www.bloom-ryugaku.com/internship",
      ogImage: "",
    },
    priority: 4,
  },
  EVENTS: {
    name: "ミートアップ・イベント",
    pathname: "/events",
    metadata: {
      title: "ミートアップ・イベント",
      description: "ミートアップ・イベントの情報一覧です。",
      canonical: "https://www.bloom-ryugaku.com/events",
      ogImage: "",
    },
    priority: 5,
  },
  MARKETPLACE: {
    name: "マーケットプレイス",
    pathname: "/marketplace",
    metadata: {
      title: "マーケットプレイス",
      description: "マーケットプレイスの情報一覧です。",
      canonical: "https://www.bloom-ryugaku.com/marketplace",
      ogImage: "",
    },
    priority: 6,
  },
  TOURIST_SPOTS: {
    name: "おすすめの観光地",
    pathname: "/tourist-spots",
    metadata: {
      title: "おすすめの観光地",
      description: "おすすめの観光地情報一覧です。",
      canonical: "https://www.bloom-ryugaku.com/tourist-spots",
      ogImage: "",
    },
    priority: 7,
  },
  SKILL_MARKET: {
    name: "スキルマーケット",
    pathname: "/skill-market",
    metadata: {
      title: "スキルマーケット",
      description: "スキルマーケットの情報一覧です。",
      canonical: "https://www.bloom-ryugaku.com/skill-market",
      ogImage: "",
    },
    priority: 8,
  },
  LOCAL_SHOPS: {
    name: "個人経営のお店",
    pathname: "/local-shops",
    metadata: {
      title: "個人経営のお店",
      description: "個人経営のお店の情報一覧です。",
      canonical: "https://www.bloom-ryugaku.com/local-shops",
      ogImage: "",
    },
    priority: 9,
  },
  CLINICS: {
    name: "病院・クリニック",
    pathname: "/clinics",
    metadata: {
      title: "病院・クリニック",
      description: "病院・クリニックの情報一覧です。",
      canonical: "https://www.bloom-ryugaku.com/clinics",
      ogImage: "",
    },
    priority: 10,
  },
  AGENCIES: {
    name: "留学エージェント",
    pathname: "/agencies",
    metadata: {
      title: "留学エージェント",
      description: "留学エージェントの情報一覧です。",
      canonical: "https://www.bloom-ryugaku.com/agencies",
      ogImage: "",
    },
    priority: 10,
  },
  EXPERIENCE: {
    name: "留学体験談",
    pathname: "/experience",
    metadata: {
      title: "留学体験談",
      description: "留学体験談の情報一覧です。",
      canonical: "https://www.bloom-ryugaku.com/experience",
      ogImage: "",
    },
    priority: 10,
  },
  MOBILE_CARRIERS: {
    name: "携帯会社",
    pathname: "/mobile-carriers",
    metadata: {
      title: "携帯会社",
      description: "携帯会社の情報一覧です。",
      canonical: "https://www.bloom-ryugaku.com/mobile-carriers",
      ogImage: "",
    },
    priority: 10,
  },
  INSURANCE: {
    name: "保険会社",
    pathname: "/insurance",
    metadata: {
      title: "保険会社",
      description: "保険会社の情報一覧です。",
      canonical: "https://www.bloom-ryugaku.com/insurance",
      ogImage: "",
    },
    priority: 10,
  },
  BLOGS: {
    name: "お役立ちブログ",
    pathname: "/blogs",
    metadata: {
      title: "お役立ちブログ",
      description: "お役立ちブログの情報一覧です。",
      canonical: "https://www.bloom-ryugaku.com/blogs",
      ogImage: "",
    },
    priority: 10,
  },
  WASHROOMS: {
    name: "トイレマップ",
    pathname: "/washrooms",
    metadata: {
      title: "トイレマップ",
      description: "トイレマップの情報一覧です。",
      canonical: "https://www.bloom-ryugaku.com/washrooms",
      ogImage: "",
    },
    priority: 10,
  },
  PRIVACY_POLICY: {
    name: "プライバシーポリシー",
    pathname: "/privacy-policy",
    metadata: {
      title: "BLOOM プライバシーポリシー",
      description:
        "当サイトのプライバシーポリシーをご案内します。個人情報の取り扱いについて詳しく説明しています。",
      canonical: "https://www.bloom-ryugaku.com/privacy-policy",
      ogImage: "",
    },
    priority: 10,
  },
  TERMS_CONDITIONS: {
    name: "利用規約",
    pathname: "/terms-conditions",
    metadata: {
      title: "BLOOM 利用規約",
      description:
        "当サイトの利用規約をご案内します。個人情報の取り扱いについて詳しく説明しています。",
      canonical: "https://www.bloom-ryugaku.com/terms-conditions",
      ogImage: "",
    },
    priority: 10,
  },
} as const;

export type PagePathname = (typeof ROUTES)[keyof typeof ROUTES]["pathname"];
