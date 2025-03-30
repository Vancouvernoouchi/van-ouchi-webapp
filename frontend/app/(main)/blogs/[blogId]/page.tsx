import { ErrorMessage } from "@/components/common/message";
import BlogDetail from "@/components/features/blog/BlogDetail";
import { STRAPI_API_URL } from "@/constants/common/api";
import { generateMessages, RESPONSE_CODES } from "@/constants/common/messages";
import { Blog } from "@/types/blog";

/**
 * メタデータの生成（SEO対策）
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  const { data } = await getBlogById(blogId);

  if (!data) {
    return {
      title: "ページが見つかりません",
      description: "指定されたブログは存在しません。",
    };
  }

  return {
    title: data.metadata.metaTitle || "ブログ詳細",
    description: data.metadata.metaDescription || "ブログ詳細ページです。",
    openGraph: {
      images: [data.coverImage],
    },
  };
}

/**
 * ブログ詳細を取得
 */
async function getBlogById(blogId: string) {
  try {
    const response = await fetch(`${STRAPI_API_URL}/api/blogs/${blogId}`);

    // レスポンス失敗
    if (!response.ok) {
      return {
        responseCode: response.status,
      };
    }

    const data: Blog = await response.json();

    // データが存在しない(ページが見つからない)
    if (!data) {
      return {
        responseCode: RESPONSE_CODES.ERROR_NOT_FOUND,
      };
    }

    // 通常時
    return {
      data,
    };
  } catch (error) {
    return {
      responseCode: RESPONSE_CODES.ERROR_UNEXPECTED,
    };
  }
}

/**
 * ブログ詳細ページ
 */
const PropertyDetailPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  const { data, responseCode } = await getBlogById(blogId);

  if (!data) {
    const errorMessages = generateMessages(responseCode);
    return (
      <ErrorMessage responseCode={responseCode} errorMessages={errorMessages} />
    );
  }

  return <BlogDetail data={data} />;
};

export default PropertyDetailPage;
