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
            withFooter
            onAccept={{
                acceptFn: tambahALurHandler,
                titleAccept: "Tambah"
            }}

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
        </ModalAdmin>
    )
}

export default ModalAlurCreate