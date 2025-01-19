import { FilterDialog } from "@/components/organisms/propertyList/FilterDialog";
import PropertyCards from "@/components/organisms/propertyList/PropertyCards";
import { NotionProperty } from "@/types/notionTypes";
import SortSelect from "@/components/organisms/propertyList/SortSelect";
import { FC } from "react";
import PaginationList from "@/components/organisms/propertyList/PaginationList";
import SearchBar from "@/components/molecules/propertyList/SearchBar";

interface PropertyListProps {
  paginatedProperties: NotionProperty[];
  filteredPropertiesNumber: number;
  currentPage: number;
  totalPage: number;
  itemsPerPage: number;
}

const PropertyList: FC<PropertyListProps> = ({
  filteredPropertiesNumber,
  paginatedProperties,
  currentPage,
  totalPage,
  itemsPerPage,
}) => {
  const startItem = currentPage * itemsPerPage - itemsPerPage + 1;
  const endItem = Math.min(
    currentPage * itemsPerPage,
    filteredPropertiesNumber
  );

  return (
    <>
      <div className="sm:hidden flex items-center gap-2 pt-2">
        <SearchBar />
        <FilterDialog filteredPropertiesNumbers={filteredPropertiesNumber} />
      </div>
      <div className="flex flex-col my-2">
        <div className="flex justify-between items-center w-full">
          {/* 表示件数 */}
          <p className="flex flex-col items-start sm:flex-row sm:gap-1 text-sm sm:text-base">
            <span>合計{filteredPropertiesNumber} 件</span>
            <span>
              ({endItem === 0 ? 0 : `${startItem}〜${endItem}`} 件表示)
            </span>
          </p>
          <div className="flex gap-4">
            <div className="hidden sm:block">
              {/* フィルター */}
              <FilterDialog
                filteredPropertiesNumbers={filteredPropertiesNumber}
              />
            </div>
            {/* 並び替え */}
            <SortSelect />
          </div>
        </div>
      </div>

      <>
        {filteredPropertiesNumber <= 0 ? (
          <div className="h-[70vh] p-2 flex flex-col justify-center items-center text-center text-gray-500 text-xl">
            条件に一致する物件が見つかりませんでした。
          </div>
        ) : (
          <>
            <PropertyCards paginatedProperties={paginatedProperties} />
            <div className="py-5">
              <PaginationList currentPage={currentPage} totalPage={totalPage} />
            </div>
          </>
        )}
      </>
    </>
  );
};

export default PropertyList;
