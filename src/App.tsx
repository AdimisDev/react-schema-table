"use client";

import { ArrowUpDown } from "lucide-react";
import {
  DataTableActionCell,
  DataTableFilter,
  DataTablePagination,
  DataTableProps,
  DataTableSearch,
  DataTableViewOptions,
  SchemaTable,
  ThemeColors,
} from "./components/SchemaTable";
import { Checkbox } from "./components/ui/checkbox";

interface IPaymentData {
  id: string;
  amount: number;
  status: string;
  email: string;
}

const App = () => {
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

  const basicTableProps: DataTableProps<IPaymentData, any> = {
    renderTableHeader: (
      table,
      ContainerHeader,
      ContainerTitle,
      ContainerDescription
    ) => {
      return (
        <ContainerHeader>
          <ContainerTitle>Basic Table</ContainerTitle>
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
    },
    columns: [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
            <button
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Email
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </button>
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
        header: () => <div className="flex justify-end">Actions</div>,
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
    ],
    data: [
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
    ],
    renderTableFooter: (table, ContainerFooter) => {
      return (
        <ContainerFooter>
          <DataTablePagination table={table} />
        </ContainerFooter>
      );
    },
    themeColors: defaultThemeColors,
    theme: "dark",
  };

  return <SchemaTable {...basicTableProps} />;
};

export default App;
