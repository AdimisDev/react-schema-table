# @adimis/react-schema-table

This is a robust React component designed for rendering data tables, leveraging React, TypeScript, Shadcn, and Tanstack Tables based on schema definitions. The package enables developers to efficiently create dynamic tables equipped with features such as sorting, pagination, and custom cell rendering. It is compatible with React 18.2.0 and Next.js 14.2.3, ensuring seamless integration and functionality.

## Installation

To start using `@adimis/react-schema-table`, follow these steps:

1. Install the package via npm:

   ```bash
   npm install @adimis/react-schema-table
   ```

2. Import the necessary CSS for styling if you are using the SchemaDataTable Component:

   ```tsx
   import "@adimis/react-schema-table/dist/style.css";
   ```

These steps ensure that all the necessary dependencies and styles are set up for the component to function and look correctly in your application.

## Usage

Below is a basic example of how to use the `SchemaDataTable` component in a React Typescript application.

```tsx
"use client";

import "@adimis/react-schema-table/dist/style.css";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import {
  DataTableActionCell,
  DataTableFilter,
  DataTablePagination,
  DataTableSearch,
  DataTableViewOptions,
  SchemaDataTable,
  ThemeColors,
} from "@adimis/react-schema-table";

const defaultThemeColors: ThemeColors = {
  root: {
    background: "0 0% 100%",
    foreground: "0 0% 3.9%",
    card: "0 0% 100%",
    "card-foreground": "0 0% 3.9%",
    popover: "0 0% 100%",
    "popover-foreground": "0 0% 3.9%",
    primary: "0 72.2% 50.6%",
    "primary-foreground": "0 85.7% 97.3%",
    secondary: "0 0% 96.1%",
    "secondary-foreground": "0 0% 9%",
    muted: "0 0% 96.1%",
    "muted-foreground": "0 0% 45.1%",
    accent: "0 0% 96.1%",
    "accent-foreground": "0 0% 9%",
    destructive: "0 84.2% 60.2%",
    "destructive-foreground": "0 0% 98%",
    border: "0 0% 89.8%",
    input: "0 0% 89.8%",
    ring: "0 72.2% 50.6%",
    radius: "1rem",
  },
  dark: {
    background: "0 0% 3.9%",
    foreground: "0 0% 98%",
    card: "0 0% 3.9%",
    "card-foreground": "0 0% 98%",
    popover: "0 0% 3.9%",
    "popover-foreground": "0 0% 98%",
    primary: "0 72.2% 50.6%",
    "primary-foreground": "0 85.7% 97.3%",
    secondary: "0 0% 14.9%",
    "secondary-foreground": "0 0% 98%",
    muted: "0 0% 14.9%",
    "muted-foreground": "0 0% 63.9%",
    accent: "0 0% 14.9%",
    "accent-foreground": "0 0% 98%",
    destructive: "0 62.8% 30.6%",
    "destructive-foreground": "0 0% 98%",
    border: "0 0% 14.9%",
    input: "0 0% 14.9%",
    ring: "0 72.2% 50.6%",
  },
};

const Table = () => {
  return (
    <SchemaDataTable
      theme="dark"
      themeColors={defaultThemeColors}
      renderTableHeader={(
        table,
        ContainerHeader,
        ContainerTitle,
        ContainerDescription
      ) => {
        return (
          <ContainerHeader>
            <ContainerTitle>Edit Table</ContainerTitle>
            <ContainerDescription>
              Working Example of the Data Table
            </ContainerDescription>
            <span className="mb-2" />
            <div className="flex justify-between items-center">
              <div>
                <DataTableSearch table={table} />
              </div>
              <div>
                <DataTableFilter table={table} />
                <span className="ml-2" />
                <DataTableViewOptions table={table} />
              </div>
            </div>
          </ContainerHeader>
        );
      }}
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
          header: "Status",
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
          meta: {
            type: "number",
          },
          filterFn: "includesString",
        },
        {
          id: "actions",
          enableHiding: false,
          header: () => <div className="text-right">Actions</div>,
          cell: ({ row }) => {
            const payment = row.original;

            return (
              <DataTableActionCell
                className="flex justify-end"
                menuLabel="Actions"
                menuItems={[
                  {
                    label: "Copy payment ID",
                    onClick: () => navigator.clipboard.writeText(payment.id),
                  },
                  {
                    separator: true,
                  },
                  {
                    label: "View customer",
                  },
                  {
                    label: "View payment details",
                  },
                ]}
              />
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
      renderTableFooter={(table, ContainerFooter) => {
        return (
          <ContainerFooter>
            <DataTablePagination table={table} />
          </ContainerFooter>
        );
      }}
    />
  );
};

export default Table;
```

### Features

- **Custom Cell Rendering:** Define how each cell should be rendered.
- **Sorting and Pagination:** Built-in support for sorting and pagination.
- **Fully Customizable:** Style and configure data tables to fit your application's needs.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs, features, or improvements.

## License

This project is licensed under the GNU License - see the [LICENSE](https://github.com/AdimisDev/react-schema-table/blob/main/LICENSE) file for details.
