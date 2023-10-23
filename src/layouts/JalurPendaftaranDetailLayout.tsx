import {
    Paper,
    Box,
    Stack,
    Group,
} from "@mantine/core"
import { DarkTheme } from "../utils/darkTheme"

type TJalurPendaftaranDetailLayout = {
    children: React.ReactNode
}

const JalurPendaftaranDetailLayout: React.FC<TJalurPendaftaranDetailLayout> = ({ children }) => {

    const dark = DarkTheme()

    return (
        <Box>
            <Paper
                sx={theme => ({
                    backgroundColor: dark ? theme.colors.dark[9] : theme.white
                })}
            >
                <h1>Layout</h1>
            </Paper>
            {children}
        </Box>
    )
}

export default JalurPendaftaranDetailLayout