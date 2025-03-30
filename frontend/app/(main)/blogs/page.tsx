import { EmptyMessage, ErrorMessage } from "@/components/common/message";
import BlogList from "@/components/features/blog/BlogList";
import { generateMessages, RESPONSE_CODES } from "@/constants/common/messages";
import { STRAPI_API_URL } from "@/constants/common/api";
import { BlogData } from "@/types/blog/blogTypes";

/**
 * ブログ一覧を取得
 */
const getBlogs = async () => {
  try {
    const response = await fetch(`${STRAPI_API_URL}/api/blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // サーバーエラー
    if (!response.ok) {
      return {
        responseCode: response.status,
      };
    }

    const blogData: BlogData = await response.json();

    // データあり
    return {
      blogData,
    };
  } catch (error) {
    return {
      responseCode: RESPONSE_CODES.ERROR_UNEXPECTED,
    };
  }
};

/**
 * ブログ一覧ページ
 */
async function BlogPage() {
  const { blogData, responseCode } = await getBlogs();

  // エラー
  if (!blogData) {
    // responseのstatusに応じたエラーメッセージを生成
    const errorMessages = generateMessages(responseCode);
    return (
      <ErrorMessage responseCode={responseCode} errorMessages={errorMessages} />
    );
  }

  // 該当のデータがないとき
  if (blogData.data.length === 0) {
    <EmptyMessage />;
  }

  return (
    <BlogList data={blogData.data} pagination={blogData?.meta.pagination} />
  );
}

export default BlogPage;
