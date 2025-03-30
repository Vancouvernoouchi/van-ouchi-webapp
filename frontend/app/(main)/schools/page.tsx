import { EmptyMessage, ErrorMessage } from "@/components/common/message";
import BlogList from "@/components/features/blog/BlogList";
import { ERRORS, generateMessages } from "@/constants/common";
import { STRAPI_API_URL } from "@/constants/common/api";
import { BlogData } from "@/types/blog";

interface BlogResponse {
  blogData?: BlogData;
  responseCode?: number;
}

const getBlogs = async (): Promise<BlogResponse> => {
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
      responseCode: ERRORS.UNEXPECTED.code,
    };
  }
};

async function SchoolPage() {
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

export default SchoolPage;
