import "./src/index.css";

import { useKeyPress } from "./src/components/SchemaTable/hooks/useKeyPress";
import {
  SchemaTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableViewOptions,
  DataTableActionCell,
  DataTableFilter,
  DataTableSearch,
} from "./src/components/SchemaTable/index";

export * from "./src/components/SchemaTable/interface";
export {
  useKeyPress,
  SchemaTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableViewOptions,
  DataTableActionCell,
  DataTableFilter,
  DataTableSearch,
};
