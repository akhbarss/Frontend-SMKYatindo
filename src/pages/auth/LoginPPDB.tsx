import {
  Box,
  Button,
  PasswordInput,
  Group,
  Paper,
  Stack,
  TextInput,
  Title
} from "@mantine/core";
import Page from "../../components/Page";
import SideAuthLayout from "../../layouts/SideAuthLayout";
import { useBreakPoints } from "../../utils/UseBreakpoints";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LoginPayload, login } from "../../apis/login";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {

  const [noWhatsapp, setNoWhatsapp] = useState("")
  const [password, setPassword] = useState("")
  const loginMutation = useMutation({
    mutationFn: login
  })

  const { md, } = useBreakPoints()

  const navigate = useNavigate()

  const sampleSubmitData = (payload: LoginPayload) => {
    loginMutation.mutate(payload, {
      onSuccess: (response) => {
        toast.success('Successfully toasted!')
        const { data } = response
        
        const accessToken = data?.access_token as string

        if (accessToken) {
          localStorage.setItem("_TuVbwpW", accessToken)
          navigate("/ppdb/main/home")
        }
      },
      onError: (err) => {
        console.log("FAILED")
        console.log(err)
      },
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    sampleSubmitData({
      username: noWhatsapp,
      password
    })

  }

  return (
    <Page title={"Login"}>
      <Paper
        pt={`${!md ? "70px" : 0}`}
        className={`flex  min-h-[100vh]`}
      >
        <Box
          className="flex-[2] p-[0_1rem_] flex flex-col overflow-y-auto min-h-[87vh]  items-center"
        >
          <Box w={`${md ? "30rem" : "20rem"}`} className="py-[2rem] mx-auto mt-20 ">
            <Title align="center">Login</Title>

            <form onSubmit={submitHandler} className="mt-10">
              <Stack >

                <TextInput
                  withAsterisk
                  label="Nomor Whatsapp"
                  required
                  // type="number"
                  value={noWhatsapp}
                  onChange={e => setNoWhatsapp(e.target.value)}
                />

                <PasswordInput
                  withAsterisk
                  label="Password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />

                <Group
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: `${md ? "row" : "column"}`
                  }}
                >

                  <Link
                    to={"/ppdb/auth/register"}
                    className="text-[#103C6F] text-center"
                  >
                    Belum punya akun? daftar
                  </Link>

                  <Link
                    to={"https://wa.me/6281380908008"}
                    className="text-[#103C6F] text-center"
                  >
                    Lupa Password?
                  </Link>

                </Group>

                <Button type="submit" loading={loginMutation.status === "pending"}>
                  Login
                </Button>

              </Stack>
            </form>
          </Box>
        </Box>

        <SideAuthLayout />

      </Paper>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </Page>
  );
};

export default Login;

