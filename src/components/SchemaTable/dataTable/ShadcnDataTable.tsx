import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/package/components/table/table";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../package/components/ui/card";
import { DataTableProps } from "../../../interface";
import { ThemeProvider, useTheme } from "../../../package/context/ThemeProvider";
import DataTableProvider, {
  useDataTableContext,
} from "@/package/context/DataTableContext";

function ShadcnDataTableBody<TData, TValue>({
  columns,
  styles,
  renderTableFooter,
  renderTableHeader,
  description,
  tableLabel,
  panel = true,
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

  const Container = panel ? Card : "div";
  const ContainerHeader = panel ? CardHeader : "div";
  const ContainerContent = panel ? CardContent : "div";
  const ContainerFooter = panel ? CardFooter : "div";
  const ContainerTitle = panel ? CardTitle : "h2";
  const ContainerDescription = panel ? CardDescription : "p";

  return (
    <Container
      className={styles?.containerClassName}
      style={styles?.containerStyle}
    >
      <ContainerHeader
        className={styles?.headerClassName}
        style={styles?.headerStyle}
      >
        {renderTableHeader ? (
          renderTableHeader(table)
        ) : (
          <React.Fragment>
            <ContainerTitle>{tableLabel}</ContainerTitle>
            {description && (
              <ContainerDescription>{description}</ContainerDescription>
            )}
          </React.Fragment>
        )}
      </ContainerHeader>
      <ContainerContent
        className={styles?.containerClassName}
        style={styles?.containerStyle}
      >
        <div
          className={styles?.dataTableClassName}
          style={styles?.dataTableStyle}
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : rowFlexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, rowIndex) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell, columnIndex) => (
                      <TableCell
                        key={cell.id}
                        onClick={() => handleCellFocus(rowIndex, columnIndex)}
                        className={
                          focusedCell?.rowIndex === rowIndex &&
                          focusedCell?.columnIndex === columnIndex
                            ? "bg-secondary"
                            : ""
                        }
                      >
                        {rowFlexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </ContainerContent>
      {renderTableFooter && (
        <ContainerFooter>{renderTableFooter(table)}</ContainerFooter>
      )}
    </Container>
  );
}

function ShadcnDataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  return (
    <ThemeProvider
      defaultTheme={props.theme}
      storageKey="adimis-react-schema-table-theme"
      themeColors={props.themeColors}
    >
      <DataTableProvider {...props}>
        <ShadcnDataTableBody {...props} />
      </DataTableProvider>
    </ThemeProvider>
  );
}

export default ShadcnDataTable;
