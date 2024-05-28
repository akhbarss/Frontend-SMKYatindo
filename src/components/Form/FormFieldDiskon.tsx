import { Box, Stack, Text, Textarea } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import UploadDropzone from "../Fields/UploadDropzone";
export type StudentDiscounts = {
  discountDescription: string;
  attachment: File[];
}[];

export type TFormFieldInformasiDiskon = {
  discountAttachment1: File[];
  discountDescription1: string;
  discountAttachment2: File[];
  discountDescription2: string;
};

const FormFieldDiskon = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TFormFieldInformasiDiskon>();

  return (
    <Stack>
      <Box id="overlay" style={{ position: "relative" }}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <UploadDropzone
              children={<div></div>}
              label={" Bukti 1"}
              onDrop={(droppedFiles) => {
                onChange(droppedFiles);
              }}
              value={value}
              multiple={false}
              onChange={(e) => onChange(e.target.files?.[0] ?? null)}
              onReject={(files) => {
                const fileToLarge = files[0].errors[0].code == "file-too-large";
                if (fileToLarge) {
                  toast.error("Size gambar terlalu besar dari 5MB");
                }
              }}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "Dibutuhkan",
            },
          }}
          name={`discountAttachment1`}
          control={control}
        />

        <Text size={"xs"} c="red">
          {errors?.discountAttachment1?.message}
        </Text>
      </Box>

      <Textarea
        label="Deskripsi"
        description="Opsional"
        {...register("discountDescription1", { required: false })}
      />

      <Box id="overlay" style={{ position: "relative" }}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <UploadDropzone
              children={<div></div>}
              label={" Bukti 1"}
              onDrop={(droppedFiles) => {
                onChange(droppedFiles);
              }}
              value={value}
              multiple={false}
              onChange={(e) => onChange(e.target.files?.[0] ?? null)}
              onReject={(files) => {
                const fileToLarge = files[0].errors[0].code == "file-too-large";
                if (fileToLarge) {
                  toast.error("Size gambar terlalu besar dari 5MB");
                }
              }}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "Dibutuhkan",
            },
          }}
          name={`discountAttachment2`}
          control={control}
        />

        <Text size={"xs"} c="red">
          {errors?.discountAttachment2?.message}
        </Text>
      </Box>

      <Textarea
        label="Deskripsi"
        description="Opsional"
        {...register("discountDescription2", { required: false })}
      />
    </Stack>
  );
};

export default FormFieldDiskon;
