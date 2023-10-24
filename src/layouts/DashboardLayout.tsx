import { AppShell, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AppBar from "./Dashboard/AppBar";
import Navigation from "./Dashboard/Navigation";
import { useBreakPoints } from "../utils/UseBreakpoints";
import { Footer } from "./index";
import { Suspense, useEffect } from "react";
import PageLoading from "../components/PageLoading";
import { jwtDecode } from "../apis/alur/decodeJWT";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

type TDashboard = {
  children: any;
};

const DashboardLayout: React.FC<TDashboard> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure(false);
  const { sm } = useBreakPoints();

  const {
    error,
    isError,
    isSuccess,
    data: user,
  } = useQuery({
    queryFn: jwtDecode,
    queryKey: ["session"],
  });

  useEffect(() => {
    if (isError) {
      toast.error("Error saat mengambil data sesi");
    }
  }, [isError, error]);

  return (
    <Suspense fallback={<PageLoading />}>
      <AppShell
        padding={0}
        header={
          <AppBar
            opened={opened}
            setOpened={toggle}
            fullname={
              isSuccess
                ? user?.data?.student?.name || user?.data?.fullname
                : "-"
            }
          />
        }
        navbar={
          <Navigation
            opened={opened}
            access={
              isSuccess ? user.data.role_id.rolesMenus.map((d) => d.path) : []
            }
          />
        }
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
