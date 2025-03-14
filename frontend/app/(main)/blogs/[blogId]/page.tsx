import { ErrorMessage } from "@/components/common/message";
import BlogDetail from "@/components/features/blog/BlogDetail";
import { STRAPI_API_URL } from "@/constants/common/api";
import { ERRORS, generateMessages } from "@/constants/common/messages";
import { Blog } from "@/types/blog";

/**
 * メタデータの生成（SEO対策）
 */
export async function generateMetadata({
  params,
}: {
  params: { blogId: string };
}) {
  const { data } = await getBlogById(params.blogId);

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

interface BlogResponse {
  data: Blog | null;
  responseCode: number;
}

/**
 * ブログ詳細を取得
 */
async function getBlogById(blogId: string): Promise<BlogResponse> {
  try {
    const response = await fetch(`${STRAPI_API_URL}/api/blogs/${blogId}`);

    // レスポンス失敗
    if (!response.ok) {
      return {
        data: null,
        responseCode: response.status,
      };
    }

    const data: Blog = await response.json();

    // データが存在しない(ページが見つからない)
    if (!data) {
      return {
        data: null,
        responseCode: ERRORS.NOT_FOUND.code,
      };
    }

    // 通常時
    return {
      data,
      responseCode: 200,
    };
  } catch (error) {
    return {
      data: null,
      responseCode: ERRORS.UNEXPECTED.code,
    };
  }
}

/**
 * ブログ詳細ページ
 *
 * @param params { blogId: string }
 *
 */
const PropertyDetailPage = async ({
  params,
}: {
  params: { blogId: string };
}) => {
  const { data, responseCode } = await getBlogById(params.blogId);

  if (!data) {
    const errorMessages = generateMessages(responseCode);
    return (
      <ErrorMessage responseCode={responseCode} errorMessages={errorMessages} />
    );
  }

  return <BlogDetail data={data} />;
};

export default PropertyDetailPage;
