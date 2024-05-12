import { useEditTableContext } from "@/context/EditTableContext";

interface TableEditRowProps {}

function TableEditRowDrawer<TData, TValue>(props: TableEditRowProps) {
  const { editCell } = useEditTableContext<TData, TValue>();
}

export default TableEditRowDrawer;
