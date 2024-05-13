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
} from "@/package/components/table/table";
import React from "react";
import EditTableProvider, {
  EditTableProps,
  useEditTableContext,
} from "@/package/context/EditTableContext";
import { DataTableSearch } from "@/package/components/partials/DataTableSearch";
import { DataTableFilter } from "@/package/components/partials/DataTableFilter";
import { DataTableViewOptions } from "@/package/components/partials/DataTableViewOptions";
import { DataTablePagination } from "@/package/components/partials/DataTablePagination";

function ShadcnEditTableBody<TData, TValue>({
  columns,
  styles,
  description,
  panel = true,
  tableLabel,
  editType = "inline",
}: EditTableProps<TData, TValue>) {
  const {
    table,
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
        <div className="mb-2">
          {tableLabel && (
            <TableContainerTitle panel={panel}>
              {tableLabel}
            </TableContainerTitle>
          )}
          {description && (
            <TableContainerDescription panel={panel}>
              {description}
            </TableContainerDescription>
          )}
        </div>
        <div>
          <span className="mb-2" />
          <div className="flex justify-between items-center">
            <div>
              <DataTableSearch table={table} />
            </div>
            <div>
              <DataTableFilter table={table} />
              <span className="ml-2" />
              <DataTableViewOptions table={table} />
            </div>
          </div>
        </div>
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
                    return editType === "inline" ? (
                      <TableEditCell
                        key={cell.id}
                        cell={cell}
                        columnIndex={columnIndex}
                        rowIndex={rowIndex}
                      />
                    ) : (
                      <TableCell>
                        {rowFlexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
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
      </TableContainerBody>
      <TableContainerFooter panel={panel}>
        <DataTablePagination table={table} />
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
