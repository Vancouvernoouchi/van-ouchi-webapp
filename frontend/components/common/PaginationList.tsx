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
import { createQueryString } from "@/utils/queryStringHelper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationListProps {
  currentPage: number;
  totalPage: number;
}

/**
 * ページネーションコンポーネント
 * @param currentPage {number}
 * @param totalPage {number}
 *
 */
function PaginationList({ currentPage, totalPage }: PaginationListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    router.push(
      pathname + "?" + createQueryString(searchParams, "page", String(page))
    );
  };
  return (
    <Pagination>
      <PaginationContent>
        {/* previous page */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
        )}
        {/* page 1 */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(1)}
              isActive={currentPage === 1}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {/* show ellipsis if there are more than 3 pages and the current page is greater than 3 */}
        {currentPage > 3 && totalPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* previous page number */}
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* current page */}
        <PaginationItem>
          <PaginationLink
            className="bg-bloom-lightBlue text-bloom-blue border border-bloom-blue"
            isActive
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {/* next page number */}
        {currentPage < totalPage - 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* show ellipsis if there are more than 3 pages and the current page is far from the last page */}
        {currentPage < totalPage - 2 && totalPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* final page */}
        {totalPage > 1 && currentPage < totalPage && (
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(totalPage)}
              isActive={currentPage === totalPage}
            >
              {totalPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* next page */}
        {currentPage < totalPage && (
          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationList;
