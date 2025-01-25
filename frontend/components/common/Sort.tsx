"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { optionType } from "@/config/commonOptions";
import { createQueryString } from "@/utlis/queryStringHelper";
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

/**
 * 表示順選択 共通コンポーネント
 * sortOptions　{optionType[]}
 */
function Sort({ sortOptions }: { sortOptions: optionType[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 選択中のラベルを管理する状態
  const [selectedLabel, setSelectedLabel] = useState<string>("新着順");

  // クエリパラメータから値を取得して初期化
  useEffect(() => {
    const sortQuery = searchParams.get("sort");
    const selectedOption = sortOptions.find(
      (option) => option.value === sortQuery
    );

    if (selectedOption) {
      // クエリに基づいて選択ラベルを更新
      setSelectedLabel(selectedOption.label);
    } else {
      // クエリがない場合はデフォルトに設定
      setSelectedLabel("新着順");
    }
  }, [searchParams]);

  /**
   * 表示順選択切り替え
   */
  const handleChangeSort = (value: string) => {
    const selectedOption = sortOptions.find((option) => option.value === value);

    if (selectedOption) {
      // 選択中のラベルを更新
      setSelectedLabel(selectedOption.label);
      router.push(
        pathname + "?" + createQueryString(searchParams, "sort", value)
      );
    } else {
      // 万が一選択されていない場合、デフォルト -> 新着順
      setSelectedLabel("新着順");
      router.push(pathname);
    }
  };

  return (
    <Select
      onValueChange={handleChangeSort}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <SelectTrigger className="flex items-center justify-center gap-1 border-none px-0">
        <span className="text-sm">表示: {selectedLabel}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </SelectTrigger>
      <SelectContent className="w-[150px] z-50">
        <SelectGroup>
          {sortOptions.map((item, index) => (
            <SelectItem
              value={item.value}
              key={index}
              onTouchStart={() => console.log("Touched", item.label)}
              onClick={() => console.log("Clicked", item.label)}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export { Sort };
