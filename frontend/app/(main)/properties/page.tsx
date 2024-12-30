import { MESSAGES } from "@/app/_constants/messages";
import ErrorPage from "@/components/atoms/common/ErrorPage";
import PropertiesList from "@/components/template/propertiesList/PropertiesList"; // 修正ポイント
import {
  fetchAndFilterProperties,
  SearchParams,
} from "@/utlis/filterSort/propertyService";
interface PropertiesPageProps {
  searchParams: SearchParams;
}

const PropertiesPage = async ({ searchParams }: PropertiesPageProps) => {
  try {
    const {
      filteredPropertiesNumber,
      paginatedProperties,
      currentPage,
      totalPage,
      itemsPerPage,
    } = await fetchAndFilterProperties(searchParams);

    return (
      <PropertiesList
        filteredPropertiesNumber={filteredPropertiesNumber}
        paginatedProperties={paginatedProperties}
        currentPage={currentPage}
        totalPage={totalPage}
        itemsPerPage={itemsPerPage}
      />
    );
  } catch (error: any) {
    return <ErrorPage errorMessage={MESSAGES.ERROR} />;
  }
};

export default PropertiesPage;
