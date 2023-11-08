import {
    Button,
    Grid,
    Group,
    Stack,
    TextInput,
} from "@mantine/core"
import { DateTimePicker } from '@mantine/dates'
import { UseFormReturnType } from '@mantine/form'
import React from 'react'
import { NumericFormat } from 'react-number-format'
import { FormValuesCreateGelombang } from '../../pages/ppdb/admin/jalurPendaftaranPPDB/Gelombang'
import ModalAdmin from '../modalAdmin'

type TModalGelombang = {
    opened: boolean
    close: () => void
    action: {
        actionFn(datas: FormValuesCreateGelombang): void
        label: string
    }
    loading: boolean
    formMantine: UseFormReturnType<FormValuesCreateGelombang, (values: FormValuesCreateGelombang) => FormValuesCreateGelombang>
}

const ModalGelombang: React.FC<TModalGelombang> = ({
    close,
    opened,
    action: {
        actionFn,
        label
    },
    loading,
    formMantine,
}) => {

    function submitHandler(data: typeof formMantine.values) {
        // console.log(data)
        actionFn(data)
    }

    return (
        <ModalAdmin
            onClose={close}
            opened={opened}
            size="40rem"
            title="Tambah Gelombang PPDB"
            withFooter={false}
        >
            <form onSubmit={formMantine.onSubmit(value => submitHandler(value))}>
                <Stack p={20} pb={"6rem"}>

                    <TextInput
                        required
                        label="Nama"
                        {...formMantine.getInputProps("nama")}
                    />

                    <TextInput
                        required
                        label="Jumlah Penerimaan"
                        type='number'
                        {...formMantine.getInputProps("jumlahPenerimaan")}
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

                    <TextInput
                        required
                        label="Nama Bank"
                        {...formMantine.getInputProps("namaBank")}
                    />

                    <TextInput
                        required
                        label="Nomor Rekening"
                        type='number'
                        {...formMantine.getInputProps("nomorRekening")}
                    />

                    <TextInput
                        required
                        label="Nama Pemilik Rekening"
                        {...formMantine.getInputProps("namaPemilikRekening")}
                    />

                    <NumericFormat
                        required
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="Rp. "
                        customInput={TextInput}
                        placeholder='Rp. 0'
                        label="Biaya Pendaftaran"
                        description="Input Nominal"
                        {...formMantine.getInputProps("biayaPendaftaran")}
                        withAsterisk
                    />

                    <TextInput
                        label="Kode Gelombang"
                        required
                        {...formMantine.getInputProps("kodeGelombang")}
                    />

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
                    <Button variant="outline" onClick={() => close()}>
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

export default ModalGelombang