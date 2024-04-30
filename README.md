# @adimis/react-schema-table

A powerful React component for rendering data tables based on a schema definition. This package allows developers to quickly generate dynamic tables with features like sorting, pagination, and custom cell rendering.

## Installation

```bash
npm install @adimis/react-schema-table
```

## Usage

Below is a basic example of how to use the `SchemaDataTable` component in a React Typescript application.

```tsx
import { SchemaDataTable } from "@adimis/react-schema-table";
import "@adimis/react-schema-table/dist/style.css";
import { Button } from "./components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./components/ui/dropdown-menu";
import { Checkbox } from "./components/ui/checkbox";
import React from "react";

const App = () => {
  return (
    <SchemaDataTable
      columns={[
        {
          id: "select",
          header: ({ table }) => (
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          ),
          enableSorting: false,
          enableHiding: false,
        },
        {
          accessorKey: "status",
          header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Status" />;
          },
          cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
          ),
        },
        {
          accessorKey: "email",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => (
            <div className="lowercase">{row.getValue("email")}</div>
          ),
          enableSorting: true,
          enableMultiSort: true,
        },
        {
          accessorKey: "amount",
          header: () => <div className="text-right">Amount</div>,
          cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));

            const formatted = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount);

            return <div className="text-right font-medium">{formatted}</div>;
          },
        },
        {
          id: "actions",
          enableHiding: false,
          cell: ({ row }) => {
            const payment = row.original;

            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(payment.id)}
                  >
                    Copy payment ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View customer</DropdownMenuItem>
                  <DropdownMenuItem>View payment details</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        },
      ]}
      data={[
        {
          id: "m5gr84i9",
          amount: 316,
          status: "success",
          email: "ken99@yahoo.com",
        },
        {
          id: "3u1reuv4",
          amount: 242,
          status: "success",
          email: "Abe45@gmail.com",
        },
        {
          id: "derv1ws0",
          amount: 837,
          status: "processing",
          email: "Monserrat44@gmail.com",
        },
        {
          id: "5kma53ae",
          amount: 874,
          status: "success",
          email: "Silas22@gmail.com",
        },
        {
          id: "bhqecj4p",
          amount: 721,
          status: "failed",
          email: "carmella@hotmail.com",
        },
      ]}
    />
  );
};

export default App;
```

### Features

- **Custom Cell Rendering:** Define how each cell should be rendered.
- **Sorting and Pagination:** Built-in support for sorting and pagination.
- **Fully Customizable:** Style and configure data tables to fit your application's needs.

### Props and Typescript Interfaces

```typescript
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
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs, features, or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/AdimisDev/react-schema-table/blob/main/LICENSE) file for details.
