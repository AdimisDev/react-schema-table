import { Input } from "@/package/components/ui/input";
import { useEditTableContext } from "@/package/context/EditTableContext";

export interface TableEditCellProps {
  inputType?: React.HTMLInputTypeAttribute;
  cellValue: any;
  rowIndex: number;
  columnId: string;
}

function TableEditCell<TData, TValue>(props: TableEditCellProps) {
  const { inputType, cellValue, rowIndex, columnId } = props;
  const { editCell } = useEditTableContext<TData, TValue>();

  const handleInputChange = (
    value: any,
    rowIndex: number,
    columnId: string
  ) => {
    let formattedValue: any = value;
    if (inputType === "number") {
      formattedValue = parseFloat(value);
    } else if (inputType === "checkbox") {
      formattedValue = value === "on";
    }
    editCell(rowIndex, columnId, formattedValue);
  };

  return (
    <Input
      type={inputType}
      value={inputType === "checkbox" ? undefined : String(cellValue)}
      checked={inputType === "checkbox" ? Boolean(cellValue) : undefined}
      onChange={(e) => handleInputChange(e.target.value, rowIndex, columnId)}
      autoFocus
    />
  );
}

export default TableEditCell;
