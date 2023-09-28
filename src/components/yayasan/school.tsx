import { useBreakPoints } from "../../utils/UseBreakpoints"

const School = () => {

    const { xs, } = useBreakPoints()

    return (
        <section id="school" className={`school p-[25px] min-h-[100vh] flex justify-center ${!xs && 'pt-[8rem]'} px-[1rem] overflow-hidden`}>
            <div
                // id="dashboard"
                className='parralax f1'
            // style={{ backgroundImage: `url(${currentBackground})`, transition: "ease-in 1s", color: "black" }}
            >
                <div className="yatindo flex flex-col items-center">
                    <img
                        src="logo-yatindo-hd.png"
                        alt="logo"
                        className=' w-[150px] hover:scale-[1.1] transition-transform duration-1000 delay-100'
                        // {...animation}
                    />
                    <div className="text w-full px-[2.5rem]">
                        <h1
                            className='font-bold text-[28px]'
                            data-aos="fade-right"
                            data-aos-duration="700"
                            data-aos-offset="200"
                            data-aos-easing="ease"
                            data-aos-once="true"
                        >
                            YAYASAN TINTA EMAS INDONESIA
                        </h1>
                        <h1
                            className='font-bold text-[28px]'
                            data-aos="fade-left"
                            data-aos-duration="700"
                            data-aos-offset="200"
                            data-aos-easing="ease"
                            data-aos-delay="200"
                            data-aos-once="true"
                        >
                            SMP - SMK
                        </h1>
                        <h1
                            className='font-bold text-[28px]'
                            data-aos="fade-right"
                            data-aos-duration="700"
                            data-aos-offset="200"
                            data-aos-delay="300"
                            data-aos-easing="ease"
                            data-aos-once="true"
                        >
                            TINTA EMAS INDONESIA
                        </h1>

                    </div>
                    <div
                        className='slogan'
                        data-aos="fade-up"
                        data-aos-duration="700"
                        data-aos-offset="100"
                        data-aos-delay="300"
                        data-aos-easing="ease"
                        data-aos-once="true"
                    >
                        <h3>SCHOOL FOR STUDY, CREATION, PLAY, AND GROWTH</h3>
                        <h3>TERAKREDITASI "A"</h3>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default School