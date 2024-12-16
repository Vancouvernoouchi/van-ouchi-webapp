import { MESSAGES } from "@/app/constants/messages";
import ErrorState from "@/components/atoms/common/ErrorState";
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
    return <ErrorState errorMessage={MESSAGES.ERROR} />;
  }
};

export default PropertiesPage;
