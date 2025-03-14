import { NotionProperty, PropertyDetailData } from "@/types/notionTypes";
import { formatPropertyDetailData } from "@/utlis/getPropertyValue";
import { AxiosResponse } from "axios";
import { apiClient } from "@/config/apiClient";
import { getPropertyValue } from "@/utlis/getPropertyValue";
import type { Metadata, ResolvingMetadata } from "next";
import {
  ERRORS,
  generateMessages,
  MESSAGES,
} from "@/constants/common/messages";
import PropertyDetail from "@/components/features/property/PropertyDetail";
import { ErrorPage } from "@/components/common/page";

type Props = {
  params: Promise<{ propertyId: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const propertyId = (await params).propertyId;

    // fetch data
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
  params: { propertyId: string };
}) => {
  const { propertyId } = params;
  try {
    const response: AxiosResponse = await apiClient.get(
      `/properties/${propertyId}`
    );

    const data: NotionProperty = response.data;
    const propertyData: PropertyDetailData | null =
      formatPropertyDetailData(data);

    if (!propertyData) {
      return (
        <ErrorPage
          responseCode={ERRORS.NOT_FOUND.code}
          errorMessages={generateMessages(ERRORS.NOT_FOUND.code)}
        />
      );
    }

    return <PropertyDetail property={propertyData} />;
  } catch (error: any) {
    return (
      <ErrorPage
        responseCode={ERRORS.UNEXPECTED.code}
        errorMessages={generateMessages(ERRORS.UNEXPECTED.code)}
      />
    );
  }
};

export default PropertyDetailPage;
