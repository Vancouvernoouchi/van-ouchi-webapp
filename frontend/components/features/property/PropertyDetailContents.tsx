import { ReadMore } from "@/components/common";
import { Tab } from "@/components/common";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AmenitiesProps } from "@/types/notionTypes";
import {
  CalendarCheck,
  CircleDollarSign,
  HandCoins,
  LandPlot,
  Map,
  TrainFront,
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { MapNotFound } from "@/components/common/map";
import { MESSAGES } from "@/constants/messages";
import Image from "next/image";

/**
 * 各セクションのラッパーコンポーネント
 * pyを統一するものだが、その他のスタイリングもclassNameで適用できる
 *
 * @param className {string}
 * @param children {ReactNode}
 */
export const SectionWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={`pt-3 pb-8 sm:pt-5 sm:pb-10 ${className}`}>{children}</div>
  );
};

/**
 * 物件画像コンポーネント
 *
 * @param imageUrl {string}　- サムネイル画像URL
 * @param title {string} - タイトル
 * @param googlePhotoUrl {string} - GooglePhotoのURL
 */
export const PropertyImage = ({
  imgUrl,
  title,
  googlePhotoUrl,
}: {
  imgUrl: string;
  title: string;
  googlePhotoUrl: string;
}) => {
  return (
    <div className="propertyPageImage mt-2 flex flex-col rounded-lg">
      {imgUrl ? (
        <div>
          <Image
            src={imgUrl}
            alt={title ?? "物件画像"}
            className="rounded-t-lg object-cover"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            unoptimized={true}
          />

          <a
            href={googlePhotoUrl}
            target="_blank"
            className="inline-block p-2 shadow-lg text-white absolute bottom-0 left-0 w-full bg-themeColor hover:bg-black bg-opacity-70 hover:bg-opacity-70 text-center"
          >
            もっと見る
          </a>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          画像がありません
        </div>
      )}
    </div>
  );
};

/**
 * 基本情報のカードコンポーネント
 *
 * @param icon {React.ComponentType<{ className?: string }>}
 * @param label {string}
 * @param value {string}
 */
const PropertyConditionCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) => {
  return (
    <div className="flex justify-center items-center gap-1 px-2 sm:px-6 py-2 min-h-24 border border-themeColor rounded-md shadow-md">
      <Icon className="flex items-center justify-center text-themeColor w-8 h-8" />
      <div className="flex flex-col items-center justify-center w-full text-sm sm:text-base">
        <p className="font-bold text-themeColor">{label}</p>
        <p>{value}</p>
      </div>
    </div>
  );
};

/**
 * 基本情報コンポーネント
 *
 * @param rent {number}
 * @param deposit {number}
 * @param moveInDate {string}
 * @param area {string}
 * @param zone {string}
 * @param closestStation {string}
 */
export const BasicInfo = ({
  rent,
  deposit,
  moveInDate,
  area,
  zone,
  closestStation,
}: {
  rent: number;
  deposit: number;
  area: string;
  zone: string;
  moveInDate: string;
  closestStation: string;
}) => {
  return (
    <SectionWrapper className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
      <PropertyConditionCard
        icon={CircleDollarSign}
        label="家賃"
        value={`CA$${rent}`}
      />
      <PropertyConditionCard
        icon={HandCoins}
        label="デポジット"
        value={`CA$${deposit}`}
      />
      <PropertyConditionCard
        icon={CalendarCheck}
        label="入居可能日"
        value={moveInDate}
      />
      <PropertyConditionCard icon={Map} label="エリア" value={area} />
      <PropertyConditionCard icon={LandPlot} label="ゾーン" value={zone} />
      <PropertyConditionCard
        icon={TrainFront}
        label="最寄駅"
        value={closestStation}
      />
    </SectionWrapper>
  );
};

/**
 * 入居条件エリアコンポーネント
 *
 * @param roommatesGender {string}
 * @param forCouple {boolean}
 * @param minimumStay {string}
 * @param houseShareCount {string}
 * @param kitchenShareCount {string}
 * @param bathroomShareCount {string}
 *
 */
