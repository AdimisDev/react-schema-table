import "./src/index.css";

export * from "./src/components/SchemaTable/DataTable/interface";
export * from "./src/components/SchemaTable/EditableTable/interface";

import { DataTable as SchemaDataTable } from "./src/components/SchemaTable/DataTable/DataTable";
import { EditableTable as SchemaEditableTable } from "./src/components/SchemaTable/EditableTable/EditableTable";

export { SchemaDataTable, SchemaEditableTable };
