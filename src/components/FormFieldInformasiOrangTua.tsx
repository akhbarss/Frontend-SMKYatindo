import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Grid,
  Group,
  Image,
  rem,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { HiPhoto } from "react-icons/hi2";

export type TFormFieldInformasiOrangTua = {
  dad_name: string;
  dad_phone: string;
  dad_job: string;
  dad_address: string;

  mother_name: string;
  mother_phone: string;
  mother_job: string;
  mother_address: string;

  family_card: File[];
  birth_card: File[];
};

const FormFieldInformasiOrangTua = () => {
  const theme = useMantineTheme();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TFormFieldInformasiOrangTua>();
  return (
    <Stack spacing={10}>
      <Grid>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            description="Nama Ayah"
            label="Nama Ayah"
            placeholder="Nama Ayah"
            withAsterisk={false}
            error={errors.dad_name && <div>{errors.dad_name?.message}</div>}
            required
            {...register("dad_name", {
              required: false,
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            description="Nama Ibu"
            label="Nama Ibu"
            placeholder="Nama Ibu"
            withAsterisk={false}
            error={
              errors.mother_name && <div>{errors.mother_name?.message}</div>
            }
            required
            {...register("mother_name", {
              required: false,
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            description="Pekerjaan Ayah"
            label="Pekerjaan Ayah"
            withAsterisk={false}
            placeholder="Pekerjaan Ayah"
            error={errors.dad_job && <div>{errors.dad_job?.message}</div>}
            required
            {...register("dad_job", {
              required: false,
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            description="Pekerjaan Ibu"
            label="Pekerjaan Ibu"
            placeholder="Pekerjaan Ibu"
            withAsterisk={false}
            error={errors.mother_job && <div>{errors.mother_job?.message}</div>}
            required
            {...register("mother_job", {
              required: false,
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            description="Nomor Telepon Ayah"
            label="Nomor Telepon Ayah"
            placeholder="Nomor Telepon Ayah"
            withAsterisk={false}
            error={errors.dad_phone && <div>{errors.dad_phone?.message}</div>}
            required
            {...register("dad_phone", {
              required: false,
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <TextInput
            description="Nomor Telepon Ibu"
            label="Nomor Telepon Ibu"
            placeholder="Nomor Telepon Ibu"
            withAsterisk={false}
            error={
              errors.mother_phone && <div>{errors.mother_phone?.message}</div>
            }
            required
            {...register("mother_phone", {
              required: false,
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <Textarea
            label="Alamat Ayah"
            autosize
            minRows={3}
            placeholder="Alamat Ayah"
            error={
              errors.dad_address && <div>{errors.dad_address?.message}</div>
            }
            withAsterisk={false}
            required
            {...register("dad_address", {
              required: false,
            })}
          />
        </Grid.Col>
        <Grid.Col lg={6} sm={12}>
          <Textarea
            label="Alamat Ibu"
            autosize
            minRows={3}
            placeholder="Alamat Ibu"
            error={
              errors.mother_address && (
                <div>{errors.mother_address?.message}</div>
              )
            }
            withAsterisk={false}
            required
            {...register("mother_address", {
              required: false,
            })}
          />
        </Grid.Col>
      </Grid>
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
              <Text size="">
                Upload kartu Keluarga 3x4, Max : 5MB ( WAJIB )
              </Text>
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
        name={"family_card"}
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
              <Text size="">
                Upload akta kelahiran 3x4, Max : 5MB ( WAJIB )
              </Text>
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
        rules={{
          required: {
            value: true,
            message: "Dibutuhkan",
          },
        }}
        name={"birth_card"}
        control={control}
      />
    </Stack>
  );
};

export default FormFieldInformasiOrangTua;
