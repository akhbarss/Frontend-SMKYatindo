import {
  Box,
  Button,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { scroller } from 'react-scroll';
import { LoginPayload, login } from "../../apis/login";
import Page from "../../components/Page";
import SideAuthLayout from "../../layouts/SideAuthLayout";
import ResponseError from "../../utils/ResponseError";
import { useBreakPoints } from "../../utils/UseBreakpoints";

const Login = () => {
  const [noWhatsapp, setNoWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useMutation({
    mutationFn: login,
  });

  const { md } = useBreakPoints();

  const navigate = useNavigate();

  const sampleSubmitData = (payload: LoginPayload) => {
    loginMutation.mutate(payload, {
      onSuccess: (response) => {
        toast.success("Sukses Login!");

        localStorage.setItem("_TuVbwpW", response.data.access_token);
        localStorage.setItem("_RuvTpQv", response.data.refresh_token);
        navigate("/ppdb/main/home");
      },
      onError: (err) => ResponseError(err),
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sampleSubmitData({
      username: noWhatsapp,
      password,
    });
  };

  return (
    <Page title={"Login"}>
      <Paper pt={`${!md ? "70px" : 0}`} className={`flex  min-h-[100vh]`}>
        <Box
          className={`flex-[2] p-[0_1rem_] flex flex-col overflow-y-auto min-h-[87vh]  items-center justify-center
            ${!md && "bg-[url(/bg-layout-auth.png)]"} bg-contain bg-no-repeat bg-right`
          }
        >
          <Box
            w={`${md ? "30rem" : "20rem"}`}
            // className="py-[2rem] mx-auto mt-20 "
          >
            <Title align="center">Login</Title>

            <form onSubmit={submitHandler} className="mt-10">
              <Stack>
                <TextInput
                  withAsterisk
                  label="Nomor Whatsapp"
                  required
                  // type="number"
                  value={noWhatsapp}
                  onChange={(e) => setNoWhatsapp(e.target.value)}
                />

                <PasswordInput
                  withAsterisk
                  label="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Group
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: `${md ? "row" : "column"}`,
                  }}
                >
                  <Text
                    // to={"/ppdb/auth/register"}
                    className="text-[#103C6F] text-center underline cursor-pointer"
                    onClick={() => {
                      navigate("/ppdb")
                      setTimeout(() => {
                        scroller.scrollTo("ppdb", {
                          duration: 500,
                          delay: 100,
                          smooth: true,
                          offset: -100,
                        });
                      }, 300)

                    }}
                  >
                    Belum punya akun? daftar
                  </Text>

                  <Link
                    to={"https://wa.me/6281380908008"}
                    className="text-[#103C6F] text-center"
                  >
                    Lupa Password?
                  </Link>
                </Group>

                <Button
                  type="submit"
                  loading={loginMutation.status === "pending"}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>

        <SideAuthLayout page={null} />
      </Paper>
    </Page>
  );
};

export default Login;
