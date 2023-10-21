import {
  ActionIcon,
  Menu,
  Avatar,
  Burger,
  Group,
  Header as MantineHeader,
  MediaQuery,
  useMantineTheme,
  Text,
} from "@mantine/core";
import { FaBell } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ScrollRestoration, useNavigate } from "react-router-dom";

const AppBar = ({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: () => void;
}) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  return (
    <MantineHeader
      height={"70px"}
      sx={{
        // boxShadow: `${dark ? "" : "0px -40px 50px 10px black"}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline: "2rem",
        [theme.fn.smallerThan("md")]: {
          paddingInline: "15px",
        },
        position: "fixed",
        backgroundColor: "#2A166F",
      }}
    >
      <ScrollRestoration />

      <Group>
        <MediaQuery largerThan="md" styles={{ display: "none" }}>
          <Burger
            sx={{ marginLeft: 0 }}
            opened={opened}
            onClick={() => setOpened()}
            size="sm"
            color={theme.colors.gray[1]}
          />
        </MediaQuery>

        <img
          src="/logo-yatindo-hd.png"
          alt="Yatindo"
          style={{ width: "50px" }}
        />
        <Text className={"font-semibold"} color={"white"}>
          PPDB Online
        </Text>
      </Group>

      <Group spacing={"lg"}>
        <ActionIcon sx={{ color: "white" }} variant="outline">
          <FaBell />
        </ActionIcon>

        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Group spacing={5}>
              <Avatar
                radius={"xl"}
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
              />
              <MdKeyboardArrowDown color="white" />
              {/* <ActionIcon >
                                <FaBars size={35} />
                            </ActionIcon> */}
            </Group>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Muhammad Akhbar Firdaus</Menu.Label>
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item>Pengaturan</Menu.Item>
            <Menu.Item
              onClick={() => {
                localStorage.removeItem("accessToken");
                navigate("/ppdb/auth/login");
              }}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </MantineHeader>
  );
};

export default AppBar;
