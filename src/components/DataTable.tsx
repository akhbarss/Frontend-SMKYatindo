/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import React, { useEffect } from "react";
import {
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import BaseTable, { TBaseTable } from "./BaseTable";
import { TBasicTable } from "./BasicTable";
import { useDebounce } from "../utils/useDebounce";
import { Box, Card, Flex, Input, ScrollArea, Text } from "@mantine/core";
import { BiSearch } from "react-icons/bi";
import ButtonColumnFilter from "./ButtonColumnFilter";
import Pagination from "./Pagination";

type TDataTable<T> = {
  leftFilter?: React.ReactNode;
  bottomFilter?: React.ReactNode;
  onChangeTable?: OnChangeFn<PaginationState> | undefined;
  canExpand?: (row: Row<T>) => boolean;
  onSearch?: (value: string) => void;
  pagination?: {
    pageIndex: number | undefined;
    pageSize: number | undefined;
  };
  pageCount?: number;
  rowSelectionProps?: Record<string, boolean>;
  noCard?: boolean;
  onCheckboxChange?: (checked?: {}) => void;
  getSubRows?: (originalData: T, index: number) => T[];
  rowKey?: (originalRow: any, index: number, parent: any) => string;
  useFooter?: boolean;
  useHeader?: boolean;
  usePagination?: boolean;
  useSearchInput?: boolean;
  totalRecords?: number;
  enableResizeColumn?: boolean;
  rightFilter?: React.ReactNode;
};

const DataTable = <T extends unknown>({
  leftFilter,
  rightFilter,
  bottomFilter,
  enableResizeColumn,
  onChangeTable,
  onCheckboxChange,
  canExpand = () => false,
  getSubRows = () => [],
  useFooter = false,
  useHeader = true,
  usePagination = true,
  rowKey,
  pageCount,
  onSearch,
  noCard = false,
  rowSelectionProps = {},
  pagination = {
    pageIndex: 0,
    pageSize: 10,
  },
  useSearchInput = false,
  totalRecords,
  data = [],
  renderSubComponent,
  ...props
}: TBaseTable<T> & TBasicTable<T> & TDataTable<T>) => {
  const [rowSelection, setRowSelection] = React.useState(rowSelectionProps);
  const [search, setSearch] = React.useState<string>("");
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  useEffect(() => {
    if (onCheckboxChange) {
      onCheckboxChange(rowSelection);
    }
  }, [rowSelection]);

  const debounceSearch = useDebounce<string>(search, 1000);

  useEffect(() => {
    if (onSearch) {
      onSearch(debounceSearch);
    }
  }, [debounceSearch]);

  const table = useReactTable({
    data: data,
    columns: props.columns,
    columnResizeMode: "onChange",
    state: {
      expanded,
      rowSelection: onCheckboxChange ? rowSelectionProps : rowSelection,
      pagination: {
        pageSize: pagination.pageSize ?? 10,
        pageIndex: pagination.pageIndex ?? 0,
      },
    },
    pageCount: pageCount ?? -1,
    getRowId: rowKey,
    getRowCanExpand: canExpand,
    getSubRows: getSubRows,
    onExpandedChange: setExpanded,
    manualPagination: onChangeTable && true,
    onPaginationChange: onChangeTable,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableColumnResizing: enableResizeColumn,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });
  return (
    <div>
      {useHeader ? (
        noCard ? (
          <>
            <Box mx={0} my={5}>
              <Flex
                align={"center"}
                wrap={{
                  md: "nowrap",
                  base: "wrap",
                }}
                justify={"space-between"}
                gap={{
                  base: 5,
                }}
              >
                {/* Kiri */}
                <Flex
                  gap={3}
                  wrap={{
                    sm: "nowrap",
                    base: "wrap",
                  }}
                >
                  {useSearchInput && (
                    <Box
                      sx={(theme) => ({
                        flex: "none",
                        [theme.fn.largerThan("sm")]: {
                          flex: 1,
                        },
                      })}
                    >
                      <Input
                        icon={<BiSearch size="1rem" />}
                        placeholder={"Cari Data"}
                        onChange={(e) => {
                          e.preventDefault();
                          setSearch(e.target.value);
                        }}
                      />
                    </Box>
                  )}

                  {leftFilter}
                </Flex>
                {/* Kanan */}
                <Box
                  sx={() => ({
                    // overflowY: "auto",
                  })}
                >
                  <Flex gap={3} w={"fit-content"}>
                    {rightFilter}
                    <ButtonColumnFilter
                      columns={table.getAllLeafColumns()}
                      isSelectedAll={table.getIsAllColumnsVisible()}
                      isIndeterminate={table.getIsSomeColumnsVisible()}
                      onSelectAll={table.getToggleAllColumnsVisibilityHandler()}
                    />
                  </Flex>
                </Box>
              </Flex>
              {bottomFilter && (
                <Flex
                  mt={2}
                  gap={2}
                  sx={() => ({
                    overflowX: "auto",
                  })}
                >
                  {bottomFilter}
                </Flex>
              )}
            </Box>
            {useHeader ? (
              <Box px={6} py={2}>
                <Text size={14} color={"grey.400"}>
                  Menampilkan {table.getState().pagination.pageSize} dari{" "}
                  {totalRecords} data
                </Text>
              </Box>
            ) : null}
            <Box component={ScrollArea} type="always" offsetScrollbars>
              <BaseTable
                table={table}
                loading={props.loading}
                useFooter={useFooter}
                isResize={enableResizeColumn}
                renderSubComponent={renderSubComponent}
              />
            </Box>
            {usePagination ? (
              <>
                <Box my={5} />
                <Pagination
                  current={table.getState().pagination.pageIndex + 1}
                  onSelectFirstPage={() => table.setPageIndex(0)}
                  onSelectRandomPage={(value: number) =>
                    table.setPageIndex(value - 1)
                  }
                  onSelectLastPage={() =>
                    table.setPageIndex(table.getPageCount() - 1)
                  }
                  onSelectPrevPage={() => table.previousPage()}
                  onSelectNextPage={() => table.nextPage()}
                  total={table.getPageCount()}
                  totalRecords={totalRecords}
                  currentSize={table.getState().pagination.pageSize}
                  onChangePageSize={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                  disableFirst={!table.getCanPreviousPage()}
                  disablePrev={!table.getCanPreviousPage()}
                  disableLast={!table.getCanNextPage()}
                  disableNext={!table.getCanNextPage()}
                />
              </>
            ) : null}
          </>
        ) : (
          <Card withBorder p="md" radius="md">
            <Box px={6} py={5}>
              <Flex
                align={"center"}
                wrap={{
                  md: "nowrap",
                  base: "wrap",
                }}
                justify={"space-between"}
                gap={{
                  base: 5,
                }}
              >
                {/* Kiri */}
                <Flex
                  gap={3}
                  wrap={{
                    sm: "nowrap",
                    base: "wrap",
                  }}
                >
                  {useSearchInput && (
                    <Box
                      sx={(theme) => ({
                        flex: "none",
                        [theme.fn.largerThan("sm")]: {
                          flex: 1,
                        },
                      })}
                    >
                      <Input
                        icon={<BiSearch size="1rem" />}
                        placeholder={"Cari Data"}
                        onChange={(e) => {
                          e.preventDefault();
                          setSearch(e.target.value);
                        }}
                      />
                    </Box>
                  )}

                  {leftFilter}
                </Flex>
                {/* Kanan */}
                <Box
                  sx={() => ({
                    overflowX: "auto",
                    overflowY: "hidden",
                  })}
                >
                  <Flex gap={3}>
                    {rightFilter}
                    <ButtonColumnFilter
                      columns={table.getAllLeafColumns()}
                      isSelectedAll={table.getIsAllColumnsVisible()}
                      isIndeterminate={table.getIsSomeColumnsVisible()}
                      onSelectAll={table.getToggleAllColumnsVisibilityHandler()}
                    />
                  </Flex>
                </Box>
              </Flex>
              {bottomFilter && (
                <Flex
                  mt={2}
                  gap={2}
                  sx={() => ({
                    overflowX: "auto",
                  })}
                >
                  {bottomFilter}
                </Flex>
              )}
            </Box>
            {useHeader ? (
              <Box px={6} py={2}>
                <Text size={14} color={"grey.400"}>
                  Menampilkan {table.getState().pagination.pageSize} dari{" "}
                  {totalRecords} data
                </Text>
              </Box>
            ) : null}
            <BaseTable
              table={table}
              loading={props.loading}
              useFooter={useFooter}
              isResize={enableResizeColumn}
              renderSubComponent={renderSubComponent}
            />
            {usePagination ? (
              <>
                <Box my={5} />
                <Pagination
                  current={table.getState().pagination.pageIndex + 1}
                  onSelectFirstPage={() => table.setPageIndex(0)}
                  onSelectLastPage={() =>
                    table.setPageIndex(table.getPageCount() - 1)
                  }
                  onSelectPrevPage={() => table.previousPage()}
                  onSelectNextPage={() => table.nextPage()}
                  total={table.getPageCount()}
                  totalRecords={totalRecords}
                  currentSize={table.getState().pagination.pageSize}
                  onChangePageSize={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                  disableFirst={!table.getCanPreviousPage()}
                  disablePrev={!table.getCanPreviousPage()}
                  disableLast={!table.getCanNextPage()}
                  disableNext={!table.getCanNextPage()}
                />
              </>
            ) : null}
          </Card>
        )
      ) : null}
    </div>
  );
};

export default DataTable;
