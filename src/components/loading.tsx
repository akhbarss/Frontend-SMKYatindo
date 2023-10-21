import { Box } from "@mantine/core"
import { Oval } from "react-loader-spinner"

const Loading = () => {
    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            {/* 4A8EF4 */}
            <Oval
                height={80}
                width={80}
                color="#4A8EF4"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4A8EF4"
                strokeWidth={2}
                strokeWidthSecondary={2}

            />

        </Box>
    )
}

export default Loading