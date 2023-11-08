import {
  Box,
  Button,
  PasswordInput,
  Group,
  Paper,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import Page from "../../components/Page";
import SideAuthLayout from "../../layouts/SideAuthLayout";
import { useBreakPoints } from "../../utils/UseBreakpoints";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LoginPayload, login } from "../../apis/login";
import toast, { Toaster } from "react-hot-toast";
import ResponseError from "../../utils/ResponseError";
import FormRegisterAdmin, {
  TFormFieldRegisterAdmin,
} from "../../components/FormRegisterAdmin";
import FormWrapper from "../../components/FormWrapper";
import { registrationAdmin } from "../../apis/registration";
import { SubmitHandler } from "react-hook-form";

const RegisterAdmin = () => {
  const { md } = useBreakPoints();
  const registrationMutation = useMutation({
    mutationFn: registrationAdmin,
  });
  const navigate = useNavigate();

  const submitData: SubmitHandler<TFormFieldRegisterAdmin> = (payload) => {
    registrationMutation.mutate(payload, {
      onSuccess: (response) => {
        toast.success("Sukses mendaftarkan, sekarang anda bisa login! ");
        navigate("/ppdb/auth/login");
      },
      onError: (err) => ResponseError(err),
    });
  };

  return (
    <Page title={"Daftar User Admin"}>
      <Paper pt={`${!md ? "70px" : 0}`} className={`flex  min-h-[100vh]`}>
        <Box className="flex-[2] p-[0_1rem_] flex flex-col overflow-y-auto min-h-[87vh]  items-center">
          <Box
            w={`${md ? "30rem" : "20rem"}`}
            className="py-[2rem] mx-auto mt-20 "
          >
            <Title align="center">Daftar User Admin</Title>
            <FormWrapper id={"form-registeradmin"} onSubmit={submitData}>
              <Stack className={"mt-10"}>
                <FormRegisterAdmin />

                <Group
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: `${md ? "row" : "column"}`,
                  }}
                >
                  <Link
                    to={"/ppdb/auth/login"}
                    className="text-[#103C6F] text-center"
                  >
                    Sudah punya akun ?
                  </Link>

                  <Link
                    to={"https://wa.me/6281380908008"}
                    className="text-[#103C6F] text-center"
                  >
                    Butuh bantuan ?
                  </Link>
                </Group>

                <Button type="submit" loading={registrationMutation.status === "pending"}>
                  Daftar
                </Button>
              </Stack>
            </FormWrapper>
          </Box>
        </Box>

        <SideAuthLayout page={null} />
      </Paper>
    </Page>
  );
};

export default RegisterAdmin;
