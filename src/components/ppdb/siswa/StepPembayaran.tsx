import React from "react";
import {
  Box,
  Button,
  Divider,
  Group,
  Image,
  Radio,
  rem,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import toast, { Toaster } from "react-hot-toast";
import { FaUpload } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { HiPhoto } from "react-icons/hi2";
import { NumericFormat } from "react-number-format";
import { getOffsetStatus, uploadbuktibayar } from "../../../apis/pembelian";
import useQueryFilter from "../../../hooks/useQueryFilter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import FormWrapper from "../../FormWrapper";
import { RadioGroupCustom } from "../../fields/RadioGroup";
import ResponseError from "../../../utils/ResponseError";

const FormFieldPembayaran = () => {
  const theme = useMantineTheme();
  const {
    register,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();

  const watchPaymentType = watch("payment_method");

  return (
    <Stack spacing={10}>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Dropzone
            multiple={false}
            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
            onReject={(files) => {
              const fileToLarge = files[0].errors[0].code == "file-too-large";
              if (fileToLarge) {
                toast.error("Size gambar terlalu besar dari 5MB");
              }
            }}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            onDrop={(droppedFiles) => {
              onChange(droppedFiles);
            }}
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
                  color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <HiPhoto size="3.2rem" />
              </Dropzone.Idle>
              <Text size="">Upload Bukti Bayar, Max : 5MB</Text>
            </Group>
            <SimpleGrid
              cols={4}
              mt={5}
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            >
              {value &&
                value.map((file, index) => {
                  const imageUrl = URL.createObjectURL(file);
                  return (
                    <Image
                      key={index}
                      src={imageUrl}
                      w={20}
                      imageProps={{
                        onLoad: () => URL.revokeObjectURL(imageUrl),
                      }}
                    />
                  );
                })}
            </SimpleGrid>
          </Dropzone>
        )}
        name={"payment_prove"}
        control={control}
      />
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        prefix="Rp. "
        customInput={TextInput}
        error={errors.amount && <div>{errors.amount?.message}</div>}
        placeholder="Rp. 0"
        label="Input Nominal"
        description="Input Nominal"
        required
        {...register("amount", {
          required: false,
          valueAsNumber: true,
        })}
        onValueChange={(values) => {
          setValue("amount", values.floatValue);
        }}
      />
      <RadioGroupCustom
        name="payment_method"
        control={control}
        label="Metode Pembayaran"
        description="Pilih salah satu"
      >
        <Group mt="xs">
          <Radio value="CASH" label="Tunai" />
          <Radio value="TRANSFER" label="Transfer" />
        </Group>
      </RadioGroupCustom>
      {watchPaymentType && watchPaymentType === "TRANSFER" && (
        <>
          <TextInput
            description="Masukkan nama bank"
            label="Nama Bank"
            placeholder="Bank BCA,BNI"
            withAsterisk
            error={errors.bank_name && <div>{errors.bank_name?.message}</div>}
            required
            {...register("bank_name", {
              required: true,
            })}
          />

          <TextInput
            label="Nomor Rekening"
            description="Masukkan nomor rekening"
            withAsterisk
            type="number"
            error={
              errors.bank_account && <div>{errors.bank_account?.message}</div>
            }
            required
            {...register("bank_account", {
              required: true,
            })}
          />

          <TextInput
            label="Nama Pemilik Rekening"
            description="Masukkan nama pemilik rekening"
            withAsterisk
            error={errors.bank_user && <div>{errors.bank_user?.message}</div>}
            required
            {...register("bank_user", {
              required: true,
            })}
          />
        </>
      )}
    </Stack>
  );
};

const StepPembayaran = () => {
  const filter = useQueryFilter({ step: 2, stagingId: null });
  const queryClient = useQueryClient();
  const uploadMutation = useMutation({
    mutationFn: uploadbuktibayar,
  });

  const {
    data: offset,
    isLoading: statusLoading,
    isSuccess: statusSuccess,
  } = useQuery({
    queryKey: ["student_staging_offset", filter.stagingId],
    queryFn: () => getOffsetStatus(filter.stagingId),
    enabled: !!filter.stagingId,
  });

  const onSubmitPayment: SubmitHandler<any> = (data) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key === "payment_prove") {
        formData.append("file", value?.[0]);
      } else {
        formData.append(key, value);
      }
    }

    uploadMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Sukses upload bukti bayar");
        queryClient.invalidateQueries({
          queryKey: ["get_last_offset_batch"],
        });
      },
      onError: (err) => ResponseError(err),
    });
  };

  const { data } = useQuery({
    queryKey: ["student_staging_offset", filter.stagingId],
    queryFn: () => getOffsetStatus(filter.stagingId),
    enabled: !!filter.stagingId,
  });

  return (
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
      <FormWrapper id={"form-uploadbukti"} onSubmit={onSubmitPayment}>
        <Title order={3} my={50}>
          Bukti Transfer
        </Title>
        <Divider />
        <FormFieldPembayaran />
        <Button type={"submit"} mt={10}>
          Submit
        </Button>
      </FormWrapper>
      <Toaster position={"top-center"} reverseOrder={true} />
    </Box>
  );
};

export default StepPembayaran;
