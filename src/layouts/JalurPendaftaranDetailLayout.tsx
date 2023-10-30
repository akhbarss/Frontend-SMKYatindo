import { Paper, Stack, Tabs } from "@mantine/core";
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

  const { data: dataJalur,  } = GetAllJalurPendaftaran();

  const jalur = dataJalur?.find(
    (jalur) => jalur.id + "" === idJalurPendaftaran
  );

  return (
    <Stack className={"style-box max-w-[70rem] mx-auto"} >
      <Link
        to={"/ppdb/main/jalur-pendaftaran"}
        className="text-xl no-underline font-bold text-[#2A166F] flex  items-center gap-2 w-fit"
      >
        <MdArrowBackIosNew /> Kembali
      </Link>
      <Paper
        withBorder
        sx={(theme) => ({
          backgroundColor: dark ? theme.colors.dark[9] : theme.white,
          padding: "2rem",
          marginTop: "1rem",
        })}
      >
        <h1 className="flex items-center gap-4">
          <BsFillCaretRightFill size={40} />
          {jalur?.name}
        </h1>

        <Tabs
          value={location.pathname.split("/")[5]}
          onTabChange={(value) => navigate(`${value}`)}
          mt={40}
        >
          <Tabs.List>
            <Tabs.Tab color="blue" value="informasi-umum">
              Informasi Umum
            </Tabs.Tab>
            <Tabs.Tab value="gelombang">Gelombang</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Paper>
      {children}
    </Stack>
  );
};

export default JalurPendaftaranDetailLayout;
