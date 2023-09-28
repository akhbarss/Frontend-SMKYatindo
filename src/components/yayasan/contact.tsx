import { Link } from 'react-router-dom'
import { Grid, useMantineTheme } from '@mantine/core'
import {
    FaWhatsapp,
    FaInstagram,
    FaFacebook,
    FaTiktok,
    FaYoutube,
    FaMapMarkerAlt
} from 'react-icons/fa'
import { useBreakPoints } from '../../utils/UseBreakpoints'

const Contact = () => {
    const theme = useMantineTheme()
    const { xs, } = useBreakPoints()

    return (
        <section id="contact" className={`min-h-[100vh] flex flex-col ${theme.colorScheme === "dark" ? theme.colors.dark[0] : "text-[#002366]"} p-[25px] justify-center ${!xs && 'mt-20'} overflow-hidden`}>
            <Grid gutter={5}>
                <Grid.Col span={12} >
                    <div className=" flex flex-col items-center">

                        <h1
                            className='font-extrabold text-[30px] antd:text-[46px] text-center'
                            data-aos="fade-up"
                            data-aos-duration="700"
                            data-aos-offset="100"
                            data-aos-easing="ease"
                            data-aos-delay="100"
                            data-aos-once="true"
                        >
                            TETAP <br />TERHUBUNG <br />DENGAN KAMI
                        </h1>
                        <div
                            className='mt-5 w-fit'
                            data-aos="zoom-in"
                            data-aos-duration="700"
                            data-aos-offset="100"
                            data-aos-easing="ease"
                            data-aos-delay="0"
                            data-aos-once="true"
                        >

                            <Link
                                to={'mailto:info@smk-smptintaemas.sch.id'}
                                className={`${!xs ? "text[16px]" : 'text-[20px]'} font-extralight  hover:text-[#3773eb] hover:transition ease-in-out hover:delay-150 underline`}
                            >
                                info@smk-smptintaemas.sch.id
                            </Link>
                        </div>
                        <div
                            className='mt-5 w-fit'
                            data-aos="zoom-in"
                            data-aos-duration="700"
                            data-aos-offset="100"
                            data-aos-easing="ease"
                            data-aos-delay="0"
                            data-aos-once="true"
                        >

                            <Link
                                to={'tel:+622182610808'}
                                className={`font-extralight  hover:text-[#3773eb] hover:transition ease-in-out hover:delay-200 ${!xs ? "text[16px]" : 'text-[20px] '} underline  `}
                            >
                                Telefon : +622182610808
                            </Link>
                        </div>


                        {/* SAUARE COLLAPSE */}
                        {/* SAUARE COLLAPSE */}
                        {/* SAUARE COLLAPSE */}
                        {/* SAUARE COLLAPSE */}
                        {/* SAUARE COLLAPSE */}
                        {/* SAUARE COLLAPSE */}
                        <div className='flex flex-wrap gap-1 mt-10 max-antd:justify-center max-antd:gap-5 max-antd:w-[10rem]' >

                            {/* WA CONTACT ADMIN */}
                            <div
                                data-aos="fade-right"
                                data-aos-duration="700"
                                data-aos-offset="100"
                                data-aos-easing="ease"
                                data-aos-delay="0"
                                data-aos-once="true"
                            >
                                <div
                                    className={`z-40 ${theme.colorScheme === 'dark' ? '' : "white"}`}
                                    data-aos-once="true"
                                >
                                    <Link
                                        to={'https://wa.me/6281380908008'}
                                        target='_blank'
                                        className={` w-[3.5rem] h-[3.5rem] border-gray-300 border rounded-xl cursor-pointer overflow-x-hidden flex items-center ${xs && "group/squareCollapse hover:w-[11.5rem] hover:transition-all duration-300 ease-in-out"}`}
                                    >
                                        <div className='inline-block ml-3' >
                                            <FaWhatsapp className='icon-sosmed text-[30px] group-hover/squareCollapse:text-[#3773eb] group-hover/squareCollapse:transition-all ease-in-out group-hover/squareCollapse:duration-1000 ' />
                                        </div>
                                        <div className='mx-4 inline whitespace-nowrap '>
                                            <h1
                                                className={`text-collapse ${theme.colorScheme == 'dark' ? "text-white" : "text-black"} group-hover/squareCollapse:text-[#3773eb] transition-all ease-in-out duration-1000`}
                                            >
                                                Contact Admin
                                            </h1>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* YOUTUBE */}
                            <div
                                data-aos="fade-right"
                                data-aos-duration="700"
                                data-aos-offset="100"
                                data-aos-easing="ease"
                                data-aos-delay="0"
                                data-aos-once="true"
                            >
                                <div
                                    className={`z-40 ${theme.colorScheme === 'dark' ? '' : "white"}`}
                                    data-aos-once="true"
                                >
                                    <Link
                                        to={'https://youtube.com/channel/UC2SN592P1k4BIsME5CdpSCg'}
                                        target='_blank'
                                        className={` w-[3.5rem] h-[3.5rem] border-gray-300 border rounded-xl cursor-pointer overflow-x-hidden flex items-center ${xs && "group/squareCollapse hover:w-[8.5rem] hover:transition-all duration-300 ease-in-out"}`}
                                    >
                                        <div className='inline-block ml-3' >
                                            <FaYoutube className='icon-sosmed text-[30px] group-hover/squareCollapse:text-[#3773eb] group-hover/squareCollapse:transition-all ease-in-out group-hover/squareCollapse:duration-1000 ' />
                                        </div>
                                        <div className='mx-4 inline whitespace-nowrap '>
                                            <h1
                                                className={`text-collapse ${theme.colorScheme == 'dark' ? "text-white" : "text-black"} group-hover/squareCollapse:text-[#3773eb] transition-all ease-in-out duration-1000`}
                                            >
                                                Youtube
                                            </h1>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* FACEBOOK */}
                            <div
                                data-aos="fade-right"
                                data-aos-duration="700"
                                data-aos-offset="100"
                                data-aos-easing="ease"
                                data-aos-delay="0"
                                data-aos-once="true"
                            >
                                <div
                                    className={`z-40 ${theme.colorScheme === 'dark' ? '' : "white"}`}
                                    data-aos-once="true"
                                >
                                    <Link
                                        to={'https://www.facebook.com/YatindoOfficial'}
                                        target='_blank'
                                        className={` w-[3.5rem] h-[3.5rem] border-gray-300 border rounded-xl cursor-pointer overflow-x-hidden flex items-center ${xs && "group/squareCollapse hover:w-[9.5rem] hover:transition-all duration-300 ease-in-out"}`}
                                    >
                                        <div className='inline-block ml-3' >
                                            <FaFacebook className='icon-sosmed text-[30px] group-hover/squareCollapse:text-[#3773eb] group-hover/squareCollapse:transition-all ease-in-out group-hover/squareCollapse:duration-1000 ' />
                                        </div>
                                        <div className='mx-4 inline whitespace-nowrap '>
                                            <h1
                                                className={`text-collapse ${theme.colorScheme == 'dark' ? "text-white" : "text-black"} group-hover/squareCollapse:text-[#3773eb] transition-all ease-in-out duration-1000`}
                                            >
                                                Facebook
                                            </h1>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* INSTAGRAM */}
                            <div
                                data-aos="fade-right"
                                data-aos-duration="700"
                                data-aos-offset="100"
                                data-aos-easing="ease"
                                data-aos-delay="0"
                                data-aos-once="true"
                            >
                                <div
                                    className={`z-40 ${theme.colorScheme === 'dark' ? '' : "white"}`}
                                    data-aos-once="true"
                                >
                                    <Link
                                        to={'https://www.instagram.com/smk_yatindo/'}
                                        target='_blank'
                                        className={` w-[3.5rem] h-[3.5rem] border-gray-300 border rounded-xl cursor-pointer overflow-x-hidden flex items-center ${xs && "group/squareCollapse hover:w-[9.5rem] hover:transition-all duration-300 ease-in-out"}`}
                                    >
                                        <div className='inline-block ml-3' >
                                            <FaInstagram className='icon-sosmed text-[30px] group-hover/squareCollapse:text-[#3773eb] group-hover/squareCollapse:transition-all ease-in-out group-hover/squareCollapse:duration-1000 ' />
                                        </div>
                                        <div className='mx-4 inline whitespace-nowrap '>
                                            <h1
                                                className={`text-collapse ${theme.colorScheme == 'dark' ? "text-white" : "text-black"} group-hover/squareCollapse:text-[#3773eb] transition-all ease-in-out duration-1000`}
                                            >
                                                Instagram
                                            </h1>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* TIKTOK */}
                            <div
                                data-aos="fade-right"
                                data-aos-duration="700"
                                data-aos-offset="100"
                                data-aos-easing="ease"
                                data-aos-delay="0"
                                data-aos-once="true"
                            >
                                <div
                                    className={`z-40 ${theme.colorScheme === 'dark' ? '' : "white"}`}
                                    data-aos-once="true"
                                >
                                    <Link
                                        to={'http://tiktok.com/@smk_yatindo'}
                                        target='_blank'
                                        className={` w-[3.5rem] h-[3.5rem] border-gray-300 border rounded-xl cursor-pointer overflow-x-hidden flex items-center ${xs && "group/squareCollapse hover:w-[7.5rem] hover:transition-all duration-300 ease-in-out"}`}
                                    >
                                        <div className='inline-block ml-3' >
                                            <FaTiktok className='icon-sosmed text-[30px] group-hover/squareCollapse:text-[#3773eb] group-hover/squareCollapse:transition-all ease-in-out group-hover/squareCollapse:duration-1000 ' />
                                        </div>
                                        <div className='mx-4 inline whitespace-nowrap '>
                                            <h1
                                                className={`text-collapse ${theme.colorScheme == 'dark' ? "text-white" : "text-black"} group-hover/squareCollapse:text-[#3773eb] transition-all ease-in-out duration-1000`}
                                            >
                                                Tiktok
                                            </h1>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* LOCATION */}
                            <div
                                data-aos="fade-right"
                                data-aos-duration="700"
                                data-aos-offset="100"
                                data-aos-easing="ease"
                                data-aos-delay="0"
                                data-aos-once="true"
                            >

                                <div
                                    className={`z-40 ${theme.colorScheme === 'dark' ? '' : "white"}`}
                                    data-aos-once="true"
                                >
                                    <Link
                                        to={'https://maps.app.goo.gl/qS75AuTUjrvHpKt48'}
                                        target='_blank'
                                        className={` w-[3.5rem] h-[3.5rem] border-gray-300 border rounded-xl cursor-pointer overflow-x-hidden flex items-center ${xs && "group/squareCollapse hover:w-[8.5rem] hover:transition-all duration-300 ease-in-out"}`}
                                    >
                                        <div className='inline-block ml-3' >
                                            <FaMapMarkerAlt className='icon-sosmed text-[30px] group-hover/squareCollapse:text-[#3773eb] group-hover/squareCollapse:transition-all ease-in-out group-hover/squareCollapse:duration-1000 ' />
                                        </div>
                                        <div className='mx-4 inline whitespace-nowrap '>
                                            <h1
                                                className={`text-collapse ${theme.colorScheme == 'dark' ? "text-white" : "text-black"} group-hover/squareCollapse:text-[#3773eb] transition-all ease-in-out duration-1000`}
                                            >
                                                Location
                                            </h1>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                        </div>

                        <div className='mt-10 w-[20rem] flex flex-col items-center'>
                            <p>Lokasi:</p>
                            <div className={`text-center ${!xs && 'text-[12px] px-5'}`}>Jalan Asem Raya No. 1 RT. 004/005 Kp. Ciketing Kelurahan Mustikajaya Kecamatan Mustikajaya Kota Bekasi Provinsi Jawa Barat Kode POS 17158.</div>
                            {/* <div className='text-center'>Jl. Asem Raya Jalan Kampung Ciketing No.1 Mustika Jaya bekasi timur Kota Bekasi Jawa Barat 17158 Indonesia</div> */}
                        </div>

                    </div>
                </Grid.Col>
            </Grid>
        </section>
    )
}

export default Contact