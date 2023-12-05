import {
    Button,
    Grid,
    Select,
    Group,
    Stack,
    TextInput,
} from "@mantine/core"
import { DateTimePicker } from '@mantine/dates'
import { UseFormReturnType } from '@mantine/form'
import React from 'react'
import ModalAdmin from '../modalAdmin'
import { FormValuesTesUjian } from "../TestUjianAdmin"

type TModalTestUjian = {
    title: string
    opened: boolean
    close: () => void
    action: {
        actionFn(datas: FormValuesTesUjian): void
        label: string
    }
    loading: boolean
    formMantine: UseFormReturnType<FormValuesTesUjian, (values: FormValuesTesUjian) => FormValuesTesUjian>
}

const ModalTestUjian: React.FC<TModalTestUjian> = ({
    action: {
        actionFn,
        label
    },
    formMantine,
    close,
    loading,
    opened,
    title
}) => {
    const submitHandler = (data) => {
        actionFn(data)
    }

    return (
        <ModalAdmin
            onClose={close}
            opened={opened}
            size="40rem"
            title={title}
            withFooter={false}
        >
            <form onSubmit={formMantine.onSubmit(value => submitHandler(value))}>
                <Stack p={20} pb={"6rem"}>

                    <TextInput
                        required
                        label="Nama Test Ujian"
                        {...formMantine.getInputProps("nama")}
                    />

                    <TextInput
                        required
                        label="Link Test Ujian"
                        {...formMantine.getInputProps("link")}
                    />

                    <Grid>
                        <Grid.Col md={6}>
                            <DateTimePicker
                                withAsterisk
                                aria-required="true"
                                label="Waktu Pendaftaran Dibuka"
                                dropdownType="modal"
                                {...formMantine.getInputProps("waktuDibuka")}
                                clearable
                            />
                        </Grid.Col>
                        <Grid.Col md={6}>
                            <DateTimePicker
                                required
                                label="Waktu Pendaftaran Ditutup"
                                dropdownType="modal"
                                {...formMantine.getInputProps("waktuDitutup")}
                                clearable
                            />
                        </Grid.Col>

                    </Grid>

                </Stack>

                <Group
                    position="right"
                    sx={theme => ({
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        left: 0,
                        padding: "1rem 4rem",
                        backgroundColor: theme.colorScheme === 'dark' ? "black" : "whitesmoke",
                        zIndex: 1
                    })}
                >
                    <Button variant="outline" onClick={() => close()} disabled={loading}>
                        Batal
                    </Button>

                    <Button
                        type="submit"
                        loading={loading}
                    >
                        {label}
                    </Button>
                </Group>

            </form>
        </ModalAdmin>
    )
}

export default ModalTestUjian