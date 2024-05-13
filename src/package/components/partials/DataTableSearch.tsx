import { DataTableSearchProps } from "@/interface";
import { Input } from "@/package/components/ui/input";

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
