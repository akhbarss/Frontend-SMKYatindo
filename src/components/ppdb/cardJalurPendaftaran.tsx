import { Box, useMantineTheme } from '@mantine/core'
import { dataJalurPendaftaran } from './dataJalurPendaftaran'
import { JalurPendaftaranPPDB } from '../../types/global'

const CardJalurPendaftaran = ({
    activeCard,
    setJalur,
    setActiveCard
}: {
    activeCard: number
    setJalur: React.Dispatch<React.SetStateAction<JalurPendaftaranPPDB | undefined>>
    setActiveCard: React.Dispatch<React.SetStateAction<number>>
}
) => {
    const styleActive = "bg-[#F36B1D] text-white border border border-black shadow"
    const theme = useMantineTheme()
    const dark = theme.colorScheme === 'dark'

    return (
        <Box
            id='card-jalur-pendaftaran'
            className={`  text-gray-800 font-bold  overflow-x-hidden  flex` }
        >
            <Box className='p-4 flex overflow-auto   flex-[1] gap-4'>

                {
                    dataJalurPendaftaran.map((jalur) => (
                        <button
                            key={jalur.id}
                            onClick={() => {
                                setJalur(jalur)
                                setActiveCard(jalur.id)
                            }}
                            className={`w-[200px] min-w-[200px] flex-grow min-h-[125px] p-[22px] font-black  transition-all ease-out rounded-lg  border
                             ${activeCard === jalur.id
                                    ? styleActive
                                    : `${dark ? "bg-[#291872]" : "bg-white"} text-black`}`
                            }
                        >
                            {jalur.nama_jalur_pendaftaran}
                        </button>
                    ))
                }
            </Box>
        </Box>
    )
}

export default CardJalurPendaftaran