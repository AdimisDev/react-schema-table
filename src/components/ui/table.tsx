import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Cell } from "@tanstack/react-table";
import { useEditTableContext } from "@/context/EditTableContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableEditCell = React.forwardRef<
  HTMLTableCellElement,
  {
    cell: Cell<any, any>;
    rowIndex: number;
    columnIndex: number;
  } & React.TdHTMLAttributes<HTMLTableCellElement>
>(({ cell, rowIndex, columnIndex, className, ...props }, ref) => {
  const {
    setFocusedCell,
    isCellFocused,
    editCell,
    getCellValue,
    getCellType,
    rowFlexRender,
  } = useEditTableContext<any, any>();

  const focused = isCellFocused(rowIndex, columnIndex);

  const handleChange = (value: any) => {
    const columnId = cell.column.id;
    if (columnId) {
      editCell(rowIndex, columnId, value);
    }
  };

  const handleBlur = () => {
    setFocusedCell(null);
  };

  return (
    <td
      ref={ref}
      className={cn(
        "p-4 align-middle [&:has([role=checkbox])]:pr-0",
        focused ? "bg-muted/25" : "",
        className
      )}
      onClick={() => setFocusedCell({ rowIndex, columnIndex })}
      {...props}
    >
      {focused ? (
        <Input
          type={getCellType(cell) || "text"}
          defaultValue={getCellValue(cell)}
          defaultChecked={
            getCellType(cell) === "checkbox"
              ? Boolean(getCellValue(cell))
              : undefined
          }
          onBlur={handleBlur}
          onChange={(e) => handleChange(e.target.value)}
          autoFocus
        />
      ) : (
        rowFlexRender(cell.column.columnDef.cell, cell.getContext())
      )}
    </td>
  );
});
TableEditCell.displayName = "TableEditCell";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

const TableContainer = React.forwardRef<
  HTMLDivElement,
  {
    panel?: boolean;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ panel, children, ...rest }, ref: React.Ref<HTMLDivElement>) => {
  const Container = panel ? Card : "div";
  return (
    <Container {...rest} ref={ref}>
      {children}
    </Container>
  );
});
TableContainer.displayName = "TableContainer";

const TableContainerHeader = React.forwardRef<
  HTMLDivElement,
  {
    panel?: boolean;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ panel, children, ...rest }, ref: React.Ref<HTMLDivElement>) => {
  const ContainerHeader = panel ? CardHeader : "div";
  return (
    <ContainerHeader {...rest} ref={ref}>
      {children}
    </ContainerHeader>
  );
});
TableContainerHeader.displayName = "TableContainerHeader";

const TableContainerTitle = React.forwardRef<
  HTMLDivElement,
  {
    panel?: boolean;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ panel, children, ...rest }, ref: React.Ref<HTMLDivElement>) => {
  const ContainerTitle = panel ? CardTitle : "h2";
  return (
    <ContainerTitle {...rest} ref={ref}>
      {children}
    </ContainerTitle>
  );
});
TableContainerTitle.displayName = "TableContainerTitle";

const TableContainerDescription = React.forwardRef<
  HTMLDivElement,
  {
    panel?: boolean;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ panel, children, ...rest }, ref: React.Ref<HTMLDivElement>) => {
  const ContainerDescription = panel ? CardDescription : "p";
  return (
    <ContainerDescription {...rest} ref={ref}>
      {children}
    </ContainerDescription>
  );
});
TableContainerDescription.displayName = "TableContainerDescription";

const TableContainerBody = React.forwardRef<
  HTMLDivElement,
  {
    panel?: boolean;
    children: React.ReactNode;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ panel, children, ...rest }, ref: React.Ref<HTMLDivElement>) => {
  const ContainerBody = panel ? CardContent : "div";
  return (
    <ContainerBody {...rest} ref={ref}>
      {children}
    </ContainerBody>
  );
});
TableContainerBody.displayName = "TableContainerBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref: React.Ref<HTMLTableSectionElement>) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableContainerFooter = React.forwardRef<
  HTMLDivElement,
  {
    panel?: boolean;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ panel, ...rest }, ref: React.Ref<HTMLDivElement>) => {
  const ContainerFooter = panel ? CardFooter : "div";
  return <ContainerFooter {...rest} ref={ref} />;
});
TableContainerFooter.displayName = "TableContainerFooter";

export {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableEditCell,
  TableContainer,
  TableContainerHeader,
  TableContainerTitle,
  TableContainerDescription,
  TableContainerBody,
  TableContainerFooter,
  TableFooter,
};
