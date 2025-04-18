import {
  PaginationType,
  Metadata,
  ArticleContent,
} from "../common/strapi/strapi";

interface BloomNewsData {
  data: BloomNews[];
  meta: { pagination: PaginationType };
}

interface BloomNews {
  /**　ID */
  documentId: number;
  /** タイトル */
  title: string;
  /** 説明文 */
  description: string;
  /** カバー画像 */
  coverImage: {
    url: string;
  };
  /** ニュース本文 */
  contents: ArticleContent[];
  /** カテゴリー */
  category: { categoryId: string; categoryName: string } | null;
  /** 著者 */
  author: {
    id: number;
    name: string;
    description: string;
    avatar: {
      url: string | null;
    };
  } | null;
  /** 最終更新日時 */
  updatedAt: string;
  /** 公開日 */
  reportDate: string;
  /** メタデータ */
  metadata: Metadata;
}

export { type BloomNewsData, type BloomNews };
