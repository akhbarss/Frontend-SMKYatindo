import {
    Stack,
    Text,
    TextInput
} from '@mantine/core'
import React from 'react'
import ModalAdmin from '../modalAdmin'
import TiptapInput from '../ppdb/tiptapInput'

type TModalKeteranganEdit = {
    opened: boolean
    close: () => void
    titleModal: string
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    description: string,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
    editKeteranganHandler: () => void,
    loading?: boolean
}

const ModalKeteranganEdit: React.FC<TModalKeteranganEdit> = ({
    opened,
    close,
    titleModal,
    description,
    setDescription,
    name,
    setName,
    editKeteranganHandler,
    loading
}) => {
    return (
        <ModalAdmin
            size='70rem'
            onClose={close}
            opened={opened}
            title={titleModal}
            onAccept={{
                acceptFn: editKeteranganHandler,
                titleAccept: "Ubah"
            }}
            withFooter
            loading={loading}
        >
            <Stack p={20} pb={"6rem"} mt={"3rem"}>
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

export default ModalKeteranganEdit