import { createFormContext } from "@mantine/form";

export interface RegisterFormValues {
  username: string;
  fullname: string;
  password: string;
}

export const [RegisterFormProvider, useRegisterFormContext, useRegisterForm] =
  createFormContext<RegisterFormValues>();

export interface AlurFormValues {
  id: null | number;
  title: string;
  desc: string;
  grade: "SMK" | "SMP";
}
export const [AlurFormProvider, useAlurFormContext, useAlurForm] =
  createFormContext<AlurFormValues>();
