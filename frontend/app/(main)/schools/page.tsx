import { EmptyMessage, ErrorMessage } from "@/components/common/message";
import SchoolList from "@/components/features/school/SchoolList";
import { generateMessages, RESPONSE_CODES } from "@/constants/common/messages";
import { STRAPI_API_URL } from "@/constants/common/api";
import { SchoolData } from "@/types/school/schoolTypes";

const getSchools = async () => {
  try {
    const response = await fetch(
      `${STRAPI_API_URL}/api/schools?populate=coverImage`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("School API response", JSON.stringify(response, null, 2));

    // サーバーエラー
    if (!response.ok) {
      return {
        responseCode: response.status,
      };
    }

    const schoolData: SchoolData = await response.json();

    // データあり
    return {
      schoolData,
    };
  } catch (error) {
    return {
      responseCode: RESPONSE_CODES.ERROR_UNEXPECTED,
    };
  }
};

async function SchoolPage() {
  const { schoolData, responseCode } = await getSchools();

  // エラー
  if (!schoolData) {
    // responseのstatusに応じたエラーメッセージを生成
    const errorMessages = generateMessages(responseCode);
    return (
      <ErrorMessage responseCode={responseCode} errorMessages={errorMessages} />
    );
  }

  // 該当のデータがないとき
  if (schoolData.data.length === 0) {
    <EmptyMessage />;
  }

  return (
    <SchoolList
      data={schoolData.data}
      pagination={schoolData?.meta.pagination}
    />
  );
}

export default SchoolPage;
