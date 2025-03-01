import { ErrorPage } from "@/components/common/page";
import BlogList from "@/components/features/blog/BlogList";
import { ERRORS, generateMessages, MESSAGES } from "@/constants/common";
import { STRAPI_API_URL } from "@/constants/common/api";
import { BlogData } from "@/types/blog";

async function getBlogs() {
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
        blogData: null,
        responseCode: response.status,
        messages: generateMessages(response.status),
      };
    }

    const blogData: BlogData = await response.json();

    // データなし
    if (!blogData) {
      return {
        blogData: null,
        responseCode: ERRORS.NOT_FOUND.code,
        messages: generateMessages(ERRORS.NOT_FOUND.code),
      };
    }

    // データあり
    return {
      blogData,
      responseCode: undefined,
      messages: [""],
    };
  } catch (error) {
    console.error(error);
    return {
      blogData: null,
      responseCode: ERRORS.UNEXPECTED.code,
      messages: generateMessages(ERRORS.UNEXPECTED.code),
    };
  }
}

async function BlogPage() {
  const { blogData, responseCode, messages } = await getBlogs();

  // エラー
  if (!blogData) {
    return <ErrorPage responseCode={responseCode} errorMessages={messages} />;
  }

  return (
    <BlogList blogs={blogData.data} pagination={blogData?.meta.pagination} />
  );
}

export default BlogPage;
