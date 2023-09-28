import { Carousel } from '@mantine/carousel'
import { Box } from '@mantine/core'
import { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { imageCarousel } from './imageByIndex';
import { useBreakPoints } from '../utils/UseBreakpoints';
import TransitionIn from './transitionIn';

const CustomCarousel = () => {

    const { xs, } = useBreakPoints()

    const [next, setNext] = useState({
        name: false,
        setState: () => { }
    })

    const divRef = useRef(null); // Ref untuk elemen div
    const intervalId = useRef<number | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Fungsi untuk memulai interval
        const startInterval = () => {
            intervalId.current = setInterval(() => {
                // Kode yang ingin dijalankan setiap interval
                // console.log('Interval berjalan saat div terlihat');
                next.name ? next.setState() : ""
            }, 6000); // Interval setiap 5 detik (5000 milidetik)
        };

        // Fungsi untuk menghentikan interval
        const stopInterval = () => {
            if (intervalId.current !== null) {

                clearInterval(intervalId.current);
            }

        };

        // Menggunakan Intersection Observer untuk mendeteksi visibilitas div
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    // Div terlihat, mulai interval jika isVisible adalah true
                    if (isVisible) {
                        startInterval();
                    }
                } else {
                    // Div tidak terlihat, hentikan interval
                    stopInterval();
                }
            },
            { threshold: 0 } // Memantau perubahan visibilitas saat elemen masuk atau keluar sepenuhnya dari tampilan
        );

        // Mendeteksi perubahan visibilitas halaman
        const handleVisibilityChange = () => {
            if (document.hidden) {
                // Halaman tidak terlihat, hentikan interval
                setIsVisible(false);
                stopInterval();
            } else {
                // Halaman terlihat, mulai interval jika div terlihat
                setIsVisible(true);
                if (divRef.current) {
                    startInterval();
                }
            }
        };

        // Menambahkan event listener ke document untuk mendeteksi perubahan visibilitas halaman
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Menghubungkan elemen div ke observer
        if (divRef.current) {
            observer.observe(divRef.current);
        }

        // Cleanup: Hentikan interval, disconnect observer, dan hapus event listener saat komponen dilepas
        return () => {
            stopInterval();
            if (divRef.current) {
                observer.unobserve(divRef.current);
            }
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isVisible, next]);

    return (
        <TransitionIn>
            <Carousel
                ref={divRef}
                height={!xs ? '45vh' : "87vh"}
                loop
                withControls={true}
                withIndicators
                previousControlIcon={
                    <div >
                        <FaArrowLeft className="text-white" size={xs ? 40 : 20} />
                    </div>
                }
                nextControlIcon={
                    <div >
                        <FaArrowRight className="text-white" size={xs ? 40 : 20} />
                    </div>
                }
                getEmblaApi={(a) => {
                    setNext({
                        name: true,
                        setState: () => a.scrollNext()
                    })
                }}
            >
                {
                    imageCarousel.map((image, i) => (
                        <Carousel.Slide key={i} >
                            <Box
                                sx={{
                                    height: "100%",
                                    width: '100%'
                                }}
                            >
                                <img src={image} alt={image} className='bg-cover h-full w-full' />
                            </Box>
                        </Carousel.Slide>
                    ))
                }
            </Carousel>
        </TransitionIn>
    )
}

export default CustomCarousel