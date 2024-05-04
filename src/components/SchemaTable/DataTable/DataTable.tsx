import { ThemeProvider } from "../context/ThemeProvider";
import { DataTableProps } from "../interface";
import { DataTableBody } from "./DataTableBody";

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  return (
    <ThemeProvider
      defaultTheme={props.theme}
      storageKey="adimis-react-schema-table-theme"
      themeColors={props.themeColors}
    >
      <DataTableBody {...props} />
    </ThemeProvider>
  );
}
