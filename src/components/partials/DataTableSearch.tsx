import { Input } from "@/components/ui/input";
import { DataTableSearchProps } from "../../interface";
import { useState, useEffect } from "react";

export function DataTableSearch<TData>({ table }: DataTableSearchProps<TData>) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      table.setGlobalFilter(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, table]);

  return (
    <Input
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Search..."
    />
  );
}
