"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { CircleX, Search } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/utils/queryStringHelper";
import { toast } from "sonner";

/**
 * 検索バー 共通コンポーネント
 */
function SearchBar() {
  const [keyword, setKeyword] = useState<string>("");
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // クエリパラメータからkeywordを取得して初期値としてセット
  useEffect(() => {
    const queryKeyword = searchParams.get("keyword") || "";
    setKeyword(queryKeyword);
  }, [searchParams]);

  const handleSearch = () => {
    const trimmedKeyword = keyword.trim();

    if (keyword.length > 0 && !trimmedKeyword) {
      toast.error("空白のみの入力では検索できません。", {
        position: "top-right",
        icon: <CircleX className="w-4 h-4 text-red-600" />,
      });
      return;
    }
    let updatedSearchParams = createQueryString(
      searchParams,
      "keyword",
      keyword
    );
    router.push(`${pathname}?${updatedSearchParams}`);
  };

  return (
    <div className="relative w-full">
      <Input
        tabIndex={11}
        type="search"
        placeholder="キーワード検索"
        className="w-full pr-14 pl-5 text-xs rounded-full shadow-sm" // 右側にアイコン分の余白を確保
        value={keyword}
        onChange={(e) => handleKeywordChange(e)}
      />
      <Button
        tabIndex={12}
        type="button"
        variant="outline"
        className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-bloom-blue flex items-center justify-center rounded-full w-8 h-8 p-0 border-0"
        onClick={handleSearch}
      >
        <Search className="text-white" />
      </Button>
    </div>
  );
}

export { SearchBar };
