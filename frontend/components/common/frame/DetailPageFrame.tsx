import { ReactNode } from "react";
import { DetailPageHeader, DetailPageHeaderOption } from "../header";

/**
 * 全ての詳細ページに共通するフレームコンポーネント
 * ＠params detailHeaderList {DetailPageHeaderOption[]} - 詳細画面用のヘッダーリスト
 * ＠params children {ReactNode}
 */
function DetailPageFrame({
  detailHeaderList,
  children,
}: {
  detailHeaderList?: DetailPageHeaderOption[];
  children: ReactNode;
}) {
  return (
    <div className="px-4 sm:px-12 lg:px-22 xl:px-32">
      {detailHeaderList && (
        <DetailPageHeader headerOptions={detailHeaderList} />
      )}
      {children}
    </div>
  );
}

export { DetailPageFrame };
