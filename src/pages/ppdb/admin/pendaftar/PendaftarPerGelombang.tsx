import {
    ActionIcon,
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
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

const PendaftarPerGelombang = () => {

    const dark = DarkTheme()
    const { gelombangId } = useParams()
    const [searchName, setSearchName] = useState("")
    const { tipeGelombang } = useParams()
    const navigate = useNavigate()

    const [pageSize, setPageSize] = useState(10)
    const [pageCount, setPageCount] = useState(1)
    // const [pageSize, setPageSize] = useState(10)

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


    const sampleSubmitData = (batchId: string) => {
        exportExcelMutation.mutate(batchId, {
            onSuccess: (response) => {
                console.log(response)
            },
            onError: (err) => console.log(err),
        });
    };

    const {
        data: student,
        isLoading: loadStudent,
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

    console.log(student)

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
            cell: (data,) => {
                const date = data?.row?.original?.tanggalMendaftar
                const formattedDate = new Date(date)
                return (
                    <span>
                        {!date ? "-" :
                            formattedDate.toLocaleDateString("id-ID", {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })
                        }
                    </span>
                )
            }
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: (data) => {
                const status = data.row.original.status as Status
                const valueStatus = statusValue[status]

                if (valueStatus) return (
                    <Badge size="lg" color={valueStatus.color} bg={!dark && "#dcfce2"}>{valueStatus.value}</Badge>
                )
                return "-"
            },
        },
        {
            id: "detail",
            header: "Detail",
            cell: (data) => {
                const userId = data.row.original.id
                return (
                    <Link
                        to={`/ppdb/main/pendaftar-ppdb/${tipeGelombang}/${gelombangId}/${userId}`}
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
            cell: (data) => {
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
                        )
                    }

                </Paper>
            </Stack>
        </Page>
    )
}

export default PendaftarPerGelombang


