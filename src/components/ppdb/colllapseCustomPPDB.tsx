import {
    Collapse,
    Button,
    Divider,
    MantineTheme,
    Paper,
    useMantineTheme
} from '@mantine/core'
import React from "react"
import ReactDOM from "react-dom"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { scroller } from 'react-scroll'

const CollapseNavbarPortal = ({
    opened,
    dark,
    theme,
    routeGuest,
    menus,
    toggle,
    routeAdmin,
    routeSiswa,

}: {
    opened: boolean
    toggle: () => void
    menus: { label: string, path: string }[]
    dark: boolean
    theme: MantineTheme
    routeGuest: boolean
    routeAdmin: boolean
    routeSiswa: boolean
}) => {

    const navigate = useNavigate()

    return (
        <Collapse
            in={opened}
            transitionDuration={200}
            transitionTimingFunction='ease'
            className='menu-bar-collapse h-[100%] w-full  fixed top-[70px] z-[10000] text-white '
        >
            <Paper className='flex flex-col min-h-[100vh] py-6 gap-4 text-xl px-8 bg-[#2A166F] text-white'
                sx={{
                    // backgroundColor: `${dark ? theme.colors.dark[9] : ""}`
                }}
            >

                {menus.map((menu, i) => (
                    <div
                    className='cursor-pointer '
                        key={i}
                        onClick={() => {

                            toggle()
                            setTimeout(() => {
                                scroller.scrollTo(menu.path, {
                                    duration: 500,
                                    delay: 100,
                                    smooth: true,
                                    offset: -100,
                                });
                            }, 300)

                        }}
                    >
                        {menu.label}
                    </div>
                ))}

                <Divider color='white'/>

                {(
                    <>
                        <Link to={"/ppdb/auth/login"} className='text-white no-underline'>
                            Masuk
                        </Link>
                        <Link to={"/ppdb/auth/register"} className='text-white no-underline'>
                            Daftar SMK
                        </Link>
                        <Link to={"/ppdb/auth/register"} className='text-white no-underline'>
                            Daftar SMP
                        </Link>
                    </>
                )}

                {routeAdmin && (
                    <>
                        <Link to={'#'}>
                            Profile
                        </Link>

                        <Link to={'#'}>
                            Pengaturan
                        </Link>

                        <Button onClick={() => {
                            localStorage.removeItem("accessToken")
                            navigate("/ppdb/login")
                        }}>
                            Logout
                        </Button>
                    </>
                )}

                {routeSiswa && (
                    <>
                        <Link to={'#'}>
                            Profile
                        </Link>

                        <Link to={'/ppdb/login'}>
                            Logout
                        </Link>
                    </>
                )}

            </Paper>
        </Collapse>
    )
}

const CollapseCustomPPDB = ({
    opened,
    toggle,
    menus,
}: {
    opened: boolean
    toggle: () => void
    menus: { label: string, path: string }[]
}) => {

    const { pathname, } = useLocation()

    const routeGuest = pathname === "/ppdb"
    const routeAdmin = pathname.split("/").includes("admin")
    const routeSiswa = pathname.split("/").includes("siswa")

    const theme = useMantineTheme()
    const dark = theme.colorScheme === 'dark'

    return (
        <React.Fragment>
            {
                ReactDOM.createPortal(
                    <CollapseNavbarPortal
                        dark={dark}
                        menus={menus}
                        opened={opened}
                        routeAdmin={routeAdmin}
                        routeGuest={routeGuest}
                        routeSiswa={routeSiswa}
                        theme={theme}
                        toggle={toggle}

                    />,
                    document.getElementById("navbar-collapse") as Element
                )
            }
        </React.Fragment>
    )
}

export default CollapseCustomPPDB