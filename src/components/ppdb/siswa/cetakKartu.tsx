import {
  Card,
  Button,
  Stack,
  Image,
  Box,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { FaUserCircle } from "react-icons/fa";

const CetakKartu = () => {
  return (
    <Stack>
      <Card
        mt={30}
        sx={{
          background: "linear-gradient(to left, #2A166F, #6548DB)",
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

        <Image
          src={"/svg/bglayer-cetak-kartu.svg"}
          width={140}
          // h={"100%"}
          sx={{
            position: "absolute",
            left: 0,
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
                : Ahmad
              </Text>
            </Text>
            <Text color="white">
              Jurusan : TKJ ( Teknik Komputer dan Jaringan )
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
        sx={{
          margin: "50px auto",
        }}
      >
        Selesai
      </Button>
    </Stack>
  );
};

export default CetakKartu;
