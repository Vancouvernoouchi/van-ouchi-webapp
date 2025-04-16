import { EmptyMessage, ErrorMessage } from "@/components/common/message";
import BloomNewsList from "@/components/features/bloom-news/BloomNewsList";
import { generateMessages, RESPONSE_CODES } from "@/constants/common/messages";
import { STRAPI_API_URL } from "@/constants/common/api";
import { BloomNewsData } from "@/types/bloomNews/bloomNewsTypes";

/**
 * ニュース一覧を取得
 */
// strapiのversion4.0.0以降のため、APIのURLが変更されたため、以下のように修正
const getBloomNews = async () => {
  try {
    const response = await fetch(
      `${STRAPI_API_URL}/api/bloom-news-items?populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // サーバーエラー
    if (!response.ok) {
      return {
        responseCode: response.status,
      };
    }

    const bloomNewsData: BloomNewsData = await response.json();

    // データあり
    return {
      bloomNewsData,
    };
  } catch (error) {
    return {
      responseCode: RESPONSE_CODES.ERROR_UNEXPECTED,
    };
  }
};

/**
 * ニュース一覧ページ
 */
async function BloomNewsPage() {
  const { bloomNewsData, responseCode } = await getBloomNews();

  // エラー
  if (!bloomNewsData) {
    // responseのstatusに応じたエラーメッセージを生成
    const errorMessages = generateMessages(responseCode);
    return (
      <ErrorMessage responseCode={responseCode} errorMessages={errorMessages} />
    );
  }

  // 該当のデータがないとき
  if (bloomNewsData.data.length === 0) {
    <EmptyMessage />;
  }

  return (
    <BloomNewsList
      data={bloomNewsData.data}
      pagination={bloomNewsData?.meta.pagination}
    />
  );
}

export default BloomNewsPage;
