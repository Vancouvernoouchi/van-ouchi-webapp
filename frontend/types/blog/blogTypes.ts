import {
  PaginationType,
  Metadata,
  ArticleContent,
} from "../common/strapi/strapi";

interface BlogData {
  data: Blog[];
  meta: { pagination: PaginationType };
}

interface Blog {
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
  /** ブログ本文 */
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
  /** メタデータ */
  metadata: Metadata;
}

export { type BlogData, type Blog };
