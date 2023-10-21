import {
  ActionIcon,
  Box,
  MantineProvider,
  Paper,
  SegmentedControl
} from "@mantine/core";
import jwtDecode from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import Particles from "react-particles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { Engine } from "tsparticles-engine";
import { loadStarsPreset } from "tsparticles-preset-stars";
import AuthDaftar from '../../components/ppdb/authDaftar';
import AuthMasuk from '../../components/ppdb/authMasuk';
import PageHeader from "../../components/ppdb/pageHeader";
import useAuth from "../../hooks/useAuth";
import { JWT } from "../../types/global";
import { useBreakPoints } from "../../utils/UseBreakpoints";

const LoginPPDB = () => {

  const { sm } = useBreakPoints()

  const [value, setValue] = useState("masuk")
  const [load, setLoad] = useState(false)

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadStarsPreset(engine);
  }, []);

  const { setAuthUser } = useAuth()

  const accessToken = localStorage.getItem("accessToken")

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/ppdb/login"

  console.log(location.state)
  console.log(from)

  useEffect(() => {

    if (accessToken) {
      const jwt: JWT = jwtDecode(accessToken)
      const username = jwt.sub

      if (username === "admin") {
        
        setAuthUser({
          accessToken: accessToken,
          role: ["ADMIN"]
        })
        if (!location.state) {
          navigate("/ppdb/admin")
        } else {
          navigate(from, { replace: true })
        }
        
      } else {
        
        setAuthUser({
          accessToken: accessToken,
          role: ["SISWA"]
        })

        if (!location.state) {
          navigate("/ppdb/siswa")
        } else {
          navigate(from, { replace: true })
        }
        
      }
    }
  }, [setAuthUser, accessToken, navigate, from, location.state])

  return (
    <main id="login" style={{ backgroundColor: "white" }}>
      <MantineProvider theme={{ colorScheme: "dark" }}>

        <PageHeader>
          <h1
            style={{
              color: "#C1C2C5",
              fontSize: "24px",
              fontWeight: "bold",
              display: `${!sm ? "none" : ""}`

            }}
          >
            PPDB SMK TINTA EMAS INDONESIA
          </h1>

          <Link to={"/ppdb"}>
            <ActionIcon variant="light" color="dark">
              <FaHome size={30} />
            </ActionIcon>
          </Link>
        </PageHeader>

        <Paper>
          <Particles
            id="name"
            init={particlesInit}
            options={{ preset: "stars", }}
          />

          <Box
            className="flex flex-col min-h-[87vh] p-5 "
          >
            <Box
              style={{
                borderImage: "linear-gradient(to right bottom, #948BB8, blue, #020731) 1",
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
                radius={'xl'}
                onChange={setValue}
                // className='mx-auto text-white '
                style={{
                  marginInline: "auto"
                }}
                data={[
                  { label: "Masuk", value: "masuk" },
                  { label: "Daftar", value: "daftar" },
                ]}
                styles={{
                  indicator: {
                    backgroundImage: "linear-gradient(160deg, #291872, #020731, black) ",
                  },
                }}
              />

              <AuthMasuk
                auth={value}
                load={load}
                setLoad={setLoad}
              />

              <AuthDaftar
                auth={value}
                load={load}
                setLoad={setLoad}
                setValue={setValue}
              />

              <footer
                // className="mt-10 text-gray-400 text-center"
                style={{
                  marginTop: "40px",
                  textAlign: "center"
                }}
              >
                © 2023 D'Coders TKJ Yatindo. All Rights Reserved
              </footer>
            </Box>
          </Box>
        </Paper>

      </MantineProvider>

    </main >

  )
}

export default LoginPPDB