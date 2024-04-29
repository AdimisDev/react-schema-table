import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";

interface ISchemaTableProps {
  key?: string;
  columnSchema: ColumnDef<Record<string, any>>[];
  rowData: Record<string, any>[];
  actionList?: Array<{
    id: number;
    name: string;
  }>;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  panel?: boolean;
  styles?: {
    containerClassName?: string;
    containerStyle?: React.CSSProperties;
    headerClassName?: string;
    headerStyle?: React.CSSProperties;
    contentClassName?: string;
    contentStyle?: React.CSSProperties;
    footerClassName?: string;
    footerStyle?: React.CSSProperties;
  };
}

const SchemaTable = ({
  rowData,
  columnSchema,
  header,
  footer,
  panel,
  styles,
}: ISchemaTableProps) => {
  const Container = panel ? Card : "div";
  const ContainerHeader = panel ? CardHeader : "div";
  const ContainerContent = panel ? CardContent : "div";
  const ContainerFooter = panel ? CardFooter : "div";

  return (
    <Container
      className={styles?.containerClassName}
      style={styles?.containerStyle}
    >
      <ContainerHeader
        className={styles?.headerClassName}
        style={styles?.headerStyle}
      >
        {header}
      </ContainerHeader>
      <ContainerContent
        className={styles?.containerClassName}
        style={styles?.containerStyle}
      >
        <DataTable columns={columnSchema} data={rowData} />
      </ContainerContent>
      <ContainerFooter
        className={styles?.footerClassName}
        style={styles?.footerStyle}
      >
        {footer}
      </ContainerFooter>
    </Container>
  );
};

export default SchemaTable;
