import { Box, Divider, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import UploadDropzone from "../Fields/UploadDropzone";

export type StudentAchievement = {
  attachment: File[];
  title: string;
  organization: string;
  description: string;
}[];

export type TFormFieldInformasiPrestasi = {
  achievement1_img: File[];
  achievement2_img: File[];
  studentAchievement: StudentAchievement;
};

const FormFieldPrestasi = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TFormFieldInformasiPrestasi>();
  return (
    <Stack>
      <Box id="overlay" style={{ position: "relative" }}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <UploadDropzone
              children={<div></div>}
              label={" Prestasi 1"}
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
          name={`studentAchievement.${0}.attachment`}
          control={control}
        />
        <Text size={"xs"} c="red">{errors?.studentAchievement?.[0].attachment?.message}</Text>
      </Box>

      <TextInput
        label="Nama Prestasi"
        error={
          errors.studentAchievement?.[0].title && (
            <div>{errors.studentAchievement[0].title?.message}</div>
          )
        }
        {...register(`studentAchievement.${0}.title`, {
          required: {
            value: true,
            message: "Dibutuhkan",
          },
        })}
      />

      <TextInput
        label="Organisasi"
        error={
          errors.studentAchievement?.[0].organization && (
            <div>{errors.studentAchievement[0].organization?.message}</div>
          )
        }
        {...register(`studentAchievement.${0}.organization`, {
          required: {
            value: true,
            message: "Dibutuhkan",
          },
        })}
      />

      <Textarea
        description="Opsional"
        label="Keterangan"
        {...register(`studentAchievement.${0}.description`, {})}
      />

      <Divider />

      <Box id="overlay" style={{ position: "relative" }}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <UploadDropzone
              children={<div></div>}
              label={" Prestasi 2"}
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
          name={`studentAchievement.${1}.attachment`}
          control={control}
        />
      </Box>

      <TextInput
        label="Nama Prestasi"
        error={
          errors.studentAchievement?.[1].title?.message && (
            <div>{errors.studentAchievement[1].title?.message}</div>
          )
        }
        {...register(`studentAchievement.${1}.title`, {
          
        })}
      />

      <TextInput
        label="Organisasi"
        error={
          errors.studentAchievement?.[1].organization?.message && (
            <div>{errors.studentAchievement[1].organization?.message}</div>
          )
        }
        {...register(`studentAchievement.${1}.organization`, {
          
        })}
      />

      <Textarea
        description="Opsional"
        label="Keterangan"
        {...register(`studentAchievement.${1}.description`, {})}
      />
    </Stack>
  );
};

export default FormFieldPrestasi;
