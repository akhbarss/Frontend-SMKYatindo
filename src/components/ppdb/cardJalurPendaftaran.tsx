import { Box, useMantineTheme } from '@mantine/core'
import { TGRegistrationPath } from '../../types/global'

const CardJalurPendaftaran = ({
    activeCard,
    setActiveCard,
    data,
    setBatch
}: {
    activeCard: number
    setActiveCard: React.Dispatch<React.SetStateAction<number>>
    data?: TGRegistrationPath[]
    setBatch?: React.Dispatch<React.SetStateAction<TGRegistrationPath>>
}
) => {
    const styleActive = "bg-[#F36B1D] text-white border border border-black shadow"
    const theme = useMantineTheme()
    const dark = theme.colorScheme === 'dark'
    return (
        <Box className='overflow-hidden flex justify-center items-center'>
            <Box
                id='card-jalur-pendaftaran'
                className={`  text-gray-800 font-bold  overflow-x-hidden  flex max-w-[40rem] mx-auto`}
            >
                <Box className='p-4 flex overflow-auto   flex-[1] gap-4'>

                    {
                        data?.map(jalur => (
                            <button
                                key={jalur.id}
                                onClick={() => {
                                    setBatch(jalur)
                                    setActiveCard(jalur.id)
                                }}
                                className={`w-[200px] min-w-[200px] max-w-[200px] flex-grow min-h-[125px] p-[22px] font-black  transition-all ease-out rounded-lg  border
                             ${activeCard === jalur.id
                                        ? styleActive
                                        : `${dark ? "bg-black text-white " : "bg-white"} text-black`}`
                                }
                            >
                                {jalur.name}
                            </button>
                        ))
                    }

                </Box>
            </Box>
        </Box>

    )
}

export default CardJalurPendaftaran