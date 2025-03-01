import { Metadata, PaginationType } from "../common/strapi";

interface BlogData {
  data: Blog[];
  meta: { pagination: PaginationType };
}

interface Blog {
  /**　ID */
  id: number;
  /** タイトル */
  title: string;
  /** 説明文 */
  description: string;
  /** カバー画像 */
  coverImage: {
    url: string;
  };
  /** ブログ本文 */
  contents: BlogContent[];
  /** カテゴリー */
  category: { categoryId: string; categoryName: string } | null;
  /** 最終更新日時 */
  updatedAt: string;
  /** メタデータ */
  metadata: Metadata;
}

interface BlogContent {
  id: number;
  contentTitle: string;
  contentText: string;
}

export { type BlogData, type Blog };
