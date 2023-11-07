import {
    Stack,
    Text,
    TextInput
} from '@mantine/core'
import React from 'react'
import ModalAdmin from '../modalAdmin'
import TiptapInput from '../ppdb/tiptapInput'

type TModalKeteranganCreate = {
    opened: boolean
    close: () => void
    titleModal: string
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    description: string,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
    tambahKeteranganHandler: () => void,
}

const ModalKeteranganCreate: React.FC<TModalKeteranganCreate> = ({
    opened,
    close,
    titleModal,
    description,
    setDescription,
    name,
    setName,
    tambahKeteranganHandler,
}) => {
    return (
        <ModalAdmin
            size='70rem'
            onClose={close}
            opened={opened}
            title={titleModal}
            onAccept={{
                acceptFn: tambahKeteranganHandler,
                titleAccept: "Tambah"
            }}
            withFooter
        >
            <Stack
                mt={"3rem"}
                mb={"6rem"}
                sx={{
                    paddingInline: "2rem",
                    minHeight: "50vh"
                }}

            >
                <Text align="left" weight={"bold"} >Nama</Text>

                <TextInput
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Text align="left" mt={30} weight={"bold"}>Deskripsi Keterangan</Text>

                <TiptapInput

                    desc={description}
                    setDesc={setDescription}
                />
            </Stack>
        </ModalAdmin>
    )
}

export default ModalKeteranganCreate