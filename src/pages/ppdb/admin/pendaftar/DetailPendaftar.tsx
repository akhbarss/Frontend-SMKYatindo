/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    Avatar,
    Box,
    Flex,
    Paper,
    Skeleton,
    Stack,
    Tabs,
    Text,
    ThemeIcon
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { BsWhatsapp } from "react-icons/bs";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import { getStudent } from "../../../../apis/student/getStudent";
import Page from '../../../../components/Page';
import PageLabel from '../../../../components/PageLabel';
import { DarkTheme } from '../../../../utils/darkTheme';
import { statusValue } from "../../../../utils/statusValue";
import BiodataAdmin from "./BiodataAdmin";
import Pembayaran from "./Pembayaran";
import UbahPassword from "./UbahPassword";
import ProfilePicture from "../../../../components/ppdb/ProfilePicture";
import { convertToFileObject } from "../../../../utils/imageUtils";

interface TErrResponse extends Error {
    response: {
        status: string | object | number
    }
}

const DetailPendaftar = () => {
    const { userId, gelombangId, tipeGelombang } = useParams()
    const dark = DarkTheme()

    const studentQuery = useQuery({
        queryKey: ["get_student"],
        queryFn: () => getStudent({ userId }),
    })

    const {
        data: student,
        isError,
        error,
        isFetching,
    } = studentQuery

    const err = error as TErrResponse

    if (isError) return (
        <Paper p={"lg"}>
            <h1>{err?.response?.status === 400 ? "Pendaftar tidak ditemukan" : "Terjadi kesalahan"}</h1>
            <Link
                className="text-xl no-underline font-bold  flex  items-center gap-2 w-fit px-8 py-2 bg-black text-white rounded-full"
                to={`/ppdb/main/pendaftar-ppdb/${tipeGelombang}/${gelombangId}`}
            >
                Kembali
            </Link>
        </Paper>
    )

    const profilePictureName = student?.data?.profile_picture
    const name = student?.data.name
    const formattedName = name
        ?.split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');

    const status = statusValue[student?.data?.status]
    const unformattedTanggalMendaftar = new Date(student?.data?.registrationDate)
    // @ts-ignore
    const formattedTanggalMendaftar = !isNaN(unformattedTanggalMendaftar) ? unformattedTanggalMendaftar.toLocaleDateString("id-ID", {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }) : "Tanggal tidak valid"


    return (
        <Page title='Detail Informasi Pendaftar' key={student?.data.id}>
            <Stack className="max-w-[60rem] mx-auto">
                <PageLabel label='Detail Informasi Pendaftar' />

                {!isFetching && (
                    <Link
                        to={`/ppdb/main/pendaftar-ppdb/${tipeGelombang}/${gelombangId}`}
                        className="text-xl no-underline font-bold  flex  items-center gap-2 w-fit "

                    >
                        <MdArrowBackIosNew color={`${dark ? "#9b87de" : "#2A166F"}`} />
                        <Text color={`${dark ? "#9b87de" : "#2A166F"}`}>Kembali</Text>
                    </Link>
                )}

                <Flex
                    mt={40}
                    p={"lg"}
                    direction={{ base: 'column', sm: 'row' }}
                    gap={{ base: '2rem', sm: '5rem' }}
                    align={"center"}
                >
                    {isFetching ? (
                        <Skeleton circle height={200} />
                    ) : profilePictureName ? (
                        <>
                            <ProfilePicture
                                img={profilePictureName}
                            />
                        </>
                    ) : (
                        <Avatar size={220} color="cyan" sx={{ border: "3px solid grey" }} radius={"100%"}>{formattedName}</Avatar>
                    )}

                    <Box sx={{ flex: 1 }} className="flex flex-col gap-4" key={student?.data.id}>
                        <Paper
                            w={"100%"}
                            withBorder
                            p={"lg"}
                            shadow="lg"
                            bg={"linear-gradient(to left bottom, #6952ba, #160942)"}
                        >
                            <Skeleton visible={isFetching}>
                                <Text className="select-all" c={"white"} size={24} weight={"bolder"}>{student?.data.name}</Text>
                                <Box w={"fit-content"} mt={10} target="_blank" component={Link} to={`https://wa.me/${student?.data?.phone}?text=Halo%20nak`} className='flex items-center no-underline gap-[10px]'>
                                    <ThemeIcon size={30} radius={"lg"} color='green'>
                                        <BsWhatsapp />
                                    </ThemeIcon>
                                    <Text size={"xl"} c='teal' weight={"bold"}>{student?.data?.phone}</Text>
                                </Box>
                                <Text mt={10} className="select-all" c='white' weight={"bold"}>{student?.data.address}</Text>
                            </Skeleton>
                        </Paper>
                        <Paper
                            withBorder
                            p={"lg"}
                            shadow="lg"
                            bg={"linear-gradient(to left bottom, #6952ba, #160942)"}
                        >
                            <Skeleton visible={isFetching}>
                                <Text sx={theme => ({ color: theme.colors.gray[3] })} weight={"bold"}>Status</Text>
                                <Text color='white' weight={"bold"} size={"xl"}>{status?.value}</Text>
                                <Text sx={theme => ({ color: theme.colors.gray[3] })} mt={25} weight={"bold"}>Tanggal Mendaftar</Text>
                                <Text size={"xl"} color='white' weight={"bold"}>{formattedTanggalMendaftar}</Text>
                            </Skeleton>
                        </Paper>
                    </Box>
                </Flex>

                <Tabs
                    defaultValue="pembayaran"
                    styles={{
                        tabLabel: {
                            fontSize: "20px"
                        }
                    }}
                >
                    <Tabs.List>
                        <Tabs.Tab value="pembayaran">Pembayaran</Tabs.Tab>
                        <Tabs.Tab value="biodata">Biodata</Tabs.Tab>
                        <Tabs.Tab value="ubah_password">Ubah Password</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="pembayaran" mt={30}>
                        <Pembayaran />
                    </Tabs.Panel>

                    <Tabs.Panel value="biodata" mt={30}>
                        <BiodataAdmin studentQuery={studentQuery} />
                    </Tabs.Panel>

                    <Tabs.Panel value="ubah_password" mt={30}>
                        <UbahPassword />
                    </Tabs.Panel>

                </Tabs>
            </Stack>
        </Page>

    )
}

export default DetailPendaftar