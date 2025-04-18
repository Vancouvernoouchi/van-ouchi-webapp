import { ReactNode } from "react";
import { SearchBar } from "../index";
import { PaginationType } from "@/types/common/strapi/strapi";
import { PaginationComponent } from "../pagination";

/**
 * 全ての一覧ページの共通フレームコンポーネント
 *
 * ＠params filterArea {ReactNode}　- フィルターエリア
 * ＠params sortArea {ReactNode}　- ソートエリア
 * ＠params pagination {PaginationType} - strapiで作成されるページネーションデータ
 * ＠params cardArea {ReactNode}　- カード表示エリア
 *
 */
function ListPageFrame({
  filterArea,
  sortArea,
  cardArea,
  pagination,
}: {
  filterArea?: ReactNode;
  sortArea?: ReactNode;
  cardArea: ReactNode;
  pagination: PaginationType;
}) {
  /** 総アイテム数 */
  const total = pagination.total;
  /** 表示位置 */
  const startItem = (pagination.page - 1) * pagination.pageSize + 1;
  /** 表示位置 */
  const endItem = Math.min(pagination.page * pagination.pageSize, total);

  return (
    <div className="base-px flex flex-col justify-between content-height">
      <div>
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

        {/* TODO: クライアント側でフィルターしないのでこのロジックは必要ないはず */}
        {total <= 0 ? (
          <div className="pt-10 flex flex-col justify-center items-center text-center">
            <p>条件に一致する物件が見つかりませんでした。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4 lg:gap-6">
            {cardArea}
          </div>
        )}
      </div>
      {/* ページネーション */}
      {total > 0 && (
        <div className="py-5">
          <PaginationComponent pagination={pagination} />
        </div>
      )}
    </div>
  );
}

/** @package */
export { ListPageFrame };
