import {
    Group,
    Header as MantineHeader,
    MantineTheme
} from '@mantine/core';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ToggleTheme from '../components/toggleTheme';
import { useBreakPoints } from '../utils/UseBreakpoints';

const Header = () => {

    const { sm, } = useBreakPoints()

    return (
        <MantineHeader
            height={"13vh"}
            sx={((theme: MantineTheme) => {
                return {
                    display: "flex",
                    alignItems: "center",
                    paddingInline: "2rem",
                    backgroundColor: theme.colorScheme === 'dark' ? '#171F44' : '#171F44',
                    borderBottom: '1px solid black',
                    zIndex: 100,
                    justifyContent: "space-between"
                }
            }
            )}
        >
            <img src="logo-yatindo-hd.png" alt="" className='w-[60px]' />

            {
                sm &&
                (
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
                        <ToggleTheme color=''/>
                        
                    </Group>
                )}
            {!sm && (
                <div className='flex items-center gap-5'>
                    <ToggleTheme color=''/>
                    <FaBars size={30} className="text-white" />
                </div>
            )}
        </MantineHeader>
    )
}

export default Header