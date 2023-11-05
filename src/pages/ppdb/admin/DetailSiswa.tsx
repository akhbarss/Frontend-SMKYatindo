import {
    Grid,
    ActionIcon,
    Avatar,
    Badge,
    Box,
    Button,
    Divider,
    Flex,
    Group,
    Image,
    Paper,
    ScrollArea,
    Stack,
    Styles,
    Tabs,
    Text,
    TextInput,
    TextInputStylesNames,
    ThemeIcon,
    Textarea
} from "@mantine/core";
import { modals } from '@mantine/modals';
import { BsFileEarmarkImage, BsWhatsapp, } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import Page from '../../../components/Page';
import PageLabel from '../../../components/PageLabel';
import { DarkTheme } from '../../../utils/darkTheme';

function Pembayaran() {
    const dark = DarkTheme()

    const openModalBuktiPembayaran = () => modals.open({
        children: (
            <>
                <Box component={ScrollArea.Autosize} className='overflow-auto'>
                    <Box className='z-50 fixed top-0 right-0 left-0' p={10}>
                        <ActionIcon variant='light' onClick={() => modals.closeAll()} ml={"auto"}>
                            <MdClose size={30} />
                        </ActionIcon>
                    </Box>
                    <Image src='/contoh-bukti-pembayaran.jpg' />
                </Box>
            </>
        ),
        size: "100rem",
        styles: {
            body: {
                padding: 0
            },
            header: { display: "none" }
        },
        centered: true
    });

    return (
        <Stack>
            <Paper
                withBorder
                p={"lg"}
                shadow="lg"
                bg={"linear-gradient(to left bottom, #6952ba, #160942)"}
            >
                <Text sx={theme => ({ color: theme.colors.gray[3] })} weight={"bold"}>Status</Text>
                <Text color='white' weight={"bold"} size={"xl"}>Menunggu Konfirmasi Pembayaran</Text>
                <Text sx={theme => ({ color: theme.colors.gray[3] })} mt={25} weight={"bold"}>Tanggal Mendaftar</Text>
                <Text size={"xl"} color='white' weight={"bold"}>Kamis, 18 November 2023</Text>
            </Paper>

            <Paper
                shadow="lg"
                w={"100%"}
                withBorder
                p={"lg"}
                sx={theme => ({ backgroundColor: dark ? theme.colors.dark[8] : theme.white, flex: 1 })}
            >
                <Stack>

                    <Group grow>
                        <Group>
                            <Badge
                                size="lg"
                                color="red"
                                styles={{
                                    root: {
                                        background: "#ffd1d1"

                                    }
                                }}
                            >
                                Belum Terkonfirmasi
                            </Badge>
                            <Badge
                                size="lg"
                                color="green"
                                styles={{
                                    root: {
                                        background: "#dcfce2"
                                    }
                                }}
                            >
                                Terkonfirmasi
                            </Badge>
                            <Text weight={"bold"}>BCA - a/n</Text>
                        </Group>
                        <Box >
                            <Text weight={"bold"} align="right" className="text-[#2A166F]">+ Rp50.000</Text>
                        </Box>
                    </Group>
                    <Group
                        p={"lg"}
                        bg={"#E3E5FC"}
                        className="rounded-md cursor-pointer"
                        onClick={() => openModalBuktiPembayaran()}
                    >
                        <ThemeIcon radius={"100%"} color="#2A166F" size={50}>
                            <BsFileEarmarkImage size={30} />
                        </ThemeIcon>
                        <Text size={20} weight={"bold"}>File Bukti Pembayaran</Text>
                    </Group>
                    <Divider />
                    <Group grow>
                        <Text>Sabtu, 04 November 2023</Text>
                        <Group position="right">
                            <Button  >Konfirmasi</Button>
                            <Button color="red">Batalkan Konfirmasi</Button>
                        </Group>
                    </Group>
                </Stack>
            </Paper>
        </Stack>
    )
}

