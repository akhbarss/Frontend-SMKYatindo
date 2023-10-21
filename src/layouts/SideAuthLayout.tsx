import { Box, Text } from "@mantine/core"
import { useBreakPoints } from "../utils/UseBreakpoints"

const SideAuthLayout = () => {
    
    const { md } = useBreakPoints()

    return (
        <>
            {
                md && (
                    <Box className="flex-[1] bg-[url(/bg-auth.png)] bg-cover flex justify-center items-center flex-col bg-center bg-no-repeat">

                        <Box className="rounded-[20px] bg-white p-[0.5rem_1rem]">
                            <Text weight={"bold"}>PPDB Online</Text>
                        </Box>

                        <img src="/yayasan.png" alt="" width={130} className="mt-[50px]" />

                        <Text mt={40} align="center" color="white" size={25} className="font-semibold">
                            SMK Yayasan Tinta <br />
                            Emas Indonesia
                        </Text>

                    </Box>
                )
            }
        </>
    )
}

export default SideAuthLayout