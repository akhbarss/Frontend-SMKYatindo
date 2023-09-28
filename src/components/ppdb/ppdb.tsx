import { Box, useMantineTheme } from '@mantine/core'
import { useBreakPoints } from '../../utils/UseBreakpoints'
import { Link } from 'react-router-dom'

const Ppdb = () => {
    const { xs } = useBreakPoints()
    const theme = useMantineTheme()
    const dark = theme.colorScheme === 'dark'

    return (
        <Box
            id="beranda"
            sx={(theme => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[4],
                // backgroundImage: "url('/yatindo/gedung-sekolah-1.jpg')",
            }))}
            className={`relative  flex flex-col justify-center 
            ${xs ? "items-center min-h-[87vh]" : "min-h-[80vh]"} `}
        >
            <Box
                sx={(theme => ({
                    backgroundColor: theme.colorScheme === 'dark' ? "black" : theme.colors.gray[0],
                    color: theme.colorScheme === 'dark' ? theme.colors.gray[1] : "#020731",
                }))}
                className={`flex flex-col justify-center items-center ${xs ? "w-[65%] h-[450px] rounded-[20px]   " : "flex-1 shadow-xl "}`}
            >
                <div className={`font-bold  text-center  ${xs ? "text-[4vw] " : "text-[24px]"}`}>
                    <h1
                        style={{
                            textShadow: `${dark ? "0px 0px 20px #876cff" : ""}`
                        }}
                    >
                        PPDB Online
                    </h1>
                    <h1 style={{
                        textShadow: `${dark ? "0px 0px 20px #876cff" : ""}`
                    }}
                    >
                        SMK Tinta Emas Indonesia
                    </h1>
                </div>
                <Link
                    to={'/ppdb/login'}
                    className={`mt-10  ${dark ? "bg-[#291872]" : "bg-[#020731]"} h-14 flex items-center px-10 rounded-sm text-white font-bold text-[24px] shadow-[0_0_20px_-5px_#291872]`}
                >
                    Daftar
                </Link>
            </Box>
        </Box>
    )
}

export default Ppdb;