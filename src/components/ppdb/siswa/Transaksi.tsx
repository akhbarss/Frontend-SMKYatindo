import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Group,
  Image,
  Radio,
  Stack,
  Text,
  TextInput,
  Title,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import { HiPhoto } from "react-icons/hi2";
import { ImCross } from "react-icons/im";
import { NumericFormat } from "react-number-format";
import * as yup from "yup";

type TMetodePembayaran = "transfer" | "tunai";

type FormValues = {
  buktiPembayaran: yup.AnyObject | string;
};

const schema = yup.object({
  buktiPembayaran: yup.mixed().required("Tolong masukkan bukti pembayaran"),
});

const PembelianFormulir = ({
  konfirmasiPembelian,
  setKonfirmasiPembelian,
  setActiveTabIndex,
  activeTabIndex,
  konfirmasiPembayaran,
  setKonfirmasiPembayaran,
  load,
  setLoad,
}: {
  konfirmasiPembelian: boolean;
  setKonfirmasiPembelian: React.Dispatch<React.SetStateAction<boolean>>;
  activeTabIndex: number;
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  konfirmasiPembayaran: boolean;
  setKonfirmasiPembayaran: React.Dispatch<React.SetStateAction<boolean>>;
  load: boolean;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const data = [
    {
      id: 1,
      metodePembayaran: "transfer",
      bank: "BCA",
      nomorRekening: "nomorrekening",
      namaPemilikRekening: "akbar",
      nominal: 1000000,
      buktiPembayaran: "",
    },
    {
      id: 2,
      metodePembayaran: "cash",
      nominal: 2000000,
      buktiPembayaran: "",
    },
  ];

  const [metodePembayaran, setMetodePembayaran] =
    useState<TMetodePembayaran | null>(null);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const openRef = useRef<() => void>(null);

  const theme = useMantineTheme();

  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = form;

  const submitHandler = async (data: FormValues) => {
    console.log("submited");
    console.log(data);
    setKonfirmasiPembelian(true);
    // setActiveTabIndex(index => index + 1)

    const formData = new FormData();
    formData.append("image", files[0]);

    setKonfirmasiPembayaran(true);
  };

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Box
        sx={{
          position: "relative",
        }}
        key={index}
      >
        <Image
          src={imageUrl}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
          sx={{ marginInline: "auto" }}
        />

        <Box>
          <Button
            mt={20}
            onClick={() => {
              if (openRef.current !== null) openRef.current();
            }}
            sx={{
              marginInline: "auto",
            }}
          >
            Edit Foto Bukti Transfer / Pembayaran
          </Button>
        </Box>
      </Box>
    );
  });

  const contentMenungguKonfirmasiPembelian = (
    <Box
      sx={(theme) => ({
        backgroundColor: `${
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
        }`,
        padding: "4rem 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      <img
        src="/svg//wait-pembelianformulir.svg"
        alt="image"
        style={{
          width: "250px",
        }}
      />

      <Text
        mt={40}
        // w={500}
        sx={{ maxWidth: 500 }}
        weight={"bold"}
        align="center"
      >
        Harap menunggu konfirmasi admin, untuk mengetahui nilai pembelian dan
        upload bukti transfer
      </Text>

      <Button
        variant="filled"
        onClick={() => setActiveTabIndex((index) => index + 1)}
        mt={40}
      >
        Click Me
      </Button>
    </Box>
  );

  const contentPembelianFormulir = (
    <>
      <Stack>
        <Title>Bayar Pendaftaran</Title>

        <Text className="font-semibold">
          Silahkan melakukan transfer ke rekening dibawah ini :
        </Text>

        <table className="w-[35rem]">
          <tbody>
            <tr>
              <td>Bank</td>
              <td>
                <Text>
                  :{" "}
                  <Text component="span" weight={"bold"}>
                    Bank Danamon
                  </Text>
                </Text>
              </td>
            </tr>
            <tr>
              <td>Nomor Rekening</td>
              <td>
                <Text>
                  :{" "}
                  <Text component="span" weight={"bold"}>
                    320940492
                  </Text>
                </Text>
              </td>
            </tr>
            <tr>
              <td>Atas Nama</td>
              <td>
                <Text>
                  :{" "}
                  <Text component="span" weight={"bold"}>
                    SMK Tinta Emas Indonesia
                  </Text>
                </Text>
              </td>
            </tr>
            <tr>
              <td>Status Pembayaran</td>
              <td>
                <Text>
                  :{" "}
                  <Text component="span" weight={"bold"}>
                    Menunggu Biaya Pendaftaran
                  </Text>
                </Text>
              </td>
            </tr>
          </tbody>
        </table>
      </Stack>

      <form onSubmit={handleSubmit(submitHandler)} className="mt-20">
        <Stack>
          <Title order={1}>Bukti Transfer</Title>
          {previews.length > 0 ? (
            previews
          ) : (
            <Dropzone
              openRef={openRef}
              onDrop={(files) => {
                if (files[0].path) {
                  setValue("buktiPembayaran", files[0]);
                  setError("buktiPembayaran", {
                    message: "",
                  });
                  setFiles(files);
                  console.log(files[0].path);
                }
              }}
              onReject={(files) => {
                const fileToLarge = files[0].errors[0].code == "file-too-large";
                if (fileToLarge) {
                  toast.error("Size gambar terlalu besar dari 5MB");
                }
                console.log("rejected files");
              }}
              maxSize={3 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              {...register("buktiPembayaran")}
            >
              <Group
                position="center"
                spacing="xl"
                style={{ minHeight: rem(220), pointerEvents: "none" }}
              >
                <Dropzone.Accept>
                  <FaUpload
                    size="3.2rem"
                    color={
                      theme.colors[theme.primaryColor][
                        theme.colorScheme === "dark" ? 4 : 6
                      ]
                    }
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <ImCross
                    size="3.2rem"
                    color={
                      theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
                    }
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <HiPhoto size="3.2rem" />
                </Dropzone.Idle>

                {/* <div> */}
                <Text size="">Upload Bukti Bayar, Max : 5MB</Text>
                {/* <Text size="sm" color="dimmed" inline mt={7}>
                                    Attach as many files as you like, each file should not exceed 5mb
                                </Text> */}
                {/* </div> */}
              </Group>
            </Dropzone>
          )}

          <Text color="red" size={"xs"}>
            {errors.buktiPembayaran?.message
              ? errors.buktiPembayaran?.message
              : ""}
          </Text>

          <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            prefix="Rp. "
            customInput={TextInput}
            placeholder="Rp. 0"
            label="Nominal"
            description="Input Nominal"
            value={activeTabIndex > 2 ? "150000" : ""}
            required
            withAsterisk
          />

          <Radio.Group
            label="Metode Pembayaran"
            description="Pilih salah satu"
            styles={{
              error: {
                marginTop: "10px",
              },
            }}
            onChange={(value: TMetodePembayaran) => {
              setMetodePembayaran(value);
            }}
            required
          >
            <Group
              mt={"xs"}
              pt={10}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Radio label="Tunai" value={"tunai"} required />

              <Radio label="Transfer" value={"transfer"} required />
            </Group>
          </Radio.Group>

          {metodePembayaran === "transfer" && (
            <>
              <TextInput
                description="Masukkan nama bank"
                label="Nama Bank"
                placeholder="Bank BCA"
                withAsterisk
                required
              />

              <TextInput
                label="Nomor Rekening"
                description="Masukkan nomor rekening"
                withAsterisk
                type="number"
                required
              />

              <TextInput
                label="Nama Pemilik Rekening"
                description="Masukkan nama pemilik rekening"
                withAsterisk
                required
              />
            </>
          )}

          <Box mt={20}>
            <Button type="submit">Simpan</Button>
          </Box>
        </Stack>
      </form>
    </>
  );

  const content =
    konfirmasiPembelian && activeTabIndex <= 2
      ? contentMenungguKonfirmasiPembelian
      : contentPembelianFormulir;

  return (
    <>
      <Box
        sx={(theme) => ({
          backgroundColor: `${
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
          }`,
          padding: "2rem",
          boxShadow: "0 5px 10px -8px black",
          borderRadius: "7px",
        })}
      >
        {content}
      </Box>

      <Toaster />
    </>
  );
};

export default PembelianFormulir;
