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
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TbAlertCircleFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "../../../../apis/alur/decodeJWT";
import { GetAllAlurPendaftaran } from "../../../../apis/alur/getAlur";
import Page from "../../../../components/Page";
import TiptapOutput from "../../../../components/ppdb/tiptapOutput";
import { useBreakPoints } from "../../../../utils/UseBreakpoints";
import { gradesUtils } from "../../../../utils/gradesUtils";

const BerandaSiswaPPDB = () => {
  const { md } = useBreakPoints();
  const [active, setActive] = useState(1);
  const [showAlert, setShowAler] = useState(true);
  const navigate = useNavigate()

  const {
    error,
    isError,
    data,
  } = useQuery({
    queryFn: jwtDecode,
    queryKey: ["session_berandasiswa"],
  });

  useEffect(() => {
    if (data?.data.role_id.role_name === "Admin") {
      navigate("/ppdb/main/dashboard")
    }
  }, [data?.data.role_id.role_name, navigate])

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

  const grade = user?.data?.student?.grade

  return (
    <Page title={"Beranda"}>
      <Stack className={"style-box max-w-[70rem] mx-auto"} >
        <Box
          sx={{
            background: grade ? gradesUtils.find(item => grade === item.grade).bg : "linear-gradient(to left, #2A166F, #6548DB)",
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
            Calon Siswa {grade === "SMK" && "SMK"} {grade === "SMP" && "SMP"}  Tinta Emas Indonesia
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
            radius="xs"
            withCloseButton
            variant="light"
            closeButtonLabel="Close alert"
            onClose={() => setShowAler(false)}
          >
            Selamat, data anda telah terdata di sistem kami. harap lanjutkan
            pembelian formulir untuk melanjutkan proses pendaftaran
          </Alert>
        )}

        <Card shadow="xl" withBorder>
          <Text weight={"bold"}>Alur Pendaftaran</Text>
          {isLoading && <LoadingOverlay visible={true} />}
          {isSuccessGetAlur && (
            <Timeline active={active} bulletSize={24} lineWidth={2}>
              {alurPendaftaran &&
                alurPendaftaran.data?.length > 0 &&
                alurPendaftaran.data?.filter(alur => alur.grade === grade)?.sort((a,b) => a.id - b.id)?.map((alur, i) => (
                  <Timeline.Item
                    mt={30}
                    key={alur.id}
                    bullet={<p>{i + 1}</p>}
                    title={alur.title}
                    lineVariant="solid"
                  >
                    <TiptapOutput desc={alur.content} />
                  </Timeline.Item>
                ))}
            </Timeline>
          )}
        </Card>
      </Stack>
    </Page>
  );
};

export default BerandaSiswaPPDB;
