import {
  Box,
  Grid,
  Group,
  Paper,
  Skeleton,
  Tabs,
  Text,
  Title,
  useMantineTheme
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { HiMiniUserCircle } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { getAllGelombangByTypeJalur } from "../../../apis/gelombang/getAllGelombangByTypeJalur";
import Page from "../../../components/Page";
import PageLabel from "../../../components/PageLabel";
import { useBreakPoints } from "../../../utils/UseBreakpoints";
import { DarkTheme } from "../../../utils/darkTheme";

const PendaftarPPDB = () => {
  const navigate = useNavigate()

  const dark = DarkTheme()
  const theme = useMantineTheme()
  const { xs } = useBreakPoints();

  const {
    data: gelombangByJalurPembelian,
    isLoading: loadGelPembelian
  } = useQuery({
    queryKey: ["get_all_gelombang_by_type_pembelian"],
    queryFn: () => getAllGelombangByTypeJalur("PEMBELIAN"),
  });

  const {
    data: gelombangByJalurPengembalian,
    isLoading: loadGelPengembalian
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
          color="blue"
          styles={{
            tabsList: {
              // fontSize: "30px"
            },
            tabLabel: {
              fontSize: "20px",
              color: "white"
            },
            tab: {
              backgroundColor: "tranparent",
              ":hover": {
                backgroundColor: "transparent",
                opacity: 0.9
              }
            }
          }}

        >
          <Paper
            withBorder
            shadow="md"
            radius={"xl"}
            bg={"linear-gradient(to left bottom, #6952ba, #160942)"}
            sx={theme => ({
              backgroundColor: dark ? theme.colors.dark[6] : theme.white,
              padding: "2rem",
              marginTop: "1rem"
            })}
          >
            <Title color="white" order={2} >Gelombang Dengan Tipe Jalur :</Title>
            <Tabs.List mt={20}>
              <Tabs.Tab color="blue" value="pembelian">Pembelian</Tabs.Tab>
              <Tabs.Tab value="pengembalian">Pengembalian</Tabs.Tab>
            </Tabs.List>
          </Paper>

          {/* PEMBELIAN */}
          <Tabs.Panel value="pembelian" mt={40}>
            {
              loadGelPembelian ? (
                <Skeleton height={80} />
              ) : (
                <>
                  {
                    gelombangByJalurPembelian?.data?.length < 1 ? (
                      <Paper withBorder p={"lg"} shadow="lg">
                        <Text size={"lg"} weight={"bold"}>Data kosong</Text>
                      </Paper>
                    ) : (
                      <Grid >
                        {gelombangByJalurPembelian?.data?.map(item => (
                          <Grid.Col key={item.id} md={6}>
                            <Link
                              to={`${item.id}`}
                              className="shadow-md rounded-md no-underline text-black"
                            >
                              <Paper
                                sx={{
                                  backgroundColor: dark ? theme.colors.dark[6] : theme.white,
                                  padding: "1rem 1.5rem",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "start",
                                }}
                                shadow="md"
                                withBorder
                              >
                                <h1 className="text-xl  font-bold">
                                  {item.name}
                                </h1>
                                <Group mt={10} >
                                  <HiMiniUserCircle size={30} />
                                  <Text >
                                    {JSON.stringify(item.countStudent)}
                                    {/* 100 Pendaftar */}
                                  </Text>
                                </Group>
                              </Paper>
                            </Link>
                          </Grid.Col>
                        ))}
                      </Grid>
                    )
                  }
                </>
              )
            }
          </Tabs.Panel>

          {/* PENGEMBALIAN */}
          <Tabs.Panel value="pengembalian" mt={40}>
            {loadGelPengembalian ? (
              <Skeleton height={80} />
            ) : (
              <>
                {
                  gelombangByJalurPengembalian?.data?.length < 1 ? (
                    <Paper withBorder p={"lg"} shadow="lg">
                      <Text size={"lg"} weight={"bold"}>Data kosong</Text>
                    </Paper>
                  ) : (
                    <Grid >
                      {
                        gelombangByJalurPengembalian?.data?.map(item => (
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
                                     Pendaftar
                                  </Text>
                                </Group>
                              </Paper>
                            </Link>
                          </Grid.Col>
                        ))}
                    </Grid>
                  )
                }
              </>
            )}
          </Tabs.Panel>
        </Tabs>
      </Box>
    </Page>

  );
};

export default PendaftarPPDB;
