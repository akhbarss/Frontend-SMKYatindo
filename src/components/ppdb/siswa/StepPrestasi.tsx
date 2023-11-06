import React from "react";
import { Card, Paper, Skeleton, Stack, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getOffsetStatus } from "../../../apis/pembelian";
import useQueryFilter from "../../../hooks/useQueryFilter";
import { Step } from "../../../types/global";
import CardChooseBatch from "./CardChooseBatch";

const StepPrestasi: React.FC<Step> = ({ type = "PEMBELIAN" }) => {
  const filter = useQueryFilter({ step: 1, stagingId: null });

  const {
    data: offset,
    isLoading: statusLoading,
    isSuccess: statusSuccess,
  } = useQuery({
    queryKey: ["student_staging_offset", filter.stagingId, type],
    queryFn: () => getOffsetStatus(filter.stagingId, type),
    enabled: !!filter.stagingId,
  });

  return (
    <Paper
      withBorder
      radius="md"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
        padding: "2rem",
      })}
    >
      <Title>Isi Data Prestasi</Title>
      <Stack mt={10}>
        <Card withBorder={true} shadow={"sm"} radius={"md"}>
          <Card.Section withBorder={true} inheritPadding py="xs">
            <Text weight={500}>Pengalaman</Text>
          </Card.Section>
        </Card>
        <Card withBorder={true} shadow={"sm"} radius={"md"}>
          <Card.Section withBorder={true} inheritPadding py="xs">
            <Text weight={500}>Sertifikasi dan Prestasi</Text>
          </Card.Section>
        </Card>
        <Card withBorder={true} shadow={"sm"} radius={"md"}>
          <Card.Section withBorder={true} inheritPadding py="xs">
            <Text weight={500}>Kemampuan Bahasa</Text>
          </Card.Section>
        </Card>
      </Stack>
    </Paper>
  );
};

export default StepPrestasi;
