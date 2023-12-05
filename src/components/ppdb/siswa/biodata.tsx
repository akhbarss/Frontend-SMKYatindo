import { useRef, useState } from "react"
import {
    Image,
    ActionIcon,
    Avatar,
    Box,
    Button,
    Grid,
    Group,
    Select,
    Stack,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import { DateInput } from '@mantine/dates';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import toast from "react-hot-toast";

type TBiodata = {
    setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>
}

const Biodata: React.FC<TBiodata> = ({ setActiveTabIndex }) => {

    const [files, setFiles] = useState<FileWithPath[]>([]);
    const openRef = useRef<() => void>(null);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        setActiveTabIndex(index => index + 1)

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

    return (
        <Box
            sx={theme => ({
                backgroundColor: `${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white}`,
                padding: "2rem",
                boxShadow: "0 5px 10px -8px black",
                borderRadius: "7px"
            })}
        >

            {previews}


            <Dropzone
                onReject={(files) => {
                    const fileToLarge = files[0].errors[0].code == "file-too-large"
                    if (fileToLarge) {
                        toast.error("Size gambar terlalu besar dari 5MB")
                    }

                    toast.error("rejected files")
                }}
                maxSize={3 * 1024 ** 2}
                onDrop={(file) => {
                    if (file[0].path) {
                        setFiles(files)
                    }
                }}
                openRef={openRef}
                accept={IMAGE_MIME_TYPE}
            >

                {/* children */}
            </Dropzone>

            <form onSubmit={submitHandler}>

                <Stack className="">

                    <Title>Identitas Diri</Title>

                    <Box >
                        <Text align="center" size={20}>Foto Profil</Text>


                        <Avatar size={150} className="mx-auto" radius={500} mt={20}
                        />

                        {/* <ActionIcon sx={{ position: "absolute", }} onClick={() => openRef.current()}>
                        <FaEdit size={30} />
                    </ActionIcon> */}
                    </Box>

                    <Grid gutter={30} mt={40}>
                        <Grid.Col sm={6}>
                            <TextInput
                                label="NISN"
                                type="number"
                            />
                        </Grid.Col>
                        <Grid.Col sm={6}>
                            <TextInput
                                label="Nomor Whatsapp"
                                required
                                type="number"
                            />
                        </Grid.Col>
                        <Grid.Col sm={6}>
                            <TextInput
                                label="Nama Lengkap"
                                required
                            />
                        </Grid.Col>
                        <Grid.Col sm={6}>
                            <TextInput
                                label="Nama Panggilan"
                            />
                        </Grid.Col>
                        <Grid.Col sm={6}>
                            <Select
                                data={["Laki-laki", "Perempuan"]}
                                label="Gender"
                                required
                            />
                        </Grid.Col>
                        <Grid.Col sm={6}>
                            <Select
                                data={[
                                    "Islam",
                                    "Kristen Protestan",
                                    "Kristen Katolik",
                                    "Kristen Katolik",
                                    "Hindu",
                                    "Budha",
                                    "Konghucu",
                                    "Lainnya",
                                ]}
                                label="Agama"
                                required
                            />
                        </Grid.Col>
                        <Grid.Col sm={6}>
                            <TextInput
                                label="Tempat Lahir"
                                required
                            />
                        </Grid.Col>
                        <Grid.Col sm={6}>
                            <DateInput
                                label="Tanggal Lahir"
                                valueFormat="DD MMMM YYYY"
                                required
                            />
                        </Grid.Col>
                        <Grid.Col sm={6}>
                            <TextInput
                                label="Alamat"
                                required
                            />
                        </Grid.Col>
                        <Grid.Col sm={6}>
                            <TextInput
                                label="Provinsi"
                            />
                        </Grid.Col>
                        <Grid.Col sm={6}>
                            <TextInput
                                label="Kabupaten/Kota"
                            />
                        </Grid.Col>
                        <Grid.Col sm={6}>
                            <TextInput
                                label="Kecamatan"
                            />
                        </Grid.Col>
                        <Grid.Col sm={6}>
                            <TextInput
                                label="Kelurahan"
                            />
                        </Grid.Col>
                        <Grid.Col sm={6}>
                            <TextInput
                                label="Kodepos"
                                type="number"
                            />
                        </Grid.Col>
                        <Grid.Col sm={6}>
                            <TextInput
                                label="Asal Sekolah"
                            />
                        </Grid.Col>
                    </Grid>

                    <Group position='right' mt={20}>
                        <Button type="submit">
                            Simpan
                        </Button>
                    </Group>

                </Stack>
            </form>
        </Box>
    )
}

export default Biodata