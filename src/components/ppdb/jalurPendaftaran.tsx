import { Box, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getJalurGlobal } from "../../apis/jalur/getJalurGlobal";
import { useBreakPoints } from "../../utils/UseBreakpoints";
import BiayaJalurPendaftaran from "./biayaJalurPendaftaran";
import CardJalurPendaftaran from "./cardJalurPendaftaran";
import JadwalJalurPendaftaran from "./jadwalJalurPendaftaran";
import { Link } from "react-router-dom";

const JalurPendaftaran = () => {
  const { xs } = useBreakPoints();

  const { data } = useQuery({
    queryKey: ["get_jalur_global"],
    queryFn: getJalurGlobal
  })

  const filterJalurBySMP = data?.data
    ?.filter(jalur => jalur?.grade === "SMP")
    ?.sort((a, b) => a.id - b.id)

  const filterJalurBySMK = data?.data
    ?.filter(jalur => jalur?.grade === "SMK")
    ?.sort((a, b) => a.id - b.id)

  // const [activeCardSMP, setActiveCardSMP] = useState(data?.data[0]?.id);
  const [activeCardSMP, setActiveCardSMP] = useState(filterJalurBySMP?.length > 0 ? filterJalurBySMP[0]?.id : null);
  const [activeCardSMK, setActiveCardSMK] = useState(filterJalurBySMK?.length > 0 ? filterJalurBySMK[0]?.id : null);
  const [batchSMP, setBatchSMP] = useState(() => {
    return filterJalurBySMP?.length > 0 ? filterJalurBySMP[0] : null;
  });
  const [batchSMK, setBatchSMK] = useState(() => {
    return filterJalurBySMK?.length > 0 ? filterJalurBySMK[0] : null;
  });


  useEffect(() => {
    if (filterJalurBySMP?.length > 0) {
      setBatchSMP(filterJalurBySMP[0])
      setActiveCardSMP(filterJalurBySMP[0]?.id)
    }
    if (filterJalurBySMK?.length > 0) {
      setBatchSMK(filterJalurBySMK[0])
      setActiveCardSMK(filterJalurBySMK[0]?.id)
    }
  }, [data?.data])


  return (
    <>
      <Box
        id="jalur-pendaftaran"
        mt={100}
        sx={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <Box className="bg-white shadow-md max rounded-full px-[4rem] flex justify-center mx-auto py-2">
          <Title size={xs ? "2.5vw" : "5vw"} color="dark" weight={"bold"}>Jalur Pendaftaran SMP</Title>
        </Box>

        {
          filterJalurBySMP?.length > 0 ? (
            <>
              <CardJalurPendaftaran
                activeCard={activeCardSMP}
                setActiveCard={setActiveCardSMP}
                setBatch={setBatchSMP}
                data={filterJalurBySMP}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  fontSize: "22px",
                  fontWeight: "bold",
                  maxWidth: "50rem",
                  marginInline: "auto"
                }}
              >
                <BiayaJalurPendaftaran batch={batchSMP} />

                <JadwalJalurPendaftaran batch={batchSMP} />
              </Box>
            </>
          ) : (
            <>
              <Box className="mt-5 bg-white rounded-xl p-10 max-w-[25rem] mx-auto">
                <Text align="center" color="dark" weight={"bold"}>Jalur Pendaftaran Kosong</Text>
                <Text align="center" size={"sm"} color="dark">
                  Silakan hubungi <Text component={Link} underline color="blue" to={"https://wa.me/6281380908008"} target="_blank" >Admin</Text> untuk info jalur pendaftaran</Text>
              </Box>
            </>
          )
        }
        <Box className="bg-white shadow-md max rounded-full px-[4rem] flex justify-center mx-auto py-2 mt-20">
          <Title size={xs ? "2.5vw" : "5vw"} color="dark" weight={"bold"}>Jalur Pendaftaran SMK</Title>
        </Box>

        {
          filterJalurBySMP?.length > 0 ? (
            <>
              <CardJalurPendaftaran
                activeCard={activeCardSMK}
                setActiveCard={setActiveCardSMK}
                setBatch={setBatchSMK}
                data={filterJalurBySMK}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  fontSize: "22px",
                  fontWeight: "bold",
                  maxWidth: "50rem",                 
                  marginInline: "auto"
                }}
              >
                <BiayaJalurPendaftaran batch={batchSMK} />

                <JadwalJalurPendaftaran batch={batchSMK} />
              </Box>
            </>
          ) : (
            <>
              <Box className="mt-5 bg-white rounded-xl p-10 max-w-[25rem] mx-auto">
                <Text align="center" color="dark" weight={"bold"}>Jalur Pendaftaran Kosong</Text>
                <Text align="center" size={"sm"} color="dark">
                  Silakan hubungi <Text component={Link} underline color="blue" to={"https://wa.me/6281380908008"} target="_blank" >Admin</Text> untuk info jalur pendaftaran</Text>
              </Box>
            </>
          )
        }
      </Box>
    </>
  );
};

export default JalurPendaftaran;
