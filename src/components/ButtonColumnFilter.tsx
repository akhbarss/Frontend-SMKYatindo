import React from "react";
import { Column } from "@tanstack/react-table";
import { ActionIcon, Checkbox, Menu } from "@mantine/core";
import { BiFilter } from "react-icons/bi";

type TButtonColumnFilter<T> = {
  columns: Column<T, any>[];
  isSelectedAll?: boolean;
  isIndeterminate?: boolean;
  onSelectAll?: (event: unknown) => void;
};

const ButtonColumnFilter = <T extends unknown>({
  columns,
  isSelectedAll,
  isIndeterminate,
  onSelectAll,
}: TButtonColumnFilter<T>) => {
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon>
          <BiFilter size={"lg"} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Filter Columns</Menu.Label>
        <Menu.Item>
          <Checkbox
            checked={isSelectedAll}
            indeterminate={!isSelectedAll && isIndeterminate}
            onChange={onSelectAll}
            label={"Toggle All"}
          />
        </Menu.Item>
        <Menu.Divider />
        {columns
          .filter((d) => d.id !== "select")
          .map((column) => (
            <Menu.Item key={column.id}>
              <Checkbox
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
                label={column.id ?? "-"}
              />
            </Menu.Item>
          ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default ButtonColumnFilter;
