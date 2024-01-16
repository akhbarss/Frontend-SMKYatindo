import {
    Box,
    Divider,
    Grid,
    Group,
    Paper,
    Skeleton,
    Tabs,
    Text,
} from "@mantine/core";
import { useQuery } from '@tanstack/react-query';
import { HiMiniUserCircle } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { getAllGelombangPendaftar } from "../../../../apis/gelombang/getAllGelombangPendaftar";
import DataKosong from '../../../../components/ppdb/dataKosong';
import { DarkTheme } from '../../../../utils/darkTheme';

const PendaftarGelombangTPengembalian = () => {
    const dark = DarkTheme()

    const { data, isFetching } = useQuery({
        queryKey: ["get_all_gelombang_pendaftar" + "tipe_pengembalian"],
        queryFn: getAllGelombangPendaftar
    })

    const gelombangTipePengembalian = data?.data?.filter(batch => batch.type == "PENGEMBALIAN")
    const filterGelombangSMP = gelombangTipePengembalian?.filter(batch => batch.grade == "SMP")
    const filterGelombangSMK = gelombangTipePengembalian?.filter(batch => batch.grade == "SMK")

    return (
        <Tabs.Panel value="pengembalian" mt={40}>
            {isFetching ? (
                <Skeleton height={80} />
            ) : (
                <>
                    <Box>
                        <Text weight={"bolder"} fz={18}>SMP</Text>
                        <Divider mb={20} size={"xs"} />
                        {filterGelombangSMP?.length < 1
                            ? <DataKosong message='Data kosong' />
                            : filterGelombangSMP?.map(item => (
                                <Grid mt={20} key={item.id} >
                                    <Grid.Col md={6}>
                                        <Link
                                            to={`${item.id}`}
                                            className="drop-shadow-lg rounded-md no-underline text-black "
                                        >
                                            <Paper
                                                shadow="lg"
                                                sx={theme => ({
                                                    backgroundColor: dark ? theme.colors.dark[8] : theme.white,
                                                    padding: "1rem 1.5rem",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "start",
                                                    border: "0.0625rem solid #dee2e6",
                                                })}
                                            >
                                                <h1 className="text-xl  font-bold">
                                                    {item.name}
                                                </h1>
                                                <Group mt={10} >
                                                    <HiMiniUserCircle size={30} />
                                                    <Text >
                                                        {item.total} Pendaftar
                                                    </Text>
                                                </Group>
                                            </Paper>
                                        </Link>
                                    </Grid.Col>
                                </Grid>
                            ))
                        }
                    </Box>
                    <Box mt={40}>
                        <Text weight={"bolder"} fz={18}>SMK</Text>
                        <Divider mb={20} size={"xs"} />
                        {filterGelombangSMK?.length < 1
                            ? <DataKosong message='Data kosong' />
                            : filterGelombangSMK?.map(item => (
                                <Grid mt={20} key={item.id} >
                                    <Grid.Col md={6}>
                                        <Link
                                            to={`${item.id}`}
                                            className="drop-shadow-lg rounded-md no-underline text-black "
                                        >
                                            <Paper
                                                shadow="lg"
                                                sx={theme => ({
                                                    backgroundColor: dark ? theme.colors.dark[8] : theme.white,
                                                    padding: "1rem 1.5rem",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "start",
                                                    border: "0.0625rem solid #dee2e6",
                                                })}
                                            >
                                                <h1 className="text-xl  font-bold">
                                                    {item.name}
                                                </h1>
                                                <Group mt={10} >
                                                    <HiMiniUserCircle size={30} />
                                                    <Text >
                                                        {item.total} Pendaftar
                                                    </Text>
                                                </Group>
                                            </Paper>
                                        </Link>
                                    </Grid.Col>
                                </Grid>
                            ))
                        }
                    </Box>
                </>
            )}
        </Tabs.Panel>
    )
}

export default PendaftarGelombangTPengembalian