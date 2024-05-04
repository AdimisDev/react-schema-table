import {
  ColumnDef,
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
import { DataTableProps } from "../interface";
import { useKeyPress } from "@/components/SchemaTable/hooks/useKeyPress";
import { useTheme } from "../context/ThemeProvider";

export function DataTableBody<TData, TValue>({
  columns,
  data,
  styles,
  renderTableFooter,
  renderTableHeader,
  title,
  description,
  filterFunctions,
  onFocusedCellChange,
  onCellSelect,
  panel = true,
  theme = "system",
}: DataTableProps<TData, TValue>) {
  const themeMethods = useTheme();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [focusedCell, setFocusedCell] = useState<{
    rowIndex: number;
    columnIndex: number;
  } | null>(null);

  useKeyPress("ArrowRight", () => moveFocus(0, 1));
  useKeyPress("ArrowLeft", () => moveFocus(0, -1));
  useKeyPress("ArrowUp", () => moveFocus(-1, 0));
  useKeyPress("ArrowDown", () => moveFocus(1, 0));
  useKeyPress("Escape", () => {
    setFocusedCell(null);
    if (onFocusedCellChange) onFocusedCellChange(null);
    if (onCellSelect) onCellSelect(null);
  });
  useKeyPress("Enter", () => {
    if (focusedCell) {
      const { rowIndex, columnIndex } = focusedCell;
      if (onCellSelect)
        onCellSelect({
          columnIndex: columnIndex,
          rowIndex: rowIndex,
        });
      if (onFocusedCellChange)
        onFocusedCellChange({
          columnIndex: columnIndex,
          rowIndex: rowIndex,
        });
    }
  });

  const moveFocus = (deltaRow: number, deltaCol: number) => {
    if (focusedCell) {
      const { rowIndex, columnIndex } = focusedCell;
      const newRow = Math.max(
        0,
        Math.min(rowIndex + deltaRow, table.getRowModel().rows.length - 1)
      );
      const newCol = Math.max(
        0,
        Math.min(columnIndex + deltaCol, columns.length - 1)
      );
      setFocusedCell({ rowIndex: newRow, columnIndex: newCol });
      console.log("Calling onFocusedCellChange: ", {
        rowIndex: newRow,
        columnIndex: newCol,
      });
      if (onFocusedCellChange) {
        onFocusedCellChange({ rowIndex: newRow, columnIndex: newCol });
      }
    }
  };

  const Container = panel ? Card : "div";
  const ContainerHeader = panel ? CardHeader : "div";
  const ContainerContent = panel ? CardContent : "div";
  const ContainerFooter = panel ? CardFooter : "div";
  const ContainerTitle = panel ? CardTitle : "h2";
  const ContainerDescription = panel ? CardDescription : "p";

  const table = useReactTable({
    data,
    columns: columns as ColumnDef<TData, TValue>[],
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
    filterFns: filterFunctions,
  });

  const handleCellFocus = (rowIndex: number, columnIndex: number) => {
    setFocusedCell({ rowIndex, columnIndex });
  };

  useEffect(() => {
    setFocusedCell({ rowIndex: 0, columnIndex: 0 });
  }, []);

  useEffect(() => {
    themeMethods.setTheme(theme);
  }, [theme, themeMethods]);

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
          ContainerDescription
        )
      ) : (
        <ContainerHeader
          className={styles?.headerClassName}
          style={styles?.headerStyle}
        >
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
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
                table.getRowModel().rows.map((row, rowIndex) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell, columnIndex) => (
                      <TableCell
                        key={cell.id}
                        onClick={() => handleCellFocus(rowIndex, columnIndex)}
                        className={
                          focusedCell?.rowIndex === rowIndex &&
                          focusedCell?.columnIndex === columnIndex
                            ? "bg-secondary"
                            : ""
                        }
                      >
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
