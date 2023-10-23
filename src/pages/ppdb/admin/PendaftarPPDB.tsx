import {
  useMantineTheme,
  ThemeIcon,
  Group,
  Grid,
  Box,
  Divider,
  Text,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { dataJalurPendaftaran } from "../../../components/ppdb/dataJalurPendaftaran";
import { useBreakPoints } from "../../../utils/UseBreakpoints";
import Page from "../../../components/Page";
import PageLabel from "../../../components/PageLabel";
import { HiMiniUserCircle } from "react-icons/hi2";
import { DarkTheme } from "../../../utils/darkTheme";

const PendaftarPPDB = () => {
  const { xs } = useBreakPoints();
  const pendaftar = dataJalurPendaftaran;

  const navigate = useNavigate()

  const dark = DarkTheme()
  const theme = useMantineTheme()

  return (
    <Page title="Pendaftar PPDB">
      <PageLabel label="Pendaftar PPDB" />

      <Box className={`style-box relative flex-1  ${xs ? "" : "flex-1  "}`}>

        <Box
          mt={50}
          className="flex flex-col gap-4 px-4 pb-10  mx-auto flex-wrap"
        >
          {pendaftar.map((item) => {
            const tipeFormulir =
              (item.tipe === "pembelian" && (
                <h1 className="text-xl font-bold">Pembelian Formulir</h1>
              )) ||
              (item.tipe === "pengembalian" && (
                <h1 className="text-xl font-bold">Pengembalian Formulir</h1>
              ));

            return (
              <Box key={item.id} className="mb-5">
                <Divider size={"xs"} label={tipeFormulir} />
                <Grid className="mt-4" gutter={20} >
                  {item.gelombang.map((gelombang) => (
                    <Grid.Col
                      md={6}
                      key={gelombang.id}
                    >
                      <Box
                        className="shadow-md rounded-md"
                        
                        sx={theme => ({
                          backgroundColor: dark ? theme.colors.dark[9] : theme.white,
                          padding: "1rem 1.5rem"
                        })}
                      >

                        <h1 className="text-xl  font-bold">
                          {gelombang.nama_gelombang}
                        </h1>
                        <Group mt={10} >
                          <HiMiniUserCircle size={20} />
                          <Text >
                            {gelombang.jumlah_penerimaan} Pendaftar
                          </Text>
                        </Group>
                      </Box>
                    </Grid.Col>
                  ))}
                </Grid>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Page>

  );
};

export default PendaftarPPDB;
