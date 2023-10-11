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
            sx={{
                // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[4],
                // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.orange[4],
            }}
            className={`relative  flex flex-col justify-center 
            ${xs ? "items-center min-h-[87vh]" : "min-h-[80vh]"} 
            ${dark ? "backdrop-brightness-75" : "backdrop-brightness-50"}
            `}
        >
            <Box
                sx={(theme => ({
                    backgroundColor: theme.colorScheme === 'dark' ? "black" : theme.colors.gray[0],
                    color: theme.colorScheme === 'dark' ? theme.colors.gray[1] : "#020731",
                }))}
                className={`flex flex-col justify-center items-center ${xs ? "w-[65%] h-[450px] rounded-[20px]   shadow-xl" : "flex-1  "}`}
            >
                <div className={`font-bold  text-center  
                
                `}>
                    <h1 className={`${dark ? "bg-clip-text text-transparent bg-gradient-to-tl from-white to-[#281a67]" : ""} ${xs ? "text-[40px] " : "text-[24px]"}`} >
                        PPDB Online
                    </h1>
                    <h1 className={`${dark ? "bg-clip-text text-transparent bg-gradient-to-tl from-white to-[#281a67]" : ""} ${xs ? "text-[40px] " : "text-[24px]"}`}>
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