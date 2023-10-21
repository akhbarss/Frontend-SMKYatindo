import {
    NavLink,
    Navbar,
    ScrollArea,
    ThemeIcon
} from "@mantine/core"
import { useEffect, useMemo, useState } from "react"
import { FiGitPullRequest, FiHome } from "react-icons/fi"
import { RiFileList3Line } from "react-icons/ri"
import { useLocation, useNavigate } from "react-router-dom"

const NavbarSiswa = ({
    opened,
    setOpened
}: {
    opened: boolean,
    setOpened: () => void
}) => {

    const IconHome = () =>
        <ThemeIcon color="blue" variant="light">
            <FiHome />
        </ThemeIcon>

    const IconPembelian = () =>
        <ThemeIcon color="green" variant="light">
            <RiFileList3Line />
        </ThemeIcon>

    const IconPengembalian = () =>
        <ThemeIcon variant="light" color="violet">
            <FiGitPullRequest />
        </ThemeIcon>

    const menusSiswa = useMemo(() => [
        {
            label: "Home",
            path: "/ppdb/siswa",
            icon: IconHome
        },
        {
            label: "Pembelian",
            path: "/ppdb/siswa/pembelian",
            icon: IconPembelian
        },
        {
            label: "Jalur Pendaftaran/Pengembalian",
            path: "/ppdb/siswa/pengembalian",
            icon: IconPengembalian
        },
    ], [])

    const { pathname: pathUrl } = useLocation()
    const navigate = useNavigate()

    const [active, setActive] = useState("")

    useEffect(() => {

        const activeLink = menusSiswa.find(menu => pathUrl === menu.path)

        // console.log(activeLink)

        if (activeLink) setActive(activeLink.label)


    }, [menusSiswa, pathUrl])

    return (
        <Navbar
            // bg={"#fff"}
            px="sm"
            py="xl"
            width={{ base: 300 }}
            hiddenBreakpoint="md"
            hidden={!opened}
        >
            <Navbar.Section
                grow
                component={ScrollArea}
                mx="-xs"
                px="xs"
            >
                {
                    menusSiswa.map((menu, i) => {
                        return (
                            <NavLink
                                active={active === menu.label}
                                icon={<menu.icon />}
                                key={i}
                                variant="light"
                                color="gray"
                                label={menu.label}
                                onClick={() => {
                                    navigate(menu.path)
                                    setActive(menu.label)
                                    setOpened()
                                }}

                            />

                        )
                    })
                }
            </Navbar.Section>
        </Navbar>

    )
}

export default NavbarSiswa