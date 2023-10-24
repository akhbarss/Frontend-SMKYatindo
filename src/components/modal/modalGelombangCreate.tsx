import React from 'react'
import { DateTimePicker } from '@mantine/dates'
import ModalAdmin from '../modalAdmin'
import {
    Group,
    Grid,
    Button,
    TextInput,
    Stack,
} from "@mantine/core"
import { NumericFormat } from 'react-number-format'
import {
    UseFormHandleSubmit,
    FieldErrors,
    UseFormRegister,
    UseFormSetValue,
} from "react-hook-form"
import { FormValuesCreateGelombang } from '../../pages/ppdb/admin/jalurPendaftaranPPDB/Gelombang'

type TModalGelombangCreate = {
    opened: boolean
    close: () => void
    register: UseFormRegister<{
        nama?: string;
        jumlahPenerimaan?: string;
        waktuDibuka?: Date;
        waktuDiitutup?: Date;
        namaBank?: string;
        nomorRekening?: string;
        namaPemilikRekening?: string;
        biayaPendaftaran?: string;
    }>
    setValue: UseFormSetValue<{
        nama?: string;
        jumlahPenerimaan?: string;
        waktuDibuka?: Date;
        waktuDiitutup?: Date;
        namaBank?: string;
        nomorRekening?: string;
        namaPemilikRekening?: string;
        biayaPendaftaran?: string;
    }>
    errors: FieldErrors<{
        nama?: string;
        jumlahPenerimaan?: string;
        waktuDibuka?: Date;
        waktuDiitutup?: Date;
        namaBank?: string;
        nomorRekening?: string;
        namaPemilikRekening?: string;
        biayaPendaftaran?: string;
    }>
    handleSubmit: UseFormHandleSubmit<{
        nama?: string;
        jumlahPenerimaan?: string;
        waktuDibuka?: Date;
        waktuDiitutup?: Date;
        namaBank?: string;
        nomorRekening?: string;
        namaPemilikRekening?: string;
        biayaPendaftaran?: string;
    }, undefined>
    control: Control<{
        nama?: string;
        jumlahPenerimaan?: string;
        waktuDibuka?: Date;
        waktuDiitutup?: Date;
        namaBank?: string;
        nomorRekening?: string;
        namaPemilikRekening?: string;
        biayaPendaftaran?: string;
    }, any>
    tambahGelombangHandler(datas: FormValuesCreateGelombang): void
}

const ModalGelombangCreate: React.FC<TModalGelombangCreate> = ({
    close,
    opened,
    register,
    errors,
    setValue,
    handleSubmit,
    tambahGelombangHandler
}) => {

    return (
        <ModalAdmin
            onClose={close}
            opened={opened}
            size="40rem"
            title="Tambah Gelombang PPDB"
        >
            <form onSubmit={handleSubmit(tambahGelombangHandler)}>
                <Stack p={20} pb={"6rem"}>

                    <TextInput
                        label="Nama"
                        {...register("nama")}
                        error={errors?.nama?.message}
                    />

                    <TextInput
                        label="Jumlah Penerimaan"
                        type='number'
                        {...register("jumlahPenerimaan")}
                        error={errors?.jumlahPenerimaan?.message}
                    />

                    <Grid>
                        <Grid.Col md={6}>
                            <DateTimePicker
                                // error={errors.waktuDibuka?.message}
                                label="Waktu Pendaftaran Dibuka"
                                dropdownType="modal"
                                error={errors?.waktuDibuka?.message}
                                onChange={(e) => {
                                    setValue("waktuDibuka", e.toISOString())
                                }}
                                // required
                                // {...register("waktuDibuka")}

                                // aria-label="dmasnd"
                                clearable
                            />
                        </Grid.Col>
                        <Grid.Col md={6}>
                            <DateTimePicker
                                // error={errors.waktuDiitutup?.message}
                                label="Waktu Pendaftaran Ditutup"
                                error={errors?.waktuDiitutup?.message}
                                dropdownType="modal"
                                onChange={(e) => {
                                    setValue("waktuDiitutup", e.toISOString())
                                }}

                            // aria-required
                            />
                        </Grid.Col>

                    </Grid>

                    <TextInput
                        label="Nama Bank"
                        {...register("namaBank")}
                        error={errors?.namaBank?.message}

                    />

                    <TextInput
                        label="Nomor Rekening"
                        type='number'
                        {...register("nomorRekening")}
                        error={errors?.nomorRekening?.message}
                    />

                    <TextInput
                        label="Nama Pemilik Rekening"
                        {...register("namaPemilikRekening")}
                        error={errors?.namaPemilikRekening?.message}
                    />

                    <NumericFormat
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="Rp. "
                        customInput={TextInput}
                        placeholder='Rp. 0'
                        label="Biaya Pendaftaran"
                        description="Input Nominal"
                        onValueChange={(e) => setValue("biayaPendaftaran", e.value)}
                        error={errors?.biayaPendaftaran?.message}
                        withAsterisk
                    // {...register("biayaPendaftaran")}

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

                    <Button
                        //  onClick={() => submitCreateHandler()}
                        type="submit"
                    >
                        Simpan
                    </Button>
                </Group>

            </form>
        </ModalAdmin>
    )
}

export default ModalGelombangCreate