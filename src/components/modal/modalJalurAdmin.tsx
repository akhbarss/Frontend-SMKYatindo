import {
    Button,
    Grid,
    Group,
    Radio,
    Stack,
    TextInput,
} from "@mantine/core"
import { DateTimePicker } from "@mantine/dates"
import { UseFormReturnType } from "@mantine/form"
import { NumericFormat } from 'react-number-format'
import { FormValuesCreateJalur } from "../../pages/ppdb/admin/jalur-pendaftaran/JalurPendaftaranAdmin"
import ModalAdmin from "../modalAdmin"

type TModalJalurAdmin = {
    title: string
    opened: boolean
    close: () => void
    action: {
        actionFn(datas: FormValuesCreateJalur): void
        label: string
    }
    loading: boolean
    formMantine: UseFormReturnType<FormValuesCreateJalur, (values: FormValuesCreateJalur) => FormValuesCreateJalur>
}

const ModalJalurAdmin: React.FC<TModalJalurAdmin> = ({
    action: {
        actionFn,
        label
    },
    close,
    formMantine,
    loading,
    opened,
    title
}) => {
    function submitHandler(data: typeof formMantine.values) {
        actionFn(data)
    }

    return (
        <>
            <ModalAdmin
                onClose={close}
                opened={opened}
                size="40rem"
                title={title}
                withFooter={false}
            >
                <form onSubmit={formMantine.onSubmit(e => submitHandler(e))}>

                    <Stack p={20} pb={"6rem"}>
                        <Radio.Group
                            label="Tipe Jalur"
                            description="Pilih salah satu"
                            styles={{
                                error: {
                                    marginTop: "10px",
                                },
                            }}
                            onChange={(val) => formMantine.setFieldValue("tipeJalur", val)}
                            required
                            {...formMantine.getInputProps("tipeJalur")}
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
                                    required
                                />
                                <Radio
                                    required
                                    label="PENGEMBALIAN"
                                    value={"PENGEMBALIAN"}
                                />
                            </Group>
                        </Radio.Group>

                        <TextInput
                            required
                            label="Nama Jalur"
                            {...formMantine.getInputProps("namaJalur")}
                        />

                        <Grid>
                            <Grid.Col md={6}>
                                <DateTimePicker
                                    label="Waktu Dibuka"
                                    dropdownType="modal"
                                    clearable
                                    {...formMantine.getInputProps("waktuDibuka")}
                                />
                            </Grid.Col>

                            <Grid.Col md={6}>
                                <DateTimePicker
                                    label="Waktu Ditutup"
                                    dropdownType="modal"
                                    clearable
                                    {...formMantine.getInputProps("waktuDitutup")}
                                />
                            </Grid.Col>
                        </Grid>

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
                        <Button variant="outline" onClick={close} disabled={loading}>
                            Batal
                        </Button>
                        <Button type="submit" loading={loading}>
                            {label}
                        </Button>
                    </Group>

                </form>
            </ModalAdmin>
        </>
    )
}

export default ModalJalurAdmin