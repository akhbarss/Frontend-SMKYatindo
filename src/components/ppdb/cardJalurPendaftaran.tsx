import { Group, useMantineTheme } from '@mantine/core'
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
    const styleActive = "bg-white text-black border border border-black shadow"
    const theme = useMantineTheme()
    const dark = theme.colorScheme === 'dark'

    return (
        <Group
            id='card-jalur-pendaftaran'
            className={`flex flex-col gap-4  items-center   text-gray-800 font-bold mt-10 `}
        >
            {
                dataJalurPendaftaran.map((jalur) => (
                    <button
                        key={jalur.id}
                        onClick={() => {
                            setJalur(jalur)
                            setActiveCard(jalur.id)
                        }}
                        className={`w-[200px] min-h-[125px] p-[22px] font-black  transition-all ease-out rounded-lg  border ${activeCard === jalur.id ? styleActive : `${dark ? "bg-[#291872]" : "bg-[#020731]"} text-white`}`}
                    >
                        {jalur.nama_jalur_pendaftaran}
                    </button>
                ))
            }
        </Group>
    )
}

export default CardJalurPendaftaran