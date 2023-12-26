import {
    ActionIcon,
    Modal,
    Badge,
    Box,
    Button,
    Group,
    Paper,
    Skeleton,
    Stack,
    Text,
    Title
} from "@mantine/core";
import {
    IconTrash
} from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { getGelombangById } from "../../../../apis/gelombang/getGelombangById";
import { exportExcel } from "../../../../apis/student/exportExcel";
import { getAllStudentByBatchId } from "../../../../apis/student/getAllStudentByBatchId";
import { getTotalPendaftarByBatch } from "../../../../apis/total-pendaftar/getTotalPendaftarByBatch";
import DataTable from "../../../../components/DataTable";
import Page from "../../../../components/Page";
import PageLabel from "../../../../components/PageLabel";
import { Status } from "../../../../types/global";
import { DarkTheme } from "../../../../utils/darkTheme";
import { statusValue } from "../../../../utils/statusValue";
import toast from "react-hot-toast";
import { useDisclosure } from "@mantine/hooks";
import { deleteStudentFromBatch } from "../../../../apis/student/deleteStudentFromBatch";

type Student = {
    id: number;
    nama: string;
    noWa: string;
    tanggalMendaftar: number;
    status: Status
}

const PendaftarPerGelombang = () => {
    const dark = DarkTheme()
    const { gelombangId } = useParams()
    const { tipeGelombang } = useParams()
    const queryClient = useQueryClient()
    const [searchName, setSearchName] = useState("")
    const [openedModal, { close: closeModal, open: openModal }] = useDisclosure()
    const [pendaftar, setPenndaftar] = useState<{ id: number | null, name: string } | null>(null);

    const {
        data: totalPendaftar,
        isLoading: loadTotalPendaftar,
    } = useQuery({
        queryKey: ["get_total_pendaftar_batch"],
        queryFn: () => getTotalPendaftarByBatch(gelombangId)
    })

    const exportExcelMutation = useMutation({
        mutationFn: exportExcel
    })
    const deleteStudentFromBatchMutation = useMutation({
        mutationFn: deleteStudentFromBatch
    })

    const sampleSubmitData = (batchId: string) => {
        exportExcelMutation.mutate(batchId, {
            onSuccess: (response) => {
                toast.success("Success")
            },
            onError: (err) => toast.error("Gagal"),
        });
    };

    const {
        data: student,
        isFetching,
        isError: isErrorGetStudent,
        error
    } = useQuery({
        queryKey: ["get_all_student_by_batch_id"],
        queryFn: () => getAllStudentByBatchId(gelombangId)
    })

    const {
        data: gelombang,
        isLoading: loadGelombang
    } = useQuery({
        queryKey: ["get_gelombang_by_id"],
        queryFn: () => getGelombangById(gelombangId)
    })

    const deleteStudentFromBatchHandler = () => {
        if (pendaftar.id) {
            deleteStudentFromBatchMutation.mutate(pendaftar.id, {
                onSuccess: res => {
                    const mesg = res?.message
                    queryClient.invalidateQueries({ queryKey: ["get_all_student_by_batch_id"] })
                    closeModal()
                    if (mesg) {
                        toast.success(mesg)
                        return
                    }
                    toast.success("Success")
                },
                onError: error => {
                    const errMsg = error?.response?.data?.messages
                    if (errMsg) {
                        toast.error(errMsg)
                        return
                    }
                    toast.error("Data gagal dihapus")
                }
            })
        }
    }

    const totalData = student?.data?.totalElements
    const totalPages = student?.data?.totalPages
    const students: {
        id: number,
        nama: string,
        noWa: string,
        tanggalMendaftar: number | null,
        status: Status
    }[] = student?.data?.content?.map(item => ({
        id: item?.id ?? 1,
        nama: item?.name ?? "-",
        noWa: item?.phone ?? "-",
        status: item?.status ?? null,
        tanggalMendaftar: item?.registration_Date ?? null
    }))

    const filteredStatusStudent = students?.filter(student => {
        return student
        // uncomment the code below to display the appropriate status
        // return (student.status === "WAITING_PAYMENT" || student.status === "PAYMENT_CONFIRMED")
    })

    const filteredSearchStudent = filteredStatusStudent?.filter(student => {
        return student.nama.toLowerCase().includes(searchName.toLowerCase())
    })

    const columnHelper = createColumnHelper<Student>()

    const columns = [
        columnHelper.accessor(row => row.id, {
            id: 'Id',
            cell: (info) => info.row.index + 1,
            header: () => <span>ID</span>,
        }),
        columnHelper.accessor(row => row.nama, {
            id: 'Nama',
            cell: info => <span style={{ whiteSpace: "nowrap" }}>{info.getValue()}</span>,
            header: () => <span>Nama</span>,
        }),
        columnHelper.accessor(row => row.noWa, {
            id: 'No Telepon',
            cell: info => info.getValue(),
            header: () => <span>No. Telepon</span>,
        }),
        columnHelper.accessor(row => row.tanggalMendaftar, {
            id: 'Tanggal Mendaftar',
            cell: info => {
                const val = info.getValue()
                const formatDate = val && new Date(val)
                return !val ? "-" :
                    formatDate.toLocaleDateString("id-ID", {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })
            },
            header: () => <span style={{ whiteSpace: "nowrap" }}>Tanggal Mendaftar</span>,
        }),
        columnHelper.accessor(row => row.status, {
            id: 'Status',
            cell: info => {
                const val = info.getValue()
                const valueStatus = statusValue[val]
                if (valueStatus) return (
                    <Badge size="lg" color={valueStatus.color} bg={!dark && "#dcfce2"}>{valueStatus.value}</Badge>
                )
                return "-"
            },
            header: () => <span style={{ whiteSpace: "nowrap" }}>Status</span>,
        }),
        columnHelper.display({
            id: 'Detail',
            cell: info => {
                const userId = info.row.original.id
                return (
                    <Link
                        to={`/ppdb/main/pendaftar-ppdb/${tipeGelombang}/${gelombangId}/${userId}`}
                        className="bg-blue-600 px-4 py-[3px] no-underline text-white rounded-full font-bold"
                    >
                        Detail
                    </Link>
                )
            },
            header: () => <span >Detail</span>,
        }),
        columnHelper.display({
            id: 'Aksi',
            cell: (info) => {
                const pendaftar = info.row.original

                return (
                    <ActionIcon
                        color="red"
                        variant="filled"
                        onClick={() => {
                            if (pendaftar?.id && pendaftar?.nama) {
                                openModal()
                                setPenndaftar({ id: pendaftar?.id, name: pendaftar?.nama })
                            }
                        }}
                    >
                        <IconTrash />
                    </ActionIcon>
                )
            },
            header: () => <span >Aksi</span>,
        }),
    ];

    return (
        <Page title="Seleksi Gelombang" >
            <PageLabel label="Seleksi Gelombang" />
            <Stack mt={20}>
                {!isFetching && (
                    <Link
                        to={`/ppdb/main/pendaftar-ppdb/${tipeGelombang}`}
                        className="text-xl no-underline font-bold  flex  items-center gap-2 w-fit cursor-pointer"
                    >
                        <MdArrowBackIosNew color={`${dark ? "#9b87de" : "#2A166F"}`} />
                        <Text color={`${dark ? "#9b87de" : "#2A166F"}`}>Kembali</Text>
                    </Link>
                )}

                <Paper withBorder p="md" radius="md" bg={"linear-gradient(to left bottom, #6952ba, #160942)"}>
                    <Box>
                        {loadGelombang ? (
                            <Skeleton height={35} w={400} />
                        ) : (
                            <Title c={"white"} order={2}>{gelombang?.data?.name}</Title>
                        )}
                    </Box>
                    <Box
                        bg={`${dark ? "#1A1B1E" : "#FFFFFF"}`}
                        sx={{
                            padding: "0.5rem 1.5rem",
                            marginTop: "1rem",
                            display: "flex",
                            gap: "2rem",
                            borderRadius: "10px",
                        }}
                    >
                        <Box  >
                            <Text weight={"bold"} align="center" >Jumlah Pendaftar</Text>
                            {loadTotalPendaftar ? (
                                <Skeleton height={30} />
                            ) : (
                                <Text c={`${dark ? "white" : "black"}`} weight={"bold"} size={"xl"} align="center">{totalPendaftar?.data?.totalStudents} Orang</Text>
                            )}
                        </Box>
                        <Box  >
                            <Text weight={"bold"} align="center" >Jumlah Penerimaan</Text>
                            {loadTotalPendaftar ? (
                                <Skeleton height={30} />
                            ) : (
                                <Text c={`${dark ? "white" : "black"}`} weight={"bold"} size={"xl"} align="center">{gelombang?.data?.max_quota} Orang</Text>
                            )}
                        </Box>
                        <Box  >
                            <Text weight={"bold"} align="center" >Peserta Diterima</Text>
                            {loadTotalPendaftar ? (
                                <Skeleton height={30} />
                            ) : (
                                <Text c={`${dark ? "white" : "black"}`} weight={"bold"} size={"xl"} align="center">{totalPendaftar?.data?.studentAccepted} Orang</Text>
                            )}
                        </Box>
                    </Box>
                </Paper>

                <Paper withBorder p="md" radius="md">
                    <Group mb={20} >
                        <Text sx={{ flex: 1 }} size={"lg"} weight={500} mb={10}>
                            Data Pendaftar
                        </Text>
                        <Button onClick={() => sampleSubmitData(gelombangId)}>Export Excel</Button>
                    </Group>
                    {
                        isErrorGetStudent ? (
                            <Text>{error.message}</Text>
                        ) : (
                            <>
                                <DataTable
                                    data={filteredSearchStudent}
                                    canExpand={() => true}
                                    columns={columns}
                                    loading={isFetching}
                                    useSearchInput={true}
                                    noCard={true}
                                    usePagination={false}
                                    onSearch={(inputValue) => setSearchName(inputValue.toLowerCase())}
                                    totalRecords={totalData}
                                    pagination={{
                                        pageIndex: 0,
                                        pageSize: 1000,
                                    }}
                                    pageCount={totalPages}
                                />
                            </>
                        )
                    }
                </Paper>
            </Stack>
            <Modal
                centered
                closeOnClickOutside={false}
                closeOnEscape={false}
                withCloseButton={false}
                opened={openedModal}
                onClose={() => {
                    closeModal()
                    setPenndaftar(null)
                }}
                title={<Text fz={25} fw={600}>Hapus Pendaftar</Text>}
            >
                <Stack>
                    <Text>Anda yakin ingin menghapus pendaftar {pendaftar?.name}</Text>
                    <Group position="right" >
                        <Button variant="outline" onClick={closeModal}>
                            Batal
                        </Button>
                        <Button
                            color="red"
                            type="button"
                            loading={deleteStudentFromBatchMutation.status === "pending"}
                            onClick={() => deleteStudentFromBatchHandler()}
                        >
                            Hapus
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </Page>
    )
}

export default PendaftarPerGelombang


