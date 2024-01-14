import React, { useImperativeHandle } from "react";
import { Radio, Stack, TextInput } from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";

export type TFormFieldJalurPendafataran = {
  path: string;
  name: string;
};

type TFormJalurPendaftaran = {
  onSubmit: SubmitHandler<TFormFieldJalurPendafataran>;
};

const FormJalurPendaftaran = React.forwardRef(
  (props: TFormJalurPendaftaran, ref) => {
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
            {...register("path", {
              required: {
                value: true,
                message: "Dibutuhkan",
              },
            })}
            name={"path"}
            label="Tipe Jalur"
            description="Pilih salah satu"
            styles={{
              error: {
                marginTop: "10px",
              },
            }}
            required
            error={errors.path && <div>{errors.path?.message}</div>}
            onChange={(value) => {
              setValue("path", value);
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
        </form>
      </Stack>
    );
  }
);

export default FormJalurPendaftaran;
