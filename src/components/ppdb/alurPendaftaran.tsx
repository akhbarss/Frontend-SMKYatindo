import {
  Box,
  Divider,
  Stepper,
  Text,
  Title,
  useMantineTheme
} from "@mantine/core";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { GetAllAlurPendaftaran } from "../../apis/alur/getAlur";
import { useBreakPoints } from "../../utils/UseBreakpoints";
import TiptapOutput from "./tiptapOutput";

const AlurPendaftaran = () => {
  const { xs } = useBreakPoints();
  const theme = useMantineTheme();
  const dark = theme.colorScheme === "dark";

  const { data: alurPendaftaran } = useQuery({
    queryKey: ["get_all_alur_pendaftaran"],
    queryFn: GetAllAlurPendaftaran,
  });

  const filterAlurBySMP = alurPendaftaran?.data
    ?.filter(alur => alur.grade === "SMP")
    .sort((a, b) => a.id - b.id)
  const filterAlurBySMK = alurPendaftaran?.data
    ?.filter(alur => alur.grade === "SMK")
    .sort((a, b) => a.id - b.id)

  return (
    <>
      <Box id="alur-pendaftaran" mt={100} className="flex flex-col">
        <Box className="bg-white shadow-md max rounded-full px-[4rem] flex justify-center mx-auto py-2">
          <Title size={xs ? "2.5vw" : "5vw"} color="dark" weight={"bold"}>Alur Pendaftaran SMP</Title>
        </Box>
        {alurPendaftaran && filterAlurBySMP?.length > 0 ? (
          <Box className="mt-10 flex max-w-[60rem] w-full mx-auto">
            <Stepper
              active={0}
              orientation="vertical"
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                flex: "1",
              }}
              styles={{
                stepWrapper: {
                  width: "3.5rem",
                  height: "3.5rem",
                },
                separator: {
                  backgroundColor: "white"
                },
                verticalSeparatorActive: {
                  // backgroundColor: "white"
                },


                stepIcon: {
                  border: "none",
                  // backgroundColor: `${dark ? "#291872" : "#020731"}`,
                  background: "linear-gradient(to bottom, #2A166F, #420BFF)",
                  color: "white",
                  borderRadius: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  boxShadow: `5px 5px 10px -5px ${dark ? "#291872" : "black"}`,
                },
                verticalSeparator: {
                  borderLeft: `2px solid ${dark ? "#291872" : "#291872"}`,
                  position: "absolute",
                  top: "calc(3.5rem + calc(2rem / 2))",
                  left: "calc(3.5rem / 2)",
                },
                steps: {
                  flex: 1,
                },
                step: {
                  // display: "flex",
                  width: "100%",
                  gap: xs ? "2rem" : "",
                },
                stepBody: {
                  flex: 1,
                },
                stepDescription: {
                  margin: 0,
                },
              }}
            >
              {filterAlurBySMP &&
                filterAlurBySMP?.map((alur) => (
                  <Stepper.Step
                    key={alur.id}
                    mb={10}
                    description={
                      <Box
                        style={{
                          backgroundColor: `${dark ? theme.colors.dark[9] : "#dbe1fe"
                            }`,
                          color: `${dark ? "white" : "black"}`,
                          borderRadius: "12px",
                          padding: `${xs ? "1rem" : "0.5rem"}`,
                        }}
                      >
                        <div
                          style={{
                            width: "fit-content",
                            fontWeight: "bold",
                            color: `${dark ? "#6449da" : "#020731"}`,
                          }}
                        >
                          <h1 style={{ fontSize: "22px" }}>{alur.title}</h1>
                          <Divider
                            size={4}
                            color={dark ? "#6449da" : "#020731"}
                            w={"60%"}
                          />
                        </div>
                        <div
                          style={{
                            marginTop: "24px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "25px",
                            lineHeight: "20px",
                          }}
                        >
                          <TiptapOutput desc={alur.content} />
                        </div>
                      </Box>
                    }
                  />
                ))}
            </Stepper>
          </Box>
        ) : (
          <Box className="mt-5 bg-white rounded-xl p-10 max-w-[25rem] mx-auto">
            <Text align="center" color="dark" weight={"bold"}>Alur Pendaftaran Kosong</Text>
            <Text align="center" size={"sm"} color="dark">
              Silakan hubungi <Text component={Link} underline color="blue" to={"https://wa.me/6281380908008"} target="_blank" >Admin</Text> untuk info alur pendaftaran</Text>
          </Box>
        )}

        <Box className="bg-white shadow-md max rounded-full px-[4rem] flex justify-center mx-auto py-2 mt-20">
          <Title size={xs ? "2.5vw" : "5vw"} color="dark" weight={"bold"}>Alur Pendaftaran SMK</Title>
        </Box>
        {alurPendaftaran && filterAlurBySMK?.length > 0 ? (
          <Box className="mt-10 flex max-w-[60rem] w-full mx-auto">
            <Stepper
              active={0}
              orientation="vertical"
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                flex: "1",
              }}
              styles={{
                stepWrapper: {
                  width: "3.5rem",
                  height: "3.5rem",
                },
                stepIcon: {
                  border: "none",
                  // backgroundColor: `${dark ? "#291872" : "#020731"}`,
                  background: "linear-gradient(to bottom, #2A166F, #420BFF)",
                  color: "white",
                  borderRadius: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  boxShadow: `5px 5px 10px -5px ${dark ? "#291872" : "black"}`,
                },
                verticalSeparator: {
                  borderLeft: `2px solid ${dark ? "#291872" : "#020731"}`,
                  position: "absolute",
                  top: "calc(3.5rem + calc(2rem / 2))",
                  left: "calc(3.5rem / 2)",
                },
                steps: {
                  flex: 1,
                },
                step: {
                  display: "flex",
                  width: "100%",
                  gap: xs ? "2rem" : "",
                },
                stepBody: {
                  flex: 1,
                },
                stepDescription: {
                  margin: 0,
                },
              }}
            >
              {filterAlurBySMK &&
                filterAlurBySMK?.map((alur) => (
                  <Stepper.Step
                    key={alur.id}
                    mb={10}
                    description={
                      <Box
                        style={{
                          backgroundColor: `${dark ? theme.colors.dark[9] : "#dbe1fe"
                            }`,
                          color: `${dark ? "white" : "black"}`,
                          borderRadius: "12px",
                          padding: `${xs ? "1rem" : "0.5rem"}`,
                        }}
                      >
                        <div
                          style={{
                            width: "fit-content",
                            fontWeight: "bold",
                            color: `${dark ? "#6449da" : "#020731"}`,
                          }}
                        >
                          <h1 style={{ fontSize: "22px" }}>{alur.title}</h1>
                          <Divider
                            size={4}
                            color={dark ? "#6449da" : "#020731"}
                            w={"60%"}
                          />
                        </div>
                        <div
                          style={{
                            marginTop: "24px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "25px",
                            lineHeight: "20px",
                          }}
                        >
                          <TiptapOutput desc={alur.content} />
                        </div>
                      </Box>
                    }
                  />
                ))}
            </Stepper>
          </Box>
        ) : (
          <Box className="mt-5 bg-white rounded-xl p-10 max-w-[25rem] mx-auto">
            <Text align="center" color="dark" weight={"bold"}>Alur Pendaftaran Kosong</Text>
            <Text align="center" size={"sm"} color="dark">
              Silakan hubungi <Text component={Link} underline color="blue" to={"https://wa.me/6281380908008"} target="_blank" >Admin</Text> untuk info alur pendaftaran</Text>
          </Box>
        )}
      </Box>
    </>
  );
};

export default AlurPendaftaran;
