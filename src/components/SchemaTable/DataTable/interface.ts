import { Column, ColumnDef, Table } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  description?: string;
  panel?: boolean;
  styles?: {
    containerClassName?: string;
    containerStyle?: React.CSSProperties;
    headerClassName?: string;
    headerStyle?: React.CSSProperties;
    contentClassName?: string;
    contentStyle?: React.CSSProperties;
    footerClassName?: string;
    footerStyle?: React.CSSProperties;
    dataTableClassName?: string;
    dataTableStyle?: React.CSSProperties;
  };
  renderTableHeader?: (
    table: Table<TData>,
    getFilterValues: (columnName: string) => string,
    setFilterValues: (columnName: string, value: any) => void | undefined,
    ContainerTitle:
      | React.ForwardRefExoticComponent<
          React.HTMLAttributes<HTMLHeadingElement> &
            React.RefAttributes<HTMLParagraphElement>
        >
      | "h2",
    ContainerDescription:
      | React.ForwardRefExoticComponent<
          React.HTMLAttributes<HTMLParagraphElement> &
            React.RefAttributes<HTMLParagraphElement>
        >
      | "p"
  ) => React.ReactNode;
  renderTableFooter?: (table: Table<TData>) => React.ReactNode;
  renderFilter?: (
    getFilterValues: (columnName: string) => string,
    setFilterValues: (columnName: string, value: any) => void | undefined
  ) => React.ReactNode;
  renderColumnVisibility?: DataTableViewOptionsProps<
    TData,
    TValue
  >["renderColumnVisibility"];
  renderPagination?: DataTablePaginationProps<TData>["renderPagination"];
}

export interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  renderPagination?: (table: Table<TData>) => React.ReactNode;
}

export interface DataTableViewOptionsProps<TData, TValue> {
  table: Table<TData>;
  renderColumnVisibility?: (
    getAllColumns: () => Column<TData, TValue>[],
    getColumnVisibility: (column: Column<TData, TValue>) => boolean,
    setColumnVisibility: (column: Column<TData, TValue>, value: boolean) => void
  ) => React.ReactNode;
}
