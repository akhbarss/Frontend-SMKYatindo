import {
    AppShell,
    Paper
} from "@mantine/core"
import { useDisclosure } from '@mantine/hooks'
import { Outlet } from "react-router-dom"
import HeaderSiswa from "../../../components/ppdb/headerSiswa"
import NavbarSiswa from "../../../components/ppdb/navbarSiswa"
import { Footer } from "../../../layouts"
import { useBreakPoints } from "../../../utils/UseBreakpoints"

const LayoutSiswa = () => {

    const [opened, { toggle }] = useDisclosure(false);
    const { sm } = useBreakPoints()

    return (
        <AppShell
            padding={0}
            header={<HeaderSiswa opened={opened} setOpened={toggle} />}
            navbar={<NavbarSiswa opened={opened} setOpened={toggle} />}
            navbarOffsetBreakpoint="md"
        >

            <Paper
                p={`${sm ? "3rem 2.5rem" : "3rem 1rem"}`}
                className="style-box"
                sx={(theme) => ({
                    minHeight: "80vh",
                    backgroundColor: `${theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[0]}`
                })}
            >
                <Outlet />
            </Paper>

            <Footer />

        </AppShell>
    )
}

export default LayoutSiswa