import {
    Stack,
    Text,
    TextInput
} from '@mantine/core'
import { UseMutationResult } from '@tanstack/react-query'
import React from 'react'
import { EditAlurPayload } from '../../apis/alur/editAlur'
import { ResponseType } from '../../types/global'
import ModalAlur from '../modalAdmin'
import TiptapInput from '../ppdb/tiptapInput'

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
            title="Ubah Alur Pendaftaran PPDB"
            withFooter
            onAccept={{
                acceptFn: editAlurHandler,
                titleAccept: "Ubah"
            }}
            loading={editAlurMutation.status === "pending"}

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