import {
    Select,
    Box,
    Stack,
    Text,
    TextInput
} from '@mantine/core'
import { UseMutationResult } from '@tanstack/react-query'
import React from 'react'
import { CreateAlurPayload } from '../../apis/alur/createAlur'
import { ResponseType } from '../../types/global'
import ModalAdmin from '../modalAdmin'
import TiptapInput from '../ppdb/tiptapInput'

type TModalAlurCreate = {
    opened: boolean
    close: () => void
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
    descAlurPPDB: string,
    setDescAlurPPDB: React.Dispatch<React.SetStateAction<string>>,
    grade: string;
    setGrade: React.Dispatch<React.SetStateAction<string>>;
    tambahALurHandler: () => void,
    createAlurMutation: UseMutationResult<ResponseType<Response>, Error, CreateAlurPayload, unknown>
}

const ModalAlurCreate: React.FC<TModalAlurCreate> = ({
    opened,
    close,
    title,
    setTitle,
    descAlurPPDB,
    grade,
    setGrade,
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
            loading={createAlurMutation.status === "pending"}
        >
            <Stack p={20} pb={"6rem"} >
                <Box>
                    <Text align="left" weight={"bold"} >Nama</Text>
                    <TextInput
                        data-autofocus
                        value={title}
                        onChange={(val) => setTitle(val.target.value)}
                    />
                </Box>

                <Box>
                    <Text align="left" weight={"bold"} >Jenjang</Text>
                    <Select
                        data={["SMP", "SMK"]}
                        value={grade}
                        onChange={(e) => setGrade(e)}
                    />
                </Box>

                <Box>
                    <Text align="left" weight={"bold"}>Deskripsi Keterangan</Text>
                    <TiptapInput

                        desc={descAlurPPDB}
                        setDesc={setDescAlurPPDB}
                    />
                </Box>
            </Stack>
        </ModalAdmin>
    )
}

export default ModalAlurCreate