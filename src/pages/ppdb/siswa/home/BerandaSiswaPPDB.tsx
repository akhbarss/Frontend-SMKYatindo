/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Alert,
  Box,
  Card,
  LoadingOverlay,
  Stack,
  Text,
  Timeline,
} from "@mantine/core";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { TbAlertCircleFilled } from "react-icons/tb";
import { useBreakPoints } from "../../../../utils/UseBreakpoints";
import Page from "../../../../components/Page";
import { jwtDecode } from "../../../../apis/alur/decodeJWT";
import { useQuery } from "@tanstack/react-query";
import { GetAllAlurPendaftaran } from "../../../../apis/alur/getAlur";
import TiptapOutput from "../../../../components/ppdb/tiptapOutput";

const BerandaSiswaPPDB = () => {
  const { md } = useBreakPoints();
  const [active, setActive] = useState(1);
  const [showAlert, setShowAler] = useState(true);

  const { isSuccess, data: user } = useQuery({
    queryFn: jwtDecode,
    queryKey: ["session"],
  });

  const {
    data: alurPendaftaran,
    isSuccess: isSuccessGetAlur,
    isLoading,
  } = useQuery({
    queryKey: ["get_all_alur"],
    queryFn: GetAllAlurPendaftaran,
  });

  return (
    <Page title={"Beranda"}>
      <Stack className={"style-box max-w-[70rem] mx-auto"} >
        <Box
          sx={{
            background:
              "linear-gradient(to left, rgba(141, 108, 255, 1), rgba(51, 154, 240, 1))",
            padding: "3rem 3rem",
            borderRadius: "5px",
            color: "white",
            display: "flex",
            position: "relative",
            justifyContent: "space-between",
            flexDirection: `${!md ? "column-reverse" : "row"}`,
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <Text
            size={"xl"}
            className={"font-medium"}
            style={{
              fontSize: `${md ? "30px" : "16px"}`,
            }}
          >
            Selamat datang,{" "}
            {isSuccess
              ? user?.data?.student?.name || user?.data?.fullname
              : "-"}
            . <br />
            Calon Siswa SMK Yayasan Tinta Emas Indonesia
          </Text>
          <img
            src="/svg/icon-home.svg"
            alt=""
            style={{
              width: "300px",
            }}
          />
        </Box>

        {showAlert && (
          <Alert
            icon={<TbAlertCircleFilled size="1rem" />}
            title="Informasi"
            color=""
            radius="xs"
            withCloseButton
            closeButtonLabel="Close alert"
            onClose={() => setShowAler(false)}
          >
            Selamat, data anda telah terdata di sistem kami. harap lanjutkan
            pembelian formulir untuk melanjutkan proses pendaftaran
          </Alert>
        )}

        <Box>
          <Card shadow="xl">
            <Text weight={"bold"}>Alur Pendaftaran</Text>
            {isLoading && <LoadingOverlay visible={true} />}
            {isSuccessGetAlur && (
              <Timeline active={active} bulletSize={24} lineWidth={2}>
                {alurPendaftaran &&
                  alurPendaftaran.data?.length > 0 &&
                  alurPendaftaran.data?.map((alur) => (
                    <Timeline.Item
                      mt={30}
                      key={alur.id}
                      bullet={<FaCheck size={12} />}
                      title={alur.title}
                      lineVariant="solid"
                    >
                      <TiptapOutput desc={alur.content} />
                    </Timeline.Item>
                  ))}
              </Timeline>
            )}
          </Card>
        </Box>
      </Stack>
    </Page>
  );
};

export default BerandaSiswaPPDB;
