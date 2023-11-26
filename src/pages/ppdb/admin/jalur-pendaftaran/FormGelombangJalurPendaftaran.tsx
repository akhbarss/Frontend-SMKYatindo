import React, { useImperativeHandle } from "react";
import { Grid, Radio, Stack, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { SubmitHandler, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";

type TFormGelombangJalurPendaftaran = {
  onSubmit: SubmitHandler<any>;
};

const FormGelombangJalurPendaftaran = React.forwardRef(
  (props: TFormGelombangJalurPendaftaran, ref) => {
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm();

    useImperativeHandle(ref, () => ({
      handleSubmit() {
        handleSubmit(props.onSubmit)();
      },
    }));

    return (
      <Stack sx={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit(props.onSubmit)}>
          <Radio.Group
            {...register("path_type", {
              required: {
                value: true,
                message: "Dibutuhkan",
              },
            })}
            name={"path_type"}
            label="Tipe Jalur"
            description="Pilih salah satu"
            styles={{
              error: {
                marginTop: "10px",
              },
            }}
            required
            error={errors.path_type && <div>{errors.path_type?.message}</div>}
            onChange={(value) => {
              setValue("path_type", value);
            }}
          >
            <Radio label="Pembelian" value={"pembelian"} />
            <Radio label="Pengembalian" value={"pengembalian"} />
          </Radio.Group>

          <TextInput
            error={errors.name && <div>{errors.name?.message}</div>}
            {...register("name", {
              required: {
                value: true,
                message: "dibutuhkan",
              },
            })}
            label="Nama"
          />

          <Grid sx={{ zIndex: 10000000 }}>
            <Grid.Col md={6}>
              <DateTimePicker
                {...register("start_date", {
                  required: {
                    value: true,
                    message: "dibutuhkan",
                  },
                  valueAsDate: true,
                })}
                error={
                  errors.start_date && <div>{errors.start_date?.message}</div>
                }
                label="Waktu Dibuka"
                onChange={(value) => setValue("start_date", value)}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <DateTimePicker
                {...register("end_date", {
                  required: {
                    value: true,
                    message: "dibutuhkan",
                  },
                  valueAsDate: true,
                })}
                label="Waktu Ditutup"
                error={errors.end_date && <div>{errors.end_date?.message}</div>}
                onChange={(value) => setValue("end_date", value)}
              />
            </Grid.Col>
          </Grid>

          <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            prefix="Rp. "
            customInput={TextInput}
            error={errors.price && <div>{errors.price?.message}</div>}
            placeholder="Rp. 0"
            label="Biaya Pendaftaran"
            onChange={console.log}
            description="Input Nominal"
            required
            {...register("price", {
              required: false,
              valueAsNumber: true,
            })}
            onValueChange={(values) => {
              setValue("price", values.floatValue);
            }}
          />
        </form>
      </Stack>
    );
  }
);

export default FormGelombangJalurPendaftaran;
