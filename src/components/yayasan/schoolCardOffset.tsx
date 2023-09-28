import { Card, Grid } from '@mantine/core'
import { BiLinkExternal } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useBreakPoints } from '../../utils/UseBreakpoints'


const SchoolCardOffset = () => {
    const { xs, lg, sm, } = useBreakPoints()

    const xsTrue = < section
        key={1}
        id="school"
        className={`school py-[25px]  flex  items-center
                ${!xs && 'px-[1rem] overflow-hidden'}
                ${!sm && 'px-[100px]'} 
                ${!lg && 'px-[25px]'}
                ${lg && 'px-[25px]'}
            mt-16`
        }
    >
        <Grid w={'100%'} className='flex-1' gutter={!xs ? 100 : 10}>

            <Grid.Col
                sm={4}
                data-aos="fade-down"
                data-aos-duration="700"
                data-aos-offset={"200"}
                data-aos-easing="ease"
                data-aos-delay="0"
                data-aos-once="true"
            >
                <Card
                    withBorder
                    shadow='sm'
                    className={`group/card`}
                >

                    <Card.Section>
                        <div className="smp-image  bg-[url('/smp.jpg')] bg-no-repeat bg-cover relative" >
                            <div
                                className=' bg-blue-900/[0.5] h-full w-full absolute bottom-full group-hover/card:bottom-0 transition-all ease-out duration-300 flex  gap-2 justify-center items-center '
                            >
                                <Link
                                    target='_blank'
                                    to={'https://smk-smptintaemas.sch.id/smp/'}
                                    className='flex flex-col items-center gap-2'
                                    preventScrollReset={true}
                                >
                                    <div className='group/button relative h-[60px] w-[60px] bg-[#c7ddf5] rounded-full overflow-hidden flex items-center justify-center'>
                                        <div className='absolute w-full h-full bg-[#0e5981] top-full group-hover/button:top-0 transition-all ease-out duration-400'>
                                        </div>
                                        <BiLinkExternal size={30} className={'font-[52px] text-[#0e5981] group-hover/button:text-[#c7ddf5] z-30'} />
                                    </div>
                                    <h1 className='text-[#c7ddf5] font-bold'>Learn More</h1>
                                </Link>

                            </div>
                        </div>
                    </Card.Section>
                    {/* Sekolah Menengah Pertama (SMP)  Yayasan Tinta Emas Indonesia siap menjadikan siswa siswi yang memiliki karakter, unggul dalam prestasi dan dapat berkompetisi secara global. */}
                </Card>
            </Grid.Col>

            <Grid.Col
                sm={4}
                data-aos="fade-down"
                data-aos-duration="700"
                data-aos-offset={"200"}
                data-aos-easing="ease"
                data-aos-delay="0"
                data-aos-once="true"
            >
                <Card
                    withBorder
                    shadow='sm'
                    className={`group/card`}
                >
                    <Card.Section>
                        <div className="smp-image  bg-[url('/smk.jpg')] bg-no-repeat bg-cover relative" >
                            <div
                                className=' bg-blue-900/[0.5] h-full w-full absolute bottom-full group-hover/card:bottom-0 transition-all ease-out duration-300 flex  gap-2 justify-center items-center '
                            >
                                <Link
                                    target='_blank'
                                    to={'https://smk-smptintaemas.sch.id/smk/'}
                                    className='flex flex-col items-center gap-2'
                                >
                                    <div className='group/button relative h-[60px] w-[60px] bg-[#c7ddf5] rounded-full overflow-hidden flex items-center justify-center'>
                                        <div className='absolute w-full h-full bg-[#0e5981] top-full group-hover/button:top-0 transition-all ease-out duration-400'>
                                        </div>
                                        <BiLinkExternal size={30} className={'font-[52px] text-[#0e5981] group-hover/button:text-[#c7ddf5] z-30'} />
                                    </div>
                                    <h1 className='text-[#c7ddf5] font-bold'>Learn More</h1>
                                </Link>

                            </div>
                        </div>
                    </Card.Section>
                    {/* Sekolah Menengah Kejuruan (SMK) Yayasan Tinta Emas Indonesia mampu mencetak tenaga terampil yang siap bekerja dan menghadirkan masa depan gemilang untuk para siswa. */}
                </Card>
            </Grid.Col>

            <Grid.Col
                sm={4}
                data-aos="fade-down"
                data-aos-duration="700"
                data-aos-offset={"200"}
                data-aos-easing="ease"
                data-aos-delay="0"
                data-aos-once="true"
            >
                <Card
                    withBorder
                    shadow='sm'
                    className={`group/card`}
                >
                    <Card.Section>
                        <div className="smp-image  bg-[url('/ppdb.jpg')] bg-no-repeat bg-cover relative" >
                            <div
                                className=' bg-blue-900/[0.5] h-full w-full absolute bottom-full group-hover/card:bottom-0 transition-all ease-out duration-300 flex  gap-2 justify-center items-center '
                            >
                                <Link
                                    to={'/ppdb'}
                                    className='flex flex-col items-center gap-2'
                                >
                                    <div className='group/button relative h-[60px] w-[60px] bg-[#c7ddf5] rounded-full overflow-hidden flex items-center justify-center'>
                                        <div className='absolute w-full h-full bg-[#0e5981] top-full group-hover/button:top-0 transition-all ease-out duration-400'>
                                        </div>
                                        <BiLinkExternal size={30} className={'font-[52px] text-[#0e5981] group-hover/button:text-[#c7ddf5] z-30'} />
                                    </div>
                                    <h1 className='text-[#c7ddf5] font-bold'>Learn More</h1>
                                </Link>

                            </div>
                        </div>
                    </Card.Section>
                    {/* Kemendikbud telah membuat peraturan untuk penerimaan siswa baru melalui Penerimaan Peserta Didik Baru (PPDB).  Halaman ini dipersiapkan sebagai layanan pendaftaran PPDB Online  jenjang SMK. */}
                </Card>
            </Grid.Col>

        </Grid>
    </section >

    const xsFalse = < section
        key={2}
        id="school"
        className={`school py-[25px]  flex  items-center
                ${!xs && 'px-[1rem] overflow-hidden'}
                ${!sm && 'px-[100px]'} 
                ${!lg && 'px-[25px]'}
                ${lg && 'px-[25px]'}
            mt-16`
        }
    >
        <Grid w={'100%'} className='flex-1' gutter={!xs ? 100 : 10}>

            <Grid.Col
                sm={4}
                data-aos="fade-down"
                data-aos-duration="700"
                data-aos-offset={"250"}
                data-aos-easing="ease"
                data-aos-delay="0"
                data-aos-once="true"
            >
                <Card
                    withBorder
                    shadow='sm'
                    className={`group/card`}
                >

                    <Card.Section>
                        <div className="smp-image  bg-[url('/smp.jpg')] bg-no-repeat bg-cover relative" >
                            <div
                                className=' bg-blue-900/[0.5] h-full w-full absolute bottom-full group-hover/card:bottom-0 transition-all ease-out duration-300 flex  gap-2 justify-center items-center '
                            >
                                <Link
                                    target='_blank'
                                    to={'https://smk-smptintaemas.sch.id/smp/'}
                                    className='flex flex-col items-center gap-2'
                                >
                                    <div className='group/button relative h-[60px] w-[60px] bg-[#c7ddf5] rounded-full overflow-hidden flex items-center justify-center'>
                                        <div className='absolute w-full h-full bg-[#0e5981] top-full group-hover/button:top-0 transition-all ease-out duration-400'>
                                        </div>
                                        <BiLinkExternal size={30} className={'font-[52px] text-[#0e5981] group-hover/button:text-[#c7ddf5] z-30'} />
                                    </div>
                                    <h1 className='text-[#c7ddf5] font-bold'>Learn More</h1>
                                </Link>

                            </div>
                        </div>
                    </Card.Section>
                    {/* Sekolah Menengah Pertama (SMP)  Yayasan Tinta Emas Indonesia siap menjadikan siswa siswi yang memiliki karakter, unggul dalam prestasi dan dapat berkompetisi secara global. */}
                </Card>
            </Grid.Col>

            <Grid.Col
                sm={4}
                data-aos="fade-down"
                data-aos-duration="700"
                data-aos-offset={"250"}
                data-aos-easing="ease"
                data-aos-delay="0"
                data-aos-once="true"
            >
                <Card
                    withBorder
                    shadow='sm'
                    className={`group/card`}
                >
                    <Card.Section>
                        <div className="smp-image  bg-[url('/smk.jpg')] bg-no-repeat bg-cover relative" >
                            <div
                                className=' bg-blue-900/[0.5] h-full w-full absolute bottom-full group-hover/card:bottom-0 transition-all ease-out duration-300 flex  gap-2 justify-center items-center '
                            >
                                <Link
                                    target='_blank'
                                    to={'https://smk-smptintaemas.sch.id/smk/'}
                                    className='flex flex-col items-center gap-2'
                                >
                                    <div className='group/button relative h-[60px] w-[60px] bg-[#c7ddf5] rounded-full overflow-hidden flex items-center justify-center'>
                                        <div className='absolute w-full h-full bg-[#0e5981] top-full group-hover/button:top-0 transition-all ease-out duration-400'>
                                        </div>
                                        <BiLinkExternal size={30} className={'font-[52px] text-[#0e5981] group-hover/button:text-[#c7ddf5] z-30'} />
                                    </div>
                                    <h1 className='text-[#c7ddf5] font-bold'>Learn More</h1>
                                </Link>

                            </div>
                        </div>
                    </Card.Section>
                    {/* Sekolah Menengah Kejuruan (SMK) Yayasan Tinta Emas Indonesia mampu mencetak tenaga terampil yang siap bekerja dan menghadirkan masa depan gemilang untuk para siswa. */}
                </Card>
            </Grid.Col>

            <Grid.Col
                sm={4}
                data-aos="fade-down"
                data-aos-duration="700"
                data-aos-offset={"250"}
                data-aos-easing="ease"
                data-aos-delay="0"
                data-aos-once="true"
            >
                <Card
                    withBorder
                    shadow='sm'
                    className={`group/card`}
                >
                    <Card.Section>
                        <div className="smp-image  bg-[url('/ppdb.jpg')] bg-no-repeat bg-cover relative" >
                            <div
                                className=' bg-blue-900/[0.5] h-full w-full absolute bottom-full group-hover/card:bottom-0 transition-all ease-out duration-300 flex  gap-2 justify-center items-center '
                            >
                                <Link
                                    preventScrollReset={true}
                                    to={'/ppdb'}
                                    className='flex flex-col items-center gap-2'
                                >
                                    <div className='group/button relative h-[60px] w-[60px] bg-[#c7ddf5] rounded-full overflow-hidden flex items-center justify-center'>
                                        <div className='absolute w-full h-full bg-[#0e5981] top-full group-hover/button:top-0 transition-all ease-out duration-400'>
                                        </div>
                                        <BiLinkExternal size={30} className={'font-[52px] text-[#0e5981] group-hover/button:text-[#c7ddf5] z-30'} />
                                    </div>
                                    <h1 className='text-[#c7ddf5] font-bold'>Learn More</h1>
                                </Link>

                            </div>
                        </div>
                    </Card.Section>
                    {/* Kemendikbud telah membuat peraturan untuk penerimaan siswa baru melalui Penerimaan Peserta Didik Baru (PPDB).  Halaman ini dipersiapkan sebagai layanan pendaftaran PPDB Online  jenjang SMK. */}
                </Card>
            </Grid.Col>

        </Grid>
    </section >


    return !xs ? xsTrue : xsFalse
}

export default SchoolCardOffset