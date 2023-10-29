import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Image,
  Paper,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { FaUserCircle } from "react-icons/fa";
import { Step } from "../../../types/global";
import useQueryFilter from "../../../hooks/useQueryFilter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOffsetStatus, printCard } from "../../../apis/pembelian";
import { jwtDecode } from "../../../apis/alur/decodeJWT";
import toast from "react-hot-toast";
import ResponseError from "../../../utils/ResponseError";
import { useNavigate } from "react-router-dom";

const StepCetakKartu: React.FC<Step> = ({ type = "PEMBELIAN" }) => {
  const filter = useQueryFilter({ step: 3, stagingId: null });
  const { data: offset, isSuccess: statusSuccess } = useQuery({
    queryKey: ["student_staging_offset", filter.stagingId, type],
    queryFn: () => getOffsetStatus(filter.stagingId, type),
    enabled: !!filter.stagingId,
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const printCardMutation = useMutation({
    mutationFn: printCard,
  });

  const { isSuccess, data: user } = useQuery({
    queryFn: jwtDecode,
    queryKey: ["session"],
  });

  const onClickDone = () => {
    printCardMutation.mutate(
      {
        type: type,
        stagingId: filter.stagingId,
      },
      {
        onSuccess: () => {
          toast.success(
            "Selamat anda telah menyelesaikan satu rangkaian tahapan"
          );
          navigate("/ppdb/main/pengembalian");
          queryClient.invalidateQueries({
            queryKey: ["get_last_offset_batch"],
          });
        },
        onError: (err) => ResponseError(err),
      }
    );
  };

  return (
    <Paper
      withBorder
      radius="md"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
        padding: "2rem",
      })}
    >
      <Text align={"center"} weight={500} size={"xl"}>
        Selamat anda telah terdaftar disistem kami, silahkan lanjutkan ke
        halaman Jalur Pendaftaran/Pengembalian
      </Text>
      <Stack>
        <Card
          mt={30}
          sx={{
            background: "linear-gradient(to bottom, #2A166F, #420BFF)",
            width: "30rem",
            height: "15rem",
            marginInline: "auto",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              position: "absolute",
              top: 15,
              height: "10px",
              color: "transparent",
              width: "100%",
            }}
          >
            a
          </div>
          <div
            style={{
              background: "white",
              position: "absolute",
              top: 30,
              height: "10px",
              color: "transparent",
              width: "100%",
            }}
          >
            a
          </div>

          <Image
            src={"/logo-yatindo-hd.png"}
            width={70}
            sx={{
              position: "absolute",
              top: 5,
              right: 15,
            }}
          />

          <Box
            sx={{
              display: "flex",
              gap: "1.2rem",
              alignItems: "center",
            }}
          >
            <ThemeIcon size={80} color="#FF0101" variant="filled">
              <FaUserCircle size={60} />
            </ThemeIcon>

            <Box>
              <Text color="white">
                Nama{" "}
                <Text component="span" align="center">
                  : {(isSuccess && user.data?.student?.name) ?? "-"}
                </Text>
              </Text>
              <Text color="white">
                Jurusan : {(statusSuccess && offset.data.major?.name) ?? "-"}
              </Text>
            </Box>
          </Box>

          <Text
            color="#FFFFFF"
            size={"xs"}
            sx={{
              position: "absolute",
              bottom: 5,
              left: 10,
            }}
          >
            ID : aebdbb6a-6b62-11ee-b962-0242ac120002
          </Text>
        </Card>

        <Button
          onClick={onClickDone}
          loading={printCardMutation.isPending}
          sx={{
            margin: "50px auto",
          }}
        >
          Selesai
        </Button>
      </Stack>
    </Paper>
  );
};

export default StepCetakKartu;
