import {
  Box,
  Button,
  Paper,
  Stack,
  Text
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { printCard } from "../../../apis/pembelian";
import useQueryFilter from "../../../hooks/useQueryFilter";
import { Step } from "../../../types/global";
import ResponseError from "../../../utils/ResponseError";
import PrintPage from "./PrintPage";

const StepCetakKartu: React.FC<Step> = ({ type = "PEMBELIAN" }) => {
  const filter = useQueryFilter({ step: 3, stagingId: null });
  const navigate = useNavigate();

  const printCardMutation = useMutation({
    mutationFn: printCard,
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
            "Selamat anda telah menyelesaikan satu rangkaian tahapan",
            { duration: 10000, },
          );
          navigate("/ppdb/main/pengembalian");
        },
        onError: (err) => ResponseError(err),
      }
    );
  };

  return (
    <>
      <Paper
        withBorder
        radius="md"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
          padding: "2rem",
        })}
      >
        <Box maw={800} mx={"auto"}>
          <Text
            align={"center"}
            weight={500}
            style={{
              fontSize: "clamp(1rem, 3.4783vw + 0.3043rem, 1.2rem)"
            }}
          >
            {type === "PEMBELIAN"
              ? "Selamat anda telah terdaftar disistem kami, silakan download pdf kartu formulir anda, lalu  klik selesai untuk ke halaman Jalur Pengembalian"
              : "Selamat anda telah terdaftar menjadi calon siswa, silakan download pdf kartu formulir anda, harap menunggu informasi lebih lanjut"}
          </Text>
        </Box>
        <Stack align={"center"}>

          <PrintPage />

          <Button
            onClick={onClickDone}
            loading={printCardMutation.isPending}
            size="md"
            sx={{
              margin: "50px auto",
            }}
          >
            Selesai
          </Button>
        </Stack>
      </Paper>
    </>
  );
};

export default StepCetakKartu;
