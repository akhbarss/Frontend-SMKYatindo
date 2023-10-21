import {
  Progress,
  Box,
  Text,
  Group,
  Paper,
  SimpleGrid,
  rem,
  RingProgress,
  Center,
  Flex,
  Anchor,
} from "@mantine/core";
import {
  IconArrowUpRight,
  IconDeviceAnalytics,
  IconArrowDownRight,
} from "@tabler/icons-react";
import DataTable from "../../../components/DataTable";
import { useMemo } from "react";

const data = [
  { label: "Jalur Reguler", count: "204,001", part: 59, color: "#47d6ab" },
  { label: "Jalur Prestasi", count: "121,017", part: 35, color: "#03141a" },
  { label: "Jalur Diskon", count: "31,118", part: 6, color: "#4fcdf7" },
];

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

const statspage = [
  {
    label: "Siswa Terdaftar",
    stats: "490.203",
    progress: 90,
    color: "red",
    icon: "down",
  },
  {
    label: "Menunggu Pembayaran",
    stats: "456,578",
    progress: 65,
    color: "teal",
    icon: "up",
  },
  {
    label: "Pembayaran Terkonfirmasi",
    stats: "2,550",
    progress: 40,
    color: "blue",
    icon: "up",
  },
] as const;

const StudentStats = () => {
  const stats = statspage.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper withBorder radius="md" p="xs" key={stat.label}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <Icon
                  style={{ width: rem(20), height: rem(20) }}
                  stroke={1.5}
                />
              </Center>
            }
          />

          <div>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {stat.label}
            </Text>
            <Text fw={700} size="xl">
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });

  return (
    <SimpleGrid
      breakpoints={[
        { maxWidth: "xs", cols: 1 },
        { minWidth: "md", cols: 3 },
      ]}
    >
      {stats}
    </SimpleGrid>
  );
};

const PathStatistics = () => {
  const descriptions = data.map((stat) => (
    <Box
      key={stat.label}
      style={{
        borderColor: stat.color,
        borderBottomWidth: 0.5,
        borderBottomStyle: "solid",
        paddingBottom: 5,
      }}
    >
      <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
        {stat.label}
      </Text>

      <Group justify="space-between" align="flex-end" gap={0}>
        <Text fw={700}>{stat.count}</Text>
        <Text c={stat.color} fw={700} size="sm">
          {stat.part}%
        </Text>
      </Group>
    </Box>
  ));
  return (
    <Paper withBorder p="md" radius="md">
      <Text size={"lg"} weight={500} mb={10}>
        Statistik Berdasarkan Jalur Pendaftaran
      </Text>
      <Group justify="space-between">
        <Group align="flex-end" gap="xs">
          <Text fz="xl" fw={700}>
            345,765
          </Text>
        </Group>
        <IconDeviceAnalytics size="1.4rem" stroke={1.5} />
      </Group>

      <Progress
        size="xl"
        sections={data.map((d) => {
          return {
            value: d.part,
            color: d.color,
          };
        })}
      />
      <SimpleGrid
        breakpoints={[
          { maxWidth: "xs", cols: 1 },
          { minWidth: "md", cols: 3 },
        ]}
        mt="xl"
      >
        {descriptions}
      </SimpleGrid>
    </Paper>
  );
};

const Dashboard = () => {
  const columns = useMemo(() => {
    return [
      {
        id: "Nama",
        header: "Nama",
        accessorFn: (data, deps) => {
          return deps + 1;
        },
      },
    ];
  }, []);

  return (
    <>
      <Box mb={"lg"}>
        <StudentStats />
      </Box>
      <Box mb={"lg"}>
        <PathStatistics />
      </Box>
      <Box>
        <Paper withBorder p="md" radius="md">
          <Flex justify={"space-between"} align={"center"}>
            <Text size={"lg"} weight={500} mb={10}>
              Pendaftar 5 Terawal
            </Text>
            <Anchor href="https://mantine.dev/" target="_blank" size={"sm"}>
              Lihat Semua
            </Anchor>
          </Flex>
          <DataTable
            data={[]}
            columns={columns}
            useSearchInput={true}
            noCard={true}
          />
        </Paper>
      </Box>
    </>
  );
};

export default Dashboard;
