import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { DataTableProps } from "./interface";

export function DataTable<TData, TValue>({
  columns,
  data,
  styles,
  renderTableFooter,
  renderTableHeader,
  title,
  description,
  renderFilter,
  panel = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const Container = panel ? Card : "div";
  const ContainerHeader = panel ? CardHeader : "div";
  const ContainerContent = panel ? CardContent : "div";
  const ContainerFooter = panel ? CardFooter : "div";
  const ContainerTitle = panel ? CardTitle : "h2";
  const ContainerDescription = panel ? CardDescription : "p";

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  useEffect(() => {
    console.log("Data Table: Sorting: ", sorting);
    console.log("Data Table: Column Filters: ", columnFilters);
    console.log("Data Table: Column Visibility: ", columnVisibility);
  }, [sorting, columnFilters, columnVisibility]);

  const getFilterValues = (columnName: string) => {
    const response = table.getColumn(columnName)?.getFilterValue() as string;
    console.log("getFilterValues response: ", response);
    return response;
  };

  const setFilterValues = (columnName: string, value: any) => {
    const response = table.getColumn(columnName)?.setFilterValue(value);
    console.log("setFilterValues response: ", response);
    return response;
  };

  return (
    <Container
      className={styles?.containerClassName}
      style={styles?.containerStyle}
    >
      {renderTableHeader ? (
        renderTableHeader(
          table,
          ContainerHeader,
          ContainerTitle,
          ContainerDescription,
          getFilterValues,
          setFilterValues
        )
      ) : (
        <ContainerHeader
          className={styles?.headerClassName}
          style={styles?.headerStyle}
        >
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
          {renderFilter && renderFilter(getFilterValues, setFilterValues)}
        </ContainerHeader>
      )}
      <ContainerContent
        className={styles?.containerClassName}
        style={styles?.containerStyle}
      >
        <div
          className={styles?.dataTableClassName}
          style={styles?.dataTableStyle}
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </ContainerContent>
      {renderTableFooter && renderTableFooter(table, ContainerFooter)}
    </Container>
  );
}
