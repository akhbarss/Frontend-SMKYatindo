import {
    IconTrash
} from "@tabler/icons-react";
import {
    Anchor,
    Box,
    ActionIcon,
    Flex,
    Paper,
    Stack,
    Text,
    Title
} from "@mantine/core"
import { MdArrowBackIosNew } from "react-icons/md"
import { Link, useParams } from "react-router-dom"
import DataTable from "../../../components/DataTable"
import { useMemo } from "react"
import { randomId, } from "@mantine/hooks";

const PendaftarPerGelombang = () => {

    const { gelombangId } = useParams()

    const columns = useMemo(() => {
        return [
            {
                id: "No",
                header: "No",
                accessorFn: (data, deps) => {
                    return deps + 1;
                },
            },
            {
                id: "Nama",
                header: "Nama",
                accessorFn: (data) => {
                    return data.nama
                },
            },
            {
                id: "No. Telepon",
                header: "No. Telepon",
                accessorFn: (data) => {
                    return data.noWa
                },
            },
            {
                id: "Tanggal Mendaftar",
                header: "Tanggal Mendaftar",
                accessorFn: (data) => {
                    return data.tanggalMendaftar
                },
            },
            {
                id: "Status",
                header: "Status",
                accessorFn: (data) => {
                    return data.status
                },
            },
            {
                id: "Detail",
                header: "Detail",
                cell: (data, i) => {
                    console.log(data.row.original.id)
                    console.log(i)
                    const userId = data.row.original.id

                    return (
                        <Link
                            to={`/ppdb/main/pendaftar-ppdb/${gelombangId}/${userId}`}
                            className="bg-blue-600 px-4 py-[3px] no-underline text-white rounded-full"
                        >
                            Detail
                        </Link>
                    )
                }
            },
            {
                id: "Aksi",
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
    }, []);

    const student = []

    for (let i = 1; i <= 20; i++) {
        const studentData = {
            id: i,
            nama: randomId(),
            noWa: `0821109772140%${i}`,
            tanggalMendaftar: `${i} Jan 2023`,
            status: "menunggu",
        }

        student.push(studentData)
    }


    return (
        <Stack>
            <Link
                to={"/ppdb/main/pendaftar-ppdb"}
                className="text-xl no-underline font-bold text-[#2A166F] flex  items-center gap-2 w-fit"
            >
                <MdArrowBackIosNew /> Kembali
            </Link>
            <Paper withBorder p="md" radius="md">
                <Box>
                    <Title order={2}>PEMBELIAN FORMULIR</Title>
                </Box>
                <Box sx={{ backgroundColor: "#F8F9FA", padding: "0.5rem", marginTop: "1rem", display: "flex", gap: "2rem" }} >
                    <Box  >
                        <Text weight={"bold"} align="center" color="gray">Jumlah Pendaftar</Text>
                        <Text weight={"bold"} size={"xl"} align="center">260 Orang</Text>
                    </Box>
                    <Box  >
                        <Text weight={"bold"} align="center" color="gray">Jumlah Penerimaan</Text>
                        <Text weight={"bold"} size={"xl"} align="center">260 Orang</Text>
                    </Box>
                    <Box  >
                        <Text weight={"bold"} align="center" color="gray">Peserta Diterima</Text>
                        <Text weight={"bold"} size={"xl"} align="center">260 Orang</Text>
                    </Box>

                </Box>
            </Paper>


            <Paper withBorder p="md" radius="md">
                <Flex justify={"space-between"} align={"center"}>
                    <Text size={"lg"} weight={500} mb={10}>
                        Data Pendaftar
                    </Text>
                    <Anchor href="https://mantine.dev/" target="_blank" size={"sm"}>
                        Lihat Semua
                    </Anchor>
                </Flex>
                <DataTable
                    data={student}
                    columns={columns}
                    useSearchInput={true}
                    noCard={true}
                />
            </Paper>

        </Stack>
    )
}

export default PendaftarPerGelombang