import { ReadMore } from "@/components/common";
import { Tab } from "@/components/common";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AmenitiesProps } from "@/types/notionTypes";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  CircleDollarSign,
  Copy,
  HandCoins,
  Instagram,
  LandPlot,
  Map,
  TrainFront,
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { MapNotFound } from "@/components/common/map";
import { MESSAGES } from "@/constants/common/messages";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation";

/**
 * 各セクションのラッパーコンポーネント
 * pyを統一するものだが、その他のスタイリングもclassNameで適用できる
 *
 * @param className {string}
 * @param children {ReactNode}
 */
export const SectionWrapper = ({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div id={id} className={`pt-3 pb-8 sm:pt-5 sm:pb-10 border-b ${className}`}>
      {children}
    </div>
  );
};

/**
 * 項目のタイトルコンポーネント
 *
 * @param title {string}
 */
export const SectionTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h5
      className={`text-base sm:text-xl font-semibold tracking-widest py-4 ${className}`}
    >
      {title}
    </h5>
  );
};

/**
 * パンクズリストコンポーネント
 *
 * @param currentPageName {string}　- 現在のページの名前
 */
export const BreadcrumbArea = ({ label }: { label: string }) => {
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
    <Breadcrumb>
      <BreadcrumbList>
        {/* TODO: ルートにホームページを作ったらこれ使う */}
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
          <BreadcrumbPage className="text-bloom-gray">{label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
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
    <div id="images">
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
              className="inline-block p-2 shadow-lg text-white absolute bottom-0 left-0 w-full bg-bloom-blue bg-opacity-70 hover:bg-opacity-100 text-center"
            >
              もっと見る
            </a>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-bloom-gray">
            画像がありません
          </div>
        )}
      </div>
      {imgUrl && (
        <p className="flex items-center justify-end gap-1 pt-1 text-xs text-bloom-gray">
          ※ 写真は撮影時のものです。現状を優先いたします。
        </p>
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
    <div className="flex justify-center items-center gap-1 px-2 sm:px-6 py-2 min-h-24 border border-bloom-blue rounded-md shadow-md">
      <Icon className="flex items-center justify-center text-bloom-blue w-8 h-8" />
      <div className="flex flex-col items-center justify-center w-full text-sm sm:text-base">
        <p className="font-bold text-bloom-blue">{label}</p>
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
    <SectionWrapper id="basic-info">
      <SectionTitle title="基本情報" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
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
      </div>
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
    <SectionWrapper id="conditions">
      <SectionTitle title="入居条件" />
      <Table className="border border-bloom-blue tracking-wider">
        <TableBody>
          {conditions.map((condition) => (
            <TableRow key={condition.name}>
              <TableCell className="font-semibold border bg-bloom-lightBlue text-bloom-blue border-bloom-blue">
                {condition.name}
              </TableCell>
              <TableCell className="border border-bloom-blue">
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
    <SectionWrapper id="facilities">
      <SectionTitle title="設備" />
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {amenities.map((amenity) => {
          const Icon = amenity.icon;

          return (
            <div
              key={amenity.message}
              className="flex flex-col items-center gap-2"
            >
              <Icon
                className={`w-20 h-20 p-5 rounded-md font-thin ${
                  amenity.value
                    ? "bg-bloom-lightBlue text-bloom-blue"
                    : "bg-gray-200 text-gray-300"
                }`}
              />
              <div
                className={`${
                  amenity.value ? "text-bloom-blue" : "text-bloom-gray"
                }`}
              >
                {amenity.message}
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

/**
 * おすすめポイントコンポーネント
 *
 * @param text {string}
 */
export const RecommendPoint = ({ text }: { text: string }) => {
  return (
    <SectionWrapper id="point">
      <SectionTitle title="おすすめポイント" />
      {text ? (
        <>
          {/* 文章の表示エリア */}
          <div className="hidden sm:block">
            <div className="whitespace-pre-line text-sm ">{text}</div>
          </div>

          <div className="block sm:hidden">
            <ReadMore text={text} />
          </div>
        </>
      ) : (
        <div className="py-10">現在更新中</div>
      )}
    </SectionWrapper>
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
    <SectionWrapper id="map">
      {/* TODO: 郵便番号でエリア表示させるように修正するまで一旦非表示 */}
      {/* <GoogleMapMarker
        geoPosition={geoPosition}
        className=" w-full h-[400px]"
      /> */}
      <SectionTitle title="アクセスマップ" />
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
    <SectionWrapper id="neighbors">
      <SectionTitle title="周辺情報" />
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
 * お問い合わせコンポーネント
 *
 */
export const ContactCard = () => {
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
    <SectionWrapper id="contact" className="lg:pt-0">
      <SectionTitle title="お問い合わせ" className="lg:pt-0" />
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
        <div className="text-sm py-2 text-center text-bloom-blue font-semibold">
          \ お問い合わせはこちらから /
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <div className="pb-2 text-sm">①この物件のリンクをコピー</div>
            <div className="relative">
              <Input
                value={url}
                onChange={() => {}} // これがないとWarningが出る
                className="pr-14 text-bloom-gray border border-bloom-blue"
              />
              <div className="absolute right-3 top-3 flex items-center gap-1 text-sm text-bloom-blue">
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
              <div className="flex items-center justify-center gap-3 w-full  bg-bloom-lightBlue text-bloom-blue border border-bloom-blue py-3 rounded-lg cursor-pointer hover:opacity-70">
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
    <SectionWrapper id="about-us">
      <SectionTitle title="バンクーバーのお家について" />
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

/**
 * 右下、『まずは無料相談』コンポーネント（スマホ）
 *
 */
export const ContactPopUpSP = () => {
  return (
    <Link
      className="fixed bottom-0 right-0 bg-bloom-red text-white flex items-center gap-1 tracking-widest p-3 rounded-tl-lg z-50"
      href="https://www.instagram.com/vancouver.no.ouchi/"
      target="_blank"
    >
      <div className="font-semibold">まずは無料相談</div>
      <ArrowRight />
    </Link>
  );
};

/**
 * 右下、『まずは無料相談』コンポーネント（パソコン）
 *
 */
export const ContactPopUpPC = () => {
  return (
    <Link
      className="fixed sm:bottom-10 sm:right-10 h-32 w-32 rounded-full bg-bloom-red text-white flex flex-col items-center justify-center gap-1 tracking-widest hover:scale-105 z-50"
      href="https://www.instagram.com/vancouver.no.ouchi/"
      target="_blank"
    >
      <div>まずは</div>
      <div className="font-semibold">無料相談</div>
      <ArrowRight />
    </Link>
  );
};
