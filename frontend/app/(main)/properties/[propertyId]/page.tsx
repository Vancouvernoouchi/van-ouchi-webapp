import { NotionProperty, PropertyDetailData } from "@/types/notionTypes";
import { formatPropertyDetailData } from "@/utils/getPropertyValue";
import { AxiosResponse } from "axios";
import { apiClient } from "@/config/apiClient";
import { getPropertyValue } from "@/utils/getPropertyValue";
import type { Metadata } from "next";
import { generateMessages, RESPONSE_CODES } from "@/constants/common/messages";
import PropertyDetail from "@/components/features/property/PropertyDetail";
import { ErrorMessage } from "@/components/common/message";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}): Promise<Metadata> {
  try {
    const { propertyId } = await params;

    const { data: property } = await apiClient.get(`/properties/${propertyId}`);

    const previousImage = getPropertyValue(
      property.properties.サムネイル,
      "file"
    );

    return {
      title: getPropertyValue(property.properties.タイトル, "title"),
      openGraph: {
        images: [previousImage],
      },
    };
  } catch (error) {
    console.error("Failed to generate metadata:", error);
    return {
      title: "Default Title",
    };
  }
}

/**
 * 物件詳細ページに必要なデータをfetchし整理するコンポーネント
 *
 * @param params { propertyId: string }
 *
 */
const PropertyDetailPage = async ({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) => {
  const { propertyId } = await params;

  try {
    const response: AxiosResponse = await apiClient.get(
      `/properties/${propertyId}`
    );

    const data: NotionProperty = response.data;
    const propertyData: PropertyDetailData | null =
      formatPropertyDetailData(data);

    if (!propertyData) {
      return (
        <ErrorMessage
          responseCode={RESPONSE_CODES.ERROR_NOT_FOUND}
          errorMessages={generateMessages(RESPONSE_CODES.ERROR_NOT_FOUND)}
        />
      );
    }

    return <PropertyDetail property={propertyData} />;
  } catch (error: any) {
    return <ErrorMessage errorMessages={error.message} />;
  }
};

export default PropertyDetailPage;
