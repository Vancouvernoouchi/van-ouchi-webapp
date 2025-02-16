import { formatDateToYMD } from "@/components/features/property/FilterDialog";
import { AREA_DESCRIPTION } from "@/constants/common";
import {
  Area,
  DateProperty,
  NotionProperty,
  PropertyCardData,
  PropertyDetailData,
} from "@/types/notionTypes";
import { Circle, X } from "lucide-react";
export const getPropertyValue = (
  property: any, // ex) p.properties.エリア
  type: string,
  unitType?: "people" | "dollar"
): any => {
  let value: string | JSX.Element | null = null;

  // 例外
  // 男性・女性限定
  if (type === "対象") {
    value = property;
  }
  if (type === "入居日") {
    value = property;
  }

  // 通常
  switch (type) {
    case "title":
      value = property?.title?.[0]?.plain_text || null;
      break;
    case "status":
      value = property?.status?.name || null;
      break;
    case "date":
      value = property?.date?.start || null;
      break;
    case "number":
      value = property?.number || "確認中";
      break;
    case "select":
      value = property?.select?.name || "確認中";
      break;
    case "file":
      value = property?.files?.[0]?.file?.url || null;
      break;
    case "url":
      value = property?.url;
      break;
    case "checkbox":
      value = property?.checkbox ? (
        <Circle className="w-4 h-4 mt-1" />
      ) : (
        <X className="w-4 h-4 mt-1" />
      );
      break;
    case "checkbox-filter":
      value = property?.checkbox ? "true" : "false";
      break;
    case "rich_text":
      value = property?.rich_text?.[0]?.plain_text || null;
      break;
    default:
      return value;
  }

  if (value === undefined) {
    return value;
  }

  if (value && unitType) {
    switch (unitType) {
      case "people":
        value += " 人";
        break;
      case "dollar":
        value = "$ " + value;
        break;
    }
  }

  return value;
};

export const getStartDate = (
  status: string,
  MoveOutDay: DateProperty,
  MoveInDay: DateProperty,
  useBr: boolean
) => {
  switch (status) {
    case "入居中":
    case "成約済み":
      return (
        (
          <>
            {getPropertyValue(MoveOutDay, "date")} {useBr && <br />}(
            <span className="font-bold">退去</span>予定日)
          </>
        ) || null
      );
    case "即入居可能": // 入居日可能日 || 今日の日付
      return (
        <>
          {getPropertyValue(MoveInDay, "date") || formatDateToYMD(new Date())}
        </>
      );
    default:
      return (
        (
          <>
            {getPropertyValue(MoveInDay, "date")} {useBr && <br />}(
            <span className="font-bold">入居</span>可能日)
          </>
        ) || null
      );
  }
};

export const matchParams = (
  params: string | undefined,
  property: any, // p.properties.エリア
  type: string
) => {
  const paramsArray = params ? params.split("%") : [];
  return paramsArray.length > 0
    ? paramsArray.includes(getPropertyValue(property, type))
    : true;
};

/**
 * fechした物件データをkeyとvalueに整理する関数（詳細ページ用）
 *
 * @param data {NotionProperty}
 * @return {PropertyDetailData}
 */
export const formatPropertyDetailData = (
  data: NotionProperty
): PropertyDetailData | null => {
  // propertiesが存在しない場合はnullを返す
  if (!data || !data.properties) {
    return null;
  }

  return {
    id: data.id,
    moveInDate: data.properties["入居可能日"]?.date?.start || null,
    image: data.properties["物件写真"]?.url || null,
    hasSauna: data.properties["サウナ"]?.checkbox || false,
    minimumStay: data.properties["ミニマムステイ"]?.select?.name || null,
    bathroomShareCount:
      data.properties["バスルームのシェア人数"]?.select?.name || null,
    rent: data.properties["家賃"]?.number || 0,
    status: data.properties["ステータス"]?.status?.name || null,
    forCouple: data.properties["カップル可"]?.checkbox || false,
    deposit: data.properties["デポジット"]?.number || 0,
    inquiryForm: data.properties["お問い合わせフォーム"]?.url || null,
    closestStation: data.properties["最寄り駅"]?.select?.name || null,
    geoPosition:
      data.properties["マップ表示用座標"]?.rich_text?.[0]?.plain_text || null,
    roommatesGender: data.properties["住居人の性別"]?.select?.name || null,
    hasKey: data.properties["鍵付き"]?.checkbox || false,
    area: data.properties["エリア"]?.select?.name || null,
    forMale: data.properties["男性限定"]?.checkbox || false,
    staffComment:
      data.properties["スタッフからのコメント"]?.rich_text?.[0]?.plain_text ||
      null,
    hasPool: data.properties["プール"]?.checkbox || false,
    moveOutDate: data.properties["退去予定日"]?.date?.start || null,
    forFemale: data.properties["女性限定"]?.checkbox || false,
    hasWifi: data.properties["Wifi込み"]?.checkbox || false,
    hasUtilities: data.properties["光熱費込み"]?.checkbox || false,
    timeToStation: data.properties["最寄り駅まで"]?.select?.name || null,
    kitchenShareCount:
      data.properties["キッチンのシェア人数"]?.select?.name || null,
    hasLaundry: data.properties["ランドリー無料"]?.checkbox || false,
    hasGym: data.properties["ジム"]?.checkbox || false,
    thumbnail: data.properties["サムネイル"]?.files?.[0]?.file?.url || null,
    zone: data.properties["ゾーン"]?.select?.name || null,
    houseShareCount: data.properties["物件のシェア人数"]?.select?.name || null,
    title:
      data.properties["メインタイトル"]?.rich_text?.[0]?.text?.content || null,
    roomName: data.properties["タイトル"]?.title?.[0]?.text?.content || null,
    closestBusStop:
      data.properties["最寄りバス路線"]?.rich_text?.[0]?.text?.content || null,
    timeToBusStop:
      data.properties["最寄りバス停まで"]?.multi_select[0].name || null,
  };
};

