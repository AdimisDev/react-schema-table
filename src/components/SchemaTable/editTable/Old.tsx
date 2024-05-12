import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import EditTableProvider, {
  EditTableProps,
  useEditTableContext,
} from "@/context/EditTableContext";
import { Button } from "../../ui/button";
import { DataTableColumnDef } from "@/interface";
import TableEditCell from "./partials/TableEditCell";

function ShadcnEditTableBody<TData, TValue>({
  columns,
  styles,
  renderTableFooter,
  renderTableHeader,
  description,
  panel = true,
  tableLabel,
}: EditTableProps<TData, TValue>) {
  const { table, focusedCell, setFocusedCell, addRow, rowFlexRender } = useEditTableContext<
    TData,
    TValue
  >();

  const handleCellFocus = (rowIndex: number, columnIndex: number) => {
    setFocusedCell({ rowIndex, columnIndex });
  };

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
        <Button
          onClick={() => {
            addRow({
              id: table.getRowModel().rows?.length + 1,
              amount: 5,
              status: "Success",
              email: "something@example.com",
            } as TData);
          }}
        >
          Create
        </Button>
        {renderTableHeader ? (
          renderTableHeader(table)
        ) : (
          <React.Fragment>
            {tableLabel && <ContainerTitle>{tableLabel}</ContainerTitle>}
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
                    {row.getVisibleCells().map((cell, columnIndex) => {
                      const isFocused =
                        focusedCell?.rowIndex === rowIndex &&
                        focusedCell?.columnIndex === columnIndex;
                      const cellValue = cell.getValue();
                      const cellMeta:
                        | DataTableColumnDef<TData, unknown>
                        | undefined = cell.column.columnDef.meta as
                        | DataTableColumnDef<TData, unknown>
                        | undefined;
                      const cellType = cellMeta?.meta?.type || "text";

                      return (
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
                          {isFocused ? (
                            <TableEditCell
                              inputType={cellType}
                              cellValue={cellValue}
                              rowIndex={rowIndex}
                              columnId={cell.column.id}
                            />
                          ) : (
                            rowFlexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          )}
                        </TableCell>
                      );
                    })}
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
      <ContainerFooter>
        {renderTableFooter ? (
          renderTableFooter(table)
        ) : (
          <Button type="submit">Save</Button>
        )}
      </ContainerFooter>
    </Container>
  );
}

function ShadcnEditTable<TData, TValue>(props: EditTableProps<TData, TValue>) {
  return (
    <EditTableProvider {...props}>
      <ShadcnEditTableBody {...props} />
    </EditTableProvider>
  );
}

export default ShadcnEditTable;
