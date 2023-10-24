import {
  Tabs,
  Box,
  Divider,
  Grid,
  Group,
  Paper,
  Text,
  useMantineTheme
} from "@mantine/core";
import { HiMiniUserCircle } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { GetAllJalurPendaftaran } from "../../../apis/jalur/getJalur";
import Page from "../../../components/Page";
import PageLabel from "../../../components/PageLabel";
import PageLoading from "../../../components/PageLoading";
import { dataJalurPendaftaran } from "../../../components/ppdb/dataJalurPendaftaran";
import { useBreakPoints } from "../../../utils/UseBreakpoints";
import { DarkTheme } from "../../../utils/darkTheme";
import { BsFillCaretRightFill } from "react-icons/bs";

const PendaftarPPDB = () => {
  const { xs } = useBreakPoints();
  const pendaftar = dataJalurPendaftaran;


  const {
    data: dataJalur,
    isErr,
    load,
    refetch
  } = GetAllJalurPendaftaran()
  console.log(dataJalur)

  const navigate = useNavigate()

  const dark = DarkTheme()
  const theme = useMantineTheme()

  if (load) return <PageLoading />

  return (
    <Page title="Pendaftar PPDB">
      <PageLabel label="Pendaftar PPDB" />

      <Box className={`style-box relative flex-1  ${xs ? "" : "flex-1  "}`}>

        <Tabs
          defaultValue="pembelian"
          styles={{
            tabsList: {
              fontSize: "30px"
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
            <Tabs.List >
              <Tabs.Tab color="blue" value="pembelian">Pembelian</Tabs.Tab>
              <Tabs.Tab value="pengembalian">Pengembalian</Tabs.Tab>
            </Tabs.List>
          </Paper>

          <Tabs.Panel value="pembelian" mt={40}>
            <Grid >
              <Grid.Col
                md={6}
              // key={gelombang.id}
              >
                <Link
                  to={"67"}
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
                      PEMBELIAN FORMULIR
                      {/* {gelombang.name} */}
                    </h1>
                    <Group mt={10} >
                      <HiMiniUserCircle size={30} />
                      <Text >
                        {/* {gelombang.countStudent} Pendaftar {JSON.stringify(gelombang.countStudent)} */}
                        100 Pendaftar
                      </Text>
                    </Group>
                  </Paper>
                </Link>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>
          <Tabs.Panel value="pengembalian" mt={40}>
            <Grid >
              <Grid.Col
                md={6}
              // key={gelombang.id}
              >
                <Link
                  to={"67"}
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
                      PENGEMBALIAN FORMULIR REGULER GEL. 1
                      {/* {gelombang.name} */}
                    </h1>
                    <Group mt={10} >
                      <HiMiniUserCircle size={30} />
                      <Text >
                        {/* {gelombang.countStudent} Pendaftar {JSON.stringify(gelombang.countStudent)} */}
                        100 Pendaftar
                      </Text>
                    </Group>
                  </Paper>
                </Link>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

        </Tabs>

        {/* <Box
          mt={50}
          className="flex flex-col gap-4 px-4 pb-10  mx-auto flex-wrap"
        >
          {dataJalur?.map((item) => {
            const tipeFormulir =
              (item.type === "PEMBELIAN" && (
                <h1 className="text-xl font-bold">Pembelian Formulir</h1>
              )) ||
              (item.type === "PENGEMBALIAN" && (
                <h1 className="text-xl font-bold">Pengembalian Formulir</h1>
              ));

            return (
              <Box key={item.id} className="">
                <Divider size={"xs"} label={tipeFormulir} />
                <Grid className="mt-4" gutter={20} >
                  {item.registrationBatches.map((gelombang) => (
                    <Grid.Col
                      md={6}
                      key={gelombang.id}
                    >
                      <Link
                        to={"67"}
                        className="shadow-md rounded-md  bg-white no-underline text-black "
                      >
                        <Paper
                          sx={{
                            backgroundColor: "white",
                            padding: "1rem 1.5rem",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start"
                          }}
                          withBorder
                        >
                          <h1 className="text-xl  font-bold">
                            {gelombang.name}
                          </h1>
                          <Group mt={10} >
                            <HiMiniUserCircle size={20} />
                            <Text >
                              {gelombang.countStudent} Pendaftar {JSON.stringify(gelombang.countStudent)}
                            </Text>
                          </Group>
                        </Paper>
                      </Link>
                    </Grid.Col>
                  ))}
                </Grid>
              </Box>
            );
          })}
        </Box> */}

      </Box>
    </Page>

  );
};

export default PendaftarPPDB;
