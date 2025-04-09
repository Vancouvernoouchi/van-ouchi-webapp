"use client";

import { Suspense, useEffect, useState } from "react";
import { Globe, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SearchBar } from "../index";
import { LINKS } from "@/constants/common/links";
import { JP, CA, CN, FlagComponent } from "country-flag-icons/react/3x2";
import Image from "next/image";
import Link from "next/link";

interface HeaderOptions {
  name: string;
  href: string;
  isExternalLink: boolean; // 外部リンクかどうか
}

export const headerOptions: HeaderOptions[] = [
  // {
  //   name: "ホーム",
  //   href: "/",
  //   isExternalLink: false,
  // },
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
  // {
  //   name: "英語レッスン",
  //   href: LINKS.THREADS,
  //   isExternalLink: true,
  // },
  // {
  //   name: "会社情報",
  //   href: "/company",
  //   isExternalLink: false,
  // },
  {
    name: "お問い合わせ",
    href: LINKS.INSTAGRAM,
    isExternalLink: true,
  },
  {
    name: "家を探されている方",
    href: LINKS.SERVICE_TENANT,
    isExternalLink: true,
  },
  {
    name: "物件掲載希望の方",
    href: LINKS.SERVICE_LANDLORD,
    isExternalLink: true,
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

/**
 * ヘッダーコンポーネント
 */
const Header = () => {
  const [language, setLanguage] = useState<Language>("japanese");
  const router = useRouter();
  const pathname = usePathname();
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => {
    // 現在のパス（pathname）に基づいて言語を設定
    if (pathname.includes("/english")) {
      setLanguage("english");
    } else if (pathname.includes("/chinese")) {
      setLanguage("chinese");
    } else {
      setLanguage("japanese"); // デフォルトは日本語
    }
  }, [pathname]);

  const selectLanguage = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);

    //　現在パスのまま他言語パスを削除
    if (selectedLanguage === "japanese") {
      const newPath = pathname.replace(/^\/(english|chinese)/, "");
      router.push(`/${newPath}`);
    }

    // 英語選択時、必ず/englishに遷移
    else if (selectedLanguage === "english") {
      router.push(`${origin}/english`);
    }

    // 中国語選択時、必ず/chineseに遷移
    else if (selectedLanguage === "chinese") {
      router.push(`${origin}/chinese`);
    }
  };

  return (
    <header className="flex h-16 lg:h-20 justify-center bg-white border-b">
      <div className="base-px relative z-50 w-screen flex items-center justify-between gap-4">
        {/* Bloomロゴ */}
        <Link
          tabIndex={10}
          href="/properties"
          className="flex items-center gap-2 whitespace-nowrap cursor-pointer w-36 lg:w-48"
        >
          <Image
            src="/bloomLogo/bloom.png"
            width={200}
            height={70}
            alt="Bloom"
            unoptimized={true}
          />
        </Link>

        {/* 検索バー スマホサイズでは非表示 */}
        {pathname === "/properties" && (
          <Suspense>
            <div className="hidden sm:block w-[50%] lg:w-[400px]">
              <SearchBar />
            </div>
          </Suspense>
        )}

        {/* メニュー選択 */}
        <NavMenu />
      </div>
    </header>
  );
};

/**
 * ナブメニューコンポーネント
 */
const NavMenu = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Select
      onValueChange={(value) => {
        const selectedHeader = headerOptions.find(
          (header) => header.href === value
        );
        if (selectedHeader) {
          if (selectedHeader.isExternalLink) {
            // 別タブで開く場合
            window.open(selectedHeader.href, "_blank", "noopener,noreferrer");
          } else {
            // 通常の遷移
            router.push(selectedHeader.href);
          }
        }
      }}
    >
      <SelectTrigger
        tabIndex={13}
        role="button"
        aria-label="ハンバーガーメニュー"
        className="w-12 h-12 cursor-pointer flex items-center justify-end border-none p-0 hover:text-bloom-gray"
      >
        <Menu size={22} />
      </SelectTrigger>
      <SelectContent position={undefined}>
        <SelectGroup>
          {headerOptions.map((header, index) => {
            // 現在のリンクがアクティブかどうか
            const isActive =
              header.href === "/"
                ? pathname === header.href // ルートパスは厳密一致
                : pathname === header.href ||
                  pathname.startsWith(`${header.href}/`);

            return (
              <SelectItem
                // tabIndex={20 + index}
                key={header.href}
                value={header.href}
                className={`${
                  isActive ? "text-black" : "text-bloom-gray"
                } px-8 py-2`}
                showCheckIcon={false}
              >
                {header.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

/**
 * 言語切り替えコンポーネント（PC用）
 * ＠params language {Language}
 * @params selectedLanguage {(selectedLanguage: Language) => void}
 */
const LanguageSelectPC = ({
  language,
  selectLanguage,
}: {
  language: Language;
  selectLanguage: (selectedLanguage: Language) => void;
}) => {
  return (
    <Select
      onValueChange={(event: Language) => selectLanguage(event)}
      defaultValue={language}
    >
      <SelectTrigger className="w-[110px] cursor-pointer hover:bg-gray-100">
        <Globe size={18} />
        <span>Language</span>
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {LanguageOptions.map(({ code, name, Flag }, index) => (
            <SelectItem key={code} value={code}>
              <div className="flex items-center gap-1">
                <Flag className="w-4 p-0 border" />
                <span>{name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

/** @package */
export { Header };
