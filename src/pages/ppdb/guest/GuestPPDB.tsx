import {
  ActionIcon,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Image,
  Header as MantineHeader,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme
} from "@mantine/core";
import { useMemo } from "react";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Link as Anchor } from "react-scroll";
import AlurPendaftaran from "../../../components/ppdb/alurPendaftaran";
import Ppdb from "../../../components/ppdb/ppdb";
import { useBreakPoints } from "../../../utils/UseBreakpoints";

const GuestPPDB = () => {
  const { md, xs, lg, sm } = useBreakPoints();
  const theme = useMantineTheme();
  const dark = theme.colorScheme === "dark";

  const menuGuest = useMemo(
    () => [
      { label: "Beranda", path: "beranda" },
      { label: "Daftar", path: "ppdb" },
      { label: "Alur Pendaftaran", path: "alur-pendaftaran" },
    ],
    []
  );

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
        <Group spacing={`${md ? "md" : "xs"}`} >
          <img src="/logo-yatindo-hd.png" alt="Yatindo" className="w-[47px]" />
          <Box >
            <Text weight={"bold"} lineClamp={1} color="white">
              PPDB Yatindo
            </Text>
          </Box>
        </Group>
        {/* <> */}
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

          <Button
            size="md"
            ml={20}
            variant="gradient"
            gradient={{ from: "cyan", to: "indigo", }}
            color="grape"
            component={Link}
            to={"/ppdb/auth/login"}
          >
            Masuk
          </Button>
        {/* </> */}
      </MantineHeader>

      <Paper className="style-box bg-gray-100 parralax ">

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
                  <ActionIcon variant="filled" color={"indigo"} size={45} component={Link} to={"https://wa.me/6281380908008?text=Halo Admin Yatindo"} target="_blank">
                    <FaWhatsapp size={30} />
                  </ActionIcon>
                  <ActionIcon variant="filled" color="indigo" size={45} component={Link} to={"https://www.instagram.com/smk_yatindo/"} target="_blank">
                    <FaInstagram size={30} />
                  </ActionIcon>
                  <ActionIcon variant="filled" color="indigo" size={45} component={Link} to={"https://youtube.com/@smp-smktintaemasyatindo9557?si=ZPPqAkG4TXplUr0g"} target="_blank">
                    <FaYoutube size={30} />
                  </ActionIcon>
                </Group>
              </Box>
              <Box sx={{ display: `${!lg && "none"}` }}>
                <Card p={0} radius={"25px"}>
                  <Image src="/smk-1.jpg" width={480} className="hover:brightness-75 transition  duration-300 ease-in-out" />
                </Card>
              </Box>
            </Group>
          </Box>

          {/* PPDB */}
          <Ppdb />

          {/* ALUR PENDAFTARAN */}
          <AlurPendaftaran />

          {/* JALUR PENDAFTARAN */}
          {/* <JalurPendaftaran /> */}
        </Stack>
      </Paper>

      <footer
        style={{
          paddingBlock: "20px",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          fontSize: `${!xs ? "10px" : ""}`,
          borderTop: `1px solid ${dark ? "rgba(60,60,60, 60)" : "rgba(240,240,240, 240)"}`,
        }}
      >
        © 2023 D'Coders TKJ Yatindo. All Rights Reserved
      </footer>

    </main >
  );
};

export default GuestPPDB;
