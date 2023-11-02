import React from "react";
import {
  Grid,
  Group,
  Image,
  Radio,
  rem,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { HiPhoto } from "react-icons/hi2";
import { RadioGroupCustom } from "./fields/RadioGroup";
import SelectStatus from "./SelectStatus";
import { DateInput } from "@mantine/dates";

export type TFormFieldBiodata = {
  profile_picture: File[];
  nisn: string;
  phone: string;
  fullname: string;
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
  const theme = useMantineTheme();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TFormFieldBiodata>();

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
              <Text size="">Upload pas Photo 3x4, Max : 5MB</Text>
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
        name={"profile_picture"}
        control={control}
      />
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
            description="Nomor Whatsapp"
            label="Nomor WhatsApp"
            withAsterisk={false}
            placeholder="Nomor Whatsapp"
            error={errors.phone && <div>{errors.phone?.message}</div>}
            required
            {...register("phone", {
              required: false,
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            description="Nama Lengkap"
            label="Nama Lengkap"
            withAsterisk={false}
            placeholder="Nama Lengkap"
            error={errors.fullname && <div>{errors.fullname?.message}</div>}
            required
            {...register("fullname", {
              required: false,
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
            withAsterisk={true}
            label="Gender"
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
            render={({ field: { onChange, value } }) => (
              <SelectStatus
                type={"RELIGION"}
                readonly={false}
                label={"Agama"}
                onChange={onChange}
                value={value}
                searchable={false}
              />
            )}
            name={"religion"}
            control={control}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            label="Tempat Lahir"
            placeholder="Tempat Lahir"
            withAsterisk={false}
            error={
              errors.birth_place && <div>{errors.birth_place?.message}</div>
            }
            required
            {...register("birth_place", {
              required: false,
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <Controller
            render={({ field: { onChange, value } }) => (
              <DateInput
                value={value}
                withAsterisk={false}
                onChange={onChange}
                label="Tanggal Lahir"
                placeholder="Tanggal Lahir"
              />
            )}
            name={"birth_date"}
            control={control}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <Textarea
            label="Alamat"
            autosize
            minRows={3}
            withAsterisk={false}
            placeholder="Alamat"
            error={errors.address && <div>{errors.address?.message}</div>}
            required
            {...register("address", {
              required: false,
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            label="Provinsi"
            placeholder="Provinsi"
            withAsterisk={false}
            error={errors.province && <div>{errors.province?.message}</div>}
            required
            {...register("province", {
              required: false,
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            label="Kota/Kabupaten"
            placeholder="Kota/Kabupaten"
            withAsterisk={false}
            error={errors.city && <div>{errors.city?.message}</div>}
            required
            {...register("city", {
              required: false,
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            label="Kecamatan"
            placeholder="Kecamatan"
            withAsterisk={false}
            error={errors.district && <div>{errors.district?.message}</div>}
            required
            {...register("district", {
              required: false,
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            label="Kelurahan"
            placeholder="Kelurahan"
            withAsterisk={false}
            error={
              errors.sub_district && <div>{errors.sub_district?.message}</div>
            }
            required
            {...register("sub_district", {
              required: false,
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
            withAsterisk={false}
            error={
              errors.school_origin && <div>{errors.school_origin?.message}</div>
            }
            required
            {...register("school_origin", {
              required: false,
            })}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default FormFieldBiodata;
