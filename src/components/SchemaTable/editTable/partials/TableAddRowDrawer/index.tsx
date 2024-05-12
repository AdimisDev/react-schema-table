import { useEditTableContext } from "@/context/EditTableContext";

interface TableAddRowProps {}

function TableAddRowDrawer<TData, TValue>(props: TableAddRowProps) {
  const { addRow } = useEditTableContext<TData, TValue>();
  return <></>;
}
export default TableAddRowProps;
