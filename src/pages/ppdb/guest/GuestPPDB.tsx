import {
  Button,
  Card,
  Image,
  ActionIcon,
  Box,
  Divider,
  Group,
  Header as MantineHeader,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { FaBars, FaWhatsapp, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Link as Anchor } from "react-scroll";
import { GetAllAlurPendaftaran } from "../../../apis/alur/getAlur";
import AlurPendaftaran from "../../../components/ppdb/alurPendaftaran";
import CollapseCustomPPDB from "../../../components/ppdb/colllapseCustomPPDB";
import { dataJalurPendaftaran } from "../../../components/ppdb/dataJalurPendaftaran";
import JalurPendaftaran from "../../../components/ppdb/jalurPendaftaran";
import Ppdb from "../../../components/ppdb/ppdb";
import { Footer } from "../../../layouts";
import { useBreakPoints } from "../../../utils/UseBreakpoints";

const GuestPPDB = () => {
  const { md, xs, xl, lg } = useBreakPoints();
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
          border: "none"
        }}
      >
        <Group spacing={`${md ? "md" : "xs"}`} className="max-lg:mx-auto">
          <img src="/logo-yatindo-hd.png" alt="Yatindo" className="w-[47px]" />
          <Box >
            <Text weight={"bold"} lineClamp={1} color="white">
              PPDB Yatindo
            </Text>
          </Box>
        </Group>
        <>
          {md ? (
            <>
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
            </>
          ) : ""}
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
          <Box className="text-center mx-auto" py={140} id="beranda">

            <Group spacing={`${md ? "40px" : "xs"}`}>
              <Box className="text-left">
                <Group className="flex">
                  <img src="/logo-yatindo-hd.png" alt="Yatindo" className="w-[57px]" />
                  <Divider orientation="vertical" size={"xs"} color="white" />
                  <Text weight={"bold"} lineClamp={1} color="white" size={20}>
                    PPDB Yatindo
                  </Text>
                </Group>
                <Title mt={10} size={40} >Yayasan Tinta Emas Indonesia</Title>
                <Text className="max-w-xl" mt={10} size={16}>
                  Yayasan Tinta Emas Indonesia, Jl. Asem Jaya No.1, RT.004/RW.005, Mustika Jaya, Kec. Mustika Jaya, Kota Bks, Jawa Barat 17158
                </Text>
                <Group mt={20}>
                  <ActionIcon variant="filled" color={"indigo"} size={"lg"} component={Link} to={"https://wa.me/6281380908008"} target="_blank">
                    <FaWhatsapp size={20} />
                  </ActionIcon>
                  <ActionIcon variant="filled" color="indigo" size={"lg"} component={Link} to={"https://www.instagram.com/smk_yatindo/"} target="_blank">
                    <FaInstagram size={20} />
                  </ActionIcon>
                  <ActionIcon variant="filled" color="indigo" size={"lg"} component={Link} to={"https://youtube.com/@smp-smktintaemasyatindo9557?si=ZPPqAkG4TXplUr0g"} target="_blank">
                    <FaYoutube size={20} />
                  </ActionIcon>
                  <Button w={100} ml={20} variant="gradient" gradient={{ from: "cyan", to: "indigo", }} color="grape" component={Link} to={"/ppdb/auth/login"}>Masuk</Button>
                </Group>
              </Box>
              <Box sx={{ display: `${!lg && "none"}` }}>
                <Card p={0} radius={"25px"}>
                  <Image src="/smk-1.jpg" width={450} className="hover:brightness-75 transition  duration-300 ease-in-out" />
                </Card>
              </Box>
            </Group>
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
