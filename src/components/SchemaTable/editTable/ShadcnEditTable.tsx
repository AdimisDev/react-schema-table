import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableEditCell,
  TableContainer,
  TableContainerHeader,
  TableContainerTitle,
  TableContainerDescription,
  TableContainerBody,
  TableContainerFooter,
} from "@/components/ui/table";
import React from "react";
import { Button } from "../../ui/button";
import EditTableProvider, {
  EditTableProps,
  useEditTableContext,
} from "@/context/EditTableContext";

function ShadcnEditTableBody<TData, TValue>({
  columns,
  styles,
  description,
  panel = true,
  tableLabel,
}: EditTableProps<TData, TValue>) {
  const {
    table,
    addRow,
    getColumns,
    getHeaderContext,
    getRows,
    getRowVisbleCells,
    getIsRowSelected,
    rowFlexRender,
  } = useEditTableContext<TData, TValue>();

  return (
    <TableContainer
      className={styles?.containerClassName}
      style={styles?.containerStyle}
      panel={panel}
    >
      <TableContainerHeader
        className={styles?.headerClassName}
        style={styles?.headerStyle}
        panel={panel}
      >
        {/*Table Add Row Drawer*/}
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
        {tableLabel && (
          <TableContainerTitle panel={panel}>{tableLabel}</TableContainerTitle>
        )}
        {description && (
          <TableContainerDescription panel={panel}>
            {description}
          </TableContainerDescription>
        )}
      </TableContainerHeader>
      <TableContainerBody
        className={styles?.containerClassName}
        style={styles?.containerStyle}
        panel={panel}
      >
        <Table>
          <TableHeader>
            {getColumns().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : rowFlexRender(
                            header.column.columnDef.header,
                            getHeaderContext(header)
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {getRows().rows?.length ? (
              getRows().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  data-state={getIsRowSelected(row) && "selected"}
                >
                  {getRowVisbleCells(row).map((cell, columnIndex) => {
                    return (
                      <TableEditCell
                        key={cell.id}
                        cell={cell}
                        columnIndex={columnIndex}
                        rowIndex={rowIndex}
                      />
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
      </TableContainerBody>
      <TableContainerFooter panel={panel}>
        <Button type="submit">Save</Button>
      </TableContainerFooter>
    </TableContainer>
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
