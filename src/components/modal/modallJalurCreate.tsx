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
    Control,
    Controller
} from "react-hook-form"
import ModalAdmin from '../modalAdmin'
import { NumericFormat } from 'react-number-format'
import { DateTimePicker } from '@mantine/dates'
import { FormValuesCreateJalur } from '../../pages/ppdb/admin/jalurPendaftaranPPDB/JalurPendaftaranAdmin'

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
    tambahJalurHandler: (datas: FormValuesCreateJalur) => void
}

const ModallJalurCreate: React.FC<TModalJalurCreate> = ({
    close,
    opened,
    handleSubmit,
    tambahJalurHandler,
    errors,
    register,
    setValue,
    control

}) => {
    return (
        <ModalAdmin
            onClose={close}
            opened={opened}
            title="Tambah Jalur PPDB"
            size="50rem"
            withFooter={false}
        >
            <form onSubmit={handleSubmit(tambahJalurHandler)}>

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
                                // required
                                {...register("tipeJalur")}
                            />

                            <Radio
                                label="PENGEMBALIAN"
                                value={"PENGEMBALIAN"}
                                // required
                                {...register("tipeJalur")}
                            />
                        </Group>
                    </Radio.Group>

                    <TextInput
                        // onChange={(val) => setNama(val.target.value)}
                        // required
                        label="Nama"
                        error={errors.namaJalur?.message}
                        {...register("namaJalur")}
                    />

                    <Grid>
                        <Grid.Col md={6}>
                            <Controller
                                name='waktuDibuka'
                                control={control}
                                render={({ field }) => (
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
                                render={({ field }) => (
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
                        shouldUnregister
                        key={"BIAYA"}
                        render={({
                            field: { name, onBlur,
                                onChange,
                                ref,
                                value,
                                disabled }
                        }) => (
                            <NumericFormat
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix="Rp. "
                                customInput={TextInput}
                                placeholder='Rp. 0'
                                label="Biaya Pendaftaran"
                                error={errors?.biayaPendaftaran?.message}
                                onChange={onChange}
                                value={value}
                                disabled={disabled}
                                name={name}
                                onBlur={onBlur}
                                autoComplete='off'
                                getInputRef={ref}
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
                        Tambah
                    </Button>
                </Group>
            </form>
        </ModalAdmin>
    )
}

export default ModallJalurCreate