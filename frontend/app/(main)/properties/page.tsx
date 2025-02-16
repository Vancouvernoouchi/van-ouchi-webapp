import { ErrorPage } from "@/components/common/page";
import PropertyList from "@/components/features/property/PropertyList";
import { MESSAGES } from "@/constants/common/messages";
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