export const Conditions = ({
  conditions,
}: {
  conditions: { name: string; value: string }[];
}) => {
  return (
    <SectionWrapper>
      <Table className="border border-themeColor tracking-wider">
        <TableBody>
          {conditions.map((condition) => (
            <TableRow key={condition.name}>
              <TableCell className="font-semibold border bg-grayThemeColor text-themeColor border-themeColor">
                {condition.name}
              </TableCell>
              <TableCell className="border border-themeColor">
                {condition.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionWrapper>
  );
};

/**
 * 設備コンポーネント
 *
 * @param amenities {
 *  　icon: React.ComponentType<{ className?: string }>;
 *  　value: boolean;
 *  　message: string;
 *  }[]
 */
export const Amenities = ({ amenities }: { amenities: AmenitiesProps[] }) => {
  return (
    <SectionWrapper className="grid grid-cols-3 sm:grid-cols-5 gap-3">
      {amenities.map((amenity) => {
        const Icon = amenity.icon;

        return (
          <div
            key={amenity.message}
            className="flex flex-col items-center gap-2"
          >
            <Icon
              className={`w-20 h-20 p-5 rounded-md bg-grayThemeColor font-thin ${
                amenity.value
                  ? "bg-grayThemeColor text-themeColor"
                  : "bg-gray-200 text-gray-300"
              }`}
            />
            <div
              className={`${
                amenity.value ? "text-themeColor" : "text-gray-400"
              }`}
            >
              {amenity.message}
            </div>
          </div>
        );
      })}
    </SectionWrapper>
  );
};

/**
 * スタッフからのコメントコンポーネント
 *
 * @param comment {string}
 */
export const StaffComment = ({ comment }: { comment: string }) => {
  return (
    <>
      {comment ? (
        <SectionWrapper>
          {/* 文章の表示エリア */}
          <div className="hidden sm:block">
            <div className="whitespace-pre-line text-sm ">{comment}</div>
          </div>

          <div className="block sm:hidden">
            <ReadMore text={comment} />
          </div>
        </SectionWrapper>
      ) : (
        <div className="py-10">現在更新中</div>
      )}
    </>
  );
};

/**
 * アクセスマップコンポーネント
 *
 * @param geoPosition {string}
 * @param closestStation {string}
 * @param timeToStation {string}
 */
export const AccessMap = ({
  geoPosition,
  closestStation,
  timeToStation,
}: {
  geoPosition: string;
  closestStation: string;
  timeToStation: string;
}) => {
  return (
    <SectionWrapper>
      {/* TODO: 郵便番号でエリア表示させるように修正するまで一旦非表示 */}
      {/* <GoogleMapMarker
        geoPosition={geoPosition}
        className=" w-full h-[400px]"
      /> */}
      <MapNotFound message={MESSAGES.ERROR_PREPAIRING("この物件のマップ")} />

      <div className="pt-5 py-2 font-semibold">最寄駅 / バス停</div>
      <div className="text-sm">
        {closestStation}: 徒歩{timeToStation}
      </div>
    </SectionWrapper>
  );
};

/**
 * 周辺情報コンポーネント
 */
export const Neighbors = () => {
  const tabLabels: string[] = ["エリア紹介", "飲食店", "その他"];

  const contents: ReactNode[] = [
    <div key="0">準備中</div>,
    <div key="1">準備中</div>,
    <div key="2">準備中</div>,
  ];

  return (
    <SectionWrapper>
      <Tab tablLabels={tabLabels} contents={contents} />
    </SectionWrapper>
  );
};

/**
 * 近隣の物件コンポーネント
 * 読み込みが遅くなりそうなので一旦コメントアウト
 *
 * @param
 */
// const AvailableProperties = () => {
//   return <div className="py-10">準備中</div>;
// };

/**
 * 広告エリア
 */
export const InstagramAds = () => {
  useEffect(() => {
    // Instagramの埋め込みスクリプトを読み込む
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // クリーンアップ：スクリプトが不要になったら削除
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <SectionWrapper>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/p/DE4IZAURGFU/?utm_source=ig_embed&amp;utm_campaign=loading"
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: "0",
          borderRadius: "3px",
          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: "1px",
          padding: "0",
        }}
      >
        <div style={{ padding: "16px" }}>
          <a
            href="https://www.instagram.com/p/DE4IZAURGFU/?utm_source=ig_embed&amp;utm_campaign=loading"
            style={{
              background: "#FFFFFF",
              lineHeight: "0",
              padding: "0 0",
              textAlign: "center",
              textDecoration: "none",
              width: "100%",
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#F4F4F4",
                  borderRadius: "50%",
                  flexGrow: 0,
                  height: "40px",
                  marginRight: "14px",
                  width: "40px",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#F4F4F4",
                    borderRadius: "4px",
                    flexGrow: 0,
                    height: "14px",
                    marginBottom: "6px",
                    width: "100px",
                  }}
                ></div>
                <div
                  style={{
                    backgroundColor: "#F4F4F4",
                    borderRadius: "4px",
                    flexGrow: 0,
                    height: "14px",
                    width: "60px",
                  }}
                ></div>
              </div>
            </div>
            <div style={{ padding: "19% 0" }}></div>
            <div
              style={{
                display: "block",
                height: "50px",
                margin: "0 auto 12px",
                width: "50px",
              }}
            ></div>
            <div style={{ paddingTop: "8px" }}>
              <div
                style={{
                  color: "#3897f0",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: 550,
                  lineHeight: "18px",
                }}
              >
                この投稿をInstagramで見る
              </div>
            </div>
            <div style={{ padding: "12.5% 0" }}></div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "14px",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    backgroundColor: "#F4F4F4",
                    borderRadius: "50%",
                    height: "12.5px",
                    width: "12.5px",
                    transform: "translateX(0px) translateY(7px)",
                  }}
                ></div>
                <div
                  style={{
                    backgroundColor: "#F4F4F4",
                    height: "12.5px",
                    transform: "rotate(-45deg) translateX(3px) translateY(1px)",
                    width: "12.5px",
                    flexGrow: "0",
                    marginRight: "14px",
                    marginLeft: "2px",
                  }}
                ></div>
                <div
                  style={{
                    backgroundColor: "#F4F4F4",
                    borderRadius: "50%",
                    height: "12.5px",
                    width: "12.5px",
                    transform: "translateX(9px) translateY(-18px)",
                  }}
                ></div>
              </div>
              <div style={{ marginLeft: "8px" }}>
                <div
                  style={{
                    backgroundColor: "#F4F4F4",
                    borderRadius: "50%",
                    flexGrow: "0",
                    height: "20px",
                    width: "20px",
                  }}
                ></div>
                <div
                  style={{
                    width: "0",
                    height: "0",
                    borderTop: "2px solid transparent",
                    borderLeft: "6px solid #f4f4f4",
                    borderBottom: "2px solid transparent",
                    transform:
                      "translateX(16px) translateY(-4px) rotate(30deg)",
                  }}
                ></div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <div
                  style={{
                    width: "0px",
                    borderTop: "8px solid #F4F4F4",
                    borderRight: "8px solid transparent",
                    transform: "translateY(16px)",
                  }}
                ></div>
                <div
                  style={{
                    backgroundColor: "#F4F4F4",
                    flexGrow: "0",
                    height: "12px",
                    width: "16px",
                    transform: "translateY(-4px)",
                  }}
                ></div>
                <div
                  style={{
                    width: "0",
                    height: "0",
                    borderTop: "8px solid #F4F4F4",
                    borderLeft: "8px solid transparent",
                    transform: "translateY(-4px) translateX(8px)",
                  }}
                ></div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#F4F4F4",
                  borderRadius: "4px",
                  flexGrow: "0",
                  height: "14px",
                  marginBottom: "6px",
                  width: "224px",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "#F4F4F4",
                  borderRadius: "4px",
                  flexGrow: "0",
                  height: "14px",
                  width: "144px",
                }}
              ></div>
            </div>
          </a>
          <p
            style={{
              color: "#c9c8cd",
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
              lineHeight: "17px",
              marginBottom: 0,
              marginTop: "8px",
              overflow: "hidden",
              padding: "8px 0 7px",
              textAlign: "center",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <a
              href="https://www.instagram.com/p/DE4IZAURGFU/?utm_source=ig_embed&amp;utm_campaign=loading"
              style={{
                color: "#c9c8cd",
                fontFamily: "Arial, sans-serif",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "normal",
                lineHeight: "17px",
                textDecoration: "none",
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              バンクーバーのお家🇨🇦 |
              渡航前にシェアハウスを選べる(@vancouver.no.ouchi)がシェアした投稿
            </a>
          </p>
        </div>
      </blockquote>
    </SectionWrapper>
  );
};
