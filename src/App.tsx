import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import DataTable, {
  DataTableActionCell,
  DataTableFilter,
  DataTablePagination,
  DataTableSearch,
  DataTableViewOptions,
} from "./components/SchemaTable";

const App = () => {
  return (
    <DataTable
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

export default App;
