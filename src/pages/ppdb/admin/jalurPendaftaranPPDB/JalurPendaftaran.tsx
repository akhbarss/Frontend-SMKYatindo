import {
  ActionIcon,
  Box,
  Button,
  Grid,
  Group,
  Radio,
  Stack,
  Text,
  TextInput,
  useMantineTheme
} from "@mantine/core";
import { DateTimePicker } from '@mantine/dates';
import { modals } from "@mantine/modals";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Page from "../../../../components/Page";
import PageLabel from "../../../../components/PageLabel";
import { dataJalurPendaftaran } from "../../../../components/ppdb/dataJalurPendaftaran";
import { useBreakPoints } from "../../../../utils/UseBreakpoints";

const AlurPPPDB = () => {
  const { xs, md } = useBreakPoints();
  const theme = useMantineTheme();
  const dark = theme.colorScheme === "dark";

  const data = dataJalurPendaftaran;

  return (
    <Page title={"Jalur Pendaftaran"}>
      <PageLabel label={"Jalur Pendaftaran"} />

      <Box
        mt={50}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          paddingBottom: "40px",
        }}
      >
        {data.map((item) => {
          const pendaftarPerJalur = item.gelombang.map(
            (item) => item.jumlah_penerimaan
          );

          const jumlahPendaftarPerJalur = pendaftarPerJalur.reduce(
            (total, current) => total + current,
            0
          );

          const submitHandler = () => {
            console.log("Accetp")
            console.log(item)
            console.log(jumlahPendaftarPerJalur)
          }

          return (
            <Box
              key={item.id}
              style={{
                padding: "16px",
                borderRadius: "6px",
                boxShadow: "0 5px 10px -5px black",
                display: "flex",
                alignItems: "center",
                backgroundColor: `${dark ? "#25262B" : "white"}`,
              }}
            >
              <Link
                className="flex-[1] no-underline text-[#2A166F]"
                to={`${item.id}/informasi-umum`}
              >
                <Text size={"xl"} weight={"bold"} sx={{
                  color: `${dark ? "white" : "black"}`
                }}>
                  {item.nama_jalur_pendaftaran}
                </Text>

                <span className="flex gap-3">
                  <p>
                    {item.waktu_dibuka} &ndash; {item.waktu_ditutup}{" "}
                  </p>
                  <p>{jumlahPendaftarPerJalur} Pendaftar </p>
                </span>
              </Link>

              <div className="px-4 flex gap-2 ">
                <ActionIcon
                  variant="filled"
                  color="blue"
                  size={40}
                  radius={100}
                  className="bg-[#2A166F] hover:bg-[#2A166F]"
                  onClick={() => {

                    modals.openContextModal({
                      id: "",
                      modal: "modalAlurAdmin",
                      title: "Ubah Jalur Pendaftaran PPDB",
                      innerProps: {
                        onAccept: submitHandler,
                        onCancel: () => console.log("cancel"),
                        modalBody: (
                          <>
                            <Stack sx={{ minHeight: "90vh" }}>

                              <Radio.Group
                                label="Metode Pembayaran"
                                description="Pilih salah satu"
                                styles={{
                                  error: {
                                    marginTop: "10px",
                                  },
                                }}
                                onChange={(value) => {
                                  // setMetodePembayaran(value)
                                  console.log(value)

                                }}
                                // defaultValue={item.tipe}
                                required
                              >
                                <Group
                                  mt={"xs"}
                                  pt={10}
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "start"
                                  }}
                                >
                                  <Radio
                                    label="Pembelian"
                                    value={"pembelian"}
                                    required
                                  />

                                  <Radio
                                    label="Pengembalian"
                                    value={"pengemmbalian"}
                                    required
                                  />
                                </Group>
                              </Radio.Group>

                              <TextInput
                                value={item.nama_jalur_pendaftaran}
                                onChange={(val) => console.log(val)}
                                label="Nama"
                              />

                              <Grid>
                                <Grid.Col md={6}>

                                  <DateTimePicker
                                    label="Waktu Dibuka"
                                  />
                                </Grid.Col>
                                <Grid.Col md={6}>

                                  <DateTimePicker
                                    label="Waktu Ditutup"
                                  />
                                </Grid.Col>

                              </Grid>

                              <TextInput
                                label="Biaya Pendaftaran"
                              />

                            </Stack>
                          </>
                        ),
                      },
                      styles: {
                        header: {
                          backgroundColor: "#2A166F",
                          zIndex: 0
                        },
                        title: {
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "25px"
                        },
                        root: {
                          borderRadius: "100px"
                        },
                        body: {
                          overflow: "hidden",
                          height: "80vh",
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          padding: 0
                        },
                      },
                      size: "50rem"
                    });

                  }
                  }
                >
                  <AiFillEdit size={20} />
                </ActionIcon>
                <ActionIcon
                  variant="filled"
                  color="blue"
                  size={40}
                  radius={100}
                  className="bg-[#2A166F] hover:bg-[#2A166F] "
                >
                  <BsFillTrashFill size={20} />
                </ActionIcon>
              </div>
            </Box>
          );
        })}

        <Button mt={40}
          onClick={() => {
            const onAccept = () => {
              console.log("create Jalur")
            }

            modals.openContextModal({
              modal: "modalAlurAdmin",
              title: "Tambah Alur Pendaftaran",
              innerProps: {
                onAccept,
                onCancel: () => console.log("cancel"),
                modalBody: (
                  <>
                    <Stack sx={{ minHeight: "90vh" }}>

                      <Radio.Group
                        label="Metode Pembayaran"
                        description="Pilih salah satu"
                        styles={{
                          error: {
                            marginTop: "10px",
                          },
                        }}
                        onChange={(value) => {
                          console.log(value)

                        }}
                        required
                      >
                        <Group
                          mt={"xs"}
                          pt={10}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start"
                          }}
                        >
                          <Radio
                            label="Pembelian"
                            value={"pembelian"}
                            required
                          />

                          <Radio
                            label="Pengembalian"
                            value={"pengemmbalian"}
                            required
                          />
                        </Group>
                      </Radio.Group>

                      <TextInput
                        onChange={(val) => console.log(val)}
                        label="Nama"
                      />

                      <Grid sx={{ zIndex: 10000000 }}>
                        <Grid.Col md={6}>

                          <DateTimePicker
                            label="Waktu Dibuka"
                            sx={{ zIndex: 10000000 }}
                          />
                        </Grid.Col>
                        <Grid.Col md={6}>

                          <DateTimePicker
                            label="Waktu Ditutup"
                          />
                        </Grid.Col>

                      </Grid>

                      <TextInput
                        label="Biaya Pendaftaran"
                      />

                    </Stack>
                  </>
                ),

              },
              styles: {
                header: {
                  backgroundColor: "#2A166F",
                },
                title: {
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "25px"
                },
                root: {
                  borderRadius: "100px"
                  // overflow: "visible",
                },
                body: {
                  overflow: "visible",
                  height: "80vh",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  padding: 0
                },
                content: {
                  overflowY: "visible",
                  
                },
                inner: {
                  overflowY: "visible",
                  
                },
                overlay: {
                  overflowY: "visible",

                }

              },
              size: "50rem",
            });

          }}
        >
          Tambah
        </Button>

      </Box>


    </Page>
  );
};

export default AlurPPPDB;
