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
  }, [isError, error, user]);

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
              isSuccess ? user.data?.role_id?.rolesMenus.map((d) => d.path) : []
            }
          />
        }
        navbarOffsetBreakpoint="md"
        styles={{ main: {display: "flex"}, }}
      >
        <Paper className="relative flex flex-col flex-[1]">

          <Paper
            p={`${sm ? "3rem 2.5rem" : "3rem 1rem"}`}
            pb={"100px"}
            className="style-box flex-1"
            sx={() => ({
              minHeight: "80vh",
            })}
          >
            {children}
          </Paper>
          <Footer />
        </Paper>

      </AppShell>
    </Suspense>
  );
};

export default DashboardLayout;
