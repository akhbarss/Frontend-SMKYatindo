import { Box, Paper, SegmentedControl } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import Particles from "react-particles";
import { useLocation, useNavigate } from "react-router-dom";
import type { Engine } from "tsparticles-engine";
import { loadStarsPreset } from "tsparticles-preset-stars";
import AuthDaftar from "../../components/ppdb/authDaftar";
import AuthMasuk from "../../components/ppdb/authMasuk";
import useAuth from "../../hooks/useAuth.tsx";
import Page from "../../components/Page.tsx";

const LoginPPDB = () => {
  const [value, setValue] = useState("masuk");
  const [load, setLoad] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadStarsPreset(engine);
  }, []);

  const { setAuthUser } = useAuth();

  const accessToken = localStorage.getItem("accessToken");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/ppdb/login";

  console.log(location.state);
  console.log(from);

  useEffect(() => {
    // if (accessToken) {
    //   const jwt: JWT = jwtDecode(accessToken)
    //   const username = jwt.sub
    //
    //   if (username === "admin") {
    //
    //     setAuthUser({
    //       accessToken: accessToken,
    //       role: ["ADMIN"]
    //     })
    //     if (!location.state) {
    //       navigate("/ppdb/admin")
    //     } else {
    //       navigate(from, { replace: true })
    //     }
    //
    //   } else {
    //
    //     setAuthUser({
    //       accessToken: accessToken,
    //       role: ["SISWA"]
    //     })
    //
    //     if (!location.state) {
    //       navigate("/ppdb/siswa")
    //     } else {
    //       navigate(from, { replace: true })
    //     }
    //
    //   }
    // }
  }, [setAuthUser, accessToken, navigate, from, location.state]);

  return (
    <Page title={"Login"}>
      <Paper className={` bg-center bg-fixed bg-no-repeat bg-cover`}>
        <Particles
          id="name"
          init={particlesInit}
          options={{ preset: "stars" }}
        />

        <Box className="flex flex-col min-h-[87vh] p-5 ">
          <Box className="flex flex-col min-h-[87vh] p-5 ">
            <Box
              style={{
                borderImage:
                  "linear-gradient(to right bottom, #948BB8, blue, #020731) 1",
                borderWidth: "1px",
                borderStyle: "solid",
                backdropFilter: "blur(3px)",
                width: "100%",
                maxWidth: "40rem",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                margin: "auto",
                minHeight: "20rem",
                marginTop: "80px",
                marginBottom: "80px",
              }}
            >
              <SegmentedControl
                value={value}
                w={200}
                transitionDuration={400}
                radius={"xl"}
                onChange={setValue}
                // className='mx-auto text-white '
                style={{
                  marginInline: "auto",
                }}
                data={[
                  { label: "Masuk", value: "masuk" },
                  { label: "Daftar", value: "daftar" },
                ]}
                styles={{
                  indicator: {
                    backgroundImage:
                      "linear-gradient(160deg, #291872, #020731, black) ",
                  },
                }}
              />

              <AuthMasuk auth={value} load={load} setLoad={setLoad} />

              <AuthDaftar
                auth={value}
                load={load}
                setLoad={setLoad}
                setValue={setValue}
              />

              <div className="mt-10 text-gray-400 text-center">
                © 2023 D'Coders TKJ Yatindo. All Rights Reserved
              </div>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Page>
  );
};

export default LoginPPDB;
