import { Box, Text } from "@mantine/core";
import React from "react";

const WaitingPaymentConfirmation = () => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: `transparent`,
        padding: "4rem 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      <img
        src="/svg/wait-pembelianformulir.svg"
        alt="image"
        style={{
          width: "250px",
        }}
      />

      <Text
        mt={40}
        // w={500}
        sx={{ maxWidth: 500 }}
        weight={"bold"}
        align="center"
      >
        Bukti anda telah di upload
      </Text>
    </Box>
  );
};

export default WaitingPaymentConfirmation;
