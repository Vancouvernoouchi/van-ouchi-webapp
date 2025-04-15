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
    <div className="max-w-screen flex flex-col items-center">
      {detailHeaderList && (
        <DetailPageHeader headerOptions={detailHeaderList} />
      )}
      <div className={cn("detailPage-base-px py-4", className)}>
        <BreadcrumbComponent pageName={pageName} />
        {children}
      </div>
    </div>
  );
}

/** @package */
export { DetailPageFrame };