const DetailSiswa = () => {
    const { userId } = useParams()

    const stylesInput: Styles<TextInputStylesNames, Record<string, any>> = {
        input: { ":disabled": { opacity: 1 } },
        label: { userSelect: "none", fontWeight: "bold" },

    }

    return (
        <Page title='Detail Informasi Pendaftar'>
            <Stack className="max-w-[60rem] mx-auto">
                <PageLabel label='Detail Informasi Pendaftar' />
                <Flex
                    mt={40}
                    p={"lg"}
                    direction={{ base: 'column', sm: 'row' }}
                    gap={{ base: '2rem', sm: '5rem' }}
                    align={"center"}
                >
                    <Avatar size={220} color="cyan" radius={"100%"}>MR</Avatar>

                    <Box sx={{ flex: 1 }} className="flex flex-col gap-4">
                        <Paper
                            w={"100%"}
                            withBorder
                            p={"lg"}
                            shadow="lg"
                            bg={"white"}
                        >
                            <Text className="select-all" size={24} weight={"bolder"}>Muhammad Putra Ramadhan</Text>
                            <Box w={"fit-content"} mt={10} target="_blank" component={Link} to={`https://wa.me/089513759404?text=Halo%20nak`} className='flex items-center no-underline gap-[10px]'>
                                <ThemeIcon size={30} radius={"lg"} color='green'>
                                    <BsWhatsapp />
                                </ThemeIcon>
                                <Text size={"xl"} color='#2A166F' weight={"bold"}>089513759404</Text>
                            </Box>
                        </Paper>
                        <Paper
                            w={"100%"}
                            withBorder
                            p={"lg"}
                            shadow="lg"
                            bg={"white"}
                        >
                            <Text className="select-all" color='dark' weight={"bold"}>KP. ciketing rawamulya RT 05/02 mustika jaya</Text>
                        </Paper>
                    </Box>
                </Flex>

                <Tabs
                    defaultValue="biodata"
                    styles={{
                        tabLabel: {
                            fontSize: "20px"
                        }
                    }}
                >

                    <Tabs.List>
                        <Tabs.Tab color="blue" value="pembayaran">
                            Pembayaran
                        </Tabs.Tab>
                        <Tabs.Tab value="biodata">Biodata</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="pembayaran" mt={30}>
                        <Pembayaran />
                    </Tabs.Panel>

                    <Tabs.Panel value="biodata" mt={30}>
                        <Text size={40} weight={"bold"}>Biodata PEMBELIAN</Text>
                        <Paper mt={40} bg={"white"} withBorder shadow='lg' p={"lg"}>
                            <Group>
                                <Divider orientation='vertical' size={"0.5rem"} color='#2A166F' />
                                <Text weight={"bold"} size={30}>Identitas Diri</Text>
                            </Group>
                            <Stack mt={40}>
                                <TextInput
                                    size="lg"
                                    disabled
                                    className='select-all caret-pink-500 '
                                    label="Nomor Whatsapp"
                                    value={"089513759404"}
                                    styles={stylesInput}
                                />
                                <TextInput
                                    size="lg"
                                    disabled
                                    className='select-all'
                                    label="Nama Lengkap"
                                    value={"089513759404"}
                                    styles={stylesInput}
                                />
                                <TextInput
                                    size="lg"
                                    disabled
                                    className='select-all'
                                    label="Alamat"
                                    value={"KP. ciketing rawamulya RT 05/02 mustika jaya"}
                                    styles={stylesInput}
                                />
                                <TextInput
                                    size="lg"
                                    disabled
                                    className='select-all'
                                    label="Asal Sekolah"
                                    value={"SMP YATINDO"}
                                    styles={stylesInput}
                                />
                            </Stack>
                        </Paper>

                        <Text mt={60} size={40} weight={"bold"}>Biodata PENGEMBALIAN</Text>
                        {/* IDENTITAS DIRI */}
                        <Paper mt={40} bg={"white"} withBorder shadow='lg' p={"lg"}>
                            <Group>
                                <Divider orientation='vertical' size={"0.5rem"} color='#2A166F' />
                                <Text weight={"bold"} size={30}>Identitas Diri</Text>
                            </Group>
                            <Grid gutter={"lg"} mt={20}>

                                <Grid.Col md={6}>
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="NISN"
                                        value={"0063895934"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>


                                <Grid.Col md={6}>
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Nomor Whatsapp"
                                        value={"081316040431"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col md={6}>
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Nama Lengkap"
                                        value={"Muhammad Luthfi"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>


                                <Grid.Col md={6}>
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Nama Panggilan"
                                        value={"Luthfi"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col md={6}>
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Gender"
                                        value={"Laki-laki"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col md={6}>
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Agama"
                                        value={"Islam"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col md={6}>
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Tempat Lahir"
                                        value={"Bekasi"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col md={6} >
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Tanggal Lahir"
                                        value={"2006-05-11"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col span={12} >
                                    <Textarea
                                        autosize
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Alamat"
                                        value={"Kp. Babakan RT 02/02 Kel.Mustika Sari. Kec. Mustika Jaya, Bekasi "}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col span={6} >
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Provinsi"
                                        value={"JAWA BARAT"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col span={6} >
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Kabupaten/Kota"
                                        value={"KOTA BEKASI"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col span={6} >
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Kecamatan"
                                        value={"MUSTIKAJAYA"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col span={6} >
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Kelurahan"
                                        value={"MUSTIKA SARI"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col span={6} >
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Kodepos"
                                        value={"17157"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col span={6} >
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Asal Sekolah"
                                        value={"SMPN 33 Bekasi"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                            </Grid>
                        </Paper>

                        {/* INFORMASI ORANG TUA */}
                        <Paper
                            shadow="lg"
                            p="lg"
                            withBorder
                            mt={40}
                            bg={"white"}
                        >
                            <Group >
                                <Divider orientation='vertical' size={"0.5rem"} color='#2A166F' />
                                <Text weight={"bold"} size={30}>Informasi Orang Tua</Text>
                            </Group>
                            <Grid gutter={"lg"} mt={20}>

                                <Grid.Col sm={6}>
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Nama Ayah"
                                        value={"Saihwan"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col sm={6}>
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Nama Ibu"
                                        value={"Lisnawati"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col sm={6}>
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Pekerjaan Ayah"
                                        value={"Karyawan"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col sm={6}>
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Pekerjaan Ibu"
                                        value={"Karyawan"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col sm={6}>
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="No Telp Ayah"
                                        value={"081319271826"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col sm={6}>
                                    <TextInput
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="No Telp Ibu"
                                        value={"081316040431"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col sm={6}>
                                    <Textarea
                                        autosize
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Alamat Ayah"
                                        value={"Kp. Ciketing"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col sm={6}>
                                    <Textarea
                                        autosize
                                        size="lg"
                                        disabled
                                        className='select-all caret-pink-500 '
                                        label="Alamat Ibu"
                                        value={"Kp. Ciketing"}
                                        styles={stylesInput}
                                    />

                                </Grid.Col>

                                <Grid.Col span={12}>
                                    <Text weight={"bold"} size={18}>Lampiran Kartu Keluarga</Text>
                                    <Group
                                        p={"md"}
                                        bg={"#E3E5FC"}
                                        className="rounded-md cursor-pointer"
                                    // onClick={() => openModalBuktiPembayaran()}
                                    >
                                        <ThemeIcon radius={"100%"} color="#2A166F" size={50}>
                                            <BsFileEarmarkImage size={30} />
                                        </ThemeIcon>
                                        <Text size={20} weight={"bold"}>File Kartu Keluarga</Text>
                                    </Group>
                                </Grid.Col>

                                <Grid.Col span={12}>
                                    <Text weight={"bold"} size={18}>Lampiran Akta</Text>
                                    <Group
                                        p={"md"}
                                        bg={"#E3E5FC"}
                                        className="rounded-md cursor-pointer"
                                    // onClick={() => openModalBuktiPembayaran()}
                                    >
                                        <ThemeIcon radius={"100%"} color="#2A166F" size={50}>
                                            <BsFileEarmarkImage size={30} />
                                        </ThemeIcon>
                                        <Text size={20} weight={"bold"}>File Akta</Text>
                                    </Group>

                                </Grid.Col>


                            </Grid>

                        </Paper>
                    </Tabs.Panel>

                </Tabs>
            </Stack>
        </Page>

    )
}

export default DetailSiswa