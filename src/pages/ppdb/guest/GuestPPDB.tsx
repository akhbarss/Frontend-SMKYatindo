import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  Image,
  Header as MantineHeader,
  Paper,
  Stack,
  Stepper,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Link as Anchor } from "react-scroll";
import { GetAllAlurPendaftaran } from "../../../apis/alur/getAlur";
import BiayaJalurPendaftaran from "../../../components/ppdb/biayaJalurPendaftaran";
import CardJalurPendaftaran from "../../../components/ppdb/cardJalurPendaftaran";
import CollapseCustomPPDB from "../../../components/ppdb/colllapseCustomPPDB";
import { dataJalurPendaftaran } from "../../../components/ppdb/dataJalurPendaftaran";
import JadwalJalurPendaftaran from "../../../components/ppdb/jadwalJalurPendaftaran";
import TiptapOutput from "../../../components/ppdb/tiptapOutput";
import { Footer } from "../../../layouts";
import { useBreakPoints } from "../../../utils/UseBreakpoints";
import Ppdb from "../../../components/ppdb/ppdb";
import AlurPendaftaran from "../../../components/ppdb/alurPendaftaran";
import JalurPendaftaran from "../../../components/ppdb/jalurPendaftaran";

const GuestPPDB = () => {
  const { md, xs } = useBreakPoints();
  const theme = useMantineTheme();
  const dark = theme.colorScheme === "dark";
  const [opened, { toggle }] = useDisclosure(false);

  const [jalur, setJalur] = useState(() => {
    return dataJalurPendaftaran.find((jalur) => jalur.id === 1);
  });
  const [activeCard, setActiveCard] = useState(1);

  const menuGuest = useMemo(
    () => [
      { label: "Beranda", path: "beranda" },
      { label: "PPDB", path: "ppdb" },
      { label: "Alur Pendaftaran", path: "alur-pendaftaran" },
      { label: "Jalur Pendaftaran", path: "jalur-pendaftaran" },
    ],
    []
  );


  const { data: alurPendaftaran } = useQuery({
    queryKey: ["get_all_alur_pendaftaran"],
    queryFn: GetAllAlurPendaftaran,
  });

  return (
    <main id="dashboard-ppdb">
      <MantineHeader
        height={"70px"}
        sx={{
          boxShadow: `${dark ? "" : "0px -40px 50px 10px black"}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingInline: `${md ? "1.5rem" : "1rem"}`,
          position: "fixed",
          backgroundColor: `${dark ? theme.colors.dark[9] : "#2A166F"}`,
        }}
      >
        <Group spacing={`${md ? "md" : "xs"}`}>
          <img src="/logo-yatindo-hd.png" alt="Yatindo" className="w-[47px]" />
          <Divider orientation="vertical" size={"xs"} color="white" />
          <Box >
            <Text weight={"bold"} lineClamp={1} color="white">
              PPDB Yatindo
            </Text>
            <Text color="white">
              Yayasan Tinta Emas Indonesia
            </Text>
          </Box>
        </Group>
        <>
          {md ? (
            <>
              <Group >
                <Group mr={20}>
                  {menuGuest.map((menu, i) => (
                    <Anchor
                      key={i}
                      to={menu.path}
                      smooth={true}
                      duration={500}
                      offset={-90}
                      style={{ cursor: "pointer", fontWeight: "bold", color: "white" }}
                      className="hover:underline underline-offset-2"
                    >
                      {menu.label}
                    </Anchor>
                  ))}
                </Group>

                <Link
                  to={'/ppdb/auth/login'}
                  style={{
                    borderRadius: "3px",
                    height: "35px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingInline: "1.1123rem",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                  className="text-white border-white border border-solid hover:bg-white hover:text-[#020731]"
                >
                  Masuk
                </Link>
              </Group>
            </>
          ) : (
            <div
              style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}
            >
              <FaBars size={30} onClick={toggle} color="white" />
            </div>
          )}
        </>
      </MantineHeader>

      <Paper className="style-box bg-gray-100 parralax ">
        <CollapseCustomPPDB menus={menuGuest} opened={opened} toggle={toggle} />

        <Stack
          pt={'70px'}
          px={xs ? 40 : 20}
          py={90}
          className=" min-h-[80vh] backdrop-brightness-[0.3] backdrop-blur-sm   text-white "
        >

          {/* UCAPAN SELAMAT DATANG */}
          <Box className="text-center" py={200} id="beranda">
            <Title className="tracking-widest" align="center" size={md ? 40 : 30}>Welcome to PPDB <br />SMK-SMP TINTA EMAS <br /> YATINDO</Title>
          </Box>

          {/* PPDB */}
          <Ppdb />

          {/* ALUR PENDAFTARAN */}
          <AlurPendaftaran />

          {/* JALUR PENDAFTARAN */}
          <JalurPendaftaran />
        </Stack>
      </Paper>

      <Footer />
    </main >
  );
};

export default GuestPPDB;
