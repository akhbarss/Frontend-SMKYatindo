import { Box, useMantineTheme } from '@mantine/core'
import { useState } from 'react'
import { dataJalurPendaftaran } from '../../components/ppdb/dataJalurPendaftaran'
import { useBreakPoints } from "../../utils/UseBreakpoints"
import BiayaJalurPendaftaran from './biayaJalurPendaftaran'
import CardJalurPendaftaran from './cardJalurPendaftaran'
import JadwalJalurPendaftaran from './jadwalJalurPendaftaran'

const JalurPendaftaran = () => {

    const { xs } = useBreakPoints()
    const theme = useMantineTheme()
    const dark = theme.colorScheme === 'dark'

    const [jalur, setJalur] = useState(() => {
        return dataJalurPendaftaran.find(jalur => jalur.id === 1)
    })
    const [activeCard, setActiveCard] = useState(1)

    return (
        <Box
            id="jalur-pendaftaran"
            className={`  min-h-[87vh] flex flex-col    ${xs && "items-center py-[2rem] "}`}
            sx={(theme => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[4],
            }))}
        >

            <Box
                className={` flex flex-col  ${xs ? "w-[85%] p-[2rem] min-h-[450px] rounded-[20px] " : "flex-1  pt-10"}`}
                sx={(theme => ({
                    backgroundColor: theme.colorScheme === 'dark' ? "black" : theme.colors.gray[0],
                    color: theme.colorScheme === 'dark' ? theme.colors.gray[1] : "#020731",
                }))}
            >

                <div className={`title-card ${dark ? "bg-[#291872] shadow-[0_0_20px_-3px_#291872]" : "bg-[#020731] "} h-[20vw] max-h-[4rem] flex items-center justify-center px-[4rem] rounded-full mx-auto`}>
                    <span className={`${"text-white"}  font-bold ${xs ? "text-[2.5vw]" : "text-[5vw]"}`}>
                        Jalur Pendaftaran
                    </span>
                </div>

                <Box className={`flex gap-5 ${xs ? "flex-row" : "flex-col"}`}>

                    <CardJalurPendaftaran activeCard={activeCard} setActiveCard={setActiveCard} setJalur={setJalur} />

                    <Box className='flex flex-col w-full  text-[22px] font-black'>

                        <BiayaJalurPendaftaran jalur={jalur} />

                        <JadwalJalurPendaftaran jalur={jalur} />

                    </Box>
                </Box>
            </Box>

        </Box>
    )
}

export default JalurPendaftaran