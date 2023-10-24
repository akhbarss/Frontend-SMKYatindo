import { Box, Paper, Stack, Stepper, Title, rem } from "@mantine/core";
import { useState } from "react";
import { BsCheck } from "react-icons/bs";
import Page from "../../components/Page";
import RegisterIdentitasDiri from "../../components/auth/RegisterIdentitasDiri";
import RegisterInformasiKredensial from "../../components/auth/RegisterInformasiKredensial";
import SideAuthLayout from "../../layouts/SideAuthLayout";
import { useBreakPoints } from "../../utils/UseBreakpoints";
import { useMutation } from "@tanstack/react-query";
import { registration, RegistrationPayload } from "../../apis/registration";
import ResponseError from "../../utils/ResponseError";
import { modals } from "@mantine/modals";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [noWhatssap, setNoWhatsapp] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [alamat, setAlamat] = useState("");
  const [password, setPassword] = useState("");
  const [asalSekolah, setAsalSekolah] = useState("");
  const navigate = useNavigate();

  const [active, setActive] = useState(0);
  const [highestStepVisited, setHighestStepVisited] = useState(active);
  const registrationMutation = useMutation({
    mutationFn: registration,
  });
  const { md } = useBreakPoints();

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };

  const sampleSubmitData = (payload: RegistrationPayload) => {
    registrationMutation.mutate(payload, {
      onSuccess: (response) => {
        if (import.meta.env.VITE_SESSION === "localstorage") {
          localStorage.setItem("_TuVbwpW", response.data.access_token); // access_token
          localStorage.setItem("_RuvTpQv", response.data.refresh_token); // refresh_token
        }

        modals.openContextModal({
          modal: "modalSuccess",
          innerProps: {
            onAccept: () => {
              navigate("/ppdb/main/home");
            },
            modalBody: `Selamat, anda telah berhasil memulai awal PPDB. silahkan klik lanjutkan`,
          },
          closeOnClickOutside: false,
          closeOnEscape: false,
          withCloseButton: false,
        });
      },
      onError: (err) => ResponseError(err),
    });
  };

  const submitHandler = () => {
    const data = {
      username: noWhatssap,
      password: password,
      role: "USER",
      studentData: {
        address: alamat,
        name: namaLengkap,
        school_origin: asalSekolah,
      },
    };

    sampleSubmitData(data);
  };

  const shouldAllowSelectStep = (step: number) =>
    highestStepVisited >= step && active !== step;

  return (
    <Page title={"Daftar"}>
      <Paper pt={`${!md ? "70px" : 0}`} className={`flex  min-h-[100vh]`}>
        <Box
          // h={"100vh"}
          className="flex-[2] p-[0_1rem_] flex flex-col overflow-y-auto min-h-[100vh]"
        >
          <Stack w={`${md ? "30rem" : "20rem"}`} className="py-[2rem] mx-auto ">
            <Title align="center">Daftar</Title>

            <Stepper
              active={active}
              onStepClick={setActive}
              radius={"xs"}
              mt={20}
              className=" "
              styles={{
                stepIcon: {
                  borderWidth: rem(4),
                },
              }}
              breakpoint={"sm"}
            >
              <Stepper.Step
                label="Identitas Diri"
                allowStepSelect={shouldAllowSelectStep(0)}
                icon={<BsCheck size={30} />}
              >
                <RegisterIdentitasDiri
                  noWhatsapp={noWhatssap}
                  setNoWhatsapp={setNoWhatsapp}
                  active={active}
                  handleStepChange={handleStepChange}
                  alamat={alamat}
                  asalSekolah={asalSekolah}
                  namaLengkap={namaLengkap}
                  setAlamat={setAlamat}
                  setAsalSekolah={setAsalSekolah}
                  setNamaLengkap={setNamaLengkap}
                />
              </Stepper.Step>

              <Stepper.Step
                label="Informasi Kredensial"
                allowStepSelect={shouldAllowSelectStep(1)}
                icon={<BsCheck size={30} />}
              >
                <RegisterInformasiKredensial
                  registrationMutation={registrationMutation}
                  noWhatsapp={noWhatssap}
                  password={password}
                  setPassword={setPassword}
                  onSubmit={submitHandler}
                />
              </Stepper.Step>

              <Stepper.Completed>
                <>Completed, click back button to get to previous step</>
              </Stepper.Completed>
            </Stepper>
          </Stack>
        </Box>

        <SideAuthLayout />
      </Paper>
    </Page>
  );
};

export default Register;
