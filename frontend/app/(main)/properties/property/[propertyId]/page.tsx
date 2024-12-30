import PropertyPage from "@/components/template/propertyPage/PropertyPage";
import { NotionProperty, PropertyDetailData } from "@/types/notionTypes";
import { formatPropertyDetailData } from "@/utlis/getPropertyValue";
import { AxiosResponse } from "axios";
import { apiClient } from "@/config/apiClient";
import { getPropertyValue } from "@/utlis/getPropertyValue";
import type { Metadata, ResolvingMetadata } from "next";
import ErrorPage from "@/components/atoms/common/ErrorPage";
import { MESSAGES } from "@/app/_constants/messages";

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

    if (propertyData !== null) {
      return (
        <div>
          <PropertyPage property={propertyData} />
        </div>
      );
    } else {
      return (
        <ErrorPage
          responseCode="404"
          errorMessage={MESSAGES.ERROR_NOT_FOUND("物件情報")}
        />
      );
    }
  } catch (error: any) {
    return (
      <ErrorPage responseCode={error.status} errorMessage={MESSAGES.ERROR} />
    );
  }
};

export default PropertyDetailPage;
