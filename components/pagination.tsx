import React, { ChangeEvent, ReactNode } from "react";
import clsx from "clsx";

interface PaginationProps {
  handlePageSize: (e: ChangeEvent<any>) => void;
  handlePage: (page: number) => void;

  page: number | string;
  pageSize: number | string;

  pagination:
    | {
        page: number;
        pageSize: number;
        total: number;
        total_page: number;
      }
    | undefined;
}

export const Pagination: React.FC<PaginationProps> = ({
  handlePageSize,
  handlePage,
  pagination,
  page,
  pageSize,
}) => {
  function getPage(totalItems: number, currentPage: number, pageSize: number) {
    currentPage = currentPage;

    pageSize = pageSize;

    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = Array.from(
      { length: endPage + 1 - startPage },
      (_, i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }
  let pages = getPage(
    pagination?.total || 0,
    pagination?.page || 1,
    pagination?.pageSize || 10
  );

  return (
    <div className="w-full h-full flex items-center justify-center lg:justify-between mt-6 gap-2">
      <div>
        <select
          value={pageSize}
          onChange={handlePageSize}
          className="select select-bordered w-full max-w-xs"
        >
          <option value={1}>1</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <p>From <span className="font-bold">{pagination?.total}</span> data</p>
      </div>

      <div className="items-center hidden md:flex gap-x-3">
        {pages.pages.map((pageItem, index) => (
          <>
            <div className="join" key={index}>
              <button
                className={clsx(`join-item btn`, {
                  "btn-active": page === pageItem,
                  "join-item btn": page !== pageItem,
                })}
                onClick={() => {
                  handlePage(pageItem);
                }}
              >
                {pageItem}
              </button>
            </div>

          </>
        ))}
      </div>
    </div>
  );
};
