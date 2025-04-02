import {
  PaginationType,
  Metadata,
  ArticleContent,
} from "../common/strapi/strapi";

interface SchoolData {
  data: School[];
  meta: { pagination: PaginationType };
}

interface School {
  /** ID */
  documentId: number;
  /** 学校名 */
  schoolName: string;
  /** 学校名（英語） */
  schoolEnglishName: string;
  /** 説明文 */
  description: string;
  /** カバー画像 */
  coverImage: {
    url: string;
  };
  /** 本文 */
  contents: ArticleContent[];
  /** カテゴリー */
  // category: { categoryId: string; categoryName: string } | null;
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

export { type SchoolData, type School };
