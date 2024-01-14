import {
    Box,
    Paper,
    Stack,
    Tabs,
    Text
} from "@mantine/core";
import { JalurPendaftaranPPDB } from "../../../types/global";
import Transaksi from "./Transaksi";
import Biodata from './biodata';
import CetakKartu from "./cetakKartu";
import JalurPengembalian from "./jalurPengembalian";
import PilihJurusan from "./pilihJurusan";

const TabsContentPengembalian = ({
    pilihanGelombang,
    focus,
    setFocus,
    setPilihanGelombang,
    activeTabIndex,
    setActiveTabIndex,
    konfirmasiPembelian,
    setKonfirmasiPembelian,
    konfirmasiPembayaran,
    setKonfirmasiPembayaran,
    load,
    setLoad

}: {
    // tabs list
    activeTabIndex: number
    setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>

    // gelombang
    focus: string
    setFocus: React.Dispatch<React.SetStateAction<string>>
    pilihanGelombang: JalurPendaftaranPPDB | null
    setPilihanGelombang: React.Dispatch<React.SetStateAction<JalurPendaftaranPPDB | null>>

    // pembelian formulir
    konfirmasiPembelian: boolean
    setKonfirmasiPembelian: React.Dispatch<React.SetStateAction<boolean>>
    konfirmasiPembayaran: boolean
    setKonfirmasiPembayaran: React.Dispatch<React.SetStateAction<boolean>>

    load: boolean
    setLoad: React.Dispatch<React.SetStateAction<boolean>>

}) => {

    return (
        <>
            <Tabs.Panel value="Pilih Jalur PPDB" mt={20}  >
                <Paper
                    withBorder
                    radius="md"
                    sx={theme => ({
                        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
                        padding: "2rem",

                    })}
                >

                    <Stack
                    >
                        <Text>{pilihanGelombang ? "Pilihan Anda" : "Pilih Salah Satu Gelombang PPDB"}</Text>

                        <JalurPengembalian
                            setActiveTabIndex={setActiveTabIndex}
                            focus={focus}
                            pilihanGelombang={pilihanGelombang}
                            setFocus={setFocus}
                            setPilihanGelombang={setPilihanGelombang}
                            setKonfirmasiPembelian={setKonfirmasiPembelian}
                            setKonfirmasiPembayaran={setKonfirmasiPembayaran}
                        />
                    </Stack>
                </Paper>
            </Tabs.Panel>

            <Tabs.Panel value="Transaksi Pengembalian" mt={20}>
                <Transaksi
                    activeTabIndex={activeTabIndex}
                    setActiveTabIndex={setActiveTabIndex}
                    konfirmasiPembelian={konfirmasiPembelian}
                    setKonfirmasiPembelian={setKonfirmasiPembelian}
                    konfirmasiPembayaran={konfirmasiPembayaran}
                    setKonfirmasiPembayaran={setKonfirmasiPembayaran}
                    load={load}
                    setLoad={setLoad}
                />
            </Tabs.Panel>

            <Tabs.Panel value="Isi Biodata" mt={20}>
                <Biodata setActiveTabIndex={setActiveTabIndex} />
            </Tabs.Panel>

            <Tabs.Panel value="Isi Data Prestasi">
                <Box
                    sx={theme => ({
                        backgroundColor: `${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white}`,
                        padding: "2rem",
                        boxShadow: "0 5px 10px -8px black",
                        borderRadius: "7px"
                    })}
                >

                    <h1>Isi data Prestasi</h1>

                </Box>
            </Tabs.Panel>

            <Tabs.Panel value="Pilih Jurusan" mt={20}>
                <PilihJurusan setActiveTabIndex={setActiveTabIndex} />
            </Tabs.Panel>

            <Tabs.Panel value="Cetak Kartu Peserta" mt={20}>
                <CetakKartu />
            </Tabs.Panel>
        </>
    )
}

export default TabsContentPengembalian