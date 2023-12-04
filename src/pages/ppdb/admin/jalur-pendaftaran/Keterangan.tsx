/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    Accordion,
    AccordionControlProps,
    ActionIcon,
    Box,
    Button,
    Center,
    Flex,
    Group,
    Modal,
    Paper,
    Text,
    Title,
    useMantineTheme
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import toast from "react-hot-toast"
import { AiFillEdit } from "react-icons/ai"
import { BsFillTrashFill } from "react-icons/bs"
import { useParams } from "react-router-dom"
import { CreateKeteranganPayload, createKeterangan } from "../../../../apis/informasi-umum/keterangan/createKeterangan"
import { DeleteKeteranganPayload, deleteKeterangan } from "../../../../apis/informasi-umum/keterangan/deleteKeterangan"
import { EditKeteranganPayload, editKeterangan } from "../../../../apis/informasi-umum/keterangan/editKeterangan"
import { InformmasiUmumKeterangan, getAllKeterangan } from "../../../../apis/informasi-umum/keterangan/getAllKeterangan"
import ModalKeteranganCreate from "../../../../components/modal/modalKeteranganCreate"
import ModalKeteranganEdit from "../../../../components/modal/modalKeteranganEdit"
import TiptapOutput from "../../../../components/ppdb/tiptapOutput"
import { DarkTheme } from "../../../../utils/darkTheme"

