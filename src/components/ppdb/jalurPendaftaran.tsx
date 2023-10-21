import { Box, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { Element } from "react-scroll";
import { dataJalurPendaftaran } from "../../components/ppdb/dataJalurPendaftaran";
import { useBreakPoints } from "../../utils/UseBreakpoints";
import BiayaJalurPendaftaran from "./biayaJalurPendaftaran";
import CardJalurPendaftaran from "./cardJalurPendaftaran";
import JadwalJalurPendaftaran from "./jadwalJalurPendaftaran";

const JalurPendaftaran = () => {
  const { xs } = useBreakPoints();
  const theme = useMantineTheme();
  const dark = theme.colorScheme === "dark";

  const [jalur, setJalur] = useState(() => {
    return dataJalurPendaftaran.find((jalur) => jalur.id === 1);
  });
  const [activeCard, setActiveCard] = useState(1);

  return (
    <Element
      id="jalur-pendaftaran"
      name="jalur-pendaftaran"
      // className={`  min-h-[87vh] flex flex-col
      //     ${xs && "items-center py-[2rem] "}
      //     ${dark ? "backdrop-brightness-75" : "backdrop-brightness-50"}
      //     `}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: `${xs ? "center" : ""}`,
        minHeight: "87vh",
        paddingBlock: `${xs ? "2rem" : ""}`,
        backdropFilter: `${dark ? "brightness(.75)" : "brightness(.5)"}`,
      }}
    >
      <Box
        // className={` flex flex-col  ${xs ? "w-[85%] p-[2rem] min-h-[450px] rounded-[20px] " : "flex-1  pt-10"}`}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark" ? "black" : theme.colors.gray[0],
          color:
            theme.colorScheme === "dark" ? theme.colors.gray[1] : "#020731",
          display: "flex",
          flexDirection: "column",
          width: `${xs ? "85%" : ""}`,
          padding: `${xs ? "2rem" : ""}`,
          minHeight: `${xs ? "450px" : ""}`,
          borderRadius: `${xs ? "20px" : ""}`,
          flex: `${xs ? "" : "1"}`,
          paddingTop: `${xs ? "" : "40px"}`,
        })}
      >
        <div
          // className={`title-card ${dark ? "bg-[#291872] shadow-[0_0_20px_-3px_#291872]" : "bg-[#020731] "} h-[20vw] max-h-[4rem] flex items-center justify-center px-[4rem] rounded-full mx-auto`}
          style={{
            backgroundColor: `${dark ? "#291872" : "#020731"}`,
            boxShadow: `${dark ? "0 0 20px -3px #291872" : ""}`,
            color: "white",
            height: "20vw",
            maxHeight: "4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingInline: "4rem",
            borderRadius: "100px",
            marginInline: "auto",
          }}
        >
          <span
            // className={`${"text-white"}  font-bold ${xs ? "text-[2.5vw]" : "text-[5vw]"}`}
            style={{
              fontWeight: "bold",
              fontSize: `${xs ? "2.5vw" : "5vw"}`,
            }}
          >
            Jalur Pendaftaran
          </span>
        </div>

        <Box
          // className={`flex gap-5 ${xs ? "flex-row" : "flex-col"}`}
          style={{
            display: "flex",
            gap: "20px",
            flexDirection: `${xs ? "row" : "column"}`,
          }}
        >
          <CardJalurPendaftaran
            activeCard={activeCard}
            setActiveCard={setActiveCard}
            setJalur={setJalur}
          />

          <Box
            //  className='flex flex-col w-full  text-[22px] font-black'
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            <BiayaJalurPendaftaran jalur={jalur} />

            <JadwalJalurPendaftaran jalur={jalur} />
          </Box>
        </Box>
      </Box>
    </Element>
  );
};

export default JalurPendaftaran;
