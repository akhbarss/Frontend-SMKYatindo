import {
  Box,
  Group,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { CheckCheck, LucideIcon, Timer, UsersRound } from "lucide-react";
import { countStatisticDashboard } from "../../../../apis/statistic-dashboard/count-statistic";
import { pathStatistic } from "../../../../apis/statistic-dashboard/pathStatistic";
import Page from "../../../../components/Page";
import PageLabel from "../../../../components/PageLabel";
import { DarkTheme } from "../../../../utils/darkTheme";

type TPathStatistics = {
  title: string
  data: {
    id: number;
    label: string;
    count: string;
    part: number;
    color: string;
  }[],
  total: number;
}

const colors = [
  "#47d6ab",
  "#f7e14f",
  "#4fcdf7",
  "#f74f7c",
  "#4ff76e",
  "#d54ff7",
  "#f7a94f",
]

interface StudentStatsProps {
  data: {
    id: number;
    label: string;
    stats: number;
    progress: number;
    color: string;
    icon: LucideIcon;
    size: number;
  }[]
}

const StudentStats = ({ data }: StudentStatsProps) => {
  const dark = DarkTheme()
  const stats = data.map((stat) => {
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

const PathStatistics: React.FC<TPathStatistics> = ({ title, data, total }) => {
  console.log({data})
  const descriptions = data?.map((stat) => (
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
        {stat.part.toFixed(0)}%
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
          {total}
        </Text>
        <UsersRound size={20} />
      </Group>

      <Progress
        size="xl"
        sections={data?.map((d) => {
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

  const { data: countStatistic } = useQuery({
    queryKey: ["get_count_statistic_dashboard"],
    queryFn: countStatisticDashboard
  })

  const { data: resultPathStatistic } = useQuery({
    queryKey: ["get_path_statistic"],
    queryFn: pathStatistic
  })

  const statspage = [
    {
      id: 1,
      label: "Siswa Terdaftar",
      stats: countStatistic?.data?.registered,
      progress: 100,
      color: "blue",
      icon: UsersRound,
      size: 30
    },
    {
      id: 2,
      label: "Menunggu Pembayaran",
      stats: countStatistic?.data?.waiting_Payment,
      progress: 100,
      color: "red",
      icon: Timer,
      size: 35
    },
    {
      id: 3,
      label: "Pembayaran Terkonfirmasi",
      stats: countStatistic?.data?.payment_Confirmed,
      progress: 100,
      color: "teal",
      icon: CheckCheck ,
      size: 40
    },
  ]


  const pembelian = resultPathStatistic?.data?.filter(batch => batch.type == "PEMBELIAN")
  const totalPembelian = pembelian?.reduce((acc, currentValue) => acc + currentValue.registered, 0);
  const dataPembelian = pembelian?.map((batch, index) => {
    return ({
      id: batch.id,
      label: `${batch.name} - ${batch.grade.toUpperCase()}`,
      count: batch.registered + "",
      color: colors[index],
      part: (batch.registered / totalPembelian) * 100
    })
  })

  const pengembalian = resultPathStatistic?.data?.filter(batch => batch.type == "PENGEMBALIAN")
  const totalPengembalian = pengembalian?.reduce((acc, currentValue) => acc + currentValue.registered, 0);
  const dataPengembalian = pengembalian?.map((batch, index) => {
    return ({
      id: batch.id,
      label: `${batch.name} - ${batch.grade.toUpperCase()}`,
      count: batch.registered + "",
      color: colors[index],
      part: (batch.registered / totalPengembalian) * 100
    })
  })


  return (
    <>
      <Page title="Dashboard">
        <PageLabel label="Dashboard" />
        <Stack mt={40} className="style-box max-w-[70rem] mx-auto" spacing={"2rem"}>
          <StudentStats data={statspage} />
          <PathStatistics
            title="Tipe Pembelian"
            total={totalPembelian}
            data={dataPembelian}
          />
          <PathStatistics
            title="Tipe Pengembalian"
            total={totalPengembalian}
            data={dataPengembalian}
          />
        </Stack>
      </Page>
    </>
  );
};

export default Dashboard;
