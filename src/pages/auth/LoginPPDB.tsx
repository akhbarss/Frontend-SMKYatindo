import {
  Box,
  Group,
  MantineProvider,
  Paper,
  SegmentedControl
} from "@mantine/core";
import { useCallback, useState } from "react";
import { FaHome } from "react-icons/fa";
import Particles from "react-particles";
import { Link } from "react-router-dom";
import type { Engine } from "tsparticles-engine";
import { loadStarsPreset } from "tsparticles-preset-stars";
import AuthDaftar from '../../components/ppdb/authDaftar';
import AuthMasuk from '../../components/ppdb/authMasuk';
import PageHeader from "../../components/ppdb/pageHeader";

const LoginPPDB = () => {

  const [value, setValue] = useState("masuk")
  const [load, setLoad] = useState(false)

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadStarsPreset(engine);
  }, []);

  return (
    <main id="login" className="bg-white">
      <MantineProvider theme={{ colorScheme: "dark" }}>


        <PageHeader>

          <h1 className="text-[#C1C2C5] text-2xl font-bold max-md:hidden">PPDB SMK TINTA EMAS INDONESIA</h1>

          <Group>

            <Link to={"/ppdb"}>
              <FaHome
                size={30}
                style={{

                }}
                className={`cursor-pointer text-gray-300 hover:text-white`}
              />
            </Link>

          </Group>

        </PageHeader>

        <Paper className={` bg-center bg-fixed bg-no-repeat bg-cover 
      `} >

          <Particles
            id="name"
            init={particlesInit}
            options={{ preset: "stars", }}
          />

          <Box
            className="flex flex-col min-h-[87vh] p-5 "
          >
            <Box
              className="w-[100%] max-w-[40rem] p-8 border flex flex-col mx-auto min-h-[20rem] mt-20 mb-20 z-50"
              sx={{
                borderImageSource: "linear-gradient(to right bottom, #948BB8, blue, #020731)",
                borderImageSlice: '1',
                backdropFilter: "blur(3px)"
              }}
            >

              <SegmentedControl
                value={value}
                w={200}
                transitionDuration={400}
                radius={'xl'}
                onChange={setValue}
                className='mx-auto text-white '
                data={[
                  { label: "Masuk", value: "masuk" },
                  { label: "Daftar", value: "daftar" },
                ]}
                styles={{
                  indicator: {
                    backgroundImage: "linear-gradient(160deg, #291872, #020731, black) ",
                    color: "white"
                  },
                  root: {
                    backgroundColor: "#141517",
                    color: "white"
                  },
                  input: {
                    color: "wheat"
                  },
                  control: {
                    color: "white"
                  },
                  label: {
                    color: "white"
                  },
                  controlActive: {
                    color: "white"
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

              <div className="mt-10 text-gray-400 text-center">
                © 2023 D'Coders TKJ Yatindo. All Rights Reserved
              </div>
            </Box>
          </Box>
        </Paper>

      </MantineProvider>

    </main >

  )
}

export default LoginPPDB