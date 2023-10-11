import { Box, useMantineTheme } from '@mantine/core'
import { useBreakPoints } from '../../utils/UseBreakpoints'
import { JalurPendaftaranPPDB } from '../../types/global'

const BiayaJalurPendaftaran = ({
    jalur
}: {
    jalur: JalurPendaftaranPPDB | undefined
}) => {

    const { xs } = useBreakPoints()
    const theme = useMantineTheme()
    const dark = theme.colorScheme === 'dark'

    return (
        <Box
            id='biaya'
            className={`flex flex-col mt-10 ${xs ? "p-8 rounded-md" : "py-8 px-2 "}`}
            style={{
                backgroundColor: `${dark ? theme.colors.dark[9] : "#dbe1fe"}`,
                color: `${dark ? "white" : "#0F172A"}`,
            }}
        >
            <h1 className='text-[22px]'>Biaya {jalur?.nama_jalur_pendaftaran}:</h1>
            {
                jalur && jalur?.informasi_umum.biaya_tambahan.length > 0 ?
                    jalur?.informasi_umum.biaya_tambahan.map(biayaJalur => (
                        <Box
                            key={biayaJalur.id}
                            className={`flex flex-col mt-5    `}
                            style={{
                                backgroundColor: `${dark ? "black" : "white"}`,
                                color: `${dark ? "white" : "#0F172A"}`,
                            }}
                        >
                            <div id='judul-biaya' className=' border-b px-6 py-2 text-center'>
                                <p >{biayaJalur.judul_biaya}</p>
                            </div>
                            <div>
                                {biayaJalur.biaya.map(item => {
                                    const formatedAngka = item.jumlah_biaya_tambahan.toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    })

                                    return (
                                        <div key={item.id} className='flex text-[16px] py-2 px-8'>
                                            <span className='flex-[2] '>{item.nama_biaya_tambahan}</span>
                                            <span className='flex-[1]'>{formatedAngka.endsWith(",00") ? formatedAngka.slice(0, -3) : formatedAngka}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </Box>
                    ))
                    : "-"
            }
        </Box>)
}

export default BiayaJalurPendaftaran