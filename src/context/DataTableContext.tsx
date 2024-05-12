import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
  Renderable,
} from "@tanstack/react-table";
import { DataTableProps } from "..";
import { useKeyPress } from "@/hooks/useKeyPress";

interface DataTableContextType<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  table: Table<TData>;
  sorting: SortingState;
  setSorting: (newSorting: SortingState) => void;
  columnFilters: ColumnFiltersState;
  setColumnFilters: (newFilters: ColumnFiltersState) => void;
  columnVisibility: VisibilityState;
  setColumnVisibility: (newVisibility: VisibilityState) => void;
  focusedCell: { rowIndex: number; columnIndex: number } | null;
  setFocusedCell: (
    cell: { rowIndex: number; columnIndex: number } | null
  ) => void;
  rowFlexRender: <TProps extends object>(
    Comp: Renderable<TProps>,
    props: TProps
  ) => React.ReactNode | JSX.Element;
}

interface DataTableProviderProps<TData, TValue>
  extends DataTableProps<TData, TValue> {
  children: ReactNode;
}

const DataTableContext = createContext<DataTableContextType<any, any> | null>(
  null
);

function DataTableProvider<TData, TValue>({
  columns,
  data,
  filterFunctions,
  onFocusedCellChange,
  onCellSelect,
  children,
}: DataTableProviderProps<TData, TValue>): JSX.Element {
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

  const moveFocus = (deltaRow: number, deltaCol: number) => {
    if (focusedCell) {
      const { rowIndex, columnIndex } = focusedCell;
      const newRow = Math.max(
        0,
        Math.min(rowIndex + deltaRow, table.getRowModel().rows.length - 1)
      );

      let newCol = columnIndex + deltaCol;
      newCol = Math.max(0, Math.min(newCol, columns.length - 1));
      if (columns[newCol].disableFocus !== true) {
        setFocusedCell({ rowIndex: newRow, columnIndex: newCol });
        if (onFocusedCellChange) {
          onFocusedCellChange({ rowIndex: newRow, columnIndex: newCol });
        }
      }
    }
  };

  useEffect(() => {
    if (columns[0].disableFocus !== true) {
      setFocusedCell({ rowIndex: 0, columnIndex: 0 });
    }
  }, [columns]);

  return (
    <DataTableContext.Provider
      value={{
        data,
        table,
        columns,
        sorting,
        setSorting,
        columnFilters,
        setColumnFilters,
        columnVisibility,
        setColumnVisibility,
        focusedCell,
        setFocusedCell,
        rowFlexRender: flexRender,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}

function useDataTableContext<TData, TValue>() {
  const context = useContext(
    DataTableContext as React.Context<DataTableContextType<
      TData,
      TValue
    > | null>
  );
  if (!context) {
    throw new Error(
      "useDataTableContext must be used within DataTableProvider"
    );
  }
  return context;
}

export default DataTableProvider;
export { DataTableContext, useDataTableContext };
