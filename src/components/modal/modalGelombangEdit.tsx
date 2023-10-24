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
import { TGelombang } from '../../apis/jalur/getJalur'

type TModalGelombangEdit = {
    opened: boolean
    close: () => void
    register: UseFormRegister<{
        nama?: string;
        jumlahPenerimaan?: string;
        waktuDibuka?: string;
        waktuDiitutup?: string;
        namaBank?: string;
        nomorRekening?: string;
        namaPemilikRekening?: string;
        biayaPendaftaran?: string;
    }>
    setValue: UseFormSetValue<{
        nama?: string;
        jumlahPenerimaan?: string;
        waktuDibuka?: string;
        waktuDiitutup?: string;
        namaBank?: string;
        nomorRekening?: string;
        namaPemilikRekening?: string;
        biayaPendaftaran?: string;
    }>
    errors: FieldErrors<{
        nama?: string;
        jumlahPenerimaan?: string;
        waktuDibuka?: string;
        waktuDiitutup?: string;
        namaBank?: string;
        nomorRekening?: string;
        namaPemilikRekening?: string;
        biayaPendaftaran?: string;
    }>
    handleSubmit: UseFormHandleSubmit<{
        nama?: string;
        jumlahPenerimaan?: string;
        waktuDibuka?: string;
        waktuDiitutup?: string;
        namaBank?: string;
        nomorRekening?: string;
        namaPemilikRekening?: string;
        biayaPendaftaran?: string;
    }, undefined>
    editGelombangHandler(datas: FormValuesCreateGelombang): void
    gelombang: TGelombang
}

const ModalGelombangEdit: React.FC<TModalGelombangEdit> = ({
    close,
    opened,
    register,
    errors,
    setValue,
    handleSubmit,
    gelombang,
    editGelombangHandler
}) => {

    const dateStart = new Date(gelombang?.start_date)
    const dateEnd = new Date(gelombang?.end_date)

    return (
        <ModalAdmin
            onClose={close}
            opened={opened}
            size="40rem"
            title="Tambah Gelombang PPDB"
        >
            <form onSubmit={handleSubmit(editGelombangHandler)}>
                <Stack p={20} pb={"6rem"}>

                    <TextInput
                        label="Nama"
                        {...register("nama")}
                        defaultValue={gelombang?.name}
                        error={errors?.nama?.message}
                    />

                    <TextInput
                        label="Jumlah Penerimaan"
                        type='number'
                        {...register("jumlahPenerimaan")}
                        error={errors?.jumlahPenerimaan?.message}
                        defaultValue={gelombang?.max_quota}
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
                                defaultValue={dateStart}
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
                                defaultValue={dateEnd}

                            // aria-required
                            />
                        </Grid.Col>

                    </Grid>

                    <TextInput
                        label="Nama Bank"
                        {...register("namaBank")}
                        error={errors?.namaBank?.message}
                        defaultValue={gelombang?.bank_name}

                    />

                    <TextInput
                        label="Nomor Rekening"
                        type='number'
                        {...register("nomorRekening")}
                        error={errors?.nomorRekening?.message}
                        defaultValue={gelombang?.bank_account}
                    />

                    <TextInput
                        label="Nama Pemilik Rekening"
                        {...register("namaPemilikRekening")}
                        error={errors?.namaPemilikRekening?.message}
                        defaultValue={gelombang?.bank_user}
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
                        defaultValue={gelombang?.price}
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

export default ModalGelombangEdit