import { ErrorMessage } from "@/components/common/message";
import BloomNewsDetail from "@/components/features/bloom-news/BloomNewsDetail";
import { STRAPI_API_URL } from "@/constants/common/api";
import { generateMessages, RESPONSE_CODES } from "@/constants/common/messages";
import { BloomNews } from "@/types/bloomNews/bloomNewsTypes";

/**
 * メタデータの生成（SEO対策）
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ bloomNewsId: string }>;
}) {
  const { bloomNewsId } = await params;
  const { data } = await getBloomNewsById(bloomNewsId);

  if (!data) {
    return {
      title: "ページが見つかりません",
      description: "指定されたニュースは存在しません。",
    };
  }

  return {
    title: data.metadata.metaTitle || "ニュース詳細",
    description: data.metadata.metaDescription || "ニュース詳細ページです。",
    openGraph: {
      images: [data.coverImage],
    },
  };
}

/**
 * ニュース詳細を取得
 */
async function getBloomNewsById(bloomNewsId: string) {
  try {
    const response = await fetch(
      `${STRAPI_API_URL}/api/bloom-news-items/${bloomNewsId}`
    );

    // レスポンス失敗
    if (!response.ok) {
      return {
        responseCode: response.status,
      };
    }

    const data: BloomNews = await response.json();

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
 * ニュース詳細ページ
 */
const PropertyDetailPage = async ({
  params,
}: {
  params: Promise<{ bloomNewsId: string }>;
}) => {
  const { bloomNewsId } = await params;
  const { data, responseCode } = await getBloomNewsById(bloomNewsId);

  if (!data) {
    const errorMessages = generateMessages(responseCode);
    return (
      <ErrorMessage responseCode={responseCode} errorMessages={errorMessages} />
    );
  }

  return <BloomNewsDetail data={data} />;
};

export default PropertyDetailPage;
