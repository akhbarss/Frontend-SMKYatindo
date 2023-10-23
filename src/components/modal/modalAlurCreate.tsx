import React from 'react'
import ModalAdmin from '../modalAdmin'
import {
    Button,
    Stack,
    Text,
    TextInput,
    Group
} from '@mantine/core'
import TiptapInput from '../ppdb/tiptapInput'
import { UseMutationResult } from '@tanstack/react-query'
// import { ResponseType } from 'axios'
import { CreateAlurPayload } from '../../apis/alur/createAlur'
import { ResponseType } from '../../types/global'

type TModalAlurCreate = {
    opened: boolean
    close: () => void
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
    descAlurPPDB: string,
    setDescAlurPPDB: React.Dispatch<React.SetStateAction<string>>,
    tambahALurHandler: () => void,
    createAlurMutation: UseMutationResult<ResponseType<Response>, Error, CreateAlurPayload, unknown>
}

const ModalAlurCreate: React.FC<TModalAlurCreate> = ({
    opened,
    close,
    title,
    setTitle,
    descAlurPPDB,
    setDescAlurPPDB,
    tambahALurHandler,
    createAlurMutation
}) => {
    return (
        <ModalAdmin
            size='70rem'
            onClose={close}
            opened={opened}
            title="Tambah Alur Pendaftaran PPDB"

        >
            <Stack p={20} pb={"6rem"} >
                <Text align="left" weight={"bold"} >Nama</Text>

                <TextInput
                    value={title}
                    onChange={(val) => setTitle(val.target.value)}
                />

                <Text align="left" mt={30} weight={"bold"}>Deskripsi Keterangan</Text>

                <TiptapInput

                    desc={descAlurPPDB}
                    setDesc={setDescAlurPPDB}
                />
            </Stack>

            <Group
                position="right"
                sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    left: 0,
                    padding: "1rem 4rem",
                    backgroundColor: "whitesmoke"
                }}
            >
                <Button variant="outline" onClick={() => close()}>
                    Batal
                </Button>

                <Button loading={createAlurMutation.status == "pending"} onClick={() => tambahALurHandler()}>
                    Simpan
                </Button>
            </Group>
        </ModalAdmin>
    )
}

export default ModalAlurCreate