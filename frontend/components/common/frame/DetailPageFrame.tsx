import { ReactNode } from "react";
import { DetailPageHeader, DetailPageHeaderOption } from "../header";
import { cn } from "@/lib/utils";
import { BreadcrumbComponent } from "../breadcrumb";

/**
 * 全ての詳細ページに共通するフレームコンポーネント
 * ＠params detailHeaderList {DetailPageHeaderOption[]} - 詳細画面用のヘッダーリスト
 * ＠params children {ReactNode}
 */
function DetailPageFrame({
  pageName = "詳細",
  detailHeaderList,
  children,
  className,
}: {
  pageName: string;
  detailHeaderList?: DetailPageHeaderOption[];
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className={cn("px-4 sm:px-12 lg:px-22 xl:px-32 py-4", className)}>
        <BreadcrumbComponent pageName={pageName} />
        {detailHeaderList && (
          <DetailPageHeader headerOptions={detailHeaderList} />
        )}
        {children}
      </div>
    </div>
  );
}

/** @package */
export { DetailPageFrame };
