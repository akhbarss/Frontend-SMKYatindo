import { Navbar, NavLink, ScrollArea, ThemeIcon } from "@mantine/core";
import { useMemo } from "react";
import { FiGitPullRequest, FiHome } from "react-icons/fi";
import { RiFileList3Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

const Navigation = ({ opened }: { opened: boolean }) => {
  const IconHome = () => (
    <ThemeIcon color="blue" variant="light">
      <FiHome />
    </ThemeIcon>
  );

  const IconPembelian = () => (
    <ThemeIcon color="green" variant="light">
      <RiFileList3Line />
    </ThemeIcon>
  );

  const IconPengembalian = () => (
    <ThemeIcon variant="light" color="violet">
      <FiGitPullRequest />
    </ThemeIcon>
  );

  const menusSiswa = useMemo(
    () => [
      {
        label: "Home",
        path: "/ppdb/main/home",
        icon: IconHome,
      },
      {
        label: "Pembelian",
        path: "/ppdb/main/pembelian",
        icon: IconPembelian,
      },
      {
        label: "Jalur Pendaftaran/Pengembalian",
        path: "/ppdb/main/pengembalian",
        icon: IconPengembalian,
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
              icon={<menu.icon />}
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
