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
import { useState } from "react";
import { Input } from "../../ui/input";
import { EditableTablePagination } from "./EditableTablePagination";
import { EditableTableViewOptions } from "./EditableTableViewOptions";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { EditableTableProps } from "./interface";

export function EditableTable<TData, TValue>({
  columns,
  data,
  filtersConfig,
  panel,
  styles,
  renderTableFooter,
  renderTableHeader,
}: EditableTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const Container = panel ? Card : "div";
  const ContainerHeader = panel ? CardHeader : "div";
  const ContainerContent = panel ? CardContent : "div";
  const ContainerFooter = panel ? CardFooter : "div";

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

  return (
    <Container
      className={styles?.containerClassName}
      style={styles?.containerStyle}
    >
      <ContainerHeader
        className={styles?.headerClassName}
        style={styles?.headerStyle}
      >
        {renderTableHeader ? (
          renderTableHeader(table)
        ) : (
          <>
            {filtersConfig?.columnNames.map((columnName) => (
              <Input
                key={columnName}
                placeholder={filtersConfig.placeholder}
                value={
                  (table.getColumn(columnName)?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) =>
                  table
                    .getColumn(columnName)
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm mr-4"
              />
            ))}
            <EditableTableViewOptions table={table} />
          </>
        )}
      </ContainerHeader>
      <ContainerContent
        className={styles?.containerClassName}
        style={styles?.containerStyle}
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
      </ContainerContent>
      <ContainerFooter
        className={styles?.footerClassName}
        style={styles?.footerStyle}
      >
        {renderTableFooter ? (
          renderTableFooter(table)
        ) : (
          <EditableTablePagination table={table} />
        )}
      </ContainerFooter>
    </Container>
  );
}
