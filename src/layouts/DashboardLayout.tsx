/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionIcon, AppShell, Box, MantineProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import toast from "react-hot-toast";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { jwtDecode } from "../apis/alur/decodeJWT";
import PageLoading from "../components/PageLoading";
import { useBreakPoints } from "../utils/UseBreakpoints";
import { gradesUtils } from "../utils/gradesUtils";
import AppBar from "./Dashboard/AppBar";
import Navigation from "./Dashboard/Navigation";
import { Footer } from "./index";

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

  const grade = user?.data?.student?.grade

  return (
    <Suspense fallback={<PageLoading />}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        inherit
        theme={{
          primaryColor: grade ? gradesUtils.find(item => item.grade === grade)?.theme : "brand-smp"
        }}
      >

        <AppShell
          padding={0}
          header={
            <AppBar
              opened={opened}
              setOpened={toggle}
              grade={user?.data?.student?.grade}
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
          style={{
            overflow: "hidden",
          }}
        >
          <Box className="style-box flex flex-col flex-[1] h-full ">
            <Box
              pb={"50px"}
              p={`${sm ? "3rem 2rem" : "3rem 1rem"}`}
              className="flex-[1]"
            >

              {children}
            </Box>
            <Footer />
          </Box>

          <Box
            sx={{
              position: "fixed",
              bottom: 40,
              right: 40
            }}
          >
            <ActionIcon
              color="blue"
              variant="filled"
              radius="100%"
              size={50}
              component={Link}
              to={"https://wa.me/6281380908008?text=Halo Admin Yatindo"}
              target="_blank"
            >
              <BsFillTelephoneFill size={25} />
            </ActionIcon>
          </Box>

        </AppShell>
      </MantineProvider>
    </Suspense>
  );
};

export default DashboardLayout;
