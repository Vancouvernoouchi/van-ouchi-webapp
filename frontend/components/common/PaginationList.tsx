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
import { handleEnterKey } from "@/utils/accessibility/a11y";

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
              tabIndex={200}
              onClick={() => handlePageChange(currentPage - 1)}
              onKeyDown={(e) =>
                handleEnterKey(e, () => handlePageChange(currentPage - 1))
              }
            />
          </PaginationItem>
        )}
        {/* page 1 */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink
              tabIndex={201}
              onClick={() => handlePageChange(1)}
              onKeyDown={(e) => handleEnterKey(e, () => handlePageChange(1))}
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
            <PaginationLink
              tabIndex={202}
              onClick={() => handlePageChange(currentPage - 1)}
              onKeyDown={(e) =>
                handleEnterKey(e, () => handlePageChange(currentPage - 1))
              }
            >
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* current page */}
        <PaginationItem>
          <PaginationLink
            tabIndex={203}
            className="bg-bloom-lightBlue text-bloom-blue border border-bloom-blue"
            isActive
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {/* next page number */}
        {currentPage < totalPage - 1 && (
          <PaginationItem>
            <PaginationLink
              tabIndex={204}
              onClick={() => handlePageChange(currentPage + 1)}
              onKeyDown={(e) =>
                handleEnterKey(e, () => handlePageChange(currentPage + 1))
              }
            >
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
              tabIndex={205}
              onClick={() => handlePageChange(totalPage)}
              onKeyDown={(e) =>
                handleEnterKey(e, () => handlePageChange(totalPage))
              }
              isActive={currentPage === totalPage}
            >
              {totalPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* next page */}
        {currentPage < totalPage && (
          <PaginationItem>
            <PaginationNext
              tabIndex={206}
              onClick={() => handlePageChange(currentPage + 1)}
              onKeyDown={(e) =>
                handleEnterKey(e, () => handlePageChange(currentPage + 1))
              }
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationList;
