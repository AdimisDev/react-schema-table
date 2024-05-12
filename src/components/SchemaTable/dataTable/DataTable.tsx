import { useEffect } from "react";
import { DataTableProps } from "../../../interface";
import { ThemeProvider, useTheme } from "../../../context/ThemeProvider";
import DataTableProvider, {
  useDataTableContext,
} from "@/context/DataTableContext";

function DataTableBody<TData, TValue>({
  styles,
  renderTableFooter,
  renderTableHeader,
  tableLabel,
  description,
  theme = "system",
}: DataTableProps<TData, TValue>) {
  const themeMethods = useTheme();
  const { table, focusedCell, setFocusedCell, rowFlexRender } =
    useDataTableContext<TData, TValue>();

  const handleCellFocus = (rowIndex: number, columnIndex: number) => {
    setFocusedCell({ rowIndex, columnIndex });
  };

  useEffect(() => {
    themeMethods.setTheme(theme);
  }, [theme, themeMethods]);

  return (
    <section
      className={styles?.containerClassName}
      style={styles?.containerStyle}
    >
      {renderTableHeader ? (
        renderTableHeader(table)
      ) : (
        <div className={styles?.headerClassName} style={styles?.headerStyle}>
          <h2>{tableLabel}</h2>
          {description && <p>{description}</p>}
        </div>
      )}
      <div
        className={styles?.containerClassName}
        style={styles?.containerStyle}
      >
        <div
          className={styles?.dataTableClassName}
          style={styles?.dataTableStyle}
        >
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : rowFlexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, rowIndex) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell, columnIndex) => (
                    <td
                      key={cell.id}
                      onClick={() => handleCellFocus(rowIndex, columnIndex)}
                      style={{
                        backgroundColor:
                          focusedCell?.rowIndex === rowIndex &&
                          focusedCell?.columnIndex === columnIndex
                            ? "yellow"
                            : undefined,
                      }}
                    >
                      {rowFlexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {renderTableFooter && renderTableFooter(table)}
    </section>
  );
}

function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  return (
    <ThemeProvider
      defaultTheme={props.theme}
      storageKey="adimis-react-schema-table-theme"
      themeColors={props.themeColors}
    >
      <DataTableProvider {...props}>
        <DataTableBody {...props} />
      </DataTableProvider>
    </ThemeProvider>
  );
}

export default DataTable;
