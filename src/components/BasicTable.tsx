import React from "react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import BaseTable from "./BaseTable";

export type TBasicTable<T> = {
  data: T[] | undefined;
  loading?: boolean;
  columns: ColumnDef<T, any>[];
};

const BasicTable = <T extends unknown>({
  data = [],
  loading = false,
  columns,
}: TBasicTable<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return <BaseTable table={table} loading={loading} />;
};

export default BasicTable;
