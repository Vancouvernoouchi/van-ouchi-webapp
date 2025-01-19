"use client";
import {
  headerOptions,
  Language,
  LanguageOptions,
} from "@/config/headerOptions";
import { Suspense, useEffect, useState } from "react";
import { Globe, Menu } from "lucide-react";
import OuchiLogo from "../common/OuchiLogo";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import SearchBar from "../molecules/propertyList/SearchBar";
import { usePathname, useRouter } from "next/navigation";

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
        {/* バンクーバーのお家ロゴ */}
        <OuchiLogo />

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
    <Select>
      <SelectTrigger className="w-12 h-12 cursor-pointer flex items-center justify-end border-none p-0 hover:text-gray-500">
        <Menu size={22} />
      </SelectTrigger>
      <SelectContent position={undefined}>
        <SelectGroup>
          {headerOptions.map((header) => {
            // 現在のリンクがアクティブかどうか
            const isActive =
              header.href === "/"
                ? pathname === header.href // ルートパスは厳密一致
                : pathname === header.href ||
                  pathname.startsWith(`${header.href}/`);

            const handleClick = () => {
              if (header.isExternalLink) {
                // 別タブで開く場合
                window.open(header.href, "_blank", "noopener,noreferrer");
              } else {
                // 通常の遷移
                router.push(header.href);
              }
            };

            return (
              <SelectItem
                key={header.href}
                value={header.name}
                className={`${
                  isActive ? "text-black" : "text-gray-500"
                } px-8 py-2`}
                onClick={handleClick}
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
          {LanguageOptions.map(({ code, name, Flag }) => (
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

export default Header;
