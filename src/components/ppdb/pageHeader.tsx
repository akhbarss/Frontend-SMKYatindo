import { Header as MantineHeader, useMantineTheme } from "@mantine/core";
import { useLocation } from "react-router-dom";

const PageHeader = ({ children }: { children: React.ReactNode }) => {
  const theme = useMantineTheme();
  const dark = theme.colorScheme === "dark";

  const { pathname } = useLocation();
  const pageLogin = pathname.includes("/login");

  return (
    <MantineHeader
      height={"70px"}
      sx={{
        boxShadow: `${dark ? "" : "0px -40px 50px 10px black"}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline: "2rem",
        position: `${pageLogin ? "fixed" : "fixed"}`,
        backgroundColor: `${
          pageLogin
            ? "transparent"
            : `${dark ? theme.colors.dark[9] : "#2A166F"}`
        } `,
        border: `${pageLogin ? "none" : ""}`,
        backdropFilter: `${pageLogin ? "blur(4px)" : ""}`,
      }}
    >
      <img
        src="/logo-yatindo-hd.png"
        alt="Yatindo"
        style={{ width: "60px" }}
        //    className="w-[60px]"
      />

      {children}
    </MantineHeader>
  );
};

export default PageHeader;
