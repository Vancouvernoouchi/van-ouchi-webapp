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
    title: data.metadata?.metaTitle ?? "ニュース詳細",
    description: data.metadata?.metaDescription ?? "ニュース詳細ページです。",
    openGraph: {
      images: [data.coverImage.url],
    },
  };
}

/**
 * ニュース詳細を取得
 */
// strapiのversion4.0.0以降のため、APIのURLが変更されたため、以下のように修正
async function getBloomNewsById(bloomNewsId: string) {
  try {
    const response = await fetch(
      `${STRAPI_API_URL}/api/bloom-news-items/${bloomNewsId}?populate[coverImage]=true&populate[metadata]=true&populate[contents]=true&populate[author][populate][avatar]=true&populate[category]=true`
    );

    // レスポンス失敗
    if (!response.ok) {
      return {
        responseCode: response.status,
      };
    }

    // レスポンス成功
    const json = await response.json();
    const raw = json.data;

    if (!raw || !raw.id || !raw.title) {
      return {
        responseCode: 404,
      };
    }

    const attributes = raw;

    // フロントエンドで扱いやすいフラットな構造に整形
    //　const data: BloomNews = await response.json(); は使えない
    const data: BloomNews = {
      documentId: raw.id,
      title: attributes.title,
      description: attributes.description,
      updatedAt: attributes.updatedAt,

      coverImage: {
        url: attributes.coverImage?.url ?? "",
      },

      contents: attributes.contents ? [attributes.contents] : [],

      metadata: {
        metaTitle: attributes.metadata?.metaTitle ?? null,
        metaDescription: attributes.metadata?.metaDescription ?? null,
      },

      category: attributes.category
        ? {
            categoryId: attributes.category.id?.toString(),
            categoryName: attributes.category.name,
          }
        : null,

      author: attributes.author
        ? {
            id: attributes.author.id,
            name: attributes.author.name,
            description: attributes.author.description,
            avatar: {
              url: attributes.author.avatar?.url ?? null,
            },
          }
        : null,
    };

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
