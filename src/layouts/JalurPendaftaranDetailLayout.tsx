import { Paper, Stack, Skeleton, Tabs, Text } from "@mantine/core";
import { BsFillCaretRightFill } from "react-icons/bs";
import { MdArrowBackIosNew } from "react-icons/md";
import {
  Link,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import { GetAllJalurPendaftaranPayload, getAllJalurPendaftaran } from "../apis/jalur/getJalur";
import Page from "../components/Page";
import PageLabel from "../components/PageLabel";
import { DarkTheme } from "../utils/darkTheme";
import { Suspense } from "react"
import { useQuery } from "@tanstack/react-query";

type TJalurPendaftaranDetailLayout = {
  children: React.ReactNode;
};

const JalurPendaftaranDetailLayout: React.FC<TJalurPendaftaranDetailLayout> = ({
  children,
}) => {
  const dark = DarkTheme();
  const { idJalurPendaftaran, grade } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: dataJalur,
    // isError: isErr,
    isLoading: load,
    // refetch,
  } = useQuery({
    queryKey: ["get-all-jalur-pendaftaran-detail-layout" + grade],
    queryFn: () => getAllJalurPendaftaran((grade.toUpperCase() as GetAllJalurPendaftaranPayload))
  })

  const jalur = dataJalur?.data?.find(
    (jalur) => jalur.id + "" === idJalurPendaftaran
  );

  return (
    <Page title="Detail Jalur Pendaftaran">
      <Paper
        mt={20}
        withBorder
        shadow="xl"
        px={"2rem"}
        py={"2rem"}
        sx={theme => ({ backgroundColor: theme.colorScheme == "dark" ? theme.colors.dark[9] : "white" })}
      >

        <Stack className={"style-box max-w-[70rem] mx-auto"} >
          <PageLabel label="Detail Jalur Pendaftaran" />
          <Link
            to={`/ppdb/main/jalur-pendaftaran/${grade}`}
            className="text-xl no-underline font-bold  flex  items-center gap-2 w-fit"
          >
            <MdArrowBackIosNew color={`${dark ? "#9b87de" : "#2A166F"}`} />
            <Text color={`${dark ? "#9b87de" : "#2A166F"}`}>
              Kembali
            </Text>
          </Link>

          <Tabs
            value={location.pathname.split("/")[6]}
            onTabChange={(value) => navigate(`${value}`)}
            color="blue"
            styles={{
              tabLabel: {
                fontSize: "20px",
                color: "white"
              },
              tab: {
                backgroundColor: "tranparent",
                ":hover": {
                  backgroundColor: "transparent",
                  opacity: 0.9
                }
              }
            }}

          >
            <Paper
              withBorder
              radius={"xl"}
              bg={"linear-gradient(to left bottom, #6952ba, #160942)"}
              sx={(theme) => ({
                backgroundColor: dark ? theme.colors.dark[9] : theme.white,
                padding: "2rem",
                marginTop: "1rem",
              })}
            >
              <div className="flex items-center gap-4 text-white">
                <BsFillCaretRightFill size={40} />
                {/* {
                  load ? <Skeleton visible height={80} /> : <h1>{jalur?.name}</h1>
                } */}

                <Skeleton visible={load}>
                  <h1>{jalur?.name}</h1>
                </Skeleton>

              </div>
              <Tabs.List>
                {/* <Tabs.Tab color="cyan" value="informasi-umum">
                  Informasi Umum
                </Tabs.Tab> */}
                <Tabs.Tab color="cyan" value="gelombang">Gelombang</Tabs.Tab>
              </Tabs.List>
            </Paper>
          </Tabs>
          <Suspense fallback={<Skeleton height={60} radius={"4rem"} />}>
            {children}
          </Suspense>
        </Stack>
      </Paper>
    </Page>
  );
};

export default JalurPendaftaranDetailLayout;
