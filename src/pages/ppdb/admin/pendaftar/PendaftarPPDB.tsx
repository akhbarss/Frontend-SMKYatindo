import {
  Box,
  Paper,
  Tabs,
  Title,
  Skeleton
} from "@mantine/core";
import { useEffect, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Page from "../../../../components/Page";
import PageLabel from "../../../../components/PageLabel";
import { useBreakPoints } from "../../../../utils/UseBreakpoints";
import { DarkTheme } from "../../../../utils/darkTheme";

const PendaftarPPDB = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation();
  const dark = DarkTheme()
  const { xs } = useBreakPoints();

  useEffect(() => {
    if (location.pathname === "/ppdb/main/pendaftar-ppdb") {
      navigate("/ppdb/main/pendaftar-ppdb/pembelian")
    }
  }, [navigate, location.pathname])

  return (
    <Page title="Pendaftar PPDB">
      <PageLabel label="Pendaftar PPDB" />

      <Box mt={40} className={`style-box relative flex-1 max-w-[70rem] mx-auto  ${xs ? "" : "flex-1  "}`}>

        <Tabs
          value={location.pathname.split("/")[4]}
          onTabChange={(value) => navigate(`${value}`)}
          color="blue"
          styles={{
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
          <Suspense fallback={<Skeleton h={80} mt={40} />}>
            {children}
          </Suspense>
        </Tabs>
      </Box>
    </Page>

  );
};

export default PendaftarPPDB;
