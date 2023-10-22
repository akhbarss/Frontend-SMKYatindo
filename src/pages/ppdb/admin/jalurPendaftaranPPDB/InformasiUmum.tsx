import {
    Box
} from "@mantine/core"
import { useParams } from "react-router-dom"
import { dataJalurPendaftaran } from "../../../../components/ppdb/dataJalurPendaftaran"


const InformasiUmum = () => {
    const { idJalurPendaftaran } = useParams()

    const jalur = dataJalurPendaftaran.filter(jalur => jalur.id + "" === idJalurPendaftaran)

    return (
        <Box>
            <h1>InformasiUmum </h1>
            {JSON.stringify(jalur)}
        </Box>
    )
}

export default InformasiUmum