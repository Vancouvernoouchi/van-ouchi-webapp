"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationType } from "@/types/common/strapi/strapi";
import { useRouter } from "next/navigation";

/**
 * ページネーション共通コンポーネント
 * Strapiで自動生成させるpaginationをpropsに渡すと完成
 *
 * @params pagination {pagination}　- strapiのページネーションデータ
 */
function PaginationComponent({ pagination }: { pagination: PaginationType }) {
  const router = useRouter();

  const page = pagination.page;
  const pageCount = pagination.pageCount;

  // ページ変更時に新しいページへ遷移
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pageCount) return;
    router.push(`?page=${newPage}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* 前のページへ */}
        <PaginationItem>
          {page > 1 && (
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(page - 1)}
            />
          )}
        </PaginationItem>

        {/* 最初のページへのリンク（ページ数が多い場合のみ表示） */}
        {pageCount > 5 && page > 3 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => handlePageChange(1)}>
              1
            </PaginationLink>
          </PaginationItem>
        )}
        {pageCount > 5 && page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* 現在のページ周辺のリンクを表示 */}
        {[...Array(pageCount)].map((_, index) => {
          const pageNumber = index + 1;
          if (pageNumber < page - 2 || pageNumber > page + 2) return null;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                isActive={pageNumber === page}
                onClick={() => handlePageChange(pageNumber)}
                className={
                  pageNumber === page
                    ? "border border-bloom-blue bg-bloom-lightBlue text-bloom-blue rounded-full"
                    : ""
                } // 現在のページの色を変更
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* 現在のページ周辺のリンクを表示 */}
        {pageCount > 5 && page < pageCount - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* 最後のページへのリンク（ページ数が多い場合のみ表示） */}
        {pageCount > 5 && page < pageCount - 2 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(pageCount)}
            >
              {pageCount}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* 次のページへ */}
        <PaginationItem>
          {page < pageCount && (
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(page + 1)}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

/** @package */
export { PaginationComponent };
