/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Box,
  Paper,
  Skeleton,
  Tabs,
  Title,
  useMantineTheme
} from "@mantine/core";
import { Suspense, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Page from "../../../../components/Page";
import PageLabel from "../../../../components/PageLabel";
import { useBreakPoints } from "../../../../utils/UseBreakpoints";

export type FormValuesCreateJalur = {
  id: number | null
  tipeJalur: string
  namaJalur: string
  waktuDibuka: string
  waktuDitutup: string
  biayaPendaftaran: number
}

const JalurPendaftarahAdmin = ({ children }: { children: React.ReactNode }) => {
  const theme = useMantineTheme();
  const dark = theme.colorScheme === "dark";
  const location = useLocation()
  const {  xs } = useBreakPoints()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === "/ppdb/main/jalur-pendaftaran") {
      navigate("/ppdb/main/jalur-pendaftaran/smp")
    }
  }, [navigate, location.pathname])

  return (
    <Page title={"Jalur Pendaftaran"}>
      <PageLabel label={"Jalur Pendaftaran"} />

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
            <Title color="white" order={2} >Jalur Pendaftaran dengan Tipe Jenjang :</Title>
            <Tabs.List mt={20}>
              <Tabs.Tab  value="smp">SMP</Tabs.Tab>
              <Tabs.Tab value="smk">SMK</Tabs.Tab>
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

export default JalurPendaftarahAdmin;
