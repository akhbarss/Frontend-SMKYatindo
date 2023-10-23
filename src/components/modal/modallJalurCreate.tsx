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
    UseFormRegister
} from "react-hook-form"
import ModalAdmin from '../modalAdmin'
import { NumericFormat } from 'react-number-format'
import { DateTimePicker } from '@mantine/dates'
import { FormValuesCreateJalur } from '../../pages/ppdb/admin/jalurPendaftaranPPDB/JalurPendaftaran'

type TModalJalurCreate = {
    opened: boolean
    close: () => void
    errors: FieldErrors<{
        tipeJalur?: string;
        namaJalur?: string;
        biayaPendaftaran?: string;
        waktuDibuka?: string;
        waktuDiitutup?: string;
    }>
    register: UseFormRegister<{
        tipeJalur?: string;
        namaJalur?: string;
        biayaPendaftaran?: string;
        waktuDibuka?: string;
        waktuDiitutup?: string;
    }>
    tambahJalurHandler: (datas: FormValuesCreateJalur) => void
    handleSubmit: UseFormHandleSubmit<{
        tipeJalur?: string;
        namaJalur?: string;
        waktuDibuka?: string;
        waktuDiitutup?: string;
        biayaPendaftaran?: string;
    }, undefined>
    setValue: UseFormSetValue<{
        tipeJalur?: string;
        namaJalur?: string;
        biayaPendaftaran?: string;
        waktuDibuka?: string;
        waktuDiitutup?: string;
    }>
}

const ModallJalurCreate: React.FC<TModalJalurCreate> = ({
    close,
    opened,
    handleSubmit,
    tambahJalurHandler,
    errors,
    register,
    setValue

}) => {
    return (
        <ModalAdmin
            onClose={close}
            opened={opened}
            title="Tambah Jalur PPDB"
            size="50rem"
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
                    // onChange={(value: TipeJalur) => {
                    //   setMetodePembayaran(value)
                    // }}
                    // required
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

                    <Grid >
                        <Grid.Col md={6}>
                            <DateTimePicker
                                error={errors.waktuDibuka?.message}
                                label="Waktu Dibuka"
                                dropdownType="modal"
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
                                error={errors.waktuDiitutup?.message}
                                label="Waktu Ditutup"
                                dropdownType="modal"
                                onChange={(e) => {
                                    setValue("waktuDiitutup", e.toISOString())
                                }}

                            // aria-required
                            />
                        </Grid.Col>

                    </Grid>

                    <NumericFormat
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="Rp. "
                        customInput={TextInput}
                        placeholder='Rp. 0'
                        label="Biaya Pendaftaran"
                        description="Input Nominal"
                        // value={activeTabIndex > 2 ? "150000" : ""}
                        // required
                        onValueChange={(e) => setValue("biayaPendaftaran", e.value)}
                        withAsterisk
                        error={errors.biayaPendaftaran?.message}
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

export default ModallJalurCreate