import {
    Text,
    Accordion,
    AccordionControlProps,
    ActionIcon,
    Box,
    Button,
    Center,
    Flex,
    Paper,
    Title
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

    const { idJalurPendaftaran } = useParams()

    const [openedCreate, { open: openCreate, close: closeCreate }] = useDisclosure(false);
    const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const queryClient = useQueryClient();

    const [idKeterangan, setIdKeterangan] = useState(null)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const {
        data: keterangan,
    } = useQuery({
        queryKey: ["get_all_keterangan"],
        queryFn: () => getAllKeterangan(+idJalurPendaftaran)
    })

    const createKeteranganMutation = useMutation({
        mutationFn: createKeterangan
    })

    const deleteKeteranganMutation = useMutation({
        mutationFn: deleteKeterangan
    })

    const editKeteranganMutation = useMutation({
        mutationFn: editKeterangan
    })

    const submitCreateKeterangan = (payload: CreateKeteranganPayload) => {
        createKeteranganMutation.mutate(payload, {
            onSuccess: (response) => {
                console.log("Success");
                console.log(response);
                setName("");
                setDescription("");
                closeCreate();
                queryClient.invalidateQueries({ queryKey: ["get_all_keterangan"] });
            },
            onError: (err) => {
                // @ts-ignore
                const status = err?.response?.status;

                if (status === 400) {
                    console.log("DATA TIDAK BOLEH KOSONG");
                    toast.error("Data tidak boleh kosong");
                }
            },
        });
    };

    const submitDeleteAlur = (payload: DeleteKeteranganPayload) => {
        deleteKeteranganMutation.mutate(payload, {
            onSuccess: (response) => {
                console.log(response);
                console.log("Success");
                queryClient.invalidateQueries({ queryKey: ["get_all_keterangan"] });
            },
            onError: (err) => {
                console.log("FAILED");
                console.log(err);
            },
        });
    };

    const submitEditKeterangan = (payload: EditKeteranganPayload) => {
        editKeteranganMutation.mutate(payload, {
            onSuccess: (response) => {
                console.log("Success");
                console.log(response);
                setName("");
                setDescription("");
                closeEdit();
                queryClient.invalidateQueries({ queryKey: ["get_all_keterangan"] });
                queryClient.invalidateQueries({ queryKey: ["get_all_keterangan"] });
                queryClient.invalidateQueries({ queryKey: ["get_all_keterangan"] });
            },
            onError: (err) => {
                // @ts-ignore
                const status = err?.response?.status;

                if (status === 400) {
                    console.log("DATA TIDAK BOLEH KOSONG");
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
                        onClick={() => deleteKeteranganHandler(data.id)}
                    >
                        <BsFillTrashFill size={20} />
                    </ActionIcon>
                </div>
            </Center>
        );
    }


    return (
        <Box
            sx={{
                flex: "1",
            }}
        >
            <Paper
                withBorder
                radius={"4rem"}
                px={"2.5rem"}
                sx={{ padding: "1rem" }}
            >
                <Flex justify={"space-between"} align={"center"}>
                    <Text weight={"bold"} size={"xl"}>Keterangan</Text>
                    <Button onClick={openCreate}>Tambah</Button>
                </Flex>
            </Paper>

            {keterangan?.data && keterangan?.data?.length > 0 && (
                <Accordion multiple variant="separated" chevronPosition="left" mt={30} mb={50}>
                    {keterangan && keterangan.data.map((keterangan) => (
                        <Accordion.Item
                            onClick={() => console.log(keterangan.description)}
                            key={keterangan.id}
                            value={keterangan.id.toString()}
                            sx={{
                                boxShadow: "0 4px 10px -6px black",
                                backgroundColor: `${dark ? "#25262B" : "white"}`,
                                padding: "0.5rem 0.5rem",
                            }}
                            styles={{
                                item: {
                                    backgroundColor: "blue",
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
                close={closeCreate}
                description={description}
                opened={openedCreate}
                setDescription={setDescription}
                setName={setName}
                tambahKeteranganHandler={tambahKeteranganHandler}
                titleModal="Tambah Keterangan"
                name={name}
            // createAlurMutation={}
            />

            <ModalKeteranganEdit
                close={() => {
                    closeEdit()
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
            />


        </Box>
    )
}

export default Keterangan