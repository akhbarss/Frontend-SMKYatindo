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
  // studentAchievements: StudentAchievement;
  achievementAttachment1: File[];
  achievementTitle1: string;
  achievementOrganization1: string;
  achievementDescription1: string;
  achievementAttachment2: File[];
  achievementTitle2: string;
  achievementOrganization2: string;
  achievementDescription2: string;
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
        {/* BUKTI PRESTASI 1 */}
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
          name={`achievementAttachment1`}
          control={control}
        />
        <Text size={"xs"} c="red">
          {errors?.achievementAttachment1?.message}
        </Text>
      </Box>

      {/* NAMA PRESTASI 1 */}
      <TextInput
        label="Nama Prestasi"
        error={
          errors?.achievementTitle1 && (
            <div>{errors?.achievementTitle1?.message}</div>
          )
        }
        {...register(`achievementTitle1`, {
          required: {
            value: true,
            message: "Dibutuhkan",
          },
        })}
      />

      {/* ORGANISASI PRESTASI 1 */}
      <TextInput
        label="Organisasi"
        error={
          errors?.achievementOrganization1?.message && (
            <div>{errors?.achievementOrganization1?.message}</div>
          )
        }
        {...register(`achievementOrganization1`, {
          required: {
            value: true,
            message: "Dibutuhkan",
          },
        })}
      />

      {/* KETERANGAN PRESTASI 1 */}
      <Textarea
        description="Opsional"
        label="Keterangan"
        {...register(`achievementDescription1`, {})}
      />

      <Divider />

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
              onReject={(files) => {
                const fileToLarge = files[0].errors[0].code == "file-too-large";
                if (fileToLarge) {
                  toast.error("Size gambar terlalu besar dari 5MB");
                }
              }}
            />
          )}
          rules={{
          }}
          name={`achievementAttachment2`}
          control={control}
        />
        <Text size={"xs"} c="red">
          {errors?.achievementAttachment2?.message}
        </Text>
      </Box>

      <TextInput
        label="Nama Prestasi"
        error={
          errors?.achievementTitle2 && (
            <div>{errors?.achievementTitle2?.message}</div>
          )
        }
        {...register(`achievementTitle2`, {
        })}
      />

      <TextInput
        label="Organisasi"
        error={
          errors?.achievementOrganization2?.message && (
            <div>{errors?.achievementOrganization2?.message}</div>
          )
        }
        {...register(`achievementOrganization2`, {
          
        })}
      />

      <Textarea
        description="Opsional"
        label="Keterangan"
        {...register(`achievementDescription2`, {})}
      />
    </Stack>
  );
};

export default FormFieldPrestasi;
