import { ErrorMessage } from "@/components/common/message";
import SchoolDetail from "@/components/features/school/SchoolDetail";
import { STRAPI_API_URL } from "@/constants/common/api";
import { generateMessages, RESPONSE_CODES } from "@/constants/common/messages";
import { School } from "@/types/school/schoolTypes";

/**
 * メタデータの生成（SEO対策）
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ schoolId: string }>;
}) {
  const { schoolId } = await params;
  const { data } = await getSchoolById(schoolId);

  if (!data) {
    return {
      title: "ページが見つかりません",
      description: "指定された学校ページは存在しません。",
    };
  }

  return {
    title: data.metadata?.metaTitle || "学校詳細",
    description: data.metadata?.metaDescription || "学校詳細ページです。",
    openGraph: {
      images: [data.coverImage],
    },
  };
}

interface SchoolResponse {
  data: School | null;
  responseCode: number;
}

/**
 * 学校詳細を取得
 */
async function getSchoolById(schoolId: string): Promise<SchoolResponse> {
  try {
    const response = await fetch(
      `${STRAPI_API_URL}/api/schools/${schoolId}?populate[coverImage]=true&populate[contents]=true&populate[metaData]=true`
    );

    // レスポンス失敗
    if (!response.ok) {
      return {
        data: null,
        responseCode: response.status,
      };
    }
    const json = await response.json();
    const data: School = json.data;
    console.log("SchoolById API response", JSON.stringify(data, null, 2));

    // データが存在しない(ページが見つからない)
    if (!data) {
      return {
        data: null,
        responseCode: RESPONSE_CODES.ERROR_NOT_FOUND,
      };
    }

    // 通常時
    return {
      // data,
      data: json.data,
      responseCode: 200,
    };
  } catch (error) {
    return {
      data: null,
      responseCode: RESPONSE_CODES.ERROR_NOT_FOUND,
    };
  }
}

/**
 * 学校詳細ページ
 *
 * @param params { schoolId: string }
 *
 */
const PropertyDetailPage = async ({
  params,
}: {
  params: Promise<{ schoolId: string }>;
}) => {
  const { schoolId } = await params;
  const { data, responseCode } = await getSchoolById(schoolId);

  if (!data) {
    const errorMessages = generateMessages(responseCode);
    return (
      <ErrorMessage responseCode={responseCode} errorMessages={errorMessages} />
    );
  }

  return <SchoolDetail data={data} />;
};

export default PropertyDetailPage;
