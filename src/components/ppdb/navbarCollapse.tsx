import React from 'react'
import {
    Collapse,
    Paper,
    useMantineTheme,
} from '@mantine/core'
import { Link, useLocation } from 'react-router-dom'
import { Link as Anchor, scroller } from 'react-scroll'

const NavbarCollapse = ({
    opened,
    toggle
}: {
    opened: boolean
    toggle: () => void
}) => {
    const theme = useMantineTheme()
    const dark = theme.colorScheme === 'dark'

    const { pathname } = useLocation()


    return (
        <Collapse
            in={opened}
            transitionDuration={200}
            transitionTimingFunction='ease'
            className='menu-bar-collapse h-[100%] w-full  fixed top-[13vh] z-[10000] text-white '
            onTransitionEnd={() => console.log('end')}
        >
            <Paper className='flex flex-col min-h-[100vh] py-6 gap-4 text-xl px-8'
                sx={{
                    backgroundColor: `${dark ? theme.colors.dark[9] : ""}`
                }}
            >
                {pathname === "/ppdb" &&
                    <React.Fragment>

                        <Anchor to='beranda' smooth={"easeInOutQuint"} duration={500} offset={-200} className='w-fit ' onClick={toggle}>
                            Beranda
                        </Anchor>
                        <Anchor to='alur-pendaftaran' smooth={'easeInOutQuint'} duration={500} offset={-100} className='w-fit' onClick={toggle}>
                            Alur Pendaftaran
                        </Anchor>
                        <Anchor to='jalur-pendaftaran' smooth={'easeInOutQuint'} duration={500} offset={-70} className='w-fit' onClick={toggle}>
                            Jalur Pendaftaran
                        </Anchor>
                        <Link to={'/ppdb/login'} className='w-fit' onClick={toggle}>
                            Masuk
                        </Link>
                        <Link to={'/ppdb/login'} className='w-fit' onClick={toggle}>
                            Daftar
                        </Link>
                    </React.Fragment>
                }
                {pathname === "/ppdb/login" &&
                    <React.Fragment>
                        <Link to={'/ppdb'} className='w-fit' onClick={toggle}>
                            Beranda
                        </Link>
                        <Link to='/ppdb' className='w-fit' onClick={() => {
                            toggle()
                            setTimeout(() => {
                                scroller.scrollTo('alur-pendaftaran', {
                                    duration: 500,
                                    delay: 100,
                                    smooth: true,
                                    offset: -100,
                                });
                            }, 300)
                        }}
                        >
                            Alur Pendaftaran
                        </Link>
                        <Link to='/ppdb' className='w-fit' onClick={() => {
                            toggle()
                            setTimeout(() => {
                                scroller.scrollTo('jalur-pendaftaran', {
                                    duration: 500,
                                    delay: 100,
                                    smooth: true,
                                    offset: -80,
                                });
                            }, 300)
                        }}>
                            Jalur Pendaftaran
                        </Link>
                        <Link to={'/ppdb/login'} className='w-fit' onClick={toggle}>
                            Masuk
                        </Link>
                        <Link to={'/ppdb/login'} className='w-fit' onClick={toggle}>
                            Daftar
                        </Link>
                    </React.Fragment>
                }
            </Paper>
        </Collapse>
    )
}

export default NavbarCollapse