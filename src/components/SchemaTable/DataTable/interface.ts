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
  filtersConfig?: {
    placeholder: string;
    columnNames: string[];
  };
  renderTableHeader?: (
    table: Table<TData>,
    CardTitle: React.ForwardRefExoticComponent<
      React.HTMLAttributes<HTMLHeadingElement> &
        React.RefAttributes<HTMLParagraphElement>
    >,
    CardDescription: React.ForwardRefExoticComponent<
      React.HTMLAttributes<HTMLParagraphElement> &
        React.RefAttributes<HTMLParagraphElement>
    >
  ) => React.ReactNode;
  renderTableFooter?: (table: Table<TData>) => React.ReactNode;
}

export interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}
