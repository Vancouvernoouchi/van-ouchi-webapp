import { FilterDialog } from "@/components/features/property/FilterDialog";
import { NotionProperty, PropertyCardData } from "@/types/notionTypes";
import PaginationList from "@/components/common/PaginationList";
import {
  formatMoveInDate,
  formatPropertyCardData,
} from "@/utlis/getPropertyValue";
import { optionType } from "@/config/commonOptions";
import { CardFrame, ListPageFrame, Sort } from "@/components/common";

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
      cardArea={<CardArea properties={paginatedProperties} />}
    />
  );
}

/**
 * 物件一覧ページのカードを一覧で表示するエリア
 * ＠params data {PropertyCardData}
 */
const CardArea = ({ properties }: { properties: NotionProperty[] }) => {
  return (
    <>
      {properties.map((p: NotionProperty) => {
        const property: PropertyCardData | null = formatPropertyCardData(p);

        if (property !== null) {
          return <PropertyCard key={property.id} property={property} />;
        }
      })}
    </>
  );
};

/**
 * 物件一覧ページのカード
 * ＠params peoperty {PropertyCardData}
 */
const PropertyCard = ({ property }: { property: PropertyCardData }) => {
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
      cardContent={<CardContent property={property} />}
    />
  );
};

/**
 * カードの画像以下の部分
 * ＠params peoperty {PropertyCardData}
 */
const CardContent = ({ property }: { property: PropertyCardData }) => {
  /* 入居可能日 */
  const moveIndate = formatMoveInDate(property.moveInDate);
  return (
    <>
      <div className="text-sm sm:text-base">
        {property.title ? property.title : property.roomName}
      </div>
      <div className="text-xs sm:text-sm text-gray-500">
        入居可能日: {moveIndate}
      </div>
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
  );
};
