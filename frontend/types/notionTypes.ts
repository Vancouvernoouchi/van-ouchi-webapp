import { LucideIcon } from "lucide-react";

// 日付プロパティに関する型定義
export type DateProperty = {
  id: string;
  type: "date";
  date: {
    start: string | null;
    end: string | null;
    time_zone: string | null;
  } | null;
};

// URLプロパティに関する型定義
type URLProperty = {
  id: string;
  type: "url";
  url: string | null;
};

// チェックボックスプロパティに関する型定義
type CheckboxProperty = {
  id: string;
  type: "checkbox";
  checkbox: boolean;
};

// 選択プロパティに関する型定義
type SelectProperty = {
  id: string;
  type: "select";
  select: {
    id: string;
    name: string;
    color: string;
  } | null;
};

// 数値プロパティに関する型定義
type NumberProperty = {
  id: string;
  type: "number";
  number: number | null;
};

// ステータスプロパティに関する型定義
type StatusProperty = {
  id: string;
  type: "status";
  status: {
    id: string;
    name: string;
    color: string;
  } | null;
};

// リッチテキストプロパティに関する型定義
type RichTextProperty = {
  id: string;
  type: "rich_text";
  rich_text: {
    type: string;
    text: {
      content: string;
      link: string | null;
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href: string | null;
  }[];
};

// ファイルプロパティに関する型定義
type FilesProperty = {
  id: string;
  type: "files";
  files: {
    name: string;
    type: "file";
    file: {
      url: string;
      expiry_time: string;
    };
  }[];
};

// タイトルプロパティに関する型定義
type TitleProperty = {
  id: string;
  type: "title";
  title: {
    type: "text";
    text: {
      content: string;
      link: string | null;
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: false;
      code: false;
      color: string;
    };
    plain_text: string;
    href: string | null;
  }[];
};

// プロパティデータに関する型定義
export type PropertyData = {
  入居可能日: DateProperty;
  物件写真: URLProperty;
  サウナ: CheckboxProperty;
  ミニマムステイ: SelectProperty;
  バスルームのシェア人数: SelectProperty;
  家賃: NumberProperty;
  ステータス: StatusProperty;
  カップル可: CheckboxProperty;
  デポジット: NumberProperty;
  お問い合わせフォーム: URLProperty;
  最寄り駅: SelectProperty;
  マップ表示用座標: RichTextProperty;
  住居人の性別: SelectProperty;
  鍵付き: CheckboxProperty;
  エリア: SelectProperty;
  男性限定: CheckboxProperty;
  スタッフからのコメント: RichTextProperty;
  プール: CheckboxProperty;
  退去予定日: DateProperty;
  女性限定: CheckboxProperty;
  Wifi込み: CheckboxProperty;
  光熱費込み: CheckboxProperty;
  最寄り駅まで: SelectProperty;
  キッチンのシェア人数: SelectProperty;
  ランドリー無料: CheckboxProperty;
  ジム: CheckboxProperty;
  サムネイル: FilesProperty;
  ゾーン: SelectProperty;
  物件のシェア人数: SelectProperty;
  タイトル: TitleProperty;
};

export interface NotionProperty {
  object: string;
  id: string;
  properties: Record<string, any>;
}

export interface PropertyDetailData {
  id: string;
  moveInDate: string;
  image: string;
  hasSauna: boolean;
  minimumStay: string;
  bathroomShareCount: string;
  rent: number;
  status: "即入居可能" | "入居者募集中" | "入居中" | "成約済み" | "休止中";
  forCouple: boolean;
  deposit: number;
  inquiryForm: string;
  closestStation: string;
  geoPosition: string;
  roommatesGender: string;
  hasKey: boolean;
  area: string;
  forMale: boolean;
  staffComment: string;
  hasPool: boolean;
  moveOutDate: string;
  forFemale: boolean;
  hasWifi: boolean;
  hasUtilities: boolean;
  timeToStation: string;
  kitchenShareCount: string;
  hasLaundry: boolean;
  hasGym: boolean;
  thumbnail: string;
  zone: string;
  houseShareCount: string;
  title: string;
  roomName: string;
}

export interface PropertyCardData {
  id: string;
  moveInDate: string;
  image: string;
  rent: number;
  status: string;
  closestStation: string;
  area: string;
  moveOutDate: string;
  timeToStation: string;
  thumbnail: string;
  zone: string;
  title: string;
  roomName: string;
}

// Notionページ全体の型定義
export interface NotionPage {
  object: "page";
  id: string;
  created_time: string;
  properties: PropertyData;
}

export interface AmenitiesProps {
  icon: LucideIcon;
  value: boolean;
  message: string;
}
