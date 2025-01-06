"use client";
import Link from "next/link";
import {
  headerOptions,
  Language,
  LanguageOptions,
} from "@/config/headerOptions";
import { useEffect, useState } from "react";
import { Check, ChevronRight, Globe, Menu, X } from "lucide-react";
import OuchiLogo from "../atoms/common/OuchiLogo";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { LINKS } from "@/constants/links";

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
    <header className="flex h-16 lg:h-24 justify-center bg-white border-b">
      <div className="base-px relative z-50 w-screen flex items-center justify-between">
        {/* バンクーバーのお家ロゴ */}
        <OuchiLogo />

        {/* PC */}
        <div className="hidden lg:block">
          <NavMenuPC language={language} selectLanguage={selectLanguage} />
        </div>

        {/* スマホ */}
        <div className="block lg:hidden">
          <NavMenuMobile language={language} selectLanguage={selectLanguage} />
        </div>
      </div>
    </header>
  );
};

/**
 * ヘッダーナビゲーション　（PC用）
 * ＠params language {Language}
 * @params selectedLanguage {(selectedLanguage: Language) => void}
 */
const NavMenuPC = ({
  language,
  selectLanguage,
}: {
  language: Language;
  selectLanguage: (selectedLanguage: Language) => void;
}) => {
  return (
    <nav className="flex flex-col gap-1.5">
      <div className="flex justify-end gap-4">
        <Link
          className="px-4 py-2 text-sm bg-themeColor text-white rounded-full flex items-center justify-center hover:opacity-80"
          // TODO: ページ完成したらリンク先変更
          href={LINKS.SERVICE_TENANT}
          target="_blank"
        >
          家を探されている方
        </Link>
        <Link
          className="px-4 py-2 text-sm bg-red-600 text-white rounded-full flex items-center justify-center  hover:opacity-80"
          // TODO: ページ完成したらリンク先変更
          href={LINKS.SERVICE_LANDLORD}
          target="_blank"
        >
          物件掲載希望の方
        </Link>

        {/* 言語選択エリア */}
        {/* <LanguageSelectPC language={language} selectLanguage={selectLanguage} /> */}
      </div>

      <ul className="flex items-center gap-6">
        {headerOptions.slice(0, 4).map((header) => (
          <li key={header.href} className="text-sm">
            <Link
              href={header.href}
              className="hover:opacity-60"
              // 外部リンクの時、別タブで開く
              target={header.isExternalLink ? "_blank" : undefined}
              rel={header.isExternalLink ? "noopener noreferrer" : undefined}
            >
              {header.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

/**
 * ヘッダーナビゲーション　（スマホ用)
 * ＠params language {Language}
 * @params selectedLanguage {(selectedLanguage: Language) => void}
 */
const NavMenuMobile = ({
  language,
  selectLanguage,
}: {
  language: Language;
  selectLanguage: (selectedLanguage: Language) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex flex-1 items-center justify-end space-x-4 overflow-y-auto">
      <nav className="flex items-center space-x-1">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="text-base hover:bg-transparent focus:ring-0 lg:hidden p-0"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="p-0 border-0 max-h-screen overflow-y-auto"
          >
            <nav className="flex flex-col pt-8">
              <span
                className={`p-4 text-sm font-semibold ${
                  pathname === "/" ? "border-0" : "border-b"
                }`}
              >
                メニュー
              </span>
              {headerOptions.map((header, index) => {
                // 現在のリンクがアクティブかどうか
                const isActive =
                  header.href === "/"
                    ? pathname === header.href // ルートパスは厳密一致
                    : pathname === header.href ||
                      pathname.startsWith(`${header.href}/`);

                // 次のリンクがアクティブかどうか
                const isNextActive =
                  index < headerOptions.length - 1 &&
                  pathname === headerOptions[index + 1].href;

                return (
                  <Link
                    key={header.name}
                    href={header.href}
                    className={`h-12 flex justify-between items-center ${
                      isActive
                        ? "border-b border-t border-l-4 border-themeColor bg-grayThemeColor text-themeColor"
                        : ""
                    } ${
                      isNextActive ? "border-b-0" : "border-b" // 次の要素がアクティブならborder-bを削除
                    }`}
                    onClick={() => setIsOpen(false)}
                    // 外部リンクの時、別タブで開く
                    target={header.isExternalLink ? "_blank" : undefined}
                    rel={
                      header.isExternalLink ? "noopener noreferrer" : undefined
                    }
                  >
                    <span className="pl-4 text-sm">{header.name}</span>
                    <ChevronRight className="pr-2" />
                  </Link>
                );
              })}
              {/* <LanguageSelectMobile
                language={language}
                selectLanguage={selectLanguage}
              /> */}

              <div className="pt-4 pb-10 px-4">
                <span className="text-sm font-semibold">FOLLOW US</span>
                <div className="flex items-center gap-4 pt-4">
                  <Link href={LINKS.INSTAGRAM} target="_blank">
                    <Image
                      src="/instagram_logo.png"
                      alt="Instagram"
                      width={30}
                      height={30}
                    />
                  </Link>
                  <Link href={LINKS.THREADS} target="_blank">
                    <Image
                      src="/threads_logo.png"
                      alt="Threads"
                      width={30}
                      height={30}
                    />
                  </Link>
                  <Link href={LINKS.X} target="_blank">
                    <Image src="/x_logo.png" alt="X" width={30} height={30} />
                  </Link>
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
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

/**
 * 言語切り替えコンポーネント（スマホ用）
 * ＠params language {Language}
 * @params selectedLanguage {(selectedLanguage: Language) => void}
 */
const LanguageSelectMobile = ({
  language,
  selectLanguage,
}: {
  language: Language;
  selectLanguage: (selectedLanguage: Language) => void;
}) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={language} className="border-0">
        <AccordionTrigger className="h-12 pl-4 pr-2 w-full flex items-center gap-2 no-underline hover:no-underline border-b">
          <div className="flex items-center gap-2">
            <Globe size={16} />
            <span className="text-sm font-normal">Language</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-0">
          <ul>
            {LanguageOptions.map(({ code, name, Flag }) => (
              <div
                key={code}
                className="h-10 px-6 flex items-center gap-1 border-b"
                onClick={() => selectLanguage(code)}
              >
                {language === code ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <div className="w-4 h-4"></div>
                )}
                <Flag className="w-4 p-0 border" />
                <span>{name}</span>
              </div>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Header;
