// import { useCallback, useReducer } from "react";

interface EditableTableState<T> {
  data: T[];
  editCell: { rowId: number | null; columnId: string | null };
  selectedRows: Set<number>;
  focusedCell: { rowId: number | null; columnId: string | null };
  currentPage: number;
  rowsPerPage: number;
  totalPages: number;
  totalRows: number;
}

interface EditableTableActions<T> {
  // Pagination actions
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (pageNumber: number) => void;
  setRowsPerPage: (number: number) => void;

  // Sort actions
  sort: (columnId: string, direction: "asc" | "desc") => void;

  // Filter actions
  setFilter: (filter: (row: T) => boolean) => void;

  // Search actions
  search: (query: string, columns: string[]) => void;

  // CRUD actions
  addRow: (newRow?: Partial<T>) => void;
  removeRow: (rowIndex: number) => void;
  updateCell: (rowIndex: number, columnId: string, value: any) => void;
  bulkUpdate: (rowsIndices: number[], updateFunction: (row: T) => T) => void;
  bulkDelete: (rowsIndices: number[]) => void;
  setRowSelection: (rowIndex: number, isSelected: boolean) => void;

  // Focus actions
  focusCell: (rowIndex: number, columnId: string) => void;
}

export interface UseEditableTable<T>
  extends EditableTableState<T>,
    EditableTableActions<T> {}

// const actionTypes = {
//   nextPage: "NEXT_PAGE",
//   previousPage: "PREVIOUS_PAGE",
//   goToPage: "GO_TO_PAGE",
//   setRowsPerPage: "SET_ROWS_PER_PAGE",
//   sort: "SORT",
//   setFilter: "SET_FILTER",
//   search: "SEARCH",
//   addRow: "ADD_ROW",
//   removeRow: "REMOVE_ROW",
//   updateCell: "UPDATE_CELL",
//   bulkUpdate: "BULK_UPDATE",
//   bulkDelete: "BULK_DELETE",
//   setRowSelection: "SET_ROW_SELECTION",
//   focusCell: "FOCUS_CELL",
// };

// // Reducer function to manage the table state
// function tableReducer<T>(
//   state: EditableTableState<T>,
//   action: any
// ): EditableTableState<T> {
//   switch (action.type) {
//     case actionTypes.nextPage:
//       return {
//         ...state,
//         currentPage: Math.min(state.currentPage + 1, state.totalPages - 1),
//       };
//     case actionTypes.previousPage:
//       return { ...state, currentPage: Math.max(state.currentPage - 1, 0) };
//     case actionTypes.goToPage:
//       return { ...state, currentPage: action.pageNumber };
//     case actionTypes.setRowsPerPage:
//       return { ...state, rowsPerPage: action.number };
//     // TODO: Other actions need to be implemented based on the specific logic
//     default:
//       throw new Error("Unhandled action type");
//   }
// }

// // The useEditableTable hook
// function useEditableTable<T>(
//   initialState: EditableTableState<T>
// ): UseEditableTable<T> {
//   const [state, dispatch] = useReducer(tableReducer, initialState);

//   const nextPage = useCallback(() => {
//     dispatch({ type: actionTypes.nextPage });
//   }, []);

//   const previousPage = useCallback(() => {
//     dispatch({ type: actionTypes.previousPage });
//   }, []);

//   const goToPage = useCallback((pageNumber: number) => {
//     dispatch({ type: actionTypes.goToPage, pageNumber });
//   }, []);

//   const setRowsPerPage = useCallback((number: number) => {
//     dispatch({ type: actionTypes.setRowsPerPage, number });
//   }, []);

//   // TODO: Implement other action creators using useCallback to ensure they are memoized

//   return {
//     ...state,
//     nextPage,
//     previousPage,
//     goToPage,
//     setRowsPerPage,
//     // Other action methods
//   };
// }

// export default useEditableTable;
