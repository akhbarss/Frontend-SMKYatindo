import React, { Fragment } from "react";
import {
  flexRender,
  Row,
  Table as TableReactTable,
} from "@tanstack/react-table";
import { Loader, Table, Text } from "@mantine/core";

export type TBaseTable<T> = {
  table?: TableReactTable<T>;
  useFooter?: boolean;
  renderSubComponent?: (row: Row<T>) => any;
  loading?: boolean;
  isResize?: boolean;
};

const BaseTable = <T extends unknown>({
  table,
  loading = false,
  renderSubComponent,
  useFooter = false,
  isResize = false,
}: TBaseTable<T>) => {
  return (
    <Table striped highlightOnHover withBorder>
      <thead>
        {table?.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => (
              <th
                colSpan={header.colSpan}
                align={"center"}
                style={{
                  width: isResize ? header.getSize() : "min-content",
                  position: "relative",
                  borderRightWidth: isResize ? 2 : 0,
                }}
                key={header.id}
                role={"group"}
              >
                {header.isPlaceholder ? null : (
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                )}

                {isResize && index < headerGroup.headers.length - 1 && (
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    style={{
                      position: "absolute",
                      top: 0,
                      display: "none",
                      right: 0,
                      cursor: "col-resize",
                      userSelect: "none",
                      touchAction: "none",
                      height: "100%",
                      width: 2,
                    }}
                  ></div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {loading && loading === true ? (
          <tr>
            <td colSpan={table?.getAllLeafColumns().length}>
              <Text align={"center"} mb={5}>
                Loading...
              </Text>
              <Loader />
            </td>
          </tr>
        ) : table?.getRowModel() && table?.getRowModel().rows.length > 0 ? (
          table?.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <tr key={row.id} >
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    style={{
                      borderRightWidth:
                        isResize && index < row.getVisibleCells().length - 1
                          ? 2
                          : 0,
                      paddingBlock: "1rem",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {renderSubComponent && row?.getIsExpanded() && (
                <tr>
                  <td colSpan={row.getVisibleCells().length}>
                    {renderSubComponent ? renderSubComponent(row) : "-"}
                  </td>
                </tr>
              )}
            </Fragment>
          ))
        ) : (
          <tr>
            <td colSpan={table?.getAllLeafColumns().length}>
              <Text>Tidak ada data</Text>
            </td>
          </tr>
        )}
      </tbody>
      {useFooter && (
        <tfoot>
          {table?.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  style={{
                    borderRightWidth: isResize ? 2 : 0,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      )}
    </Table>
  );
};

export default BaseTable;
