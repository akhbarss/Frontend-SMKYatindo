import {
  Box,
  Group,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  useMantineTheme
} from "@mantine/core";
import {
  IconArrowDownRight,
  IconArrowUpRight
} from "@tabler/icons-react";
import { useMemo } from "react";
import { FaUser, FaUsers } from "react-icons/fa6";
import { MdOutlinePriceCheck } from "react-icons/md";
import { PiTimerBold } from "react-icons/pi";
import Page from "../../../../components/Page";
import PageLabel from "../../../../components/PageLabel";
import { DarkTheme } from "../../../../utils/darkTheme";

type TPathStatistics = {
  title: string
}

const data = [
  { id: 1, label: "Jalur Reguler", count: "204,001", part: 20, color: "#47d6ab" },
  { id: 2, label: "Jalur Prestasi", count: "121,017", part: 20, color: "#f7e14f" },
  { id: 3, label: "Jalur Diskon", count: "31,118", part: 10, color: "#4fcdf7" },
  { id: 4, label: "Jalur Diskon", count: "41,118", part: 10, color: "#f74f7c" },
  { id: 5, label: "Jalur Diskon", count: "61,118", part: 20, color: "#4ff76e" },
  { id: 6, label: "Jalur Diskon", count: "61,118", part: 10, color: "#d54ff7" },
  { id: 7, label: "Jalur Diskon", count: "61,118", part: 10, color: "#f7a94f" },
];

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

const statspage = [
  {
    id: 1,
    label: "Siswa Terdaftar",
    stats: "490.203",
    progress: 100,
    color: "blue",
    icon: FaUsers,
    size: 30
  },
  {
    id: 2,
    label: "Menunggu Pembayaran",
    stats: "456,578",
    progress: 100,
    color: "red",
    icon: PiTimerBold,
    size: 35
  },
  {
    id: 3,
    label: "Pembayaran Terkonfirmasi",
    stats: "2,550",
    progress: 100,
    color: "teal",
    icon: MdOutlinePriceCheck,
    size: 40
  },
] as const;

const StudentStats = () => {
  const theme = useMantineTheme()
  const dark = DarkTheme()
  const stats = statspage.map((stat) => {
    const Icon = stat.icon;
    return (
      <Paper withBorder radius="md" p="xs" key={stat.id} shadow="md" sx={theme => ({ backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[9] : "" })}>
        <Group>
          <ThemeIcon m={5} radius={"50%"} variant={`${dark ? "light" : "filled"}`} color={stat.color} size={70} >
            <Icon size={stat.size} />
          </ThemeIcon>

          <Box w={190}>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {stat.label}
            </Text>
            <Text fw={700} size="xl">
              {stat.stats}
            </Text>
          </Box>
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

const PathStatistics: React.FC<TPathStatistics> = ({ title }) => {
  const descriptions = data.map((stat) => (
    <Box
      key={stat.id}
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

      <Group align="flex-end" >
        <Text fw={700}>{stat.count}</Text>
        <Text c={stat.color} fw={700} size="sm">
          {stat.part}%
        </Text>
      </Group>
    </Box>
  ));
  return (
    <Paper withBorder p="md" radius="md" shadow="md" sx={theme => ({ backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[9] : "" })}>
      <Text size={"lg"} weight={500} mb={10}>
        Statistik Berdasarkan Jalur Pendaftaran - {title}
      </Text>
      <Group my={10} >
        <Text fz="xl" fw={700}>
          345,765
        </Text>
        <FaUser size={20} />
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
        id: "No. Formulir",
        header: "No. Formulir",
        accessorFn: (data, deps) => {
          return deps + 1;
        },
      },
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
      <Page title="Dashboard">
        <PageLabel label="Dashboard" />
        <Stack mt={40} className="style-box max-w-[70rem] mx-auto" spacing={"2rem"}>
          <StudentStats />
          <PathStatistics title="Tipe Pembelian" />
          <PathStatistics title="Tipe Pengembalian" />
          <PathStatistics title="Gelombang" />
        </Stack>
      </Page>
    </>
  );
};

export default Dashboard;
