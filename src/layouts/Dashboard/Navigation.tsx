import { Navbar, NavLink, ScrollArea, ThemeIcon } from "@mantine/core";
import { useMemo } from "react";
import { FiGitPullRequest, FiHome } from "react-icons/fi";
import { RiFileList3Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { MdAppRegistration, MdDashboard } from "react-icons/md";
import { FaLine } from "react-icons/fa";
import { LineWave } from "react-loader-spinner";
import { BsFiletypeWav } from "react-icons/bs";
import { GiWaves } from "react-icons/gi";

const Navigation = ({ opened }: { opened: boolean }) => {
  const menusSiswa = useMemo(
    () => [
      {
        label: "Home",
        path: "/ppdb/main/home",
        icon: (
          <ThemeIcon color="blue" variant="light">
            <FiHome />
          </ThemeIcon>
        ),
      },
      {
        label: "Pembelian",
        path: "/ppdb/main/pembelian",
        icon: (
          <ThemeIcon color="green" variant="light">
            <RiFileList3Line />
          </ThemeIcon>
        ),
      },
      {
        label: "Jalur Pendaftaran/Pengembalian",
        path: "/ppdb/main/pengembalian",
        icon: (
          <ThemeIcon variant="light" color="violet">
            <FiGitPullRequest />
          </ThemeIcon>
        ),
      },
      {
        label: "Dashboard",
        path: "/ppdb/main/dashboard",
        icon: (
          <ThemeIcon variant="light" color="cyan">
            <MdDashboard />
          </ThemeIcon>
        ),
      },
      {
        label: "Alur Pendaftaran",
        path: "/ppdb/main/alur",
        icon: (
          <ThemeIcon variant="light" color="indigo">
            <GiWaves />
          </ThemeIcon>
        ),
      },
      {
        label: "Jalur Pendaftaran",
        path: "/ppdb/main/jalur-pendaftaran",
        icon: (
          <ThemeIcon variant="light" color="lime">
            <FaLine />
          </ThemeIcon>
        ),
      },
      {
        label: "Pendaftar",
        path: "/ppdb/main/pendaftar-ppdb",
        icon: (
          <ThemeIcon variant="light" color="lime">
            <MdAppRegistration />
          </ThemeIcon>
        ),
      },
    ],
    []
  );

  const { pathname: pathUrl } = useLocation();
  const navigate = useNavigate();

  return (
    <Navbar
      // bg={"#fff"}
      px="sm"
      py="xl"
      width={{ base: 300 }}
      hiddenBreakpoint="md"
      hidden={!opened}
    >
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        {menusSiswa.map((menu, i) => {
          return (
            <NavLink
              active={pathUrl === menu.path}
              icon={menu.icon}
              key={i}
              variant="light"
              color="gray"
              label={menu.label}
              onClick={() => {
                navigate(menu.path as never);
                // setOpened();
              }}
            />
          );
        })}
      </Navbar.Section>
    </Navbar>
  );
};

export default Navigation;
