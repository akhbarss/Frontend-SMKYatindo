import { Link, useLocation, useNavigate, useNavigation, useParams } from "react-router-dom"
import {
    Tabs,
    Paper,
    Box,
    Stack,
    Group,
} from "@mantine/core"
import { DarkTheme } from "../utils/darkTheme"
import { GetAllJalurPendaftaran } from "../apis/jalur/getJalur"
import { dataJalurPendaftaran } from "../components/ppdb/dataJalurPendaftaran"
import { MdArrowBackIosNew } from "react-icons/md"
import { BsFillCaretRightFill } from "react-icons/bs"

type TJalurPendaftaranDetailLayout = {
    children: React.ReactNode
}

const JalurPendaftaranDetailLayout: React.FC<TJalurPendaftaranDetailLayout> = ({ children }) => {

    const dark = DarkTheme()
    const { idJalurPendaftaran } = useParams()
    const navigate = useNavigate()
    const nav = useNavigation()
    const location = useLocation()
    console.log(location.pathname.split("/")[5])
    console.log("ID PATH JALUR : " + idJalurPendaftaran)

    const {
        data: dataJalur,
        isErr,
        load,
        refetch
    } = GetAllJalurPendaftaran()

    const jalur = dataJalur?.find(jalur => jalur.id + "" === idJalurPendaftaran)

    console.log("====================")
    console.log(jalur)

    return (
        <Stack>
            <Link
                to={"/ppdb/main/jalur-pendaftaran"}
                className="text-xl no-underline font-bold text-[#2A166F] flex  items-center gap-2"
            >
                <MdArrowBackIosNew />  Kembali
            </Link>
            <Paper
                withBorder
                sx={theme => ({
                    backgroundColor: dark ? theme.colors.dark[9] : theme.white,
                    padding: "2rem",
                    marginTop: "1rem"
                })}
            >

                <h1 className="flex items-center gap-4" ><BsFillCaretRightFill size={40} />{jalur?.name}</h1>


                <Tabs
                    value={location.pathname.split("/")[5]}
                    onTabChange={(value) => navigate(`${value}`)}
                    mt={40}

                >
                    <Tabs.List >
                        <Tabs.Tab color="blue" value="informasi-umum">Informasi Umum</Tabs.Tab>
                        <Tabs.Tab value="gelombang">Gelombang</Tabs.Tab>
                    </Tabs.List>
                </Tabs>

            </Paper>
            {children}
        </Stack>
    )
}

export default JalurPendaftaranDetailLayout