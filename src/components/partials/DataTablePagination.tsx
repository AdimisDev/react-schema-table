import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { DataTablePaginationProps, PaginationLayoutTypes } from "../../interface";

export function DataTablePagination<TData>({
  table,
  limit = 3,
  activePage = 1,
  limitOptions = [3, 5, 10, 15, 20],
  layout = [
    "total_rows",
    "selected_rows",
    "rows_per_page_selector",
    "page_index",
    "controllers",
  ],
  isFirstDisabled,
  isLastDisabled,
  isNextDisabled,
  isPrevDisabled,
  onLast,
  onNext,
  onFirst,
  onPrevious,
  onPageChange,
}: DataTablePaginationProps<TData>) {
  const {
    setPageIndex,
    getFilteredSelectedRowModel,
    getFilteredRowModel,
    getState,
    setPageSize,
    getCanPreviousPage,
    getCanNextPage,
    getPageCount,
    previousPage,
    nextPage,
  } = table;

  useEffect(() => {
    setPageIndex(activePage);
  }, [activePage, setPageIndex]);

  useEffect(() => {
    setPageSize(limit);
  }, [limit, setPageSize]);

  const handleFirstPage = () => {
    setPageIndex(0);
    onFirst && onFirst(0);
    onPageChange && onPageChange(0);
  };

  const handlePreviousPage = () => {
    const newIndex = getState().pagination.pageIndex - 1;
    previousPage();
    onPrevious && onPrevious(newIndex);
    onPageChange && onPageChange(newIndex);
  };

  const handleNextPage = () => {
    const newIndex = getState().pagination.pageIndex + 1;
    nextPage();
    onNext && onNext(newIndex);
    onPageChange && onPageChange(newIndex);
  };

  const handleLastPage = () => {
    const lastPageIndex = getPageCount() - 1;
    setPageIndex(lastPageIndex);
    onLast && onLast(lastPageIndex);
    onPageChange && onPageChange(lastPageIndex);
  };

  const renderComponent = (component: PaginationLayoutTypes) => {
    switch (component) {
      case "total_rows":
        return (
          <div className="flex-1 text-sm text-muted-foreground">
            <strong>Total:</strong> {getFilteredRowModel().rows.length} row(s)
          </div>
        );
      case "selected_rows":
        return (
          <div className="flex-1 text-sm text-muted-foreground">
            {getFilteredSelectedRowModel().rows.length} of{" "}
            {getFilteredRowModel().rows.length} row(s) selected.
          </div>
        );
      case "rows_per_page_selector":
        return (
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${getState().pagination.pageSize}`}
              onValueChange={(value) => {
                setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top" defaultValue={limit}>
                {limitOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case "page_index":
        return (
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
        );
      case "controllers":
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0 lg:flex"
              onClick={handleFirstPage}
              disabled={isFirstDisabled ?? !getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={handlePreviousPage}
              disabled={isPrevDisabled ?? !getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={handleNextPage}
              disabled={isNextDisabled ?? !getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 lg:flex"
              onClick={handleLastPage}
              disabled={isLastDisabled ?? !getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between px-2">
      {layout?.map((component) => (
        <div key={component} className="text-sm text-muted-foreground">
          {renderComponent(component)}
        </div>
      ))}
    </div>
  );
}
