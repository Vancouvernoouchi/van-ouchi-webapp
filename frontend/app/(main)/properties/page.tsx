import { ErrorMessage } from "@/components/common/message";
import PropertyList from "@/components/features/property/PropertyList";
import { MESSAGES } from "@/constants/common/messages";
import {
  fetchAndFilterProperties,
  SearchParams,
} from "@/utils/filterSort/propertyService";

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
    return <ErrorMessage errorMessages={MESSAGES.ERROR_UNEXPECTED} />;
  }
};

export default PropertyListPage;
