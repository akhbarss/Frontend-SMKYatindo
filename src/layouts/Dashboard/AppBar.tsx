import {
  Divider,
  Box,
  Avatar,
  Burger,
  Group,
  Header as MantineHeader,
  MediaQuery,
  Menu,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useBreakPoints } from "../../utils/UseBreakpoints";

const AppBar = ({
  opened,
  setOpened,
  fullname,
}: {
  opened: boolean;
  setOpened: () => void;
  fullname?: string;
}) => {
  const { md, sm, xs } = useBreakPoints()
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
      <Group >
        <MediaQuery largerThan="md" styles={{ display: "none" }}>
          <Burger
            sx={{ marginLeft: 0 }}
            opened={opened}
            onClick={() => setOpened()}
            size="sm"
            color={theme.colors.gray[1]}
          />
        </MediaQuery>

        <img src="/logo-yatindo-hd.png" alt="Yatindo" className="w-[47px]" />
        <Divider orientation="vertical" size={"xs"} color="white" sx={{ display: `${!xs && "none"}` }}/>
        <Box >
          <Text weight={"bold"} lineClamp={1} color="white">
            PPDB Yatindo
          </Text>
          <Text color="white" sx={{ display: `${!xs && "none"}` }}>
            Yayasan Tinta Emas Indonesia
          </Text>
        </Box>
      </Group>

      <Group spacing={"lg"}>
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
            <Menu.Label>{fullname ?? "-"}</Menu.Label>
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item
              onClick={() => {
                localStorage.removeItem("_TuVbwpW");
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
