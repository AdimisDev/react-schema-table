import "./src/index.css";

export * from "./src/components/SchemaTable/DataTable/interface";
// export * from "./src/components/SchemaTable/EditableTable/interface";

import { DataTable as SchemaDataTable } from "./src/components/SchemaTable/DataTable/DataTable";
import { DataTableColumnHeader } from "@/components/SchemaTable/DataTable/DataTableColumnHeader";
// import { EditableTable as SchemaEditableTable } from "./src/components/SchemaTable/EditableTable/EditableTable";

export {
  SchemaDataTable,
  DataTableColumnHeader,
  // SchemaEditableTable
};
