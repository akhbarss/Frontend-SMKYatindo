import { Stack, TextInput, useMantineTheme } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import toast from "react-hot-toast";
import React from "react";
import UploadDropzone from "./UploadDropzone";
import { DateInput } from "@mantine/dates";

const FormFieldPrestasi = () => {
  const theme = useMantineTheme();
  const {
    register,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();

  return (
    <Stack spacing={10}>
      <Controller
        render={({ field: { onChange, value } }) => (
          <UploadDropzone
            children={<div></div>}
            label={"Harap Upload bukti gambar sertifikasi"}
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
          />
        )}
        name={"attachment"}
        control={control}
      />
      <TextInput
        withAsterisk
        label="Judul Pengalaman"
        required
        error={errors.title && <div>{errors.title?.message}</div>}
        {...register("title", {
          required: {
            value: true,
            message: "dibutuhkan",
          },
        })}
      />
      <TextInput
        withAsterisk={false}
        label="Lembaga"
        required
        error={errors.organization && <div>{errors.organization?.message}</div>}
        {...register("organization", {
          required: {
            value: false,
            message: "dibutuhkan",
          },
        })}
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <DateInput
            value={value}
            onChange={onChange}
            label="Tanggal Mulai"
            placeholder="Tanggal Mulai"
          />
        )}
        name={"start_date"}
        control={control}
        rules={{
          required: {
            value: true,
            message: "Dibutuhkan",
          },
        }}
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <DateInput
            value={value}
            onChange={onChange}
            label="Tanggal Akhir"
            placeholder="Tanggal Akhir"
          />
        )}
        name={"end_date"}
        control={control}
        rules={{
          required: {
            value: true,
            message: "Dibutuhkan",
          },
        }}
      />
    </Stack>
  );
};

export default FormFieldPrestasi;
