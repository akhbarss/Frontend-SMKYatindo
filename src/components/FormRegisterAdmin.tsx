import React from "react";
import { PasswordInput, Stack, TextInput } from "@mantine/core";
import { useFormContext } from "react-hook-form";

export type TFormFieldRegisterAdmin = {
  username: string;
  fullname: string;
  password: string;
};

const FormRegisterAdmin = React.forwardRef((props, ref) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFormFieldRegisterAdmin>();

  return (
    <Stack>
      <TextInput
        withAsterisk
        label="Nomor Whatsapp/Username"
        required
        error={errors.username && <div>{errors.username?.message}</div>}
        {...register("username", {
          required: {
            value: true,
            message: "dibutuhkan",
          },
        })}
      />

      <TextInput
        error={errors.fullname && <div>{errors.fullname?.message}</div>}
        {...register("fullname", {
          required: {
            value: true,
            message: "dibutuhkan",
          },
        })}
        label="Nama Lengkap"
      />

      <PasswordInput
        withAsterisk
        label="Password"
        required
        error={errors.password && <div>{errors.password?.message}</div>}
        {...register("password", {
          required: {
            value: true,
            message: "dibutuhkan",
          },
        })}
      />
    </Stack>
  );
});

export default FormRegisterAdmin;
