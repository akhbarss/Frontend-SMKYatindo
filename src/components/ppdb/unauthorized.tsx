import { Button, Box } from "@mantine/core"
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {

    const navigate = useNavigate()

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                width: "100vw",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}
        >
            <h1>Unauthorized</h1>
            <Button onClick={() => navigate(-1)}>
                Go Back
            </Button>
        </Box>
    )
}

export default Unauthorized