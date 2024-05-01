import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Column } from "@tanstack/react-table";
import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { DataTableFilterProps } from "../interface";

export function DataTableFilter<TData>({ table }: DataTableFilterProps<TData>) {
  const [filters, setFilters] = useState<
    Array<{ id: number; column: string; value: any }>
  >([]);

  const getAllColumns = (): Column<TData, any[]>[] => {
    return table
      .getAllColumns()
      .filter(
        (column) =>
          typeof column.accessorFn !== "undefined" && column.getCanHide()
      ) as Column<TData, any>[];
  };

  const handleAddFilter = () => {
    setFilters((prev) => {
      return [
        ...prev,
        {
          id: prev.length + 1,
          column: "",
          value: "",
        },
      ];
    });
  };

  const handleDeleteFilter = (id: number) => {
    setFilters((prev) => {
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleResetFilter = () => {
    setFilters([]);
    table.resetColumnFilters()
  }

  useEffect(() => {
    const handleApplyFilters = () => {
      filters.forEach((filter) => {
        if (filter.column !== "") {
          const column = table.getColumn(filter.column);
          if (column) {
            column.setFilterValue(filter.value);
          }
        }
      });
    };
    handleApplyFilters();
  }, [filters, table]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 mt-1">
          {filters.length > 0
            ? `${filters.length} ${
                filters.length > 1 ? "filters" : "filter"
              } applied`
            : "Filters"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filters</h4>
            <p className="text-sm text-muted-foreground">
              Adjust the filters to refine your results.
            </p>
          </div>
          <div className="grid gap-2">
            {filters.map((filter) => (
              <div key={filter.id} className="grid grid-cols-12 gap-2">
                <div className="col-span-4">
                  <Select
                    defaultValue={filter.column}
                    onValueChange={(value) =>
                      setFilters(
                        filters.map((f) =>
                          f.id === filter.id ? { ...f, column: value } : f
                        )
                      )
                    }
                  >
                    <SelectTrigger aria-label="Select Column">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {getAllColumns().map((column) => {
                        return (
                          <SelectItem key={column.id} value={column.id}>
                            {column.id}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-7">
                  <Input
                    value={filter.value}
                    onChange={(e) => {
                      e.preventDefault();
                      setFilters(
                        filters.map((f) =>
                          f.id === filter.id
                            ? { ...f, value: e.target.value }
                            : f
                        )
                      );
                    }}
                  />
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => handleDeleteFilter(filter.id)}
                    className="rounded-full"
                  >
                    <CircleX />
                  </Button>
                </div>
              </div>
            ))}
            <Separator />

            <div className="flex justify-between items-center">
              <Button onClick={handleAddFilter} className="col-start-1">
                Add Filter
              </Button>
              <Button
                onClick={handleResetFilter}
                className="col-start-2"
                variant={"outline"}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
