import ErrorPage from "@/components/common/ErrorPage";
import PropertyList from "@/components/template/propertyList/PropertyList";
import { MESSAGES } from "@/constants/messages";
import {
  fetchAndFilterProperties,
  SearchParams,
} from "@/utlis/filterSort/propertyService";

const PropertyListPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  try {
    const {
      filteredPropertiesNumber,
      paginatedProperties,
      currentPage,
      totalPage,
      itemsPerPage,
    } = await fetchAndFilterProperties(searchParams);

    return (
      <PropertyList
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

export default PropertyListPage;
