import { Box, useMantineTheme } from '@mantine/core'
import { useBreakPoints } from '../../utils/UseBreakpoints'
import { Link } from 'react-router-dom'

const Ppdb = () => {
    const { xs } = useBreakPoints()
    const theme = useMantineTheme()
    const dark = theme.colorScheme === 'dark'

    return (
        <Box
            id="beranda"
            sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: `${xs ? "center" : ""}`,
                minHeight: `${xs ? "87vh" : "80vh"}`,
                backdropFilter: `${dark ? "brightness(.75)" : "brightness(.5)"}`
            }}
        >
            <Box
                sx={(theme => ({
                    backgroundColor: theme.colorScheme === 'dark' ? "black" : theme.colors.gray[0],
                    color: theme.colorScheme === 'dark' ? theme.colors.gray[1] : "#020731",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: `${xs ? "65%" : ""}`,
                    height: `${xs ? "450px" : ""}`,
                    borderRadius: `${xs ? "20px" : ""}`,
                    boxShadow: `${xs ? "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" : ""}`,
                    flex: `${xs ? "" : "1"}`
                }))}
            >
                <div style={{ fontWeight: "bold", textAlign: "center" }}>
                    <h1
                        style={{
                            WebkitBackgroundClip: "text",
                            color: `${dark ? "transparent" : ""}`,
                            backgroundImage: "linear-gradient(to top left, white, #281a67)",
                            fontSize: `${xs ? "40px" : "24px"}`
                        }}
                    >
                        PPDB Online
                    </h1>
                    <h1
                        style={{
                            WebkitBackgroundClip: "text",
                            color: `${dark ? "transparent" : ""}`,
                            backgroundImage: "linear-gradient(to top left, #281a67, white)",
                            fontSize: `${xs ? "40px" : "24px"}`
                        }}
                    >
                        SMK Tinta Emas Indonesia
                    </h1>
                </div>
                <Link
                    to={'/ppdb/login'}
                    style={{
                        height: "3.5rem",
                        marginTop: "2.5rem",
                        backgroundColor: `${dark ? "#291872" : "#020731"}`,
                        display: "flex",
                        alignItems: 'center',
                        paddingInline: "2.5rem",
                        fontWeight: "bold",
                        fontSize: "24px",
                        boxShadow: "0 10px 20px -10px #291872",
                        color: "white",
                        textDecoration: "none"
                    }}
                >
                    Daftar
                </Link>
            </Box>
        </Box>
    )
}

export default Ppdb;