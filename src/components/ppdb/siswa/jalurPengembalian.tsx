import { Badge, Box, Button, Group, Text, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { BiSolidTagAlt } from "react-icons/bi";
import { JalurPendaftaranPPDB } from "../../../types/global";
import { DarkTheme } from "../../../utils/darkTheme";
import { dataJalurPendaftaran } from "../dataJalurPendaftaran";

const JalurPengembalian = ({
  setActiveTabIndex,
  setPilihanGelombang,
  pilihanGelombang,
  setFocus,
  focus,
  setKonfirmasiPembelian,
  setKonfirmasiPembayaran,
}: {
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  setPilihanGelombang: React.Dispatch<
    React.SetStateAction<JalurPendaftaranPPDB | null>
  >;
  pilihanGelombang: JalurPendaftaranPPDB | null;
  setFocus: React.Dispatch<React.SetStateAction<string>>;
  focus: string;
  setKonfirmasiPembelian: React.Dispatch<React.SetStateAction<boolean>>;
  setKonfirmasiPembayaran: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dataJalur = dataJalurPendaftaran;
  const dataPengembalian = dataJalurPendaftaran.filter(
    (jalur) => jalur.tipe === "pengembalian"
  );

  const dark = DarkTheme();

  const tanggalMulai =
    pilihanGelombang && new Date(pilihanGelombang?.waktu_dibuka);
  const tanggalSelesai =
    pilihanGelombang && new Date(pilihanGelombang?.waktu_ditutup);
  const waktuSekarang = new Date();

  const timeDifference =
    tanggalSelesai &&
    waktuSekarang &&
    tanggalSelesai.getTime() - waktuSekarang.getTime();

  const daysRemaining =
    timeDifference && Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  const clickHandler = (data: JalurPendaftaranPPDB) => {
    const onAccept = () => {
      setPilihanGelombang(data);
      setActiveTabIndex((index) => index + 1);
      setKonfirmasiPembelian(false);
      setKonfirmasiPembayaran(false);
    };

    const onCancel = () => {
      console.log("cancel");
    };

    setFocus(data.id + "");

    modals.openContextModal({
      modal: "createInformasi",
      innerProps: {
        onAccept,
        onCancel,
        modalBody: `Anda yakin ingin memilih ${data.nama_jalur_pendaftaran}?`,
      },
    });
  };

  const cancelPilihanGelombangHandler = () => {
    const onAccept = () => {
      setPilihanGelombang(null);
      setActiveTabIndex(1);
    };

    const onCancel = () => console.log("cancel");

    modals.openContextModal({
      modal: "createInformasi",
      innerProps: {
        onAccept,
        onCancel,
        modalBody: `Anda yakin ingin membatalkan pilihan ${pilihanGelombang?.nama_jalur_pendaftaran}?`,
      },
    });
  };

  const contentGelombang = (
    <>
      {dataPengembalian.map((jalur) => {
        const tanggalMulai = new Date(jalur.waktu_dibuka);
        const tanggalSelesai = new Date(jalur.waktu_ditutup);
        const waktuSekarang = new Date();

        const isJalurDibuka =
          waktuSekarang >= tanggalMulai && waktuSekarang <= tanggalSelesai;

        return (
          <Button
            unstyled
            disabled={!isJalurDibuka}
            key={jalur.id}
            onClick={() => {
              clickHandler(jalur);
            }}
            style={{
              border: `${
                `${jalur.id}` === focus ? "2px solid rgba(51, 154, 240, 1)" : ""
              }`,
              backgroundColor: `${
                `${jalur.id}` === focus
                  ? dark
                    ? "rgba(51,102,255,0.2)"
                    : "rgba(193, 227, 255, 1)"
                  : ""
              }`,
            }}
            styles={(theme) => ({
              root: {
                borderColor: `${isJalurDibuka ? "#51CF66" : "red"}`,
                padding: "1rem",
                backgroundColor: `${
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.white
                }`,
                cursor: "pointer",
                // boxShadow: "0 10px 20px -10px rgba(0,0,0,0.2)",
                color:
                  theme.colorScheme === "dark" ? "white" : theme.colors.gray[9],
                borderRadius: "8px",
                ":focus": {
                  outline: "none",
                },
                "&:disabled": {
                  // opacity: 0.8,
                  cursor: "not-allowed",
                  backgroundColor: `${
                    dark ? theme.colors.dark[4] : "rgba(233, 233, 233, 1)"
                  }`,
                },
              },
              label: {
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
              },
            })}
          >
            <Group>
              <BiSolidTagAlt size={30} />

              <Box>
                <Title order={3} align="left" weight={"bolder"}>
                  {/* PEMBELIAN FORMULIR GEL. 1 */}
                  {jalur.nama_jalur_pendaftaran}
                </Title>

                <Text align="left">
                  {tanggalMulai.toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {tanggalSelesai.toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
              </Box>
            </Group>

            <Badge variant="light" color={`${isJalurDibuka ? "green" : "red"}`}>
              {/* jika tidak sesuai dengan jangka waktu = ditutup */}
              {/* jika  sesuai dengan jangka waktu = dibuka */}

              {/* Dibuka */}
              {isJalurDibuka ? "Dibuka" : "Ditutup"}
            </Badge>
          </Button>
        );
      })}

      {}
    </>
  );

  const contentGelombangPilihan = pilihanGelombang && (
    <>
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          backgroundColor: `${
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
          }`,
          padding: "1rem",
          justifyContent: "space-between",
          border: "1px solid blue",
          borderRadius: "5px",
        })}
      >
        <Group>
          <BiSolidTagAlt size={30} />

          <Box>
            <Title order={3} align="left" weight={"bolder"}>
              {pilihanGelombang.nama_jalur_pendaftaran}
            </Title>

            <Text align="left">
              {tanggalMulai?.toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}{" "}
              -{" "}
              {tanggalSelesai?.toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </Text>
          </Box>
        </Group>

        <Badge variant="light">
          {daysRemaining && daysRemaining > 0
            ? `${daysRemaining} Hari Lagi`
            : "Ditutup"}

          {/*  2 Bulan Lagi  */}
        </Badge>
      </Box>

      <Group position="center" mt={30}>
        <Button
          variant="outline"
          color="red"
          onClick={() => cancelPilihanGelombangHandler()}
        >
          Batalkan Pilihan
        </Button>
      </Group>
    </>
  );

  return <>{pilihanGelombang ? contentGelombangPilihan : contentGelombang}</>;
};

export default JalurPengembalian;
