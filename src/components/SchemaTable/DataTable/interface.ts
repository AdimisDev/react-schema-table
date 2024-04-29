import { ColumnDef, Table } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
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
  };
  filtersConfig?: {
    placeholder: string;
    columnNames: string[];
  };
  renderTableHeader?: (table: Table<TData>) => React.ReactNode;
  renderTableFooter?: (table: Table<TData>) => React.ReactNode;
}
