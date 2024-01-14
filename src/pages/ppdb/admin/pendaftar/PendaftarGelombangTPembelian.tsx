import React from 'react'
import {
    Text,
    Box,
    Tabs,
    Group,
    Skeleton,
    Paper,
    Grid,
    Divider

} from "@mantine/core"
import { Link } from 'react-router-dom'
import { getAllGelombangByTypeJalur } from '../../../../apis/gelombang/getAllGelombangByTypeJalur';
import { useQuery } from '@tanstack/react-query';
import DataKosong from '../../../../components/ppdb/dataKosong';
import { DarkTheme } from '../../../../utils/darkTheme';
import { HiMiniUserCircle } from 'react-icons/hi2';

const PendaftarGelombangTPembelian = () => {
    const dark = DarkTheme()

    const {
        data: gelombangByJalurPembelian,
        isLoading: loadGelPembelian
    } = useQuery({
        queryKey: ["get_all_gelombang_by_type_pembelian"],
        queryFn: () => getAllGelombangByTypeJalur("PEMBELIAN"),
    });

    const filterGelombangBySMP = gelombangByJalurPembelian?.data?.filter(gelombang => gelombang.grade === "SMP")?.sort((a, b) => a.id - b.id)
    const filterGelombangBySMK = gelombangByJalurPembelian?.data?.filter(gelombang => gelombang.grade === "SMK")?.sort((a, b) => a.id - b.id)

    return (
        <Tabs.Panel value="pembelian" mt={40}>
            {
                loadGelPembelian ? (
                    <Skeleton height={80} />
                ) : (
                    <>
                        {/* {
                            gelombangByJalurPembelian?.data?.length < 1 ? (
                                <DataKosong message="Data kosong" />
                            ) : ( */}
                        <>
                            <Box>
                                <Text weight={"bolder"} fz={18}>SMP</Text>
                                <Divider mb={20} size={"xs"} />
                                {filterGelombangBySMP?.length < 1
                                    ? <DataKosong message='Data kosong' />
                                    : filterGelombangBySMP?.map(item => (
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
                                                                {item.countStudent} Pendaftar
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
                                {filterGelombangBySMK?.length < 1
                                    ? <DataKosong message='Data kosong' />
                                    : filterGelombangBySMK?.map(item => (
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
                                                                {item.countStudent} Pendaftar
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
                        {/* )
                        } */}
                    </>
                )
            }
        </Tabs.Panel>
    )
}

export default PendaftarGelombangTPembelian