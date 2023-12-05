/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Text,
  Grid,
  Group,
  Radio,
  Stack,
  Textarea,
  TextInput
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Controller, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { RadioGroupCustom } from "./fields/RadioGroup";
import SelectStatus from "./SelectStatus";
import UploadDropzone from "./UploadDropzone";

export type TFormFieldBiodata = {
  profile_picture: File[];
  nisn: string;
  phone: string;
  name: string;
  surname: string;
  gender: string;
  religion: string;
  birth_place: string;
  birth_date: Date | null;
  address: string;
  province: string;
  city: string;
  district: string;
  sub_district: string;
  postal_code: string;
  school_origin: string;
};

const FormFieldBiodata = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TFormFieldBiodata>();
  return (
    <Stack spacing={10}>
      <Controller
        render={({ field: { onChange, value } }) => (
          <UploadDropzone
            children={<div></div>}
            label={"Upload pas Photo 3x4, Max : 5MB (DIBUTUHKAN)"}
            onDrop={(droppedFiles) => {
              onChange(droppedFiles);
            }}
            accept={{
              'image/*': [], // All images
            }}
            value={value}
            multiple={false}
            // @ts-ignore
            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
            onReject={(files) => {
              const fileToLarge = files[0].errors[0].code == "file-too-large";
              if (fileToLarge) {
                toast.error("Size gambar terlalu besar dari 5MB");
              }
            }}
          />
        )}
        name={"profile_picture"}
        control={control}
        rules={{
          required: {
            value: true,
            message: "Dibutuhkan",
          },
        }}
      />
      <Text size={"xs"} c="red">{errors?.profile_picture?.message}</Text>
      <Grid>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            description="Masukkan NISN"
            label="NISN"
            withAsterisk={false}
            placeholder="Nomor NISN"
            error={errors.nisn && <div>{errors.nisn?.message}</div>}
            required
            {...register("nisn", {
              required: false,
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            disabled
            description="Nomor Whatsapp"
            label="Nomor WhatsApp"
            placeholder="Nomor Whatsapp"
            error={errors.phone && <div>{errors.phone?.message}</div>}
            required
            {...register("phone", {
              required: {
                value: true,
                message: "Dibutuhkan",
              },
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            description="Nama Lengkap"
            label="Nama Lengkap"
            placeholder="Nama Lengkap"
            error={errors.name && <div>{errors.name?.message}</div>}
            required
            {...register("name", {
              required: {
                value: true,
                message: "Dibutuhkan",
              },
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            description="Nama Panggilan"
            label="Nama Panggilan"
            withAsterisk={false}
            placeholder="Nama Panggilan"
            error={errors.surname && <div>{errors.surname?.message}</div>}
            required
            {...register("surname", {
              required: false,
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <RadioGroupCustom
            name="gender"
            control={control}
            label="Gender"
            rules={{
              required: {
                value: true,
                message: "Dibutuhkan",
              },
            }}
            description="Pilih salah satu"
          >
            <Group mt="xs">
              <Radio value="L" label="Laki laki" />
              <Radio value="P" label="Perempuan" />
            </Group>
          </RadioGroupCustom>
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <Controller
            render={({ field: { onChange, value, } }) => (
              <SelectStatus
                type={"RELIGION"}
                readOnly={false}
                label={"Agama"}
                onChange={onChange}
                value={value}
                searchable={false}
              />
            )}
            name={"religion"}
            control={control}
            rules={{
              required: {
                value: true,
                message: "Dibutuhkan",
              },
            }}
          />
          <Text c="red" size={"xs"}>{errors?.religion?.message}</Text>
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            label="Tempat Lahir"
            placeholder="Tempat Lahir"
            error={
              errors.birth_place && <div>{errors.birth_place?.message}</div>
            }
            required
            {...register("birth_place", {
              required: {
                value: true,
                message: "Dibutuhkan",
              },
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <Controller
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DateInput
                error={error?.message}
                value={value}
                onChange={e => {
                  const date = new Date(e)
                  onChange(date)
                }}
                label="Tanggal Lahir"
                placeholder="Tanggal Lahir"
                styles={{
                  calendar: {
                    maxWidth: "500px"
                  },
                  calendarHeader: {
                    marginInline: "auto"
                  }
                }}
              />
            )}
            name={"birth_date"}
            control={control}
            rules={{
              required: {
                value: true,
                message: "Dibutuhkan",
              },
            }}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <Textarea
            label="Alamat"
            autosize
            minRows={3}
            placeholder="Alamat"
            error={errors.address && <div>{errors.address?.message}</div>}
            required
            {...register("address", {
              required: {
                value: true,
                message: "Dibutuhkan",
              },
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            label="Provinsi"
            placeholder="Provinsi"
            error={errors.province && <div>{errors.province?.message}</div>}
            required
            {...register("province", {
              required: {
                value: true,
                message: "Dibutuhkan",
              },
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            label="Kota/Kabupaten"
            placeholder="Kota/Kabupaten"
            error={errors.city && <div>{errors.city?.message}</div>}
            required
            {...register("city", {
              required: {
                value: true,
                message: "Dibutuhkan",
              },
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            label="Kecamatan"
            placeholder="Kecamatan"
            error={errors.district && <div>{errors.district?.message}</div>}
            required
            {...register("district", {
              required: {
                value: true,
                message: "Dibutuhkan",
              },
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            label="Kelurahan"
            placeholder="Kelurahan"
            error={
              errors.sub_district && <div>{errors.sub_district?.message}</div>
            }
            required
            {...register("sub_district", {
              required: {
                value: true,
                message: "Dibutuhkan",
              },
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            label="Kode Pos"
            placeholder="Kode Pos"
            withAsterisk={false}
            error={
              errors.postal_code && <div>{errors.postal_code?.message}</div>
            }
            required
            {...register("postal_code", {
              required: false,
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            label="Asal Sekolah"
            placeholder="Asal Sekolah"
            error={
              errors.school_origin && <div>{errors.school_origin?.message}</div>
            }
            required
            {...register("school_origin", {
              required: {
                value: true,
                message: "Dibutuhkan",
              },
            })}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default FormFieldBiodata;
