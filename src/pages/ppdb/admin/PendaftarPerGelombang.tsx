import {
    Skeleton,
    ActionIcon,
    Box,
    Button,
    Group,
    Paper,
    Stack,
    Text,
    Title
} from "@mantine/core";
import {
    IconTrash
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { getGelombangById } from "../../../apis/gelombang/getGelombangById";
import { getAllStudentByBatchId } from "../../../apis/student/getAllStudentByBatchId";
import { getTotalPendaftarByBatch } from "../../../apis/total-pendaftar/getTotalPendaftarByBatch";
import DataTable from "../../../components/DataTable";
import Page from "../../../components/Page";
import PageLabel from "../../../components/PageLabel";
import { DarkTheme } from "../../../utils/darkTheme";

const PendaftarPerGelombang = () => {

    const dark = DarkTheme()
    const { gelombangId } = useParams()
    const [searchName, setSearchName] = useState("")

    const {
        data: totalPendaftar,
        isLoading: loadTotalPendaftar,
    } = useQuery({
        queryKey: ["get_total_pendaftar_batch"],
        queryFn: () => getTotalPendaftarByBatch(gelombangId)
    })

    const {
        data: student,
        isLoading: loadStudent,
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

    console.log(student)

    const students: {
        id: number,
        nama: string,
        noWa: string,
        tanggalMendaftar: string,
        status: string
    }[] = student?.data?.map(item => ({
        id: item?.id ?? 1,
        nama: item?.name ?? "-",
        noWa: item?.phone ?? "-",
        status: item?.status ?? "-",
        tanggalMendaftar: item?.registrationDate ?? "-"
    }))

    const filteredStudent = students?.filter(student => {
        return student.nama.toLowerCase().includes(searchName.toLowerCase())
    })

    const columns = [
        {
            accessorKey: "no",
            header: "No",
            accessorFn: (data, deps) => {
                return deps + 1;
            },
        },
        {
            accessorKey: "nama",
            header: "Nama",
            accessorFn: (data) => {
                return data.nama
            },
        },
        {
            accessorKey: "noWa",
            header: "No. Telepon",
            accessorFn: (data) => {
                return data.noWa
            },
        },
        {
            accessorKey: "tanggalMendaftar",
            header: "Tanggal Mendaftar",
            cell: (data, i) => {
                const tanggal = new Date(data?.row.original.tanggalMendaftar)
                return (
                    <span>
                        {tanggal.toLocaleDateString("id-ID", {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </span>
                )
            }
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: (data) => {
                const status = data.row.original.status
                if (status === "success") {
                    return <span className="text-green-500 font-bold py-1 px-4 bg-green-100 rounded-full">Dikonfirmasi</span>
                }
                if (status === "wait") {
                    return <span className="text-red-500 font-bold py-1 px-4 bg-red-100 rounded-full">Belum Dikonfirmasi</span>
                }
                return "-"
            },
        },
        {
            id: "detail",
            header: "Detail",
            cell: (data, i) => {
                const userId = data.row.original.id
                return (
                    <Link
                        to={`/ppdb/main/pendaftar-ppdb/${gelombangId}/${userId}`}
                        className="bg-blue-600 px-4 py-[3px] no-underline text-white rounded-full font-bold"
                    >
                        Detail
                    </Link>
                )
            }
        },
        {
            id: "aksi",
            header: "Aksi",
            cell: (data, i) => {
                const userId = data.row.original.id

                return (
                    <ActionIcon
                        color="red"
                        variant="filled"
                        onClick={() => console.log(userId)}
                    >
                        <IconTrash />
                    </ActionIcon>
                )
            }
        },
    ];

    return (
        <Page title="Seleksi Gelombang" >
            <PageLabel label="Seleksi Gelombang" />
            <Stack mt={20}>
                <Link
                    to={"/ppdb/main/pendaftar-ppdb"}
                    className="text-xl no-underline font-bold  flex  items-center gap-2 w-fit"
                >
                    <MdArrowBackIosNew color={`${dark ? "#5A45A4" : "#2A166F"}`} />
                    <Text color={`${dark ? "#5A45A4" : "#2A166F"}`}>Kembali</Text>
                </Link>

                <Paper withBorder p="md" radius="md" bg={"linear-gradient(to left bottom, #6952ba, #160942)"}>
                    <Box>
                        {loadGelombang ? (
                            <Skeleton height={35} w={400} />
                        ) : (
                            <Title c={"white"} order={2}>{gelombang?.data?.name}</Title>
                        )}
                    </Box>
                    <Box bg={`${dark ? "#1A1B1E" : "#FFFFFF"}`} sx={{ padding: "0.5rem 1.5rem", marginTop: "1rem", display: "flex", gap: "2rem", borderRadius: "10px" }}  >
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
                        <Button>Export Excel</Button>
                    </Group>
                    {
                        isErrorGetStudent ? (
                            <Text>{error.message}</Text>
                        ) : (

                            <DataTable
                                pagination={{
                                    pageIndex: 0,
                                    pageSize: 1000
                                }}
                                data={filteredStudent}
                                canExpand={() => true}
                                columns={columns}
                                useSearchInput={true}
                                noCard={true}
                                totalRecords={students?.length}
                                usePagination={false}
                                onSearch={(inputValue) => setSearchName(inputValue.toLowerCase())}
                            />
                        )
                    }

                </Paper>
            </Stack>
        </Page>
    )
}

export default PendaftarPerGelombang


