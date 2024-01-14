import React from "react";
import { Badge, Box, Button, Group, Text, Title } from "@mantine/core";
import { BiSolidTagAlt } from "react-icons/bi";
import { DarkTheme } from "../../../utils/darkTheme";

type TCardChooseBatch = {
  id: number;
  name: string;
  start_date: number | Date;
  end_date: number | Date;
  disabled?: boolean;
  onClick?: () => void;
};

const CardChooseBatch: React.FC<TCardChooseBatch> = ({
  id,
  start_date,
  end_date,
  name,
  disabled = false,
  onClick,
}) => {
  const dark = DarkTheme();
  const tanggalMulai = new Date(start_date);
  const tanggalSelesai = new Date(end_date);
  const waktuSekarang = new Date();

  const isJalurDibuka =
    waktuSekarang >= tanggalMulai && waktuSekarang <= tanggalSelesai;

  return (
    <Button
      unstyled
      disabled={!isJalurDibuka || disabled}
      key={id}
      onClick={onClick}
      styles={(theme) => ({
        root: {
          borderColor: `${isJalurDibuka ? "#51CF66" : "red"}`,
          padding: "1rem",
          backgroundColor: `${
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
          }`,
          cursor: "pointer",
          color: theme.colorScheme === "dark" ? "white" : theme.colors.gray[9],
          borderRadius: "8px",
          outline: "none",
          "&:disabled": {
            cursor: "not-allowed",
            backgroundColor: `${
              dark ? theme.colors.dark[4] : "rgba(233, 233, 233, 1)"
            }`,
          },
        },
        label: {
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
        },
      })}
    >
      <Group>
        <BiSolidTagAlt size={30} />

        <Box>
          <Title order={3} align="left" weight={"bolder"}>
            {name}
          </Title>

          <Text align="left">
            {new Date(start_date).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}{" "}
            -{" "}
            {new Date(end_date).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </Text>
        </Box>
      </Group>

      <Badge
        variant="light"
        color={`${isJalurDibuka ? "green" : "red"}`}
        size="lg"
      >
        {isJalurDibuka ? "Dibuka" : "Ditutup"}
      </Badge>
    </Button>
  );
};

export default CardChooseBatch;
