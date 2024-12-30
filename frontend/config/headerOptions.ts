import { LINKS } from "@/app/_constants/links";
import { JP, CA, CN, FlagComponent } from "country-flag-icons/react/3x2";

interface HeaderOptionsProps {
  name: string;
  href: string;
}

export const headerOptions: HeaderOptionsProps[] = [
  {
    name: "ホーム",
    href: "/",
  },
  {
    name: "シェアハウスを探す",
    href: "/properties",
  },
  {
    name: "生活ガイド",
    href: LINKS.GUIDE,
  },
  {
    name: "英語レッスン",
    href: LINKS.THREADS,
  },
  {
    name: "会社情報",
    href: "/company",
  },
  {
    name: "お問い合わせ",
    href: LINKS.INSTAGRAM,
  },
  {
    name: "家を探されている方",
    href: "/tenant",
  },
  {
    name: "物件掲載希望の方",
    href: "/landlord",
  },
];

export type Language = "jp" | "en" | "cn";

interface LanguageOption {
  code: Language;
  name: string;
  Flag: FlagComponent;
}

export const LanguageOptions: LanguageOption[] = [
  { code: "jp", name: "日本語", Flag: JP },
  { code: "en", name: "English", Flag: CA },
  { code: "cn", name: "中文", Flag: CN },
];
