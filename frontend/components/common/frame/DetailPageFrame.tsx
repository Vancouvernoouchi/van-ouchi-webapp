import { ReactNode } from "react";
import { DetailPageHeader, DetailPageHeaderOption } from "../header";
import { cn } from "@/lib/utils";

/**
 * 全ての詳細ページに共通するフレームコンポーネント
 * ＠params detailHeaderList {DetailPageHeaderOption[]} - 詳細画面用のヘッダーリスト
 * ＠params children {ReactNode}
 */
function DetailPageFrame({
  detailHeaderList,
  children,
  className,
}: {
  detailHeaderList?: DetailPageHeaderOption[];
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-4 sm:px-12 lg:px-22 xl:px-32 py-4", className)}>
      {detailHeaderList && (
        <DetailPageHeader headerOptions={detailHeaderList} />
      )}
      {children}
    </div>
  );
}

export { DetailPageFrame };
