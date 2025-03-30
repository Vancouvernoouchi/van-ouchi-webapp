"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { CATEGORY_LIST } from "../Categories";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * パンクズリスト共通コンポーネント
 *
 * @param pageName {string} ページのタイトル等
 */
function BreadcrumbComponent({ pageName }: { pageName: string }) {
  const router = useRouter();
  const [prevPath, setPrevPath] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 直前のページの URL を取得
      const storedPrevPath = sessionStorage.getItem("prevPath");
      setPrevPath(storedPrevPath);

      // 現在のページの URL を取得
      const path = window.location.pathname;
      setCurrentPath(path);

      // 次回のために現在のページを保存
      sessionStorage.setItem("prevPath", path);
    }
  }, []);

  // カテゴリを取得
  const category = CATEGORY_LIST.find((c) =>
    currentPath.startsWith(c.pathname)
  );

  /**
   * パンクズで戻る
   */
  const backToList = () => {
    if (prevPath && prevPath.includes(category?.pathname ?? "")) {
      router.back();
    } else {
      router.push(category?.pathname ?? "");
    }

    if (typeof window !== "undefined") {
      sessionStorage.removeItem("prevPath"); // 検索条件などを削除
    }
  };

  return (
    <div className="pb-4 flex items-start w-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="cursor-pointer hover:text-bloom-black"
              onClick={backToList}
            >
              {category?.name ?? ""}一覧
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-bloom-gray">
              {pageName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

/** @package */
export { BreadcrumbComponent };
