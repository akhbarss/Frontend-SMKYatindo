import { LoadingOverlay, Paper, Stack, Tabs, Text } from "@mantine/core";
import { JalurPendaftaranPPDB } from "../../../types/global";
import GelombangPPDB from "./gelombang";
import Transaksi from "./Transaksi";
import PilihJurusan from "./pilihJurusan";
import CetakKartu from "./cetakKartu";
import { useQuery } from "@tanstack/react-query";
// import { GetJalurPendaftaranByType } from "../../../apis/jalur/getJalur";
import { getJalurPendaftaranByType } from "../../../apis/jalur/getJalurPendaftaranByType";

const TabsContentPembelian = ({
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
  setLoad,
}: {
  // tabs list
  activeTabIndex: number;
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;

  // gelombang
  focus: string;
  setFocus: React.Dispatch<React.SetStateAction<string>>;
  pilihanGelombang: JalurPendaftaranPPDB | null;
  setPilihanGelombang: React.Dispatch<
    React.SetStateAction<JalurPendaftaranPPDB | null>
  >;

  // pembelian formulir
  konfirmasiPembelian: boolean;
  setKonfirmasiPembelian: React.Dispatch<React.SetStateAction<boolean>>;
  konfirmasiPembayaran: boolean;
  setKonfirmasiPembayaran: React.Dispatch<React.SetStateAction<boolean>>;

  load: boolean;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    data: jalur,
    isLoading: jalurLoading,
    isSuccess: jalurSuccess,
  } = useQuery({
    queryKey: ["jalur_pendaftaran_pembelian"],
    queryFn: () => getJalurPendaftaranByType("PEMBELIAN"),
  });

  return (
    <>
      <Tabs.Panel value="Pilih Gelombang PPDB" mt={20}>
        <Paper
          withBorder
          radius="md"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
            padding: "2rem",
          })}
        >
          <Stack>
            <Text>
              {pilihanGelombang
                ? "Pilihan Anda"
                : "Pilih Salah Satu Gelombang PPDB"}
            </Text>

            {jalurLoading && <LoadingOverlay visible={true} />}
            {jalurSuccess && (
              <GelombangPPDB
                setActiveTabIndex={setActiveTabIndex}
                focus={focus}
                pilihanGelombang={pilihanGelombang}
                setFocus={setFocus}
                dataJalurPendaftar={jalur.data}
                setPilihanGelombang={setPilihanGelombang}
                setKonfirmasiPembelian={setKonfirmasiPembelian}
                setKonfirmasiPembayaran={setKonfirmasiPembayaran}
              />
            )}
          </Stack>
        </Paper>
      </Tabs.Panel>

      <Tabs.Panel value="Transaksi Pembelian" mt={20}>
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

      <Tabs.Panel value="Pilih Jurusan" mt={20}>
        <PilihJurusan setActiveTabIndex={setActiveTabIndex} />
      </Tabs.Panel>

      <Tabs.Panel value="Cetak Kartu Peserta" mt={20}>
        <CetakKartu />
      </Tabs.Panel>
    </>
  );
};

export default TabsContentPembelian;
