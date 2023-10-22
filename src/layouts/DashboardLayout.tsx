import { AppShell, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AppBar from "./Dashboard/AppBar";
import Navigation from "./Dashboard/Navigation";
import { useBreakPoints } from "../utils/UseBreakpoints";
import { Footer } from "./index";
import { Suspense } from "react";
import PageLoading from "../components/PageLoading";

type TDashboard = {
  children: any;
};

const DashboardLayout: React.FC<TDashboard> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure(false);
  const { sm } = useBreakPoints();

  return (
    <Suspense fallback={<PageLoading />}>
      <AppShell
        padding={0}
        header={<AppBar opened={opened} setOpened={toggle} />}
        navbar={<Navigation opened={opened} />}
        navbarOffsetBreakpoint="md"
      >
        <Paper
          p={`${sm ? "3rem 2.5rem" : "3rem 1rem"}`}
          className="style-box"
          sx={(theme) => ({
            minHeight: "80vh",
            backgroundColor: `${
              theme.colorScheme === "dark"
                ? theme.colors.dark[9]
                : theme.colors.gray[0]
            }`,
          })}
        >
          {children}
        </Paper>

        <Footer />
      </AppShell>
    </Suspense>
  );
};

export default DashboardLayout;
