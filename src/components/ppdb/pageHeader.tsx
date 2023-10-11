import {
    Header as MantineHeader,
    useMantineTheme
} from '@mantine/core'
import { ScrollRestoration, useLocation } from 'react-router-dom'

const PageHeader = ({
    children
}: {
    children: React.ReactNode
}) => {

    const theme = useMantineTheme()
    const dark = theme.colorScheme === 'dark'

    const { pathname } = useLocation()
    const pageLogin = pathname.includes("/login")

    return (
        <MantineHeader
            height={'13vh'}
            sx={{
                boxShadow: `${dark ? "" : "0px -40px 50px 10px black"}`,
                display: "flex",
                justifyContent: 'space-between',
                alignItems: "center",
                paddingInline: "2rem",
                position: "fixed",
                backgroundColor: `${pageLogin ? "transparent" : `${dark ? theme.colors.dark[9] : ""}`} `,
                border: `${pageLogin ? "none" : ""}`,
                backdropFilter: `${pageLogin ? "blur(4px)" : ""}`
            }}
        >

            <ScrollRestoration />

            <img src="/logo-yatindo-hd.png" alt="Yatindo" className="w-[60px]" />

            {children}

        </MantineHeader>
    )
}

export default PageHeader

{/* <MantineHeader
height={'13vh'}
sx={{
    boxShadow: `${dark ? "" : "0px -40px 50px 10px black"}`,
    display: "flex",
    justifyContent: 'space-between',
    alignItems: "center",
    paddingInline: "2rem",
    position: "fixed",
    backgroundColor: "transparent",
    border: "none",
    backdropFilter: "blur(4px)"
    // backgroundColor: `${dark ? theme.colors.dark[9] : ""}`
}}
>

<ScrollRestoration />

<img src="/logo-yatindo-hd.png" alt="Yatindo" className="w-[60px]" />

{children}

</MantineHeader> */}