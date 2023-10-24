import { Box } from "@mantine/core"
import { Oval } from "react-loader-spinner"

const Loading = () => {
    return (
        <Box
            id="loading-container"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh"
            }}
        >
            {/* 4A8EF4 */}
            <Oval
                height={80}
                width={80}
                color="#4A8EF4"
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