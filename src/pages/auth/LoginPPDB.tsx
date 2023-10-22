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

const Login = () => {

  const { md, } = useBreakPoints()

  const navigate = useNavigate()

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    navigate("/ppdb/main/home")

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
                />

                <PasswordInput
                  withAsterisk
                  label="Password"
                  required
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

                <Button type="submit">
                  Login
                </Button>

              </Stack>
            </form>
          </Box>
        </Box>

        <SideAuthLayout />

      </Paper>
    </Page>
  );
};

export default Login;

