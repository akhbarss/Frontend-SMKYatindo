import { Box, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getJalurGlobal } from "../../apis/jalur/getJalurGlobal";
import { useBreakPoints } from "../../utils/UseBreakpoints";
import BiayaJalurPendaftaran from "./biayaJalurPendaftaran";
import CardJalurPendaftaran from "./cardJalurPendaftaran";
import JadwalJalurPendaftaran from "./jadwalJalurPendaftaran";

const JalurPendaftaran = () => {
  const { xs } = useBreakPoints();

  const { data } = useQuery({
    queryKey: ["get_jalur_global"],
    queryFn: getJalurGlobal
  })

  const [activeCard, setActiveCard] = useState(data?.data[0]?.id);
  const [batch, setBatch] = useState(() => {
    return data?.data[0];
  });

  useEffect(() => {
    setBatch(data?.data[0])
    setActiveCard(data?.data[0]?.id)
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
          <Title size={xs ? "2.5vw" : "5vw"} color="dark" weight={"bold"}>Jalur Pendaftaran</Title>
        </Box>

        <CardJalurPendaftaran
          activeCard={activeCard}
          setActiveCard={setActiveCard}
          setBatch={setBatch}
          data={data}
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
          <BiayaJalurPendaftaran batch={batch} />

          <JadwalJalurPendaftaran batch={batch} />
        </Box>
      </Box>
    </>
  );
};

export default JalurPendaftaran;
