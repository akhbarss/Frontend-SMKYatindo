import { Stack } from "@mantine/core"
import Page from "../../../../components/Page"
import Keterangan from "./Keterangan"
import BiayaTambahan from "./BiayaTambahan"

const InformasiUmum = () => {

    return (
        <Page title="Informasi Umum">
            <Stack >

                <Keterangan />

                <BiayaTambahan />

            </Stack>
        </Page>
    )
}

export default InformasiUmum