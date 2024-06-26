/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Group,
  Image as MantineImage,
  Radio,
  rem,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Image, Upload, X } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { NumericFormat } from "react-number-format";
import { RadioGroupCustom } from "../Fields/RadioGroup";

const FormFieldPembayaran = () => {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const watchPaymentType = watch("payment_method");

  return (
    <Stack spacing={10}>
      <Controller
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => {
          return (
            <Dropzone
              multiple={false}
              // @ts-ignore
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
                  <Upload size={60} color="green" />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <X size={60} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <Image size={60} color="gray" />
                </Dropzone.Idle>
                <Text size="">Upload Bukti Bayar, Max : 5MB</Text>
              </Group>
              <SimpleGrid
                cols={4}
                mt={5}
                breakpoints={[{ maxWidth: "sm", cols: 1 }]}
              >
                {value &&
                  value?.length > 0 &&
                  value?.map((file, index) => {
                    const imageUrl = URL.createObjectURL(file);
                    return (
                      <MantineImage
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
          );
        }}
        name={"payment_prove"}
        control={control}
      />
      <Controller
        rules={{ required: true }}
        name="amount"
        control={control}
        render={({ field: { ref, onChange, ...field } }) => (
          <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            prefix="Rp. "
            customInput={TextInput}
            // @ts-ignore
            error={errors.amount && <div>{errors.amount?.message}</div>}
            placeholder="Rp. 0"
            label="Input Nominal"
            description="Input Nominal"
            onValueChange={({ floatValue }) => {
              onChange(floatValue);
            }}
            {...field}
          />
        )}
      />
      <RadioGroupCustom
        name="payment_method"
        control={control}
        label="Metode Pembayaran"
        description="Pilih salah satu"
        rules={{ required: true }}
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
            // @ts-ignore
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
              // @ts-ignore
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
            // @ts-ignore
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

export default FormFieldPembayaran;
