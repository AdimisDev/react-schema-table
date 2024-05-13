import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useId,
} from "react";
import {
  Cell,
  ColumnDef,
  ColumnFiltersState,
  Header,
  HeaderContext,
  HeaderGroup,
  Renderable,
  Row,
  RowModel,
  SortingState,
  TableOptions,
  Table as TanstackTable,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCtrlS, useKeyPress } from "@/package/hooks/useKeyPress";
import {
  useForm,
  UseFormReturn,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";
import { DataTableColumnDef, DataTableProps } from "@/interface";
import { z } from "zod";

export interface EditTableContextType<TData, TValue> {
  tableKey: string;
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  table: TanstackTable<TData>;
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
  formMethods: UseFormReturn<EditTableResponse<TData>, any, undefined>;
  addRow: (row: TData) => void;
  deleteRow: (rowIndex: number) => void;
  editCell: (rowIndex: number, columnId: string, value: TValue) => void;
  isCellFocused: (rowIndex: number, columnIndex: number) => boolean;
  getCellValue: (cell: Cell<TData, TValue>) => NoInfer<TValue>;
  getColumnId: (cell: Cell<TData, TValue>) => string | undefined;
  getCellType: (
    cell: Cell<TData, TValue>
  ) => React.HTMLInputTypeAttribute | undefined;
  getColumns: () => HeaderGroup<TData>[];
  getHeaderContext: (header: Header<TData, any>) => HeaderContext<TData, any>;
  getRows: () => RowModel<TData>;
  getRowVisbleCells: (row: Row<TData>) => Cell<TData, TValue>[];
  getIsRowSelected: (row: Row<TData>) => boolean;
  rowFlexRender: <TProps extends object>(
    Comp: Renderable<TProps>,
    props: TProps
  ) => JSX.Element | ReactNode;
}

export interface EditTableProps<TData, TValue>
  extends DataTableProps<TData, TValue> {
  onSubmit: SubmitHandler<EditTableResponse<TData>>;
  onInvalidSubmit: (errors: Record<string, any | any[]>) => void;
  children?: ReactNode;
  tableOptions?: TableOptions<TData>;
  editType?: "inline" | "drawer";
  validation?: z.ZodType<TData, any, any>;
}

export type EditTableResponse<TData> = {
  rows: TData[];
};

const EditTableContext = createContext<EditTableContextType<any, any> | null>(
  null
);

function EditTableProvider<TData, TValue>({
  columns,
  data,
  filterFunctions,
  onFocusedCellChange,
  onCellSelect,
  children,
  tableLabel,
  tableSlug,
  onInvalidSubmit,
  onSubmit,
  tableOptions,
}: EditTableProps<TData, TValue>): JSX.Element {
  const tableKey = `${tableSlug}_${tableLabel}_${useId()}`;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [focusedCell, setFocusedCell] = useState<{
    rowIndex: number;
    columnIndex: number;
  } | null>(null);
  const [lastUpdatedCell, setLastUpdatedCell] = useState<{
    rowIndex: number;
    columnIndex: number;
    value: any;
  } | null>(null);

  const formMethods = useForm<EditTableResponse<TData>>({
    defaultValues: {
      [tableKey]: data,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { fields, append, remove, update } = useFieldArray<
    any,
    typeof tableKey
  >({
    control: formMethods.control,
    name: tableKey,
  });

  const table = useReactTable({
    data: fields as TData[],
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
    ...tableOptions,
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
      if (columns[newCol].meta?.disableFocus !== true) {
        setFocusedCell({ rowIndex: newRow, columnIndex: newCol });
        if (onFocusedCellChange) {
          onFocusedCellChange({ rowIndex: newRow, columnIndex: newCol });
        }
      }
    }
  };

  useEffect(() => {
    if (columns.length > 0 && !columns[0].meta?.disableFocus) {
      setFocusedCell({ rowIndex: 0, columnIndex: 0 });
    }
  }, [columns, tableKey]);

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
    setFocusedCell(null);
    if (onFocusedCellChange) onFocusedCellChange(null);
    if (onCellSelect) onCellSelect(null);
    if (lastUpdatedCell) {
      editCell(
        lastUpdatedCell.rowIndex,
        lastUpdatedCell.columnIndex,
        lastUpdatedCell.value
      );
      setLastUpdatedCell(null);
    }
  });

  const getCellMeta = (cell: Cell<TData, TValue>) => {
    const cellMeta: DataTableColumnDef<TData, unknown> | undefined = cell.column
      .columnDef as DataTableColumnDef<TData, unknown> | undefined;
    return cellMeta;
  };

  const getColumnId = (cell: Cell<TData, TValue>) => {
    return cell.column.columnDef.id;
  };

  const getCellType = (cell: Cell<TData, TValue>) => {
    const cellMeta = getCellMeta(cell);
    const cellType = cellMeta?.meta?.type;
    return cellType;
  };

  const editCell = (rowIndex: number, columnId: number, value: any) => {
    update(rowIndex, { ...fields[rowIndex], [columnId]: value });
  };

  useCtrlS(() => {
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
    console.log("Ctrl-S called");
    formMethods.handleSubmit(onSubmit, onInvalidSubmit)();
  });

  return (
    <EditTableContext.Provider
      value={{
        tableKey,
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
        formMethods,
        addRow: (row) => append(row),
        deleteRow: (index) => remove(index),
        editCell: (rowIndex, columnId, value) =>
          update(rowIndex, { ...fields[rowIndex], [columnId]: value }),
        isCellFocused: (rowIndex: number, columnIndex: number) =>
          focusedCell?.rowIndex === rowIndex &&
          focusedCell?.columnIndex === columnIndex,
        getCellValue: (cell: Cell<TData, TValue>) => {
          const value = cell.getValue();
          console.log("Cell value: ", value);
          return value;
        },
        getColumnId,
        getCellType,
        getColumns: () => table.getHeaderGroups(),
        getHeaderContext: (header: Header<TData, TValue>) =>
          header.getContext(),
        getRows: () => table.getRowModel(),
        getRowVisbleCells: (row: Row<TData>) => row.getVisibleCells(),
        getIsRowSelected: (row: Row<TData>) => row.getIsSelected(),
        rowFlexRender: flexRender,
      }}
    >
      <form
        key={`${tableKey}-form`}
        onSubmit={formMethods.handleSubmit(onSubmit, onInvalidSubmit)}
      >
        {children}
      </form>
    </EditTableContext.Provider>
  );
}

function useEditTableContext<TData, TValue>() {
  const context = useContext(
    EditTableContext as React.Context<EditTableContextType<
      TData,
      TValue
    > | null>
  );
  if (!context) {
    throw new Error(
      "useEditTableContext must be used within EditTableProvider"
    );
  }
  return context;
}

export default EditTableProvider;
export { EditTableContext, useEditTableContext };
