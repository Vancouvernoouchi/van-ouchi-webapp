"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { AmenitiesProps, PropertyDetailData } from "@/types/notionTypes";
import {
  ArrowRight,
  Check,
  Copy,
  Dumbbell,
  Instagram,
  KeyRound,
  Plug,
  Thermometer,
  WashingMachine,
  Waves,
  Wifi,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  AccessMap,
  Amenities,
  BasicInfo,
  Conditions,
  InstagramAds,
  Neighbors,
  PropertyImage,
  SectionWrapper,
  StaffComment,
} from "@/components/feature/property/PropertyDetailContents";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatDateToJapanese } from "@/utlis/getPropertyValue";
import { DetailPageFrame } from "@/components/common";
import { DetailPageHeader, DetailPageHeaderOption } from "@/components/common";

// 物件詳細ページでヘッダーに表示するセクション一覧
const propertyDetailHeaderList: DetailPageHeaderOption[] = [
  { id: "images", title: "画像" },
  { id: "basic-info", title: "基本情報" },
  { id: "conditions", title: "入居条件" },
  { id: "facilities", title: "設備" },
  { id: "comment", title: "スタッフからのコメント" },
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
  const moveInDate = formatDateToJapanese(property.moveInDate);

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

  // ヘッダーから遷移できる情報エリアの表示用
  const propertyInfoList: { id: string; title: string; body: ReactNode }[] = [
    {
      id: "images",
      title: "",
      body: (
        <PropertyImage
          imgUrl={property.thumbnail}
          title={property.title}
          googlePhotoUrl={property.image}
        />
      ),
    },
    {
      id: "basic-info",
      title: "基本情報",
      body: (
        <BasicInfo
          rent={property.rent}
          deposit={property.deposit}
          area={property.area}
          closestStation={property.closestStation}
          zone={property.zone}
          moveInDate={moveInDate}
        />
      ),
    },
    {
      id: "conditions",
      title: "入居条件",
      body: <Conditions conditions={conditions} />,
    },
    {
      id: "facilities",
      title: "設備",
      body: <Amenities amenities={amenities} />,
    },
    {
      id: "comment",
      title: "スタッフからのコメント",
      body: <StaffComment comment={property.staffComment} />,
    },
    {
      id: "map",
      title: "アクセスマップ",
      body: (
        <AccessMap
          geoPosition={property.geoPosition}
          closestStation={property.closestStation}
          timeToStation={property.timeToStation}
        />
      ),
    },
    { id: "neighbors", title: "周辺情報", body: <Neighbors /> },
    // {
    //   id: "available-properties",
    //   title: "近隣の空き物件",
    //   body: <AvailableProperties />,
    // },
  ];

  const router = useRouter();

  /**
   * パンクズリスト物件一覧に戻る
   * @param e {React.MouseEvent<HTMLAnchorElement>}
   */
  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // リンクのデフォルト動作を無効化

    // 履歴がある場合は戻る
    if (window.history.length > 2) {
      router.back();
    } else {
      // 外部ページから遷移した場合等、履歴がない場合は特定のURLに遷移
      router.push("/properties");
    }
  };

  return (
    <DetailPageFrame>
      <DetailPageHeader headerOptions={propertyDetailHeaderList} />
      {/* --- 左上エリア：　パンクズリスト　--- 　*/}
      <div className="pt-5 text-sm">
        <Breadcrumb>
          <BreadcrumbList>
            {/* ルートにホームページを作ったらこれ使うのでそれまで非表示 */}
            {/* <BreadcrumbItem>
              <BreadcrumbLink>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator /> */}
            <BreadcrumbItem>
              <BreadcrumbLink onClick={handleBack} className="cursor-pointer">
                物件一覧
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-500">
                {property.roomName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3 py-3 sm:py-6">
        {/* ---　　タイトルエリア --- */}
        <div className="flex flex-col items-start gap-2 w-full sm:w-[50%] lg:w-[60%]">
          {/* 空き状況ステータス */}
          <div className="py-1.5 px-4 bg-white rounded-full z-40 top-3 left-3 shadow-lg opacity-85 text-xs sm:text-sm border border-themeColor text-themeColor">
            {property.status}
          </div>

          <h1 className="text-base sm:text-base lg:text-2xl font-semibold">
            {property.title}
          </h1>
        </div>

        {/* ---　　右上エリア：　家賃と入居日 --- */}
        <div className="flex gap-7 tracking-widest font-semibold">
          <div className="flex flex-col items-center">
            <div className="text-gray-400 text-sm">MONTHLY RENT</div>
            <div className="text-sm sm:text-base">${property.rent}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-gray-400 text-sm">MOVE IN</div>
            <div className="text-sm sm:text-base">
              {moveInDate.replace("から入居可能", "").replace("退去予定", "")}
            </div>
          </div>
        </div>
      </div>

      {/* --- ヘッダーから遷移できる情報エリア --- */}
      <div className="lg:h-[60lvh] flex flex-col lg:flex-row lg:justify-between mx-auto">
        <div className="w-full lg:w-[60%] lg:pr-5">
          {propertyInfoList.map((info) => (
            <div id={info.id} key={info.id} className="border-b">
              <>
                {info.title && <SectionTitle title={info.title} />}
                <>{info.body}</>
              </>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-[40%] xl:pl-14">
          {/* お問い合わせエリア */}
          <div id="contact" className="border-b lg:border-none">
            <div className="text-base sm:text-xl font-semibold tracking-wides pt-8 lg:pt-0">
              お問い合わせ
            </div>
            <ContactCard />
          </div>
          {/* サービス内容紹介エリア */}
          <div id="about-us">
            <SectionTitle title="バンクーバーのお家について" />
            <InstagramAds />
          </div>
        </div>
      </div>

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

/**
 * 項目のタイトルコンポーネント
 *
 * @param title {string}
 */
const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h5 className="text-base sm:text-xl font-semibold tracking-widest pt-8">
      {title}
    </h5>
  );
};

/**
 * 右下、『まずは無料相談』コンポーネント（パソコン）
 *
 */
const ContactPopUpPC = () => {
  return (
    <Link
      className="fixed sm:bottom-10 sm:right-10 h-32 w-32 rounded-full bg-red-600 text-white flex flex-col items-center justify-center gap-1 tracking-widest hover:scale-105 z-50"
      href="https://www.instagram.com/vancouver.no.ouchi/"
      target="_blank"
    >
      <div>まずは</div>
      <div className="font-semibold">無料相談</div>
      <ArrowRight />
    </Link>
  );
};

/**
 * 右下、『まずは無料相談』コンポーネント（スマホ）
 *
 */
const ContactPopUpSP = () => {
  return (
    <Link
      className="fixed bottom-0 right-0 bg-red-600 text-white flex items-center gap-1 tracking-widest p-3 rounded-tl-lg z-50"
      href="https://www.instagram.com/vancouver.no.ouchi/"
      target="_blank"
    >
      <div className="font-semibold">まずは無料相談</div>
      <ArrowRight />
    </Link>
  );
};

/**
 * お問い合わせコンポーネント
 *
 */
const ContactCard = () => {
  const [url, setUrl] = useState("");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // クライアントサイドでwindowにアクセスする方法
  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
    } catch (error) {
      console.error(error);
      toast.error("URLのコピーに失敗しました。", { position: "top-right" });
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <SectionWrapper>
      <div className="rounded-lg px-4 py-8 sm:px-8 sm:py-12 shadow-xl border-[1px] border-gray-300">
        <div className="w-full flex justify-center items-center">
          <Image
            src="/vancouver_no_ouchi_logo2.png"
            alt="バンクーバーのお家ロゴ"
            className="pr-4"
            loading="lazy"
            unoptimized={true}
            width={90}
            height={80}
            style={{ objectFit: "cover" }}
          />
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-sm">シェアハウス探しは</p>
            <p className="font-bold">バンクーバーのお家</p>
            <p className="text-sm">にお任せください</p>
          </div>
        </div>
        <div className="text-sm py-2 text-center text-themeColor font-semibold">
          \ お問い合わせはこちらから /
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <div className="pb-2 text-sm">①この物件のリンクをコピー</div>
            <div className="relative">
              <Input
                value={url}
                onChange={() => {}} // これがないとWarningが出る
                className="pr-14 text-gray-500 border border-themeColor"
              />
              <div className="absolute right-3 top-3 flex items-center gap-1 text-sm text-themeColor">
                {isCopied ? (
                  <Check size={20} />
                ) : (
                  <Copy
                    size={20}
                    className="cursor-pointer"
                    onClick={copyUrl}
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="pb-2 text-sm">②リンクをインスタのDMに送信</div>
            <Link href="https://www.instagram.com/vancouver.no.ouchi">
              <div className="flex items-center justify-center gap-3 w-full  bg-grayThemeColor text-themeColor border border-themeColor py-3 rounded-lg cursor-pointer hover:opacity-70">
                <Instagram />
                <div className="">DMで相談・内見予約</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
