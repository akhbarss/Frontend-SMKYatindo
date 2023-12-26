import { Box, Text } from "@mantine/core"
import { useBreakPoints } from "../utils/UseBreakpoints"
import { useLocation } from "react-router-dom"

const SideAuthLayout = ({ page }: { page: "SMK" | "SMP" }) => {
    const { md } = useBreakPoints()
    const { pathname } = useLocation()

    const pageSMK = page === "SMK"
    const pageSMP = page === "SMP"

    return (
        <>
            {
                md && (
                    <Box className="flex-[1] bg-[url(/bg-auth.png)] bg-cover flex justify-center items-center flex-col bg-center bg-no-repeat">

                        <Box className="rounded-[20px] bg-white p-[0.5rem_1rem]">
                            <Text weight={"bold"}>PPDB Yatindo</Text>
                        </Box>

                        {pageSMK && <img src="/LOGO_SMK_YATINDO.png" alt="SMK-YATINDO" className="mt-[50px]" width={130} />}
                        {pageSMP && <img src="/LOGO_SMP_YATINDO.png" alt="SMP-YATINDO" className="mt-[50px]" width={130} />}
                        {(!pageSMK && !pageSMP) && <img src="/logo-yatindo-hd.png" alt="YATINDO" className="mt-[50px]" width={130} />}

                        <Text mt={40} align="center" color="white" size={25} className="font-semibold">
                            {
                                pathname.includes("login") ? "SMK-SMP " : (
                                    <>
                                        {!page && "- "}
                                        {pageSMK && "SMK "}
                                        {pageSMP && "SMP "}
                                    </>
                                )
                            }
                            <br />
                            TINTA EMAS INDONESIA
                        </Text>

                    </Box>
                )
            }
        </>
    )
}

export default SideAuthLayout