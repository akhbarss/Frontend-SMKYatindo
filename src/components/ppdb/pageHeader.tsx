import { Header as MantineHeader, useMantineTheme } from "@mantine/core";

const PageHeader = ({ children }: { children: React.ReactNode }) => {
  const theme = useMantineTheme();
  const dark = theme.colorScheme === "dark";

  return (
    <MantineHeader
      height={"70px"}
      sx={{
        boxShadow: `${dark ? "" : "0px -40px 50px 10px black"}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline: "2rem",
        position: "fixed",
        backgroundColor: `${dark ? theme.colors.dark[9] : "#2A166F"}`
      }}
    >
      <img
        src="/logo-yatindo-hd.png"
        alt="Yatindo"
        style={{ width: "60px" }}
      />

      {children}
    </MantineHeader>
  );
};

export default PageHeader;
