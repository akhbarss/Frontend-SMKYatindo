import {
    Box,
    Group,
    Menu,
    Paper
} from "@mantine/core"
import { useEffect, useMemo, useState } from 'react'

import { useDisclosure } from '@mantine/hooks'
import { FaBars } from "react-icons/fa"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import CollapseAdminPPDB from '../../../components/ppdb/colllapseCustomPPDB'
import PageHeader from "../../../components/ppdb/pageHeader"
import ToggleTheme from "../../../components/toggleTheme"
import { Footer } from "../../../layouts"
import { useBreakPoints } from '../../../utils/UseBreakpoints'

const RootAdminPPDB = () => {

    const [active, setActive] = useState("")

    const [opened, { toggle }] = useDisclosure(false);
    const { sm } = useBreakPoints()

    const { pathname: pathUrl } = useLocation()
    const navigate = useNavigate()

    const menuSiswa = useMemo(() => [
        { label: "Beranda", path: "/ppdb/siswa" },
        { label: "Pembelian", path: "/ppdb/siswa/pembelian" },
        { label: "Pengembalian", path: "/ppdb/siswa/pengembalian" },
        { label: "Ujian", path: "/ppdb/siswa/ujian" },
    ], [])

    useEffect(() => {
        const activeLink = menuSiswa.find(menu => pathUrl === menu.path)
        if (activeLink) {
            setActive(activeLink.label)
        }
    }, [menuSiswa, pathUrl])

    return (
        <Box>
            <PageHeader>

                {sm ? (
                    <>
                        <Group>

                            {menuSiswa.map((menu, i) => (
                                <Link
                                    key={i}
                                    to={menu.path}
                                    className={`font-bold `}
                                    style={{
                                        color: `${active === menu.label ? "#6767e0" : ""}`
                                    }}

                                >
                                    {menu.label}
                                </Link>
                            ))}


                        </Group>

                        <Group>

                            <ToggleTheme color="black" />

                            <Menu
                                trigger='hover'
                                openDelay={100}
                                closeDelay={400}
                            >
                                <Menu.Target>
                                    <div>
                                        <FaBars size={30} />
                                    </div>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Label>Muhammad Akhbar Firdaus</Menu.Label>
                                    <Menu.Item >Profile</Menu.Item>
                                    <Menu.Item onClick={() => navigate("/ppdb/login")} >Logout</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>

                        </Group>
                    </>
                ) : (
                    <Group   >

                        <ToggleTheme color="black" />


                        <FaBars size={30} onClick={toggle} />
                        {/* <Avatar onClick={toggle} /> */}

                    </Group>
                )}

            </PageHeader>

            <Paper pt={'13vh'} h={'100vh'} className="style-box">
                <CollapseAdminPPDB
                    menus={menuSiswa}
                    opened={opened}
                    toggle={toggle}
                />
                <Outlet />
            </Paper>

            <Footer />

        </Box>
    )
}

export default RootAdminPPDB