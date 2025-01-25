import { ReactNode } from "react";
import SearchBar from "../SearchBar";
import { Categories } from "../Categories";

/**
 * 全ての一覧ページの共通フレームコンポーネント
 *
 * ＠params filterArea {ReactNode}
 * ＠params sortArea {ReactNode}
 * ＠params paginationArea {ReactNode}
 * ＠params total {number}
 * ＠params startItem {number}
 * ＠params endItem {number}
 * ＠children {ReactNode}
 *
 */
export default function ListPageFrame({
  filterArea,
  sortArea,
  paginationArea,
  total,
  startItem,
  endItem,
  children,
}: {
  filterArea: ReactNode;
  sortArea: ReactNode;
  paginationArea: ReactNode;
  total: number;
  startItem: number;
  endItem: number;
  children: ReactNode;
}) {
  return (
    <>
      <Categories />

      {/* 検索バーとフィルター（スマホ） */}
      <div className="sm:hidden flex items-center gap-2 pt-2">
        <SearchBar />
        {filterArea}
      </div>

      <div className="flex flex-col my-2">
        <div className="flex justify-between items-center w-full">
          {/* 表示件数 */}
          <p className="flex flex-col items-start sm:flex-row sm:gap-1 text-sm sm:text-base">
            <span>合計{total} 件</span>
            <span>
              ({endItem === 0 ? 0 : `${startItem}〜${endItem}`} 件表示)
            </span>
          </p>
          <div className="flex gap-4">
            <div className="hidden sm:block">
              {/* フィルター */}
              {filterArea}
            </div>
            {/* 並び替え */}
            {sortArea}
          </div>
        </div>
      </div>

      {total <= 0 ? (
        <div className="h-[70vh] p-2 flex flex-col justify-center items-center text-center text-gray-500 text-xl">
          条件に一致する物件が見つかりませんでした。
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
            {children}
          </div>
          <div className="py-5">{paginationArea}</div>
        </>
      )}
    </>
  );
}
