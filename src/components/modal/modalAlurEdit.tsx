import React from 'react'
import ModalAlur from '../modalAdmin'
import {
    Button,
    Stack,
    Text,
    TextInput,
    Group
} from '@mantine/core'
import TiptapInput from '../ppdb/tiptapInput'
import { UseMutationResult } from '@tanstack/react-query'
import { ResponseType } from '../../types/global'
import { EditAlurPayload } from '../../apis/alur/editAlur'

type TModalAlurEdit = {
    opened: boolean
    close: () => void
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
    descAlurPPDB: string,
    setDescAlurPPDB: React.Dispatch<React.SetStateAction<string>>,
    setIdAlur: React.Dispatch<React.SetStateAction<string>>,
    editAlurHandler: () => void,
    editAlurMutation: UseMutationResult<ResponseType<Response>, Error, EditAlurPayload, unknown>
}

const ModalAlurEdit: React.FC<TModalAlurEdit> = ({
    opened,
    close,
    title,
    setTitle,
    descAlurPPDB,
    setDescAlurPPDB,
    editAlurHandler,
    editAlurMutation,
    setIdAlur
}) => {
    return (
        <ModalAlur
            size='70rem'
            onClose={() => {
                close()
                setDescAlurPPDB("")
                setTitle("")
                setIdAlur("")
            }}
            opened={opened}
            title="Edit Alur Pendaftaran PPDB"
            withFooter
            onAccept={{
                acceptFn: editAlurHandler,
                titleAccept: "Ubah"
            }}

        >
            <Stack p={20} pb={"6rem"}>
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
        </ModalAlur>
    )
}

export default ModalAlurEdit