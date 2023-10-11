import { useBreakPoints } from "../utils/UseBreakpoints"
import { Footer as MantineFooter, useMantineTheme } from '@mantine/core'

const Footer = () => {

    const { xs, } = useBreakPoints()

    const theme = useMantineTheme()
    const dark = theme.colorScheme === 'dark'

    return (
        <MantineFooter
            height={"10vh"}
            sx={{
                backgroundColor: `${dark ? theme.colors.dark[9] : ""}`
            }}
            className={` w-full  py-5 justify-center flex items-center ${!xs && 'text-[10px]'} `}
        >
            © 2023 D'Coders TKJ Yatindo. All Rights Reserved
        </MantineFooter>
    )
}

export default Footer