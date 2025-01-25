import { FilterDialog } from "@/components/feature/property/FilterDialog";
import { NotionProperty, PropertyCardData } from "@/types/notionTypes";
import PaginationList from "@/components/common/PaginationList";
import {
  formatPropertyCardData,
  getMoveInDateByStatus,
} from "@/utlis/getPropertyValue";

import CardFrame from "@/components/common/frame/CardFrame";
import ListPageFrame from "@/components/common/frame/ListPageFrame";
import Sort from "@/components/common/Sort";
import { optionType } from "@/config/commonOptions";

interface PropertyListProps {
  paginatedProperties: NotionProperty[];
  filteredPropertiesNumber: number;
  currentPage: number;
  totalPage: number;
  itemsPerPage: number;
}

export const sortOptions: optionType[] = [
  { label: "金額：高い順", value: "price-asc" },
  { label: "金額：低い順", value: "price-dec" },
  { label: "新着順", value: "latest" },
];

/**
 * 物件一覧ページ
 * ＠params paginatedProperties
 * ＠params filteredPropertiesNumber
 * ＠params currentPage {number}
 * ＠params totalPage {number}
 * ＠params itemsPerPage　{number}
 *
 */
export default function PropertyList({
  filteredPropertiesNumber,
  paginatedProperties,
  currentPage,
  totalPage,
  itemsPerPage,
}: PropertyListProps) {
  const startItem = currentPage * itemsPerPage - itemsPerPage + 1;
  const endItem = Math.min(
    currentPage * itemsPerPage,
    filteredPropertiesNumber
  );

  return (
    <ListPageFrame
      filterArea={
        <FilterDialog filteredPropertiesNumbers={filteredPropertiesNumber} />
      }
      sortArea={<Sort sortOptions={sortOptions} />}
      paginationArea={
        <PaginationList currentPage={currentPage} totalPage={totalPage} />
      }
      total={filteredPropertiesNumber}
      endItem={endItem}
      startItem={startItem}
    >
      {paginatedProperties.map((p: NotionProperty) => {
        const property: PropertyCardData | null = formatPropertyCardData(p);

        if (property !== null) {
          return <PropertyCard key={property.id} property={property} />;
        }
      })}
    </ListPageFrame>
  );
}

/**
 * 物件一覧ページのカード
 * ＠params peoperty {PropertyCardData}
 */
const PropertyCard = ({ property }: { property: PropertyCardData }) => {
  /* 入居可能日 */
  const moveIndate = getMoveInDateByStatus(
    property.moveInDate,
    property.moveOutDate,
    property.status
  );

  /* 募集中の物件のみ「入居者募集中」 or 「即入居可能」のラベル */
  const labelMessage =
    property.status === "入居者募集中" || property.status === "即入居可能"
      ? property.status
      : "";

  /* ラベルの色 */
  const labelColor =
    property.status === "入居者募集中"
      ? "bg-white"
      : "bg-themeColor text-white";

  return (
    <CardFrame
      href={`/${property.id}`}
      imageSrc={property.thumbnail}
      imageAlt={property.title ?? "物件画像"}
      labelMessage={labelMessage}
      labelColor={labelColor}
    >
      <>
        <div className="text-sm sm:text-base">
          {property.title ? property.title : property.roomName}
        </div>
        <div className="text-xs sm:text-sm text-gray-500">{moveIndate}</div>
        <div className="text-xs sm:text-sm text-gray-500">
          【{property.zone}】 {property.area}エリア
        </div>
        <div className="text-xs sm:text-sm text-gray-500">
          {property.closestStation}駅まで徒歩{property.timeToStation}
        </div>
        <div className="font-semibold text-base tracking-wider">
          ${property.rent} <span className="text-xs">/MONTH</span>
        </div>
      </>
    </CardFrame>
  );
};
