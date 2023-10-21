/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, Box, Button, Card, Stack, Text, Timeline } from "@mantine/core";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { TbAlertCircleFilled } from "react-icons/tb";
import { useBreakPoints } from "../../../../utils/UseBreakpoints";
import Page from "../../../../components/Page.tsx";

const BerandaSiswaPPDB = () => {
  const { md } = useBreakPoints();
  const [active, setActive] = useState(1);
  const [showAlert, setShowAler] = useState(true);

  return (
    <Page title={"Beranda"}>
      <Stack className={"style-box"}>
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
            Selamat datang, Ahmad. <br />
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

        <Button
          onClick={async () => {
            // axios.get("http://localhost:8080/api/v1/admin/alur-ppdb/index?userId=1", {
            //     headers: {
            //         Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5Nzc4OTgwMywiZXhwIjoxNjk3ODc2MjAzfQ.DowHCxhygbzldjHFxmvyFkkJ1hlEVYBE03PVzhNegU4",
            //         'Content-Type' : 'application/x-www-form-urlencoded'
            //     },
            //     withCredentials: false,
            //     method: "get",

            // })

            const response = await fetch(
              "http://localhost:8080/api/v1/admin/alur-ppdb/index?userId=1",
              {
                headers: {
                  Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5Nzc4OTgwMywiZXhwIjoxNjk3ODc2MjAzfQ.DowHCxhygbzldjHFxmvyFkkJ1hlEVYBE03PVzhNegU4",
                },
                credentials: "include",
                // mode: "same-origin"
              }
            )
              .then((res) => {
                console.log("SUCCES");
                console.log(res.ok);
              })
              // .then(res => console.log(res))
              .catch((err) => {
                console.log("FAILEDDD");
                console.log(err);
              });
            // console.log(await response)
          }}
        >
          CLick Mw
        </Button>

        <Box>
          <Card shadow="xl">
            <Text weight={"bold"}>Alur Pendaftaran</Text>
            <Timeline active={active} bulletSize={24} lineWidth={2}>
              <Timeline.Item
                mt={30}
                bullet={<FaCheck size={12} />}
                title="Pembelian Formulir"
                lineVariant="solid"
              >
                <Text color="dimmed" size="sm">
                  Wa admin 0838382323
                </Text>
                {/* <Text size="xs" mt={4}>2 hours ago</Text> */}
              </Timeline.Item>

              <Timeline.Item
                bullet={<FaCheck size={12} />}
                title="Pengembalian Formulir"
              >
                {/* <Text color="dimmed" size="sm">You&apos;ve pushed 23 commits to<Text variant="text" component="span" inherit>fix-notifications branch</Text></Text> */}
                {/* <Text size="xs" mt={4}>52 minutes ago</Text> */}
              </Timeline.Item>
            </Timeline>
          </Card>
        </Box>
      </Stack>
    </Page>
  );
};

export default BerandaSiswaPPDB;