/**
 * fechした物件データをkeyとvalueに整理する関数（カード用）
 *
 * @param data {NotionProperty}
 * @return {PropertyCardData}
 */
export const formatPropertyCardData = (
  data: NotionProperty
): PropertyCardData | null => {
  // propertiesが存在しない場合はnullを返す
  if (!data || !data.properties) {
    return null;
  }

  return {
    id: data.id,
    moveInDate: data.properties["入居可能日"]?.date?.start || null,
    image: data.properties["物件写真"]?.url || null,
    rent: data.properties["家賃"]?.number || 0,
    status: data.properties["ステータス"]?.status?.name || null,
    closestStation: data.properties["最寄り駅"]?.select?.name || null,
    area: data.properties["エリア"]?.select?.name || null,
    moveOutDate: data.properties["退去予定日"]?.date?.start || null,
    timeToStation: data.properties["最寄り駅まで"]?.select?.name || null,
    thumbnail: data.properties["サムネイル"]?.files?.[0]?.file?.url || null,
    zone: data.properties["ゾーン"]?.select?.name || null,
    title:
      data.properties["メインタイトル"]?.rich_text?.[0]?.text?.content || null,
    roomName: data.properties["タイトル"]?.title?.[0]?.text?.content || null,
  };
};

export const getAreaDiscription = (area: Area) => {
  // nullのエラー回避
  if (!area) {
    return "";
  }

  if (area === "ダウンタウン") {
    return AREA_DESCRIPTION.DOWNTOWN;
  } else if (area === "イーストバンクーバー") {
    return AREA_DESCRIPTION.EAST_VANCOUVER;
  } else if (area === "ウェストバンクーバー") {
    return AREA_DESCRIPTION.WEST_VANCOUVER;
  } else if (area === "サウスバンクーバー") {
    return AREA_DESCRIPTION.SOUTH_VANCOUVER;
  } else if (area === "ノースバンクーバー") {
    return AREA_DESCRIPTION.NORTH_VANCOUVER;
  } else if (area === "バーナビー") {
    return AREA_DESCRIPTION.BURNABY;
  } else if (area === "リッチモンド") {
    return AREA_DESCRIPTION.RICHMOND;
  } else {
    return "更新中";
  }
};

/**
 * ステータスに応じた色を返す関数
 * カードと詳細ページで使用予定
 *
 * @param status {string}
 * @return { { statusBgColor: string, statusTextColor: string } }
 */
export const getStatusColor = (
  status: string
): { statusBgColor: string; statusTextColor: string } => {
  let statusBgColor = "white";
  let statusTextColor = "black";

  if (status === "入居中" || status === "成約済み" || status === "休止中") {
    statusBgColor = "slate-200";
    statusTextColor = "black";
  } else if (status === "即入居可能") {
    statusBgColor = "red-500";
    statusTextColor = "white";
  } else if (status === "入居者募集中") {
    statusBgColor = "yellow-500";
    statusTextColor = "white";
  }

  return { statusBgColor, statusTextColor };
};

/**
 * 日付が今日または過去であるかを判定
 *
 * @param dateString {string} - 判定する日付（例: "2025-01-01"）
 * @returns {boolean} - 今日または過去なら true、それ以外なら false
 */
export const isTodayOrPast = (dateString: string): boolean => {
  const targetDate = new Date(dateString);

  // 今日の日付を取得し、時刻を 0:00:00 にリセット
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 今日または過去の日付であれば true を返す
  return targetDate <= today;
};

/**
 * 現在募集中かどうか判定
 *
 * @param status {string}
 * @returns {boolean} - 入居者募集中or即日入居可能の場合true
 */
export const isAvailable = (status: string): boolean => {
  return status === "入居者募集中" || status === "即入居可能";
};

/**
 * 日付を2025-01-01から2025年1月1日に変換する
 *
 * @param dateString {string} - 例：　２０２５−０１−０１
 * @return {string} - 例：　2025年1月1日
 */
export const formatDateToJapanese = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}年${month}月${day}日`;
};

/**
 * 入居可能日の表示を整える関数
 *
 * @param moveInDate {string} - 例：　２０２５−０１−０１
 * @param moveOutDate {string} - 例：　２０２５−０１−０１
 * @param status
 *
 * @return {string} - statusに応じた入居可能日の表示
 */
export const formatMoveInDate = (moveInDate: string): string => {
  // 入居日がnullのとき、「確認中」を表示
  if (!moveInDate) {
    return "確認中";
  }

  // 日本語表記にして表示
  return formatDateToJapanese(moveInDate);
};
