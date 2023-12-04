import {
    Badge,
    Box,
    ActionIcon,
    Button,
    Group,
    Menu,
    Modal,
    Paper,
    Text,
    ThemeIcon,
    Title
} from "@mantine/core";
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from "react-hot-toast";
import { IoDocumentText, IoEllipsisVertical } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { CreateTesUjianPayload, createTestUjian } from "../apis/test-ujian/createTestUjian";
import { DeleteTesUjianPayload, deleteTesUjian } from "../apis/test-ujian/deleteTesUjian";
import { EditTesUjianPayload, editTesUjian } from "../apis/test-ujian/editTesUjian";
import { getTestUjian } from '../apis/test-ujian/getTestUjian';
import ModalTestUjian from './modal/modalTestUjian';

type TypeTestUjianAdmin = {
    idGelombang: number;
}

export type FormValuesTesUjianAdmin = {
    id: number | null;
    nama: string;
    link: string;
    waktuDibuka: string;
    waktuDitutup: string;
}

const TestUjianAdmin: React.FC<TypeTestUjianAdmin> = ({ idGelombang }) => {
    // const queryClient = new QueryClient()
    const [openedCreateTestUjian, { open: openCreateTestUjian, close: closeCreateTestUjian }] = useDisclosure(false);
    const [openedEditTestUjian, { open: openEditTestUjian, close: closeEditTestUjian }] = useDisclosure(false);
    const [openedDeleteTestUjian, { open: openDeleteTestUjian, close: closeDeleteTestUjian }] = useDisclosure(false);

    const formTesUjian = useForm<FormValuesTesUjianAdmin>({
        initialValues: {
            id: null,
            link: "",
            nama: "",
            waktuDibuka: null,
            waktuDitutup: null
        },
        transformValues: (values) => ({
            ...values,
            waktuDibuka: (values.waktuDibuka as unknown as Date).toISOString(),
            waktuDitutup: (values.waktuDitutup as unknown as Date).toISOString(),
        }),
        validate: {
            waktuDibuka: (val) => (val === null ? 'Tolong masukkan waktu dibuka' : null),
            waktuDitutup: (val) => (val === null ? 'Tolong masukkan waktu ditutup' : null),
        },
    })

    const {
        data: testUjian,
        // isLoading,
        refetch,
    } = useQuery({
        queryKey: ["get_test_ujian" + idGelombang],
        queryFn: () => getTestUjian(idGelombang)
    })

    const createTesUjianMutation = useMutation({ mutationFn: createTestUjian })
    const deleteTesUjianMutation = useMutation({ mutationFn: deleteTesUjian })
    const editTesUjianMutation = useMutation({ mutationFn: editTesUjian })

    function submitCreateTesUjian(payload: CreateTesUjianPayload) {
        createTesUjianMutation.mutate(payload, {
            onSuccess: () => {
                refetch()
                toast.success("Data berhasil ditambahkan")
                closeCreateTestUjian()
                formTesUjian.reset()
            },
            onError: () => {
                toast.error("Data gagal ditambahkan")
            }
        })
    }
    function createTesUjianHandler(data: FormValuesTesUjianAdmin) {
        const { link, nama, waktuDibuka, waktuDitutup } = data
        submitCreateTesUjian({
            link,
            title: nama,
            // for_major: "TAV",
            batchId: idGelombang,
            endDate: waktuDitutup,
            startDate: waktuDibuka,
        })
    }

    function submitEditTesUjian(payload: EditTesUjianPayload) {
        editTesUjianMutation.mutate(payload, {
            onSuccess: () => {
                refetch()
                closeEditTestUjian()
                toast.success("Data berhasil diubah")
                formTesUjian.reset()
            },
            onError: () => {
                toast.error("Data gagal diubah")
            }
        })
    }
    function editTesUjianHandler(data: FormValuesTesUjianAdmin) {
        const { link, nama, waktuDibuka, waktuDitutup, id } = data
        submitEditTesUjian({
            id,
            link,
            title: nama,
            endDate: waktuDitutup,
            startDate: waktuDibuka,
        })
    }


    function submitDeleteTesUjian(payload: DeleteTesUjianPayload) {
        deleteTesUjianMutation.mutate(payload, {
            onSuccess: () => {
                refetch()
                toast.success("Data berhasil dihapus")
                closeDeleteTestUjian()
                formTesUjian.reset()
            },
            onError: () => {
                toast.error("Gagal menghapus data")
            }
        })
    }

    return (
        <>
            {testUjian?.data && testUjian?.data.sort((a, b) => a.id - b.id).map((test, index) => {
                const startDate = test?.startDate ? new Date(test?.startDate) : null
                const endDate = test?.endDate ? new Date(test?.endDate) : null
                const dateNow = new Date()
                const isTestUjianDibuka = dateNow >= startDate && startDate <= endDate

                const formatStartDate = startDate ? startDate.toLocaleDateString("id-ID", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }).replace(".", ":").split(" pukul") : "Invalid Date"

                const formatEndDate = endDate ? endDate.toLocaleDateString("id-ID", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }).replace(".", ":").split(" pukul") : "Invalid Date"

                return (
                    <Paper
                        key={test?.id ? test.id : index}
                        withBorder
                        p={"1rem"}
                        sx={theme => ({
                            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors["brand-smp"][0],
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        })}
                    >
                        <Group align='start' w={"100%"} >
                            <Group sx={{ flex: 2 }}>

                                <ThemeIcon radius={"100%"} size={50} mx={"sm"}>
                                    <IoDocumentText size={30} />
                                </ThemeIcon>
                                <Box sx={{ flex: 2 }}>
                                    <Text size={16} weight={"bolder"} >{test.title}</Text>
                                    <Text>{formatStartDate} &ndash; {formatEndDate}</Text>
                                    <Text>Link Tes Online : <Text target='_blank' c={"blue"} component={Link} to={test.link && test.link}>{test.link && test.link}</Text></Text>
                                </Box>
                            </Group>
                            <Group>
                                <Badge
                                    variant="light"
                                    color={`${isTestUjianDibuka ? "green" : "red"}`}
                                    size="lg"
                                >
                                    {isTestUjianDibuka ? "Dibuka" : "Ditutup"}
                                </Badge>
                                <Menu
                                    withArrow
                                    width={100}
                                    position="left-start"
                                    onOpen={() => {
                                        formTesUjian.setValues({
                                            id: test.id,
                                            nama: test.title,
                                        })
                                    }}
                                    onClose={() => {
                                        console.log("close")
                                    }}
                                >
                                    <Menu.Target>
                                        <ActionIcon variant="transparent">
                                            <IoEllipsisVertical size={30} />
                                        </ActionIcon>
                                    </Menu.Target>

                                    <Menu.Dropdown >
                                        <Menu.Item onClick={() => {
                                            openEditTestUjian()
                                            formTesUjian.setValues({
                                                id: test.id,
                                                nama: test.title,
                                                // @ts-ignore
                                                waktuDibuka: startDate,
                                                // @ts-ignore
                                                waktuDitutup: endDate,
                                                link: test.link
                                            })
                                        }}>
                                            Edit
                                        </Menu.Item>
                                        <Menu.Item
                                            onClick={() => {
                                                openDeleteTestUjian()
                                            }}
                                        >
                                            Delete
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Group>
                        </Group>
                    </Paper>
                )
            })}

            <Button onClick={() => openCreateTestUjian()}>
                Tambah Ujian
            </Button>


            {/* MODAL CREATE TEST UJIAN */}
            <ModalTestUjian
                formMantine={formTesUjian}
                action={{
                    label: "Tambah",
                    actionFn: createTesUjianHandler
                }}
                close={() => {
                    closeCreateTestUjian()
                    formTesUjian.reset()
                }}
                loading={createTesUjianMutation.status === "pending"}
                opened={openedCreateTestUjian}
                title="Tambah Tes Ujian"
            />

            {/* MODAL EDIT TEST UJIAN */}
            <ModalTestUjian
                formMantine={formTesUjian}
                action={{
                    label: "Ubah",
                    actionFn: editTesUjianHandler
                }}
                close={() => {
                    closeEditTestUjian()
                    formTesUjian.reset()
                }}
                loading={editTesUjianMutation.status === "pending"}
                opened={openedEditTestUjian}
                title="Ubah Tes Ujian"
            />

            {/* MODAL DELETE GELOMBANG */}
            <Modal
                centered
                closeOnEscape={false}
                closeOnClickOutside={false}
                withCloseButton={false}
                opened={openedDeleteTestUjian}
                onClose={() => {
                    closeDeleteTestUjian()
                    formTesUjian.reset()
                }}
            >
                <Title order={3}>
                    Hapus Tes Ujian
                </Title>
                <Text mt={20}>
                    Anda yakin ingin menghapus tes ujian {formTesUjian.values.nama}?
                </Text>
                <Group mt={20} position="right">
                    <Button
                        disabled={deleteTesUjianMutation.status === "pending"}
                        variant="outline"
                        onClick={() => {
                            closeDeleteTestUjian()
                            formTesUjian.reset()
                        }}
                    >
                        Batal
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => submitDeleteTesUjian({ id: formTesUjian.values.id })}
                        loading={deleteTesUjianMutation.status === "pending"}
                    >
                        Hapus
                    </Button>
                </Group>
            </Modal>

        </>
    )
}

export default TestUjianAdmin