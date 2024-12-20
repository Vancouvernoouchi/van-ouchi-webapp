import { PropertyCardData } from "@/types/notionTypes";
import { getMoveInDateByStatus, isAvailable } from "@/utlis/getPropertyValue";
import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * 物件一覧ページのカード
 * ＠params peoperty {PropertyCardData}
 *
 */
const PropertyCard = ({ property }: { property: PropertyCardData }) => {
  const moveIndate = getMoveInDateByStatus(
    property.moveInDate,
    property.moveOutDate,
    property.status
  );
  const isPropertyAvailable = isAvailable(property.status);

  return (
    <Link href={`/properties/property/${property.id}`} className="relative">
      {/* 画像 */}
      <div className="relative z-0 w-full rounded-lg aspect-[9/8]">
        {property.thumbnail ? (
          <Image
            src={property.thumbnail}
            alt={property.title ?? "物件画像"}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 rounded-lg">
            画像がありません
          </div>
        )}
      </div>

      {/* 募集中の物件のみ「入居者募集中」のタグ */}
      {isPropertyAvailable && (
        <div className="absolute py-1.5 px-4 bg-white rounded-full z-50 top-3 left-3 shadow-md text-xs sm:text-sm opacity-85">
          入居者募集中
        </div>
      )}
      <div className="flex flex-col w-full gap-1 pt-2 pb-6">
        <div className="text-sm sm:text-base">{property.title}</div>
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
      </div>
    </Link>
  );
};

export default PropertyCard;
