/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    ActionIcon,
    Box,
    Button,
    Group,
    Modal,
    Skeleton,
    Stack,
    Tabs,
    Text,
    Title
} from "@mantine/core";
import { useForm as useFormMantine } from "@mantine/form";
import { useDisclosure } from '@mantine/hooks';
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CreateJalurPayload, TipeJalur, createJalur } from "../../../../apis/jalur/createJalur";
import { DeleteJalurPayload, deleteJalur } from "../../../../apis/jalur/deleteJalur";
import { EditJalurPayload, editJalur } from "../../../../apis/jalur/editJalur";
import { getAllJalurPendaftaran } from "../../../../apis/jalur/getJalur";
import ModalJalurAdmin from '../../../../components/modal/modalJalurAdmin';
import DataKosong from '../../../../components/ppdb/dataKosong';
import { DarkTheme } from "../../../../utils/darkTheme";
import { FormValuesCreateJalur } from "./JalurPendaftaranAdmin";

const JalurPendaftaranAdminSMK = () => {
    const dark = DarkTheme()
    const [openedCreate, { open: openCreate, close: closeCreate }] = useDisclosure(false);
    const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);

    const formCreateMantine = useFormMantine<FormValuesCreateJalur>({
        initialValues: {
            id: null,
            namaJalur: "",
            waktuDibuka: null,
            waktuDitutup: null,
            tipeJalur: "",
            biayaPendaftaran: null
        },
        transformValues: (values) => ({
            ...values,
            biayaPendaftaran: +(values.biayaPendaftaran as unknown as string).substring(4).replace(/\./g, ""),
            waktuDibuka: (values.waktuDibuka as unknown as Date).toISOString(),
            waktuDitutup: (values.waktuDitutup as unknown as Date).toISOString(),
        }),
        validate: {
            waktuDibuka: (val) => (val === null ? 'Tolong masukkan waktu dibuka' : null),
            waktuDitutup: (val) => (val === null ? 'Tolong masukkan waktu ditutup' : null),
        },
    })


    const {
        data: dataJalur,
        isError: isErr,
        isLoading: load,
        refetch,
    } = useQuery({
        queryKey: ["get-all-jalur-pendaftaran" + "SMK"],
        queryFn: () => getAllJalurPendaftaran("SMK")
    })

    const createJalurMutation = useMutation({
        mutationFn: createJalur
    })

    const deleteJalurMutation = useMutation({
        mutationFn: deleteJalur
    })

    const editJalurMutation = useMutation({
        mutationFn: editJalur
    })

    if (isErr) return <h1>Terjadi Kesalahan</h1>

    function submitCreateJalur(payload: CreateJalurPayload) {
        createJalurMutation.mutate(payload, {
            onSuccess: () => {
                refetch()
                closeCreate()
                toast.success("Data berhasil ditambahkan")
                formCreateMantine.reset()
            },
            onError: (error) => {
                const errMsg = error?.response?.data?.messages
                if (errMsg) {
                    toast.error(errMsg)
                    return
                }
                toast.error("Data gagal ditambahkan")
            },
        })
    }

    function submitEditJalur(payload: EditJalurPayload) {
        editJalurMutation.mutate(payload, {
            onSuccess: (response) => {
                formCreateMantine.reset()
                closeEdit()
                refetch()
                toast.success("Data berhasil diubah")
            },
            onError: (error) => {
                const errMsg = error?.response?.data?.messages
                if (errMsg) {
                    toast.error(errMsg)
                    return
                }
                toast.error("Data gagal diubah")
            },
        })
    }

    function submitDeleteJalur(payload: DeleteJalurPayload) {
        deleteJalurMutation.mutate(payload, {
            onSuccess: () => {
                closeDelete()
                toast.success("Data berhasil dihapus")
                formCreateMantine.reset()
                refetch()
            },
            onError: (error) => {
                const errMsg = error?.response?.data?.messages
                if (errMsg) {
                    toast.error(errMsg)
                    return
                }
                toast.error("Data gagal dihapus")
            },
        })
    }

    function tambahJalurHandler(datas: FormValuesCreateJalur) {
        const data: CreateJalurPayload = {
            name: datas.namaJalur,
            type: datas.tipeJalur as TipeJalur,
            end_date: datas.waktuDitutup,
            price: datas.biayaPendaftaran,
            start_date: datas.waktuDibuka,
            grade: "SMK"
        }
        submitCreateJalur(data)
    }

    function deleteJalurHandler(id: number) {
        submitDeleteJalur({ id })
    }

    function editJalurHandler(datas: FormValuesCreateJalur) {
        submitEditJalur({
            id: datas.id,
            end_date: datas.waktuDitutup,
            name: datas.namaJalur,
            price: datas.biayaPendaftaran,
            start_date: datas.waktuDibuka,
            type: datas.tipeJalur as TipeJalur
        })
    }

    const contentJalurBackend = dataJalur && dataJalur?.data?.length > 0 ? dataJalur?.data?.sort((a, b) => a.id - b.id)?.map(item => {
        const {
            end_date,
            id,
            name,
            price,
            start_date,
            type,
        } = item
        const starDate = new Date(start_date)
        const endDate = new Date(end_date)
        return (
            <Box
                key={item.id}
                sx={theme => ({
                    borderRadius: "6px",
                    boxShadow: "0 5px 10px -5px black",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: `${dark ? theme.colors.dark[9] : "white"}`,
                    border: "0.0625rem solid #dee2e6"
                })}
            >
                <Link
                    className="flex-[1] no-underline p-[16px] "
                    to={`${item.id}/gelombang`}
                >
                    <Text size={"xl"} weight={"bold"} sx={{
                        color: `${dark ? "white" : "black"}`
                    }}>
                        {item.name}
                    </Text>
                    <Group>

                        <Text c={dark ? "#9E9EFF" : "#2A166F"}>
                            {starDate !== null && starDate.toLocaleDateString("id-ID", {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                            })} &ndash; {endDate !== null && endDate.toLocaleDateString("id-ID", {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            })}
                        </Text>
                        <Text color="white">
                            {item?.countStudent ? item.countStudent : 0} Pendaftar
                        </Text>
                    </Group>
                </Link>
                <div className="px-4 flex gap-2 ">
                    {/* EDIT BUTTON */}
                    <ActionIcon
                        variant="filled"
                        color="brand-yatindo"
                        size={40}
                        radius={100}
                        onClick={() => {
                            openEdit()
                            formCreateMantine.setValues({
                                id,
                                // @ts-ignore
                                biayaPendaftaran: "Rp. " + price,
                                namaJalur: name,
                                tipeJalur: type,
                                // @ts-ignore
                                waktuDibuka: starDate,
                                // @ts-ignore
                                waktuDitutup: endDate
                            })
                        }}
                    >
                        <AiFillEdit size={20} />
                    </ActionIcon>
                    {/* DELETE BUTTON */}
                    <ActionIcon
                        variant="filled"
                        color="brand-yatindo"
                        size={40}
                        radius={100}
                        onClick={() => {
                            openDelete()
                            formCreateMantine.setValues({
                                id,
                                namaJalur: name
                            })
                        }}
                    >
                        <BsFillTrashFill size={20} />
                    </ActionIcon>
                </div>
            </Box>
        )
    }) : (
        <DataKosong message="Data kosong" />
    )

    return (
        <>
            <Tabs.Panel value='smk'>
                <Stack mt={40} spacing={"2rem"} className={"style-box max-w-[70rem] mx-auto"} >
                    <Button onClick={() => openCreate()}>
                        Tambah
                    </Button>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                            paddingBottom: "40px",
                        }}
                    >
                        {load ? <Skeleton height={80} /> : contentJalurBackend}
                    </Box>

                    <ModalJalurAdmin
                        action={{
                            actionFn: tambahJalurHandler,
                            label: "Tambah"
                        }}
                        close={() => {
                            closeCreate()
                            formCreateMantine.reset()
                        }}
                        formMantine={formCreateMantine}
                        loading={createJalurMutation.status === "pending"}
                        opened={openedCreate}
                        title="Tambah Jalur Pendaftaran"
                    />

                    <ModalJalurAdmin
                        action={{
                            actionFn: editJalurHandler,
                            label: "Ubah"
                        }}
                        close={() => {
                            closeEdit()
                            formCreateMantine.reset()
                        }}
                        formMantine={formCreateMantine}
                        loading={createJalurMutation.status === "pending"}
                        opened={openedEdit}
                        title="Ubah Jalur Pendaftaran"
                    />

                    <Modal
                        centered
                        closeOnEscape={false}
                        closeOnClickOutside={false}
                        withCloseButton={false}
                        opened={openedDelete}
                        onClose={() => {
                            closeDelete()
                            formCreateMantine.reset()
                        }}
                    >
                        <Title order={3}>
                            Hapus Jalur Pendaftaran
                        </Title>
                        <Text mt={20}>
                            Anda yakin ingin menghapus jalur pendaftaran {formCreateMantine.values.namaJalur}?
                        </Text>
                        <Group mt={20} position="right">
                            <Button
                                disabled={deleteJalurMutation.status === "pending"}
                                variant="outline"
                                onClick={() => {
                                    closeDelete()
                                    formCreateMantine.reset()
                                }}
                            >
                                Batal
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => deleteJalurHandler(formCreateMantine.values.id)}
                                loading={deleteJalurMutation.status === "pending"}
                            >
                                Hapus
                            </Button>
                        </Group>
                    </Modal>
                </Stack>
            </Tabs.Panel>
        </>
    )
}

export default JalurPendaftaranAdminSMK