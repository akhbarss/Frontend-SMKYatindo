import React from "react";
import { Box, Flex, Group, Pagination as P, Select, Text } from "@mantine/core";

type TPagination = {
  current: number;
  total: number;
  currentSize?: number;
  disableFirst?: boolean;
  disablePrev?: boolean;
  disableNext?: boolean;

  disableLast?: boolean;
  totalRecords?: number;
  onChangePageSize?: (e: any) => void;
  onSelectRandomPage?: (value: number) => void;
  onSelectLastPage?: () => void;
  onSelectFirstPage?: () => void;
  onSelectPrevPage?: () => void;
  onSelectNextPage?: () => void;
};

const Pagination: React.FC<TPagination> = ({
  current,
  total,
  currentSize = 0,
  totalRecords = 10,
  disableFirst = false,
  disablePrev = false,
  disableNext = false,
  disableLast = false,
  onSelectRandomPage,
  onChangePageSize,
  onSelectFirstPage,
  onSelectLastPage,
  onSelectNextPage,
  onSelectPrevPage,
}) => {
  return (
    <Box
      sx={() => ({
        width: "100%",
        position: "relative",
      })}
    >
      <Flex
        align={"center"}
        direction={{
          base: "column",
          md: "row",
        }}
      >
        <P.Root total={total} onChange={onSelectRandomPage}>
          <Group spacing={7} position="center" mt="xl">
            <P.First component="a" onClick={onSelectFirstPage} />
            <P.Previous component="a" onClick={onSelectPrevPage} />
            <P.Items />
            <P.Next component="a" onClick={onSelectNextPage} />
            <P.Last component="a" onClick={onSelectLastPage} />
          </Group>
        </P.Root>

        <Box
          sx={(theme) => ({
            position: "relative",
            right: 0,
            [theme.fn.largerThan("sm")]: {
              right: 6,
              position: "absolute",
            },
          })}
        >
          <Flex
            gap={3}
            align={"center"}
            direction={"column"}
            sx={(theme) => ({
              width: "100%",
              [theme.fn.largerThan("sm")]: {
                width: "100%",
              },
            })}
          >
            <Text style={{ width: "100%" }}>
              Halaman {current} dari {total}
            </Text>
            <Select
              sx={{
                width: "100%",
              }}
              value={currentSize.toString()}
              onChange={onChangePageSize}
              data={Array.from(new Set([10, 20, 30, 40, 50, totalRecords])).map(
                (pageSize, index) => {
                  return {
                    value: pageSize.toString(),
                    label: `Menampilkan ${
                      index === 5 ? "Semua" : pageSize
                    } Data`,
                  };
                }
              )}
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Pagination;
