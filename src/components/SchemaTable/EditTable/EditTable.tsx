import { useState, useEffect } from "react";
import { SchemaDataTable, DataTableColumnDef, DataTableProps } from "..";

export interface EditTableProps<TData, TValue>
  extends DataTableProps<TData, TValue> {}

// TODO: Implement React Hook Form for RowData Editing
// TODO: Use Zod validation for each cell realtime validation and form submit validation.

function useEditableTableHook<TData extends { id: string }, TValue>({
  columns,
  data,
}: {
  columns: DataTableColumnDef<TData, TValue>[];
  data: TData[];
}) {
  const [tableColumns] = useState<DataTableColumnDef<TData, TValue>[]>(columns);
  const [tableData, setTableData] = useState<TData[]>(data);
  const [isCellBeingEdited, setIsCellBeingEdited] = useState<{
    columnIndex: number;
    rowIndex: number;
  } | null>(null);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  // addRow
  // deleteRow
  // editCell
  // submitRowData
  // onRowDataChange

  return {
    tableData,
    tableColumns,
    isCellBeingEdited,
    setIsCellBeingEdited,
  };
}

const EditTable = <TData extends { id: string }, TValue>({
  columns,
  data,
  renderTableHeader,
  renderTableFooter,
}: EditTableProps<TData, TValue>) => {
  const { tableData, tableColumns, setIsCellBeingEdited } =
    useEditableTableHook<TData, TValue>({
      columns,
      data,
    });

  return (
    <SchemaDataTable
      columns={tableColumns}
      data={tableData}
      renderTableHeader={renderTableHeader}
      renderTableFooter={renderTableFooter}
      onFocusedCellChange={(focusedCell) => setIsCellBeingEdited(focusedCell)}
    />
  );
};

export default EditTable;
