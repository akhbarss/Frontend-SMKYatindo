import toast, { Toaster } from 'react-hot-toast';
import { useState, useRef } from "react"
// import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Box,
    Title,
    Button,
    Group,
    Radio,
    Stack,
    Text,
    TextInput,
    rem,
    useMantineTheme,
    Image,
    Card
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import { HiPhoto } from "react-icons/hi2";
import { ImCross } from "react-icons/im";
import { NumericFormat } from "react-number-format";
import * as yup from "yup";
import { FiInfo } from "react-icons/fi";
import Loading from "../../loading";

type TMetodePembayaran = "transfer" | "tunai"

type FormValues = {
    metodePembayaran: string
    nominal: string
    buktiPembayaran: yup.AnyObject | string
}

const schema = yup.object({
    metodePembayaran: yup.
        string().required("Tolong pilih metode pembayaran"),
    nominal: yup.string().required("Tolong masukkan nominal pembayaran"),
    buktiPembayaran: yup.mixed().required("Tolong masukkan bukti pembayaran"),
    namaBank: yup.string().required("Tolong masukkan nama bank"),
    nomorRekening: yup.number().required("Tolong masukkan nama bank"),
    namaPemilikRekening: yup.string().required("Tolong masukkan nama pemilik rekening")
})

const PembelianFormulir = ({
    konfirmasiPembelian,
    setKonfirmasiPembelian,
    setActiveTabIndex,
    activeTabIndex,
    konfirmasiPembayaran,
    setKonfirmasiPembayaran,
    load,
    setLoad

}: {
    konfirmasiPembelian: boolean
    setKonfirmasiPembelian: React.Dispatch<React.SetStateAction<boolean>>
    activeTabIndex: number
    setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>
    konfirmasiPembayaran: boolean
    setKonfirmasiPembayaran: React.Dispatch<React.SetStateAction<boolean>>
    load: boolean
    setLoad: React.Dispatch<React.SetStateAction<boolean>>
}) => {


    const data = [
        {
            id: 1,
            metodePembayaran: "transfer",
            bank: "BCA",
            nomorRekening: "nomorrekening",
            namaPemilikRekening: "akbar",
            nominal: 1000000,
            buktiPembayaran: ""
        },
        {
            id: 2,
            metodePembayaran: "cash",
            nominal: 2000000,
            buktiPembayaran: ""
        }
    ]

    const [metodePembayaran, setMetodePembayaran] = useState<TMetodePembayaran | null>(null)
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const openRef = useRef<() => void>(null);

    console.log(metodePembayaran)

    const theme = useMantineTheme()

    const form = useForm<FormValues>({
        resolver: yupResolver(schema)
    });
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = form;

    const submitHandler = async (data: FormValues) => {
        console.log("submited")
        console.log(data)
        // setActiveTabIndex(index => index + 1)

        const formData = new FormData()
        formData.append("image", files[0])

        try {

            // ############## NODEJS ########################

            // const xhr = new XMLHttpRequest();

            // xhr.upload.addEventListener('progress', (event) => {
            //     if (event.lengthComputable) {
            //         const percentComplete = (event.loaded / event.total) * 100;
            //         setLoad(true)
            //         console.log(`Upload progress: ${percentComplete}%`);
            //     }
            // });

            // xhr.open('POST', 'http://localhost:3000/upload', true);

            // xhr.onreadystatechange = () => {
            //     if (xhr.readyState === 4 && xhr.status === 200) {
            //         setLoad(false)
            //         console.log('Gambar berhasil diunggah');
            //         // Tambahkan logika atau respons lainnya di sini
            //     } else if (xhr.readyState === 4) {
            //         setLoad(false)
            //         console.error('Gagal mengunggah gambar');
            //     }
            // };

            // xhr.send(formData);

            // #######################################

            // const response = await fetch('http://localhost:3000/upload', {
            //     method: 'POST',
            //     body: formData,
            // });

            // if (response.ok) {
            //     console.log('Gambar berhasil diunggah');
            //     // Tambahkan logika atau respons lainnya di sini
            // } else {
            //     console.error('Gagal mengunggah gambar');
            // }
        } catch (error) {
            console.error('Kesalahan:', error);
        }

        // setKonfirmasiPembayaran(true)
    }

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return (
            <Box
                sx={{
                    position: "relative"
                }}
                key={index}
            >
                <Image
                    src={imageUrl}
                    imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
                    sx={{ marginInline: "auto" }}
                />

                <Box>

                    <Button
                        mt={20}
                        onClick={() => {
                            if (openRef.current !== null) openRef.current()
                        }}
                        sx={{
                            marginInline: "auto"
                        }}
                    >
                        Edit Foto Bukti Transfer / Pembayaran
                    </Button>
                </Box>
            </Box>
        );
    });



    const contentMenungguKonfirmasiPembelian = (
        <Box
            sx={theme => ({
                backgroundColor: `${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white}`,
                padding: "4rem 0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            })}
        >
            <img
                src="/svg//wait-pembelianformulir.svg"
                alt="image"
                style={{
                    width: "250px",
                }}
            />

            <Text
                mt={40}
                // w={500}
                sx={{ maxWidth: 500 }}
                weight={"bold"}
                align="center"
            >
                Harap menunggu konfirmasi admin, untuk mengetahui nilai pembelian dan upload bukti transfer
            </Text>

            <Button variant="filled" onClick={() => setKonfirmasiPembelian(true)} mt={40}>
                Click Me
            </Button>
        </Box>
    )



    const contentPembelianFormulir = (
        <>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Stack>

                    <Title order={1}>Bukti Transfer</Title>
                    {previews.length > 0 ? previews : (
                        <Dropzone
                            openRef={openRef}
                            onDrop={(files) => {
                                if (files[0].path) {
                                    setValue("buktiPembayaran", files[0])
                                    setError("buktiPembayaran", {
                                        message: "",
                                    })
                                    setFiles(files)
                                    console.log(files[0].path)
                                }
                            }}
                            onReject={(files) => {
                                const fileToLarge = files[0].errors[0].code == "file-too-large"
                                if (fileToLarge) {
                                    toast.error("Size gambar terlalu besar dari 5MB")
                                }
                                console.log('rejected files',)
                            }}
                            maxSize={3 * 1024 ** 2}
                            accept={IMAGE_MIME_TYPE}
                        // {...register("buktiPembayaran")}
                        >
                            <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
                                <Dropzone.Accept>
                                    <FaUpload
                                        size="3.2rem"
                                        stroke={1.5}
                                        color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                                    />
                                </Dropzone.Accept>
                                <Dropzone.Reject>
                                    <ImCross
                                        size="3.2rem"
                                        stroke={1.5}
                                        color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                                    />
                                </Dropzone.Reject>
                                <Dropzone.Idle>
                                    <HiPhoto size="3.2rem" stroke={1.5} />
                                </Dropzone.Idle>

                                {/* <div> */}
                                <Text size="" >
                                    Upload Bukti Bayar, Max : 5MB
                                </Text>
                                {/* <Text size="sm" color="dimmed" inline mt={7}>
                                    Attach as many files as you like, each file should not exceed 5mb
                                </Text> */}
                                {/* </div> */}
                            </Group>
                        </Dropzone>
                    )}

                    <Text color="red" size={"xs"}>
                        {errors.buktiPembayaran?.message ? errors.buktiPembayaran?.message : ""}
                    </Text>

                    <NumericFormat
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="Rp. "
                        customInput={TextInput}
                        placeholder='Rp. 0'
                        // disabled={activeTabIndex > 2}
                        label="Nominal"
                        description="Input Nominal"
                        value={activeTabIndex > 2 ? "150000" : ""}
                        error={errors.nominal?.message}
                        withAsterisk
                        onValueChange={(values) => {
                            setValue("nominal", values.value)
                        }}
                    // {...register("nominal")}
                    />

                    <Radio.Group
                        label="Metode Pembayaran"
                        description="Pilih salah satu"
                        error={errors.metodePembayaran?.message}
                        styles={{
                            error: {
                                marginTop: "10px",
                            },
                        }}
                        defaultValue={activeTabIndex > 2 ? "transfer" : ""}
                        onChange={(value: TMetodePembayaran) => {
                            setValue("metodePembayaran", value)
                            setMetodePembayaran(value)
                            // console.log(value)
                        }}
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
                                label="Tunai"
                                value={"tunai"}
                                {...register("metodePembayaran")}

                            // disabled={activeTabIndex > 2}
                            />

                            <Radio
                                label="Transfer"
                                value={"transfer"}
                                {...register("metodePembayaran")}
                            // disabled={activeTabIndex > 2}
                            />
                        </Group>
                    </Radio.Group>

                    {metodePembayaran === "transfer" && (
                        <>
                            <TextInput
                                description="Masukkan nama bank"
                                label="Nama Bank"
                                placeholder='Bank BCA'
                                withAsterisk
                                />

                            <TextInput
                                label="Nomor Rekening"
                                description="Masukkan nomor rekening"
                                withAsterisk
                                type='number'
                                />

                            <TextInput
                                label="Nama Pemilik Rekening"
                                description="Masukkan nama pemilik rekening"
                                withAsterisk
                            />


                        </>

                    )}

                    <Box mt={20} >
                        <Button
                            type="submit"
                        //   disabled={activeTabIndex > 2}
                        >
                            Simpan
                        </Button>
                    </Box>
                </Stack>
            </form>
        </>
    )

    const contentMenungguKonfirmasiPembayaran = (
        <Card
            // shadow="lg"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <FiInfo size={100} color="#339AF0" />
            <Text mt={40}>Harap Menunggu Konfirmasi Pembayaran</Text>
            <Button
                mt={40}
                onClick={() => { setActiveTabIndex(index => index + 1) }}
            >
                Next
            </Button>
        </Card>
    )

    const content = konfirmasiPembelian === true ? contentPembelianFormulir : contentMenungguKonfirmasiPembelian

    return (
        <>
            <Box
                sx={theme => ({
                    backgroundColor: `${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white}`,
                    padding: "2rem",
                    boxShadow: "0 5px 10px -8px black",
                    borderRadius: "7px"
                })}
            >
                {konfirmasiPembayaran && activeTabIndex <= 2 ? contentMenungguKonfirmasiPembayaran : content}
            </Box>

            <Toaster />
        </>
    )
}

export default PembelianFormulir