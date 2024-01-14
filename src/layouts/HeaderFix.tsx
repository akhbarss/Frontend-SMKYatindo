import {
    Group,
    Header as MantineHeader
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBreakPoints } from '../utils/UseBreakpoints';
import { FaBars } from 'react-icons/fa';
import ToggleTheme from '../components/toggleTheme';

const HeaderFix = () => {

    const {  sm, } = useBreakPoints()
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 300) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <MantineHeader
            height={"13vh"}
            className={`${scroll ? "fixed top-0 transition-all ease-out duration-700" : "fixed top-[-300px] transition-all ease-linear duration-700 "}`}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingInline: "2rem",
                backgroundColor: "rgba(23, 31, 68, 0.9)",
                // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : '#171F44',
                // backgroundColor: theme.colorScheme === 'dark' ? '#171F44' : '#171F44',
                borderBottom: 'none',
                boxShadow: "0px 0px 10px 0px black",
                backdropFilter: "blur(10px)"
            }}
        >
            <img src="logo-yatindo-hd.png" alt="" className='w-[60px]' />
            {
                sm && (
                    <Group sx={(theme => ({ color: theme.colors.gray[1] }))}>
                        <Link
                            className='hover:text-gray-300'
                            target='_blank'
                            to={'https://drive.google.com/file/d/1QLUr0LJMHWgpa1lRX9xiJHCVnP_x_84B/view?usp=sharing'}
                        >
                            Tentang Kami
                        </Link>
                        <Link
                            className='hover:text-gray-300'
                            target='_blank'
                            to={'https://drive.google.com/file/d/14dhwOuAa2zA96UL2it6cMbwrwrdnGhss/view?usp=share_link'}
                        >
                            Struktur Organisasi
                        </Link>
                        <Link
                            className='hover:text-gray-300'
                            target='_blank'
                            to={'https://drive.google.com/file/d/1tnIcLc1NpzCB_Snf8JgodD5EeWyl7fM6/view?usp=sharing'}
                        >
                            Mitra Industri
                        </Link>
                        <Link
                            className='hover:text-gray-300'
                            target='_blank'
                            to={'https://drive.google.com/file/d/1qpalVG9hrHBNTNVF8Mu5TdLID8KLrgcG/view?usp=sharing'}
                        >
                            Download Brosur
                        </Link>
                        <ToggleTheme color='' />

                    </Group>

                )}
            {!sm && (
                <div className='flex items-center gap-5'>
                    <ToggleTheme color='' />
                    <FaBars size={30} className="text-white" />
                </div>
            )}
        </MantineHeader>
    )
}

export default HeaderFix