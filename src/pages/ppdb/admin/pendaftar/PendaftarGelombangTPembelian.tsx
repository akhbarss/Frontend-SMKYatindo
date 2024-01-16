import * as Mantine from "@mantine/core";
import { useQuery } from '@tanstack/react-query';
import { HiMiniUserCircle } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { getAllGelombangPendaftar } from "../../../../apis/gelombang/getAllGelombangPendaftar";
import DataKosong from '../../../../components/Result/DataKosong';
import { DarkTheme } from '../../../../utils/darkTheme';

const PendaftarGelombangTPembelian = () => {
    const dark = DarkTheme();

    const { data, isFetching } = useQuery({
        queryKey: ["get_all_gelombang_pendaftar" + "tipe_pembelian"],
        queryFn: getAllGelombangPendaftar
    })

    const gelombangTipePembelian = data?.data?.filter(batch => batch.type == "PEMBELIAN")
    const filterGelombangSMP = gelombangTipePembelian?.filter(batch => batch.grade == "SMP")
    const filterGelombangSMK = gelombangTipePembelian?.filter(batch => batch.grade == "SMK")

    return (
        <Mantine.Tabs.Panel value="pembelian" mt={40}>
            {isFetching ? (
                <Mantine.Skeleton height={80} />
            ) : (
                <>
                    <Mantine.Box>
                        <Mantine.Text weight={"bolder"} fz={18}>SMP</Mantine.Text>
                        <Mantine.Divider mb={20} size={"xs"} />
                        {filterGelombangSMP?.length < 1
                            ? <DataKosong message='Data kosong' />
                            : filterGelombangSMP?.map((item, index) => (
                                <Mantine.Grid mt={20} key={index} >
                                    <Mantine.Grid.Col md={6}>
                                        <Link
                                            to={`${item.id}`}
                                            className="drop-shadow-lg rounded-md no-underline text-black "
                                        >
                                            <Mantine.Paper
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
                                                <Mantine.Group mt={10} >
                                                    <HiMiniUserCircle size={30} />
                                                    <Mantine.Text >
                                                        {item.total} Pendaftar
                                                    </Mantine.Text>
                                                </Mantine.Group>
                                            </Mantine.Paper>
                                        </Link>
                                    </Mantine.Grid.Col>
                                </Mantine.Grid>
                            ))
                        }
                    </Mantine.Box>
                    <Mantine.Box mt={40}>
                        <Mantine.Text weight={"bolder"} fz={18}>SMK</Mantine.Text>
                        <Mantine.Divider mb={20} size={"xs"} />
                        {filterGelombangSMK?.length < 1
                            ? <DataKosong message='Data kosong' />
                            : filterGelombangSMK?.map(item => (
                                <Mantine.Grid mt={20} key={item.id} >
                                    <Mantine.Grid.Col md={6}>
                                        <Link
                                            to={`${item.id}`}
                                            className="drop-shadow-lg rounded-md no-underline text-black "
                                        >
                                            <Mantine.Paper
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
                                                <Mantine.Group mt={10} >
                                                    <HiMiniUserCircle size={30} />
                                                    <Mantine.Text >
                                                        {item.total} Pendaftar
                                                    </Mantine.Text>
                                                </Mantine.Group>
                                            </Mantine.Paper>
                                        </Link>
                                    </Mantine.Grid.Col>
                                </Mantine.Grid>
                            ))
                        }
                    </Mantine.Box>
                </>
            )}
        </Mantine.Tabs.Panel>
    )
}

export default PendaftarGelombangTPembelian