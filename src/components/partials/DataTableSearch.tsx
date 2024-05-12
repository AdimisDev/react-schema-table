import { Input } from "@/components/ui/input";
import { DataTableSearchProps } from "../../interface";

export function DataTableSearch<TData>({ table }: DataTableSearchProps<TData>) {
  return (
    <Input
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        table.setGlobalFilter(event.target.value);
      }}
      placeholder="Search..."
    />
  );
}
