import {
  Badge,
  Box,
  Button,
  Group,
  LoadingOverlay,
  Text,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { BiSolidTagAlt } from "react-icons/bi";
import { JalurPendaftaranPPDB } from "../../../types/global";
import { DarkTheme } from "../../../utils/darkTheme";
import { JalurPendaftaran } from "../../../apis/jalur/getJalur";
import { useMutation } from "@tanstack/react-query";
import { chooseBatch } from "../../../apis/pembelian";
import ResponseError from "../../../utils/ResponseError";
import toast from "react-hot-toast";

const Gelombang = ({
  setActiveTabIndex,
  setPilihanGelombang,
  pilihanGelombang,
  setFocus,
  focus,
  setKonfirmasiPembelian,
  dataJalurPendaftar,
  setKonfirmasiPembayaran,
}: {
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  setPilihanGelombang: React.Dispatch<
    React.SetStateAction<JalurPendaftaranPPDB | null>
  >;
  pilihanGelombang: JalurPendaftaranPPDB | null;
  setFocus: React.Dispatch<React.SetStateAction<string>>;
  dataJalurPendaftar: JalurPendaftaran[];
  focus: string;
  setKonfirmasiPembelian: React.Dispatch<React.SetStateAction<boolean>>;
  setKonfirmasiPembayaran: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const chooseBatchMutation = useMutation({
    mutationFn: chooseBatch,
  });

  // const dataJalur = dataJalurPendaftaran;
  const dataPembelian = dataJalurPendaftar;

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

  const clickHandler = (data: JalurPendaftaran) => {
    const onAccept = () => {
      chooseBatchMutation.mutate(data.id, {
        onSuccess: (response) => {
          toast.success("Sukses memilih gelommbang pendaftaran");
          setPilihanGelombang(data);
          setActiveTabIndex((index) => index + 1);
          setKonfirmasiPembelian(false);
          setKonfirmasiPembayaran(false);
        },
        onError: (err) => ResponseError(err),
      });
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
        modalBody: `Anda yakin ingin memilih ${data.name}?`,
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
      {dataPembelian.map((jalur) => {
        const tanggalMulai = new Date(jalur.start_date);
        const tanggalSelesai = new Date(jalur.end_date);
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
                color:
                  theme.colorScheme === "dark" ? "white" : theme.colors.gray[9],
                borderRadius: "8px",
                ":focus": {
                  outline: "none",
                },
                "&:disabled": {
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
                  {jalur.name}
                </Title>

                <Text align="left">
                  {new Date(jalur.start_date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(jalur.end_date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
              </Box>
            </Group>

            <Badge
              variant="light"
              color={`${isJalurDibuka ? "green" : "red"}`}
              size="lg"
            >
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
      <LoadingOverlay visible={chooseBatchMutation.isLoading} />

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

          {/* 2 Bulan Lagi  */}
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

export default Gelombang;
