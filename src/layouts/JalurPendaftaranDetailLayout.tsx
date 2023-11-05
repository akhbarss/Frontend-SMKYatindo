import { Paper, Stack, Tabs,Title } from "@mantine/core";
import { BsFillCaretRightFill } from "react-icons/bs";
import { MdArrowBackIosNew } from "react-icons/md";
import {
  Link,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import { GetAllJalurPendaftaran } from "../apis/jalur/getJalur";
import { DarkTheme } from "../utils/darkTheme";
import Page from "../components/Page";
import PageLabel from "../components/PageLabel";

type TJalurPendaftaranDetailLayout = {
  children: React.ReactNode;
};

const JalurPendaftaranDetailLayout: React.FC<TJalurPendaftaranDetailLayout> = ({
  children,
}) => {
  const dark = DarkTheme();
  const { idJalurPendaftaran } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: dataJalur, } = GetAllJalurPendaftaran();

  const jalur = dataJalur?.find(
    (jalur) => jalur.id + "" === idJalurPendaftaran
  );

  return (
    <Page title="Detail Jalur Pendaftaran">
      <Stack className={"style-box max-w-[70rem] mx-auto"} >
        <PageLabel label="Detail Jalur Pendaftaran" />
        <Link
          to={"/ppdb/main/jalur-pendaftaran"}
          className="text-xl no-underline font-bold text-[#2A166F] flex  items-center gap-2 w-fit"
        >
          <MdArrowBackIosNew /> Kembali
        </Link>

        <Tabs
          // defaultValue="pembelian"
          value={location.pathname.split("/")[5]}
          onTabChange={(value) => navigate(`${value}`)}
          color="blue"
          styles={{
            tabsList: {
              // fontSize: "30px"
            },
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
        {/* <Tabs
          value={location.pathname.split("/")[5]}
          onTabChange={(value) => navigate(`${value}`)}
          mt={40}
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

        > */}
         {/* <Paper
            withBorder
            shadow="md"
            radius={"xl"}
            bg={"linear-gradient(to left bottom, #6952ba, #160942)"}
            sx={theme => ({
              backgroundColor: dark ? theme.colors.dark[6] : theme.white,
              padding: "2rem",
              marginTop: "1rem"
            })}
          >
            <Title color="white" order={2} >Gelombang Dengan Tipe Jalur :</Title>
            <Tabs.List mt={20}>
              <Tabs.Tab color="blue" value="pembelian">Pembelian</Tabs.Tab>
              <Tabs.Tab value="pengembalian">Pengembalian</Tabs.Tab>
            </Tabs.List>
          </Paper> */}
          
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
            <h1 className="flex items-center gap-4 text-white">
              <BsFillCaretRightFill size={40} />
              {jalur?.name}
            </h1>
            <Tabs.List>
              <Tabs.Tab color="blue" value="informasi-umum">
                Informasi Umum
              </Tabs.Tab>
              <Tabs.Tab color="blue"  value="gelombang">Gelombang</Tabs.Tab>
            </Tabs.List>
          </Paper>
        </Tabs>
        {children}
      </Stack>
    </Page>
  );
};

export default JalurPendaftaranDetailLayout;
