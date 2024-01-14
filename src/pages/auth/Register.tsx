/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Paper, Stack, Stepper, Text, Title, rem } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { RegistrationPayload, registration } from "../../apis/registration";
import Page from "../../components/Page";
import RegisterIdentitasDiri from "../../components/auth/RegisterIdentitasDiri";
import RegisterInformasiKredensial from "../../components/auth/RegisterInformasiKredensial";
import SideAuthLayout from "../../layouts/SideAuthLayout";
import ResponseError from "../../utils/ResponseError";
import { useBreakPoints } from "../../utils/UseBreakpoints";

const Register = () => {
  const [pageRegister, setPage] = useState<"SMK" | "SMP">(null)

  const [noWhatssap, setNoWhatsapp] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jenkel, setJenkel] = useState("")
  const [password, setPassword] = useState("");
  const [asalSekolah, setAsalSekolah] = useState("");
  const navigate = useNavigate();

  const [active, setActive] = useState(0);
  const [highestStepVisited, setHighestStepVisited] = useState(active);
  const registrationMutation = useMutation({
    mutationFn: registration,
  });
  const { md } = useBreakPoints();

  const { pathname } = useLocation()

  useEffect(() => {
    const path = pathname.substring(1).split("/")
    const grade = path[3].toUpperCase() as "SMK" || "SMP"
    setPage(grade)
  }, [pathname])

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
          // @ts-ignore
          localStorage.setItem("_TuVbwpW", response.data.access_token); // access_token
          // @ts-ignore
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
    const data: RegistrationPayload = {
      username: noWhatssap,
      password: password,
      role: "USER",
      studentData: {
        address: alamat,
        name: namaLengkap,
        school_origin: asalSekolah,
        grade: pageRegister
      },
    };

    sampleSubmitData(data);
  };

  const shouldAllowSelectStep = (step: number) =>
    highestStepVisited >= step && active !== step;

  return (
    <Page
      title={`
        Daftar
        ${pageRegister === "SMK" ? "SMK" : ""}
        ${pageRegister === "SMP" ? "SMP" : ""}`
      }
    >
      <Paper pt={`${!md ? "70px" : 0}`} className={`flex  min-h-[100vh]`}>
        <Box
          className={`flex-[2] p-[0_1rem_] flex flex-col justify-center items-center overflow-y-auto min-h-[100vh] 
          ${!md && "bg-[url(/big-bg-auth.png)]"} bg-cover bg-no-repeat bg-right`
          }
        >
          <Stack w={`${md ? "30rem" : "20rem"}`} py={100}>
            <Title align="center">
              <Text component="span">
                Daftar
              </Text>
              <Text component="span">
                {pageRegister === "SMK" && " SMK"}
                {pageRegister === "SMP" && " SMP"}
              </Text>
            </Title>

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
                  jenkel={jenkel}
                  setJenkel={setJenkel}
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

        <SideAuthLayout page={pageRegister} />
      </Paper>
    </Page>
  );
};

export default Register;
