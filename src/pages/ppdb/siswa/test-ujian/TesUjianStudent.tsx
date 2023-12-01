import { useQuery } from '@tanstack/react-query'
import { CgNotes } from "react-icons/cg";
import Page from '../../../../components/Page'
import PageLabel from '../../../../components/PageLabel'
import {
    Badge,
    Modal,
    Stack,
    Text,
    Group,
    Button,
    Title,
    Box,

} from "@mantine/core"
import { getTesUjianStudent } from '../../../../apis/tes-ujian-student/getTesUjianStudent'
import { DarkTheme } from '../../../../utils/darkTheme'
import { Link, useNavigate } from 'react-router-dom'
import { modals } from '@mantine/modals'
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import DataKosong from '../../../../components/ppdb/dataKosong';

const TesUjianStudent = () => {
    const dark = DarkTheme()
    const navigate = useNavigate()
    const [opened, { close, open }] = useDisclosure()
    const [informasiCardUjian, setInformasiCardUjian] = useState({
        title: "",
        link: ""
    })

    const { data: allTesUjian } = useQuery({
        queryKey: ["get-test-ujian-student"],
        queryFn: getTesUjianStudent
    })

    const onChooseTesUjian = (title: string, link: string) => {
        setInformasiCardUjian({
            link,
            title
        })
        open()

        // const onAccept = () => {
        //     navigate(link, { replace: true, relative: "path" })
        // }

        // const onCancel = () => {
        //     modals.closeAll()
        // }

        // modals.openContextModal({
        //     modal: "createInformasi",
        //     innerProps: {
        //         onAccept,
        //         onCancel,
        //         modalBody: (
        //             <div>
        //                 <Text weight={"bold"} size={20}>Yakin ingin mengerjakan tes ujian {title}?</Text>
        //                 {/* <Text>Klik lanjutkan untuk mengerjakan tes ujian {title} di website ytdnetworkers.com/moodle</Text> */}
        //             </div>
        //         ),
        //     },
        // });
    }

    return (
        <>
            <Page title='Tes Ujian' >
                <PageLabel label='Tes Ujian' />
                <Stack mt={30} mx={"auto"} maw={"70rem"}>
                    {
                        allTesUjian && allTesUjian?.data?.length < 1
                            ? <DataKosong message='Belum ada tes ujian yang tersedia' />
                            : allTesUjian?.data?.map(ujian => {
                                const {
                                    id,
                                    title,
                                    startDate,
                                    endDate,
                                    link
                                } = ujian

                                const tanggalMulai = new Date(startDate);
                                const tanggalSelesai = new Date(endDate);
                                const waktuSekarang = new Date();

                                const isJalurDibuka =
                                    waktuSekarang >= tanggalMulai && waktuSekarang <= tanggalSelesai;

                                return (
                                    <Button
                                        key={id}
                                        unstyled
                                        disabled={!isJalurDibuka}
                                        onClick={() => onChooseTesUjian(title, link)}
                                        styles={(theme) => ({
                                            root: {
                                                borderColor: `${isJalurDibuka ? "#51CF66" : "red"}`,
                                                padding: "1rem",
                                                backgroundColor: `${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
                                                    }`,
                                                cursor: "pointer",
                                                color: theme.colorScheme === "dark" ? "white" : theme.colors.gray[9],
                                                borderRadius: "8px",
                                                outline: "none",
                                                "&:disabled": {
                                                    cursor: "not-allowed",
                                                    backgroundColor: `${dark ? theme.colors.dark[4] : "rgba(233, 233, 233, 1)"
                                                        }`,
                                                },
                                            },
                                            label: {
                                                justifyContent: "space-between",
                                                display: "flex",
                                                alignItems: "center",
                                            },
                                        })}
                                    >
                                        <Group>
                                            <CgNotes size={30} />

                                            <Box>
                                                <Title order={3} align="left" weight={"bolder"}>
                                                    {title}
                                                </Title>

                                                <Text align="left">
                                                    {new Date(startDate).toLocaleDateString("id-ID", {
                                                        day: "2-digit",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}{" "}
                                                    -{" "}
                                                    {new Date(endDate).toLocaleDateString("id-ID", {
                                                        day: "2-digit",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}
                                                </Text>
                                            </Box>
                                        </Group>

                                        <Badge
                                            variant="light"
                                            ml={20}
                                            color={`${isJalurDibuka ? "green" : "red"}`}
                                            size="lg"
                                        >
                                            {isJalurDibuka ? "Dibuka" : "Ditutup"}
                                        </Badge>
                                    </Button>
                                )
                            })
                    }
                </Stack>

                <Modal
                    opened={opened}
                    centered
                    withCloseButton={false}
                    closeOnClickOutside={false}
                    closeOnEscape={false}
                    onClose={() => {
                        close()
                    }}
                >
                    <Box>
                        <Text weight={"bold"} maw={400} mx={"auto"} align='center'>
                            Ingin mengerjakan tes ujian {informasiCardUjian?.title} ?
                        </Text>
                    </Box>
                    <Group mt={30} position='right'>
                        <Button color='red' variant='outline' onClick={() => {
                            close()
                            setInformasiCardUjian(null)
                        }}>
                            Batal
                        </Button>
                        <Button component={Link} to={informasiCardUjian?.link}>
                            Kerjakan Tes
                        </Button>
                    </Group>
                </Modal>
            </Page>
        </>
    )
}

export default TesUjianStudent