import { Grid } from '@mantine/core'
import ReactPlayer from 'react-player'
import { useBreakPoints } from '../../utils/UseBreakpoints'

const VisiMisi = () => {
    // const theme = useMantineTheme()
    const { xs, } = useBreakPoints()
    // console.log(theme)

    return (
        <section
            id="profil"
            className={`min-h-[100vh] pt-[6rem] flex flex-col  px-[1rem] justify-center overflow-hidden ${!xs && ''}`}
        >
            <Grid gutter={!xs ? 100 : 20}>

                <Grid.Col md={6}  >
                    <div className='h-[100%] md:min-h-[30rem] lg:min-h-[25rem] w-[100%] flex'>

                        <div
                            className={`m-auto flex flex-col h-[70%] min-h-[20rem] md:min-h-[10rem] ${xs ? "max-w-[30rem]  mm:w-[80%]" : "w-full"} `}
                            data-aos="fade-up"
                            data-aos-duration="700"
                            data-aos-offset="200"
                            data-aos-easing="ease"
                            data-aos-once="true"
                            data-aos-delay="500"
                        >

                            <ReactPlayer
                                url={"https://www.youtube.com/watch?v=bFwUwsi2eEs"}
                                width='100%'
                                height={"100%"}
                                controls={true}
                                onBuffer={() => {console.log("load")}}
                                onProgress={() => console.log("loaddd")}
                            />
                        </div>
                    </div>
                </Grid.Col>

                <Grid.Col md={6} >
                    <div
                        className={`mx-[1.5rem] ${!xs && ""}`}
                        data-aos="fade-right"
                        data-aos-duration="700"
                        data-aos-offset="200"
                        data-aos-easing="ease"
                        data-aos-delay="500"
                        data-aos-once="true"
                    >

                        <h1 className="text-[20px] font-bold">
                            VISI MISI
                        </h1>
                        <h1 className="text-[30px] font-bold leading-[35px] mt-[2rem]">
                            BERKOMITMEN MEMBERIKAN LAYANAN YANG TERBAIK UNTUK GENERASI MUDA INDONESIA
                        </h1>
                        <h1 className="text-[16px] text-gray-500 mt-[2rem]">
                            MUTU TERBAIK PELAYANAN PRIMA
                        </h1>
                        <ul className="flex flex-col gap-2 mt-[2rem]  text-[16px]" >
                            <li className="flex gap-2 items-center">
                                <div>✅</div>
                                <h1>Menciptakan Sumber Daya Manusia yang unggul, berakhlakul karimah</h1>
                            </li>
                            <li className="flex gap-2 items-center">
                                <div>✅</div>
                                <h1>Meningkatan IPTEK dan IPTQ</h1>
                            </li>
                            <li className="flex gap-2 items-center">
                                <div>✅</div>
                                <h1>Mewujudkan lingkungan belajar yang nyaman</h1>
                            </li>
                        </ul>

                    </div>
                </Grid.Col>

            </Grid>
        </section>
    )
}

export default VisiMisi