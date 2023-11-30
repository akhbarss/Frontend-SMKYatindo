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
import { Link, useNavigate } from "react-router-dom";
import { useBreakPoints } from "../../utils/UseBreakpoints";
import { gradesUtils } from "../../utils/gradesUtils";
import { DarkTheme } from "../../utils/darkTheme";

const AppBar = ({
  opened,
  setOpened,
  fullname,
  grade
}: {
  opened: boolean;
  setOpened: () => void;
  fullname?: string;
  grade: "SMK" | "SMP"
}) => {
  const { xs } = useBreakPoints()
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const dark = DarkTheme()

  return (
    <MantineHeader
      height={"70px"}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline: "2rem",
        [theme.fn.smallerThan("md")]: {
          paddingInline: "15px",
        },
        position: "fixed",
        background: grade ? gradesUtils.find(item => grade === item.grade).bg : dark ? "#363062" : "linear-gradient(to left, #6548DB, #2A166F)",
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
        <Divider orientation="vertical" size={"xs"} color="white" sx={{ display: `${!xs && "none"}` }} />
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
        <Menu width={200} trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Group spacing={5}>
              <Avatar
                radius={"xl"}
              />
              <MdKeyboardArrowDown color="white" />
            </Group>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>{fullname ?? "-"}</Menu.Label>
            <Menu.Item to={"profile"} component={Link}>
              Profile
            </Menu.Item>
            <Menu.Item
            color="red"
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
