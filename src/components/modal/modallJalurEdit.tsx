import React from 'react'
import {
    Stack,
    TextInput,
    Button,
    Radio,
    Group,
    Grid,
} from "@mantine/core"
import {
    UseFormHandleSubmit,
    FieldErrors,
    UseFormSetValue,
    UseFormRegister,
    Controller,
    Control
} from "react-hook-form"
import ModalAdmin from '../modalAdmin'
import { NumericFormat } from 'react-number-format'
import { DateTimePicker } from '@mantine/dates'
import { FormValuesCreateJalur } from '../../pages/ppdb/admin/jalurPendaftaranPPDB/JalurPendaftaran'
import { JalurPendaftaran } from '../../apis/jalur/getJalur'

type TModalJalurCreate = {
    opened: boolean
    close: () => void
    errors: FieldErrors<{
        tipeJalur?: string;
        namaJalur?: string;
        biayaPendaftaran?: string;
        waktuDibuka?: Date;
        waktuDiitutup?: Date;
    }>
    register: UseFormRegister<{
        tipeJalur?: string;
        namaJalur?: string;
        biayaPendaftaran?: string;
        waktuDibuka?: Date;
        waktuDiitutup?: Date;
    }>
    editJalurHandler(datas: FormValuesCreateJalur): void
    handleSubmit: UseFormHandleSubmit<{
        tipeJalur?: string;
        namaJalur?: string;
        waktuDibuka?: Date;
        waktuDiitutup?: Date;
        biayaPendaftaran?: string;
    }, undefined>
    setValue: UseFormSetValue<{
        tipeJalur?: string;
        namaJalur?: string;
        biayaPendaftaran?: string;
        waktuDibuka?: Date;
        waktuDiitutup?: Date;
    }>
    control: Control<{
        waktuDibuka?: Date;
        waktuDiitutup?: Date;
        biayaPendaftaran?: string;
        tipeJalur?: string;
        namaJalur?: string;
    }, any>
    jalur: JalurPendaftaran
}

const ModallJalurEdit: React.FC<TModalJalurCreate> = ({
    close,
    opened,
    handleSubmit,
    jalur,
    errors,
    register,
    setValue,
    editJalurHandler,
    control

}) => {

    const dateStart = new Date(jalur?.start_date)
    const dateEnd = new Date(jalur?.end_date)

    return (
        <ModalAdmin
            onClose={close}
            opened={opened}
            title="Ubah Jalur PPDB"
            size="50rem"
            withFooter={false}
        >
            <form onSubmit={handleSubmit(editJalurHandler)}>

                <Stack p={20} pb={"6rem"}>
                    <Radio.Group
                        label="Tipe"
                        description="Pilih salah satu"
                        styles={{
                            error: {
                                marginTop: "10px",
                            },
                        }}
                        error={errors.tipeJalur?.message}
                        defaultValue={jalur?.type}
                    >
                        <Group
                            mt={"xs"}
                            pt={10}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start"
                            }}

                        >
                            <Radio
                                label="PEMBELIAN"
                                value={"PEMBELIAN"}
                                {...register("tipeJalur")}
                            />

                            <Radio
                                label="PENGEMBALIAN"
                                value={"PENGEMBALIAN"}
                                {...register("tipeJalur")}
                            />
                        </Group>
                    </Radio.Group>

                    <TextInput
                        label="Nama"
                        defaultValue={jalur?.name}
                        error={errors.namaJalur?.message}
                        {...register("namaJalur")}
                    />

                    <Grid >
                        <Grid.Col md={6}>
                            <Controller
                                name='waktuDibuka'
                                control={control}
                                defaultValue={dateStart}
                                render={({ field: { ref, ...field } }) => (
                                    <DateTimePicker
                                        error={errors.waktuDibuka?.message}
                                        label="Waktu Dibuka"
                                        dropdownType="modal"
                                        clearable
                                        {...field}
                                    />

                                )}
                            />
                        </Grid.Col>
                        <Grid.Col md={6}>
                            <Controller
                                name='waktuDiitutup'
                                control={control}
                                defaultValue={dateEnd}
                                render={({ field: { ref, ...field } }) => (
                                    <DateTimePicker
                                        error={errors.waktuDiitutup?.message}
                                        label="Waktu Ditutup"
                                        dropdownType="modal"
                                        clearable
                                        {...field}
                                    />

                                )}
                            />
                        </Grid.Col>

                    </Grid>

                    <Controller
                        name='biayaPendaftaran'
                        control={control}
                        defaultValue={`${jalur?.price}`}
                        render={({ field: { ref, ...field } }) => (
                            <NumericFormat
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix="Rp. "
                                customInput={TextInput}
                                placeholder='Rp. 0'
                                label="Biaya Pendaftaran"
                                description="Input Nominal"
                                error={errors?.biayaPendaftaran?.message}
                                withAsterisk
                                {...field}
                            />
                        )}
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
                        backgroundColor: "whitesmoke",
                        zIndex: 1
                    }}
                >
                    <Button variant="outline" onClick={() => close()}>
                        Batal
                    </Button>

                    <Button
                        type="submit"
                    >
                        Ubah
                    </Button>
                </Group>

            </form>

        </ModalAdmin>
    )
}

export default ModallJalurEdit