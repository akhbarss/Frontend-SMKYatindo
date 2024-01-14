import { Box, useMantineTheme } from '@mantine/core'
import { TGRegistrationPath } from '../../types/global'
import { useBreakPoints } from '../../utils/UseBreakpoints'

const JadwalJalurPendaftaran = ({
    batch
}: {
    batch: TGRegistrationPath
}) => {

    const { xs } = useBreakPoints()
    const theme = useMantineTheme()
    const dark = theme.colorScheme === 'dark'
    return (
        <Box
            id='jadwal'
            className={`flex flex-col mt-5   rounded-md  ${xs ? "p-8 mt-10" : "py-8 px-2"}`}
            style={{
                backgroundColor: `${dark ? theme.colors.dark[9] : "#dbe1fe"}`,
                color: `${dark ? "white" : "#0F172A"}`,
            }}
        >
            <h1 className='text-[22px] '>Jadwal {batch?.name}:</h1>
            {
                batch && batch.registrationBatches?.length > 0 ? batch?.registrationBatches?.map(gelombang => {
                    const startDate = new Date(gelombang.start_date)
                    const endDate = new Date(gelombang.end_date)

                    const formattedStartDate = startDate.toLocaleDateString('id-ID', {
                        // year: "numeric",
                        month: "long",
                        day: "numeric"
                    });
                    const formattedEndDate = endDate.toLocaleDateString('id-ID', {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    });

                    return (
                        <Box
                            key={gelombang.id}
                            className=' text-[16px] mt-5'
                            style={{
                                backgroundColor: `${dark ? "black" : "white"}`,
                                color: `${dark ? "white" : "#0F172A"}`,
                            }}
                        >
                            <div id='judul-biaya' className=' border-b   py-2 text-[20px] text-center'>
                                <span>{gelombang.name}</span>
                            </div>
                            <div className='font-semibold px-2'>
                                <div className='py-2 flex gap-4' >
                                    <span className='flex-1'>Pendaftaran Gelombang</span>
                                    <span className='flex-1'>{formattedStartDate} - {formattedEndDate}</span>
                                </div>
                                {
                                    gelombang?.ujian_penerimaan?.map(ujian => (
                                        <div key={ujian.id} className='py-2 flex gap-4' >
                                            <span className='flex-1'>{ujian.nama_ujian_penerimaan}</span>
                                            <span className='flex-1'>{ujian.waktu_dibuka} - {ujian.waktu_ditutup}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </Box>
                    )
                }) : "-"
            }
        </Box>
    )
}

export default JadwalJalurPendaftaran