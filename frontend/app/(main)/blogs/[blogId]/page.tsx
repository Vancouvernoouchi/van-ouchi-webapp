import { ErrorPage } from "@/components/common/page";
import BlogDetail from "@/components/features/blog/BlogDetail";
import { STRAPI_API_URL } from "@/constants/common/api";
import { ERRORS, generateMessages } from "@/constants/common/messages";
import { Blog } from "@/types/blog";

async function getBlogById(blogId: string) {
  try {
    const response = await fetch(`${STRAPI_API_URL}/api/blogs/${blogId}`);

    // レスポンス失敗
    if (!response.ok) {
      return {
        blog: null,
        responseCode: response.status,
        messages: generateMessages(response.status),
      };
    }

    const blog: Blog = await response.json();

    // データが存在しない
    if (!blog) {
      return {
        blog: null,
        responseCode: ERRORS.NOT_FOUND.code,
        messages: generateMessages(ERRORS.NOT_FOUND.code),
      };
    }

    // 通常時
    return {
      blog,
      responseCode: undefined,
      messages: [""],
    };
  } catch (error) {
    return {
      blog: null,
      responseCode: ERRORS.UNEXPECTED.code,
      messages: generateMessages(ERRORS.UNEXPECTED.code),
    };
  }
}

/**
 * ブログ詳細ページに必要なデータをfetchし整理するコンポーネント
 *
 * @param params { blogId: string }
 *
 */
const PropertyDetailPage = async ({
  params,
}: {
  params: { blogId: string };
}) => {
  const { blog, responseCode, messages } = await getBlogById(params.blogId);

  if (!blog) {
    return <ErrorPage responseCode={responseCode} errorMessages={messages} />;
  }

  return <BlogDetail blog={blog} />;
};

export default PropertyDetailPage;
