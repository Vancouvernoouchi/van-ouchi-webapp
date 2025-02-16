"use client";
import React from "react";
import { AmenitiesProps, PropertyDetailData } from "@/types/notionTypes";
import {
  Dumbbell,
  KeyRound,
  Plug,
  Thermometer,
  WashingMachine,
  Waves,
  Wifi,
} from "lucide-react";
import {
  AccessMap,
  Amenities,
  BasicInfo,
  Conditions,
  ContactCard,
  ContactPopUpPC,
  ContactPopUpSP,
  InstagramAds,
  Neighbors,
  PropertyImage,
  RecommendPoint,
  BreadcrumbArea,
} from "@/components/features/property/PropertyDetailContents";
import { formatMoveInDate } from "@/utlis/getPropertyValue";
import { DetailPageHeaderOption } from "@/components/common/header";
import { DetailPageFrame } from "@/components/common/frame";

// 物件詳細ページでヘッダーに表示するセクション一覧
const propertyDetailHeaderList: DetailPageHeaderOption[] = [
  { id: "images", title: "画像" },
  { id: "basic-info", title: "基本情報" },
  { id: "conditions", title: "入居条件" },
  { id: "facilities", title: "設備" },
  { id: "point", title: "おすすめポイント" },
  { id: "map", title: "アクセスマップ" },
  { id: "neighbors", title: "周辺情報" },
  { id: "contact", title: "お問い合わせ" },
  { id: "about-us", title: "バンクーバーのお家について" },
];

/**
 * 物件詳細ページのコンポーネント
 * @param property　 {PropertyDetailData}
 */
const PropertyDetail = ({ property }: { property: PropertyDetailData }) => {
  /* 入居可能日 */
  const moveInDate = formatMoveInDate(property.moveInDate);

  /* 対象の性別 */
  const targetGender = () => {
    if (property.forFemale) {
      return "女性";
    } else if (property.forMale) {
      return "男性";
    } else {
      return "性別を問わない";
    }
  };

  // 入居条件表示用
  const conditions: { name: string; value: string }[] = [
    { name: "対象者", value: targetGender() },
    { name: "カップル入居", value: property.forCouple ? "可能" : "不可" },
    { name: "ルームメイトの性別", value: property.roommatesGender || "確認中" },
    { name: "最低滞在期間", value: property.minimumStay + "〜" },
    {
      name: "お家シェア人数",
      value: property.houseShareCount
        ? `${property.houseShareCount}人`
        : "確認中",
    },
    {
      name: "キッチンシェア人数",
      value: property.kitchenShareCount
        ? `${property.kitchenShareCount}人`
        : "確認中",
    },
    {
      name: "バスルームシェア人数",
      value: property.bathroomShareCount
        ? `${property.bathroomShareCount}人`
        : "確認中",
    },
  ];

  // 設備表示用
  const amenities: AmenitiesProps[] = [
    {
      icon: KeyRound,
      value: property.hasKey,
      message: property.hasKey ? "部屋の鍵付き" : "部屋の鍵なし",
    },
    {
      icon: WashingMachine,
      value: property.hasLaundry,
      message: property.hasLaundry ? "洗濯無料" : "洗濯有料 or なし",
    },
    {
      icon: Wifi,
      value: property.hasWifi,
      message: property.hasWifi ? "Wifi無料" : "Wifi有料 or なし",
    },
    {
      icon: Plug,
      value: property.hasUtilities,
      message: property.hasUtilities ? "光熱費無料" : "光熱費有料",
    },
    {
      icon: Dumbbell,
      value: property.hasGym,
      message: property.hasGym ? "ジム" : "ジムなし",
    },
    {
      icon: Waves,
      value: property.hasPool,
      message: property.hasPool ? "プール" : "プールなし",
    },
    {
      icon: Thermometer,
      value: property.hasSauna,
      message: property.hasSauna ? "サウナ" : "サウナなし",
    },
  ];

  return (
    <DetailPageFrame detailHeaderList={propertyDetailHeaderList}>
      {/* --- 左上エリア：　パンクズリスト　--- 　*/}
      <div className="pt-5 text-sm">
        <BreadcrumbArea label={property.roomName} />
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3 py-3 sm:py-6">
        <div className="flex flex-col items-start gap-2 w-full sm:w-[50%] lg:w-[60%]">
          {/* 空き状況ステータス */}
          <div className="py-1.5 px-4 bg-white rounded-full z-40 top-3 left-3 opacity-85 text-xs sm:text-sm border border-bloom-blue text-bloom-blue">
            {property.status}
          </div>
          {/* タイトル */}
          <h1 className="text-base sm:text-base lg:text-2xl font-semibold">
            {property.title}
          </h1>
        </div>

        <div className="flex gap-7 tracking-widest font-semibold">
          {/* 家賃 */}
          <div className="flex flex-col items-center">
            <div className="text-slate-400 text-sm">MONTHLY RENT</div>
            <div className="text-sm sm:text-base">CA${property.rent}</div>
          </div>
          {/* 入居可能日 */}
          <div className="flex flex-col items-center">
            <div className="text-slate-400 text-sm">MOVE IN</div>
            <div className="text-sm sm:text-base">{moveInDate}</div>
          </div>
        </div>
      </div>

      {/* --- ヘッダーから遷移できる情報エリア --- */}
      <div className="flex flex-col lg:flex-row lg:justify-between mx-auto">
        <div className="w-full lg:w-[60%] lg:pr-5">
          {/* 画像 */}
          <PropertyImage
            imgUrl={property.thumbnail}
            title={property.title}
            googlePhotoUrl={property.image}
          />
          {/* 基本情報 */}
          <BasicInfo
            rent={property.rent}
            deposit={property.deposit}
            area={property.area}
            closestStation={property.closestStation}
            zone={property.zone}
            moveInDate={moveInDate}
          />
          {/* 入居条件 */}
          <Conditions conditions={conditions} />
          {/* 設備 */}
          <Amenities amenities={amenities} />
          {/* おすすめポイント */}
          <RecommendPoint text={property.staffComment} />
          {/* アクセスマップ */}
          <AccessMap
            geoPosition={property.geoPosition}
            closestStation={property.closestStation}
            timeToStation={property.timeToStation}
            closestBusStop={property.closestBusStop}
            timeToBusStop={property.timeToBusStop}
          />
          {/* 周辺情報 */}
          <Neighbors area={property.area} />
        </div>

        <div className="w-full lg:w-[40%] xl:pl-14">
          {/* お問い合わせ */}
          <ContactCard />

          {/* バンクーバーのお家について*/}
          <InstagramAds />
        </div>
      </div>

      {/*　画面右下まずは無料相談 */}
      <div className="hidden sm:block">
        <ContactPopUpPC />
      </div>
      <div className="block sm:hidden">
        <ContactPopUpSP />
      </div>
    </DetailPageFrame>
  );
};

export default PropertyDetail;
