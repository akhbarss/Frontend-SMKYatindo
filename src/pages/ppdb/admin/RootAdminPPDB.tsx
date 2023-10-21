import {
    Group,
    Menu,
    Paper,
    useMantineTheme,
    ActionIcon
} from "@mantine/core"
import { useDisclosure } from '@mantine/hooks'
import { useEffect, useMemo, useState } from 'react'
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

    const theme = useMantineTheme()
    const dark = theme.colorScheme === "dark"

    const { pathname: pathUrl } = useLocation()
    const navigate = useNavigate()

    const menuAdmin = useMemo(() => [
        { label: "Beranda", path: "/ppdb/admin" },
        { label: "Alur", path: "/ppdb/admin/alur-ppdb" },
        { label: "Jalur", path: "/ppdb/admin/jalur-pendaftaran" },
        { label: "Pendaftar", path: "/ppdb/admin/pendaftar-ppdb" },
        { label: "Ujian", path: "/ppdb/admin/ujian-ppdb" },
    ], [])

    useEffect(() => {
        const activeLink = menuAdmin.find(menu => pathUrl === menu.path)

        if (activeLink) {
            setActive(activeLink.label)
        }

    }, [menuAdmin, pathUrl])

    return (
        <div id="root-admin">

            <PageHeader>
                {sm ? (
                    <>
                        <Group>

                            {menuAdmin.map((menu, i) => (
                                <Link
                                    key={i}
                                    to={menu.path}
                                    className={`font-bold `}
                                    style={{
                                        color: `${active === menu.label ? "#3B82F6" : ""}`
                                    }}

                                >
                                    {menu.label}
                                </Link>
                            ))}


                        </Group>

                        <Group >

                            <ToggleTheme color="black" />

                            <Menu
                                trigger='hover'
                                openDelay={100}
                                closeDelay={400}
                            >
                                <Menu.Target>
                                    <ActionIcon >
                                        <FaBars size={35} />
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Label>Muhammad Akhbar Firdaus</Menu.Label>
                                    <Menu.Item >Profile</Menu.Item>
                                    <Menu.Item >Pengaturan</Menu.Item>
                                    <Menu.Item onClick={() => {
                                        localStorage.removeItem("accessToken")
                                        navigate("/ppdb/login")
                                    }}
                                    >
                                        Logout
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>

                        </Group>
                    </>
                ) : (
                    <Group   >

                        <ToggleTheme color="black" />

                        <FaBars size={30} onClick={toggle} />

                    </Group>
                )}
            </PageHeader>

            <Paper
                // className={`style-box  flex flex-col  min-h-[87vh] ${dark ? "" : "bg-neutral-200"}`}
                sx={theme => ({
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "87vh",
                    backgroundColor: `${dark ? theme.colors.dark[9] : theme.colors.gray[0]}`
                })}
            >

                <CollapseAdminPPDB
                    menus={menuAdmin}
                    opened={opened}
                    toggle={toggle}
                />

                <Outlet />

            </Paper>

            <Footer />


        </div>
    )
}

export default RootAdminPPDB