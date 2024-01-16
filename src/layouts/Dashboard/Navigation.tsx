import { NavLink, Navbar, ScrollArea, createStyles, getStylesRef } from "@mantine/core";
import { useIsFetching } from "@tanstack/react-query";
import type { LucideIcon } from "lucide-react";
import { FileText, GitBranch, GitPullRequestArrow, Home, LayoutDashboard, ShoppingCart, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DarkTheme } from "../../utils/darkTheme";

type TMenuSiswaNavigation = {
  label: string;
  path: string;
  icon: LucideIcon;
  color: string;
}[]

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    backgroundColor: "white",
    color: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[7],
    fontWeight: 600,
    borderRadius: 6,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[3],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: "#1971C2",
      color: theme.white,
    },
  },
}))


const Navigation = ({
  opened,
  access = [],
}: {
  opened: boolean;
  access: string[];
}) => {
  const [menus, setMenus] = useState<TMenuSiswaNavigation>([]);
  const dark = DarkTheme()
  const { classes, cx } = useStyles()

  const menusSiswa = useMemo<TMenuSiswaNavigation>(
    () => [
      {
        label: "Home",
        path: "/ppdb/main/home",
        icon: Home,
        color: "orange"
      },
      {
        label: "Pembelian",
        path: "/ppdb/main/pembelian",
        icon: ShoppingCart,
        color: "green"
      },
      {
        label: "Pengembalian",
        path: "/ppdb/main/pengembalian",
        icon: GitPullRequestArrow,
        color: "red"
      },
      {
        label: "Tes Ujian",
        path: "/ppdb/main/tes-ujian",
        icon: FileText,
        color: "blue"
      },
      {
        label: "Dashboard",
        path: "/ppdb/main/dashboard",
        icon: LayoutDashboard,
        color: "black"
      },
      {
        label: "Alur Pendaftaran",
        path: "/ppdb/main/alur",
        icon: GitBranch,
        color: "indigo"
      },
      {
        label: "Jalur Pendaftaran",
        path: "/ppdb/main/jalur-pendaftaran",
        icon: GitPullRequestArrow,
        color: "lime"
      },
      {
        label: "Pendaftar",
        path: "/ppdb/main/pendaftar-ppdb",
        icon: Users,
        color: "purple"
      },
    ],
    []
  );

  const countQueryFetching = useIsFetching({ queryKey: ["get_last_offset_batch"], fetchStatus: "fetching", })
  const { pathname: pathUrl } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (access.length > 0) {
      const menus = menusSiswa.filter((d) => access.includes(d.path));

      setMenus(menus);
    }
  }, [access, menusSiswa]);

  return (
    <Navbar
      bg={dark ? "#363062" : "#2A166F"}
      px="sm"
      py="xl"
      width={{ base: 300 }}
      hiddenBreakpoint="md"
      hidden={!opened}
      sx={{ border: "none" }}
    >
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        {menus &&
          menus.length > 0 &&
          menus.map((menu, i) => {
            return (
              <NavLink
                mt={10}
                className={cx(classes.link, {
                  [classes.linkActive]: pathUrl.includes(menu.path),
                })}
                icon={
                  <menu.icon color={pathUrl !== menu.path ? menu.color : undefined} size="1.2rem" />
                }
                key={i}
                variant="filled"
                label={menu.label}
                onClick={() => {
                  if (pathUrl.includes(menu.path)) {
                    return
                  } else {
                    if (countQueryFetching > 0) {
                      return
                    } else[
                      navigate(menu.path as never)
                    ]
                  }
                }}
              />
            );
          })}
      </Navbar.Section>
    </Navbar>
  );
};

export default Navigation;