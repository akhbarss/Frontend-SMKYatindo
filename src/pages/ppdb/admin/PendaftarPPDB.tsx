import {
  Title,
  Box,
  Grid,
  Group,
  Paper,
  Tabs,
  Text,
  useMantineTheme
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { HiMiniUserCircle } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
// import { getJalurPendaftaranByType } from "../../../apis/jalur/getJalurPendaftaranByType";
import Page from "../../../components/Page";
import PageLabel from "../../../components/PageLabel";
import { useBreakPoints } from "../../../utils/UseBreakpoints";
import { DarkTheme } from "../../../utils/darkTheme";
import { getAllGelombangByTypeJalur } from "../../../apis/gelombang/getAllGelombangByTypeJalur";
import { getTotalPendaftarByBatch } from "../../../apis/total-pendaftar/getTotalPendaftarByBatch";

const PendaftarPPDB = () => {
  const navigate = useNavigate()

  const dark = DarkTheme()
  const theme = useMantineTheme()
  const { xs } = useBreakPoints();

  const {
    data: gelombangByJalurPembelian,
  } = useQuery({
    queryKey: ["get_all_gelombang_by_type_pembelian"],
    queryFn: () => getAllGelombangByTypeJalur("PEMBELIAN"),
  });

  const {
    data: gelombangByJalurPengembalian,
  } = useQuery({
    queryKey: ["get_all_gelombang_by_type_pengembalian"],
    queryFn: () => getAllGelombangByTypeJalur("PENGEMBALIAN"),
  });

  console.log(gelombangByJalurPembelian)

  return (
    <Page title="Pendaftar PPDB">
      <PageLabel label="Pendaftar PPDB" />

      <Box mt={40} className={`style-box relative flex-1 max-w-[70rem] mx-auto  ${xs ? "" : "flex-1  "}`}>

        <Tabs
          defaultValue="pembelian"
          styles={{
            tabsList: {
              // fontSize: "30px"
            },
            tabLabel: {
              fontSize: "20px"
            }
          }}

        >
          <Paper
            withBorder
            sx={theme => ({
              backgroundColor: dark ? theme.colors.dark[6] : theme.white,
              padding: "2rem",
              marginTop: "1rem"
            })}
          >
            <Title order={2} >Gelombang Dengan Tipe Jalur :</Title>
            <Tabs.List  mt={20}>
              <Tabs.Tab color="blue" value="pembelian">Pembelian</Tabs.Tab>
              <Tabs.Tab value="pengembalian">Pengembalian</Tabs.Tab>
            </Tabs.List>
          </Paper>

          {/* PEMBELIAN */}
          <Tabs.Panel value="pembelian" mt={40}>
            <Grid >
              {gelombangByJalurPembelian?.data?.map(item => (
                <Grid.Col key={item.id} md={6}>
                  <Link
                    to={`${item.id}`}
                    className="shadow-md rounded-md no-underline text-black "
                  >
                    <Paper
                      sx={{
                        backgroundColor: dark ? theme.colors.dark[6] : theme.white,
                        padding: "1rem 1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                      withBorder
                    >
                      <h1 className="text-xl  font-bold">
                        {item.name}
                      </h1>
                      <Group mt={10} >
                        <HiMiniUserCircle size={30} />
                        <Text >
                          {/* 100 Pendaftar */}
                        </Text>
                      </Group>
                    </Paper>
                  </Link>
                </Grid.Col>
              ))}
            </Grid>
          </Tabs.Panel>

          {/* PENGEMBALIAN */}
          <Tabs.Panel value="pengembalian" mt={40}>
            <Grid >
              {gelombangByJalurPengembalian?.data?.map(item => (
                <Grid.Col
                  md={6}
                  key={item.id}
                >
                  <Link
                    to={`${item.id}`}
                    className="shadow-md rounded-md no-underline text-black "
                  >
                    <Paper
                      sx={{
                        backgroundColor: dark ? theme.colors.dark[6] : theme.white,
                        padding: "1rem 1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                      withBorder
                    >
                      <h1 className="text-xl  font-bold">
                        {item.name}
                      </h1>
                      <Group mt={10} >
                        <HiMiniUserCircle size={30} />
                        <Text >
                          100 Pendaftar
                        </Text>
                      </Group>
                    </Paper>
                  </Link>
                </Grid.Col>
              ))}
            </Grid>
          </Tabs.Panel>

        </Tabs>
      </Box>
    </Page>

  );
};

export default PendaftarPPDB;
