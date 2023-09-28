import { useBreakPoints } from "../utils/UseBreakpoints"

const Footer = () => {

    const { xs, } = useBreakPoints()

    return (
        <footer className={`bg-[#002366] w-full   text-white py-5 text-center    items-center ${!xs && 'text-[10px]'}`}>
            © 2023 D'Coders TKJ Yatindo. All Rights Reserved
        </footer>
    )
}

export default Footer