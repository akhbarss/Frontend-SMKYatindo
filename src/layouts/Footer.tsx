import { useBreakPoints } from "../utils/UseBreakpoints"

const Footer = () => {

    const { xs, } = useBreakPoints()

    // const theme = useMantineTheme()
    // const dark = theme.colorScheme === 'dark'

    return (
        <footer
            className={` w-full  py-5 justify-center flex items-center ${!xs && 'text-[10px]'} `}
        >
            © 2023 D'Coders TKJ Yatindo. All Rights Reserved
        </footer>
    )
}

export default Footer