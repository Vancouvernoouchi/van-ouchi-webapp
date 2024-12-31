import { LINKS } from "@/app/_constants/links";
import { JP, CA, CN, FlagComponent } from "country-flag-icons/react/3x2";

interface HeaderOptionsProps {
  name: string;
  href: string;
  isExternalLink: boolean; // 外部リンクかどうか
}

export const headerOptions: HeaderOptionsProps[] = [
  {
    name: "ホーム",
    href: "/",
    isExternalLink: false,
  },
  {
    name: "シェアハウスを探す",
    href: "/properties",
    isExternalLink: false,
  },
  {
    name: "生活ガイド",
    href: LINKS.GUIDE,
    isExternalLink: true,
  },
  {
    name: "英語レッスン",
    href: LINKS.THREADS,
    isExternalLink: true,
  },
  {
    name: "会社情報",
    href: "/company",
    isExternalLink: false,
  },
  {
    name: "お問い合わせ",
    href: LINKS.INSTAGRAM,
    isExternalLink: true,
  },
  {
    name: "家を探されている方",
    href: "/tenant",
    isExternalLink: false,
  },
  {
    name: "物件掲載希望の方",
    href: "/landlord",
    isExternalLink: false,
  },
];

export type Language = "japanese" | "english" | "chinese";

interface LanguageOption {
  code: Language;
  name: string;
  Flag: FlagComponent;
}

export const LanguageOptions: LanguageOption[] = [
  { code: "japanese", name: "日本語", Flag: JP },
  { code: "english", name: "English", Flag: CA },
  { code: "chinese", name: "中文", Flag: CN },
];
