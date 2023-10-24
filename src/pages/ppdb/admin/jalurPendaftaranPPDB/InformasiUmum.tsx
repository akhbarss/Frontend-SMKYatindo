import {
    ActionIcon,
    Title,
    Text,
    Box, Button, Paper
} from "@mantine/core"
import { useParams } from "react-router-dom"
import { dataJalurPendaftaran } from "../../../../components/ppdb/dataJalurPendaftaran"
import Page from "../../../../components/Page"
import { AiFillEdit } from "react-icons/ai"
import { BsFillTrashFill } from "react-icons/bs"


const InformasiUmum = () => {
    const { idJalurPendaftaran } = useParams()

    // const jalur = dataJalurPendaftaran.find(jalur => jalur.id + "" === idJalurPendaftaran)

    // const keterangan = jalur?.informasi_umum.keterangan.map((item => (
    //     <Paper
    //         withBorder
    //         sx={{
    //             padding: "1rem 2rem",
    //             marginBottom: "1rem",
    //             display: "flex",
    //             alignItems: "center"
    //         }}
    //     >
    //         <div className="flex-[1]">
    //             <Text weight={"bold"} size={"xl"}>{item.nama_keterangan}</Text>
    //         </div>
    //         <div className="flex px-4 gap-2">
    //             <ActionIcon
    //                 variant="filled"
    //                 color="blue"
    //                 size={40}
    //                 radius={100}
    //                 className="bg-[#2A166F] hover:bg-[#2A166F]"
    //             >
    //                 <AiFillEdit size={20} />
    //             </ActionIcon>
    //             <ActionIcon
    //                 variant="filled"
    //                 color="blue"
    //                 size={40}
    //                 radius={100}
    //                 className="bg-[#2A166F] hover:bg-[#2A166F]"
    //             >
    //                 <BsFillTrashFill size={20} />
    //             </ActionIcon>

    //         </div>
    //     </Paper>
    // )))

    // const biayaTambahan = jalur?.informasi_umum.biaya_tambahan.map(biaya => (
    //     <Paper
    //         withBorder
    //         sx={{
    //             padding: "1rem 2rem",
    //         }}
    //     >
    //         <Text weight={"bold"} size={"xl"}>{biaya.judul_biaya}</Text>
    //         <p>{biaya.biaya.map(item => (
    //             <div>
    //                 <p>{item?.id}</p>
    //                 <p>{item?.nama_biaya_tambahan}</p>
    //                 <p>{item?.jumlah_biaya_tambahan}</p>
    //             </div>
    //         ))}</p>
    //     </Paper>

    // ))

    // const contentKeterangan = keterangan.length > 0 ? (
    //     <Box>
    //         <Title order={3} mb={"1rem"}>Keterangan</Title>
    //         {keterangan}
    //     </Box>
    // ) : ""

    // const contentBiayaTambahan = biayaTambahan.length > 0 ? (
    //     <Box>
    //         <Title order={3} mb={"1rem"}>Biaya Tambahan</Title>
    //         {biayaTambahan}
    //     </Box>
    // ) : ""


    return (
        <Page title="Informasi Umum">

            {/* {contentKeterangan} */}

            {/* {contentBiayaTambahan} */}

            <Button>
                Tambah
            </Button>

        </Page>
    )
}

export default InformasiUmum