const Keterangan = () => {
    const dark = DarkTheme()
    const theme = useMantineTheme()
    const queryClient = useQueryClient();
    const { idJalurPendaftaran } = useParams()

    const [openedCreate, { open: openCreate, close: closeCreate }] = useDisclosure(false);
    const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);

    const [idKeterangan, setIdKeterangan] = useState(null)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const {
        data: keterangan,
    } = useQuery({
        queryKey: ["get_all_keterangan"],
        queryFn: () => getAllKeterangan(+idJalurPendaftaran)
    })

    const createKeteranganMutation = useMutation({ mutationFn: createKeterangan })
    const deleteKeteranganMutation = useMutation({mutationFn: deleteKeterangan})
    const editKeteranganMutation = useMutation({mutationFn: editKeterangan})

    const submitCreateKeterangan = (payload: CreateKeteranganPayload) => {
        createKeteranganMutation.mutate(payload, {
            onSuccess: (response) => {
                setName("");
                setDescription("");
                closeCreate();
                toast.success("Data berhasil ditambahkan");
                queryClient.invalidateQueries({ queryKey: ["get_all_keterangan"] });
            },
            onError: (err) => {
                // @ts-ignore
                const status = err?.response?.status;
                if (status === 400) {
                    toast.error("Data tidak boleh kosong");
                }
            },
        });
    };

    const submitDeleteAlur = (payload: DeleteKeteranganPayload) => {
        deleteKeteranganMutation.mutate(payload, {
            onSuccess: (response) => {
                setName("")
                setIdKeterangan(null)
                toast.success("Data berhasil dihapus");
                queryClient.invalidateQueries({ queryKey: ["get_all_keterangan"] });
                closeDelete()
            },
            onError: (err) => {
            },
        });
    };

    const submitEditKeterangan = (payload: EditKeteranganPayload) => {
        editKeteranganMutation.mutate(payload, {
            onSuccess: (response) => {
                setIdKeterangan(null)
                setName("");
                setDescription("");
                closeEdit();
                toast.success("Data berhasil diubah");
                queryClient.invalidateQueries({ queryKey: ["get_all_keterangan"] });
            },
            onError: (err) => {
                // @ts-ignore
                const status = err?.response?.status;
                if (status === 400) {
                    toast.error("Data tidak boleh kosong");
                }
            },
        });
    };

    function tambahKeteranganHandler() {
        const payload: CreateKeteranganPayload = {
            description: description,
            index: "1",
            name: name,
            path_id: +idJalurPendaftaran
        }
        submitCreateKeterangan(payload)
    }

    function deleteKeteranganHandler(id: number) {
        submitDeleteAlur({ id })
    }

    function editKeteranganHandler() {
        submitEditKeterangan({
            name,
            description,
            idKeterangan: idKeterangan,
            index: "1",
        })
    }

    function AccordionControl({
        propss,
        data,
    }: {
        propss: AccordionControlProps;
        data: InformmasiUmumKeterangan;
    }): JSX.Element {
        return (
            <Center>
                <Accordion.Control {...propss} className="font-bold" />
                <div
                    style={{
                        paddingInline: "16px",
                        display: "flex",
                        gap: "8px",
                    }}
                >
                    <ActionIcon
                        variant="filled"
                        className="bg-[#2A166F] hover:bg-[#2A166F]"
                        size={40}
                        radius={100}
                        onClick={() => {
                            openEdit()
                            setIdKeterangan(data.id)
                            setName(data.name)
                            setDescription(data.description)
                        }}
                    >
                        <AiFillEdit size={20} />
                    </ActionIcon>

                    <ActionIcon
                        variant="filled"
                        color="#2A166F"
                        className="bg-[#2A166F] hover:bg-[#2A166F]"
                        size={40}
                        radius={100}
                        onClick={() => {
                            openDelete()
                            setIdKeterangan(data.id)
                            setName(data.name)
                        }}
                    >
                        <BsFillTrashFill size={20} />
                    </ActionIcon>
                </div>
            </Center>
        );
    }


    return (
        <Box sx={{ flex: "1" }}>
            <Paper
                withBorder
                shadow="sm"
                radius={"4rem"}
                px={"2.5rem"}
                py={"1rem"}
                bg={dark ? theme.colors.dark[8] : "white"}
            >
                <Flex justify={"space-between"} align={"center"}>
                    <Text weight={"bold"} size={"xl"}>Keterangan</Text>
                    <Button onClick={openCreate}>Tambah</Button>
                </Flex>
            </Paper>

            {keterangan?.data && keterangan?.data?.length > 0 && (
                <Accordion multiple variant="separated" chevronPosition="left" mt={30} mb={50}>
                    {keterangan && keterangan.data.sort((a, b) => a.id - b.id).map((keterangan) => (
                        <Accordion.Item
                            mb={15}
                            key={keterangan.id}
                            value={keterangan.id.toString()}
                            sx={{
                                boxShadow: "0 4px 10px -6px black",
                                backgroundColor: `${dark ? theme.colors.dark[9] : "white"}`,
                                padding: "0.5rem 0.5rem",
                                border: "0.0625rem solid #dee2e6",
                                '&[data-active]': {
                                    backgroundColor: dark ? theme.colors.dark[9] : "white",
                                    border: "0.0625rem solid #dee2e6",
                                },
                            }}
                        >
                            <AccordionControl
                                propss={{
                                    id: "item.id.toString()",
                                    children: <Title order={3}>{keterangan.name}</Title>,
                                }}
                                data={keterangan}
                            />
                            <Accordion.Panel
                                sx={{
                                    borderTop: `1px solid ${dark ? "gray" : "#d9d9d9"}`,
                                }}
                            >
                                <TiptapOutput desc={keterangan.description} />
                            </Accordion.Panel>
                        </Accordion.Item>
                    ))}
                </Accordion>
            )}

            <ModalKeteranganCreate
                close={() => {
                    closeCreate()
                    setIdKeterangan(null)
                    setName("")
                    setDescription("")
                }}
                description={description}
                opened={openedCreate}
                setDescription={setDescription}
                setName={setName}
                tambahKeteranganHandler={tambahKeteranganHandler}
                titleModal="Tambah Keterangan"
                name={name}
                loading={createKeteranganMutation.status === "pending"}
            />

            <ModalKeteranganEdit
                close={() => {
                    closeEdit()
                    setIdKeterangan(null)
                    setName("")
                    setDescription("")
                }}
                description={description}
                editKeteranganHandler={editKeteranganHandler}
                name={name}
                opened={openedEdit}
                setDescription={setDescription}
                setName={setName}
                titleModal="Ubah Keterangan"
                loading={editKeteranganMutation.status === "pending"}
            />

            <Modal
                centered
                closeOnEscape={false}
                closeOnClickOutside={false}
                withCloseButton={false}
                opened={openedDelete}
                onClose={() => {
                    closeDelete()
                    setName("")
                    setIdKeterangan(null)
                }}
            >
                <Title order={3}>
                    Hapus keterangan
                </Title>
                <Text mt={20}>
                    Anda yakin ingin menghapus keterangan {name}
                </Text>
                <Group mt={20} position="right">
                    <Button
                        disabled={deleteKeteranganMutation.status === "pending"}
                        variant="outline"
                        onClick={() => {
                            closeDelete()
                            setName("")
                            setIdKeterangan(null)
                        }}
                    >
                        Batal
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => deleteKeteranganHandler(idKeterangan)}
                        loading={deleteKeteranganMutation.status === "pending"}
                    >
                        Hapus
                    </Button>
                </Group>
            </Modal>
        </Box>
    )
}

export default Keterangan