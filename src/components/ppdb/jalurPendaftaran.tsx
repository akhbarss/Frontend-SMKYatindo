import { Box, Title } from "@mantine/core";
import { useState } from "react";
import { dataJalurPendaftaran } from "../../components/ppdb/dataJalurPendaftaran";
import { useBreakPoints } from "../../utils/UseBreakpoints";
import BiayaJalurPendaftaran from "./biayaJalurPendaftaran";
import CardJalurPendaftaran from "./cardJalurPendaftaran";
import JadwalJalurPendaftaran from "./jadwalJalurPendaftaran";

const JalurPendaftaran = () => {
  const { xs } = useBreakPoints();

  const [jalur, setJalur] = useState(() => {
    return dataJalurPendaftaran.find((jalur) => jalur.id === 1);
  });
  const [activeCard, setActiveCard] = useState(1);

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
          setJalur={setJalur}
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
          <BiayaJalurPendaftaran jalur={jalur} />

          <JadwalJalurPendaftaran jalur={jalur} />
        </Box>
      </Box>
    </>
  );
};

export default JalurPendaftaran;
