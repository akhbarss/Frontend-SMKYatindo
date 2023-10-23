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
import { JalurPendaftaran } from '../../apis/jalur/getJalur'

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
    editJalurHandler(datas: FormValuesCreateJalur): void
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
    editJalurHandler

}) => {

    const dateStart = new Date(jalur?.start_date)
    const dateEnd = new Date(jalur?.end_date)

    return (
        <ModalAdmin
            onClose={close}
            opened={opened}
            title="Ubah Jalur PPDB"
            size="50rem"
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
                        defaultValue={jalur?.name}
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
                                defaultValue={dateStart}
                                // defaultValue={}
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
                                defaultValue={dateEnd}
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

export default ModallJalurEdit