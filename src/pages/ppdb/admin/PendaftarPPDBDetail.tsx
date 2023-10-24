import {
    Grid,
    Stack,
    Box,
    Group,
    Paper,
    Button,
    Text,
    Title,

} from "@mantine/core"

const PendaftarPPDBDetail = () => {
    return (
        <Stack>

            <Paper
                radius={"lg"}
                sx={{
                    padding: "2rem",
                }}
            >
                <Box>
                    <Title order={2}>PEMBELIAN FORMULIR</Title>
                </Box>
                <Box sx={{ backgroundColor: "#F8F9FA", padding: "0.5rem", marginTop: "1rem", display: "flex", gap: "2rem" }} >
                    <Box  >
                        <Text weight={"bold"} align="center" color="gray">Jumlah Pendaftar</Text>
                        <Text weight={"bold"} size={"xl"} align="center">260 Orang</Text>
                    </Box>
                    <Box  >
                        <Text weight={"bold"} align="center" color="gray">Jumlah Penerimaan</Text>
                        <Text weight={"bold"} size={"xl"} align="center">260 Orang</Text>
                    </Box>
                    <Box  >
                        <Text weight={"bold"} align="center" color="gray">Peserta Diterima</Text>
                        <Text weight={"bold"} size={"xl"} align="center">260 Orang</Text>
                    </Box>

                </Box>
            </Paper>

        </Stack>
    )
}

export default PendaftarPPDBDetail