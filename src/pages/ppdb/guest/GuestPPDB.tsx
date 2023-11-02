import {
  Group,
  Header as MantineHeader,
  Paper,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Link as Anchor } from "react-scroll";
import AlurPendaftaran from "../../../components/ppdb/alurPendaftaran";
import CollapseCustomPPDB from "../../../components/ppdb/colllapseCustomPPDB";
import JalurPendaftaran from "../../../components/ppdb/jalurPendaftaran";
import Ppdb from "../../../components/ppdb/ppdb";
import ToggleTheme from "../../../components/toggleTheme";
import { Footer } from "../../../layouts";
import { useBreakPoints } from "../../../utils/UseBreakpoints";

const GuestPPDB = () => {
  const { md } = useBreakPoints();
  const theme = useMantineTheme();
  const dark = theme.colorScheme === "dark";
  const [opened, { toggle }] = useDisclosure(false);

  const menuGuest = useMemo(
    () => [
      { label: "Beranda", path: "beranda" },
      { label: "Alur Pendaftaran", path: "alur-pendaftaran" },
      { label: "Jalur Pendaftaran", path: "jalur-pendaftaran" },
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
          paddingInline: "2rem",
          position: "fixed",
          backgroundColor: `${dark ? theme.colors.dark[9] : ""}`,
        }}
      >
        <img src="/logo-yatindo-hd.png" alt="Yatindo" className="w-[60px]" />

        <>
          {md ? (
            <>
              <Group ml={90}>
                {menuGuest.map((menu, i) => (
                  <Anchor
                    key={i}
                    to={menu.path}
                    smooth={true}
                    duration={500}
                    offset={-90}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                  // className='cursor-pointer'
                  >
                    {menu.label}
                  </Anchor>
                ))}
              </Group>

              <Group sx={{ color: "blue" }} style={{}}>
                {/* <ToggleTheme color={`${dark ? "#6449da" : "#020731"}`} /> */}

                <Link
                  to={'/ppdb/auth/login'}
                  style={{
                    border: `1px solid ${dark ? "#6449da" : "#020731"}`,
                    borderRadius: "3px",
                    height: "35px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingInline: "1.1123rem",
                    fontWeight: "bold",
                    color: `${dark ? "white" : "#020731"}`,
                    textDecoration: "none",
                  }}
                >
                  Masuk
                </Link>

                <Link
                  to={'/ppdb/auth/register'}
                  style={{
                    border: `1px solid ${dark ? "#6449da" : "#020731"}`,
                    borderRadius: "3px",
                    height: "35px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingInline: "1.1123rem",
                    fontWeight: "bold",
                    color: "white",
                    textDecoration: "none",
                    backgroundColor: `${dark ? "#876cff" : "#020731"}`,
                    boxShadow: `${dark
                      ? "0 10px 30px -10px #876cff"
                      : "0 10px 30px -10px #020731"
                      }`,
                  }}
                >
                  Daftar
                </Link>
              </Group>
            </>
          ) : (
            <div
              // className='flex items-center gap-5'
              style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}
            >
              {/* <ToggleTheme color={`${dark ? "#6449da" : "#020731"}`} /> */}

              <FaBars size={30} onClick={toggle} />
            </div>
          )}
        </>
      </MantineHeader>

      <Paper pt={"70px"} className="style-box ">
        <CollapseCustomPPDB menus={menuGuest} opened={opened} toggle={toggle} />

        <div className="parralax ">
          <Ppdb />

          <AlurPendaftaran />

          <JalurPendaftaran />
        </div>
      </Paper>

      <Footer />
    </main>
  );
};

export default GuestPPDB;
