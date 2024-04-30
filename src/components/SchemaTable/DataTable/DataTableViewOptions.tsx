import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableViewOptionsProps } from "./interface";
import { Column } from "@tanstack/react-table";

export function DataTableViewOptions<TData, TValue>({
  table,
  renderColumnVisibility,
}: DataTableViewOptionsProps<TData, TValue>) {
  const getAllColumns = (): Column<TData, TValue>[] => {
    return table
      .getAllColumns()
      .filter(
        (column) =>
          typeof column.accessorFn !== "undefined" && column.getCanHide()
      ) as Column<TData, TValue>[];
  };

  const getColumnVisibility = (column: Column<TData, TValue>) => {
    return column.getIsVisible();
  };

  const setColumnVisibility = (
    column: Column<TData, TValue>,
    value: boolean
  ) => {
    return column.toggleVisibility(!!value);
  };

  return renderColumnVisibility ? (
    renderColumnVisibility(
      getAllColumns,
      getColumnVisibility,
      setColumnVisibility
    )
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {getAllColumns().map((column) => {
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={getColumnVisibility(column)}
              onCheckedChange={(value: any) =>
                setColumnVisibility(column, value)
              }
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
