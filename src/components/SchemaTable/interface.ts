import { Column, ColumnDef, FilterFn, Table } from "@tanstack/react-table";

export interface ExtendedColumnMeta {
  type?: React.HTMLInputTypeAttribute;
}

export interface DataTableColumn<TData, TValue> extends Column<TData, TValue> {
  meta?: ExtendedColumnMeta;
}

export type DataTableColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
  meta?: ExtendedColumnMeta;
};

export interface DataTableProps<TData, TValue> {
  columns: DataTableColumnDef<TData, TValue>[];
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
    ContainerHeader:
      | "div"
      | React.ForwardRefExoticComponent<
          React.HTMLAttributes<HTMLDivElement> &
            React.RefAttributes<HTMLDivElement>
        >,
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
  renderTableFooter?: (
    table: Table<TData>,
    ContainerFooter:
      | "div"
      | React.ForwardRefExoticComponent<
          React.HTMLAttributes<HTMLDivElement> &
            React.RefAttributes<HTMLDivElement>
        >
  ) => React.ReactNode;
  filterFunctions?: Record<string, FilterFn<any>>;
  onFocusedCellChange?: (
    focusedCell: {
      rowIndex: number;
      columnIndex: number;
    } | null
  ) => void;
  onCellSelect?: (
    focusedCell: {
      rowIndex: number;
      columnIndex: number;
    } | null
  ) => void;
}

export interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export type PaginationLayoutTypes =
  | "total_rows"
  | "selected_rows"
  | "rows_per_page_selector"
  | "page_index"
  | "controllers";

export interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  activePage?: number;
  limit?: number;
  limitOptions?: number[];
  layout?: PaginationLayoutTypes[];
  isFirstDisabled?: boolean;
  isLastDisabled?: boolean;
  isNextDisabled?: boolean;
  isPrevDisabled?: boolean;
  onLast?: (pageNumber: number) => void;
  onNext?: (pageNumber: number) => void;
  onFirst?: (pageNumber: number) => void;
  onPrevious?: (pageNumber: number) => void;
  onPageChange?: (pageNumber: number) => void;
}

export interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export interface DataTableFilterProps<TData> {
  table: Table<TData>;
}

export interface DataTableSearchProps<TData> {
  table: Table<TData>;
}

export interface DataTableActionCellProps {
  menuLabel?: string;
  menuItems: {
    label?: string;
    onClick?: () => void;
    separator?: boolean;
  }[];
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
