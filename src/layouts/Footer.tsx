import {
    useMantineTheme
} from "@mantine/core"
import { useBreakPoints } from "../utils/UseBreakpoints"

const Footer = () => {
    const { xs } = useBreakPoints()
    const theme = useMantineTheme()
    const dark = theme.colorScheme === 'dark'
    return (
        <footer
            style={{
                paddingBlock: "20px",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                fontSize: `${!xs ? "10px" : ""}`,
                borderTop: `1px solid ${dark ? "rgba(60,60,60, 60)" : "rgba(240,240,240, 240)"}`,
                height: "60px"
            }}
        >
            © 2023 D'Coders TKJ Yatindo. All Rights Reserved
        </footer>
    )
}

export default Footer