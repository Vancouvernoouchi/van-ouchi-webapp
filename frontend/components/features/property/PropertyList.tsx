import { FilterDialog } from "@/components/features/property/FilterDialog";
import { NotionProperty, PropertyCardData } from "@/types/notionTypes";
import PaginationList from "@/components/common/PaginationList";
import {
  formatMoveInDate,
  formatPropertyCardData,
} from "@/utils/getPropertyValue";
import { optionType } from "@/config/commonOptions";
import { CardFrame } from "@/components/common/frame";
import { SearchBar, Sort } from "@/components/common";

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
    <div className="card-base-px">
      {/* 検索バーとフィルター（スマホ） */}
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
            <Sort sortOptions={sortOptions} />
          </div>
        </div>
      </div>

      {filteredPropertiesNumber <= 0 ? (
        <div className="pt-10 flex flex-col justify-center items-center text-center">
          <p>条件に一致する物件が見つかりませんでした。</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 lg:gap-6">
            <CardArea
              properties={paginatedProperties}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
          </div>
          <div className="py-5">
            {" "}
            <PaginationList currentPage={currentPage} totalPage={totalPage} />
          </div>
        </>
      )}
    </div>
  );
}

/**
 * 物件一覧ページのカードを一覧で表示するエリア
 * ＠params data {PropertyCardData}
 */
// const CardArea = ({ properties }: { properties: NotionProperty[] }) => {
//   return (
//     <>
//       {properties.map((p: NotionProperty) => {
//         const property: PropertyCardData | null = formatPropertyCardData(p);

//         if (property !== null) {
//           return <PropertyCard key={property.id} property={property} />;
//         }
//       })}
//     </>
//   );
// };

const CardArea = ({
  properties,
  currentPage,
  itemsPerPage,
}: {
  properties: NotionProperty[];
  currentPage: number;
  itemsPerPage: number;
}) => {
  return (
    <>
      {properties.map((p: NotionProperty, index: number) => {
        const property: PropertyCardData | null = formatPropertyCardData(p);
        const tabIndex = 100 + index; // 各ページで100からスタート

        if (property !== null) {
          return (
            <PropertyCard
              key={property.id}
              property={property}
              tabIndex={tabIndex}
            />
          );
        }
      })}
    </>
  );
};

/**
 * 物件一覧ページのカード
 * ＠params property {PropertyCardData}
 */
const PropertyCard = ({
  property,
  tabIndex,
}: {
  property: PropertyCardData;
  tabIndex: number; // ← これを追加！
}) => {
  const labelMessage =
    property.status === "入居者募集中" || property.status === "即入居可能"
      ? property.status
      : "";

  const labelColor =
    property.status === "入居者募集中"
      ? "bg-white"
      : "bg-bloom-blue text-white";

  return (
    <CardFrame
      linkTo={`/properties/${property.id}`}
      imageSrc={property.thumbnail}
      imageAlt={property.title ?? "物件画像"}
      badgeMessage={labelMessage}
      badgeStyle={labelColor}
      cardContent={<CardContent property={property} />}
      tabIndex={tabIndex}
    />
  );
};

/**
 * カードの画像以下の部分
 * ＠params property {PropertyCardData}
 */
const CardContent = ({ property }: { property: PropertyCardData }) => {
  /* 入居可能日 */
  const moveInDate = formatMoveInDate(property.moveInDate);
  return (
    <>
      <div className="text-sm sm:text-base">
        {property.title ? property.title : property.roomName}
      </div>
      <div className="text-xs sm:text-sm text-bloom-gray">
        入居可能日: {moveInDate}
      </div>
      <div className="text-xs sm:text-sm text-bloom-gray">
        【{property.zone}】 {property.area}エリア
      </div>
      <div className="text-xs sm:text-sm text-bloom-gray">
        {property.closestStation}駅まで徒歩{property.timeToStation}
      </div>
      <div className="font-semibold text-base tracking-wider">
        CA${property.rent} <span className="text-xs">/MONTH</span>
      </div>
    </>
  );
};
