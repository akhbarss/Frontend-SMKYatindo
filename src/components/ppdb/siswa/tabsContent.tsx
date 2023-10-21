import {
    Stack,
    Tabs,
    Text
} from "@mantine/core"
import { JalurPendaftaranPPDB } from "../../../types/global"
import GelombangPPDB from "./gelombang"
import PembelianFormulir from "./pembelianFormulir"
import PilihJurusan from "./pilihJurusan"
import CetakKartu from "./cetakKartu"

const TabsContent = ({
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
            <Tabs.Panel value="Pilih Gelombang PPDB" mt={20}  >
                <Stack>
                    <Text>{pilihanGelombang ? "Pilihan Anda" : "Pilih Salah Satu Gelombang PPDB"}</Text>

                    <GelombangPPDB
                        setActiveTabIndex={setActiveTabIndex}
                        focus={focus}
                        pilihanGelombang={pilihanGelombang}
                        setFocus={setFocus}
                        setPilihanGelombang={setPilihanGelombang}
                        setKonfirmasiPembelian={setKonfirmasiPembelian}
                        setKonfirmasiPembayaran={setKonfirmasiPembayaran}
                    />
                </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="Pembelian Formulir" mt={20}>
                <PembelianFormulir
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

            <Tabs.Panel value="Pilih Jurusan" mt={20}>
                <PilihJurusan setActiveTabIndex={setActiveTabIndex} />
            </Tabs.Panel>

            <Tabs.Panel value="Cetak Kartu Peserta" mt={20}>
                <CetakKartu />
            </Tabs.Panel>
        </>
    )
}

export default TabsContent