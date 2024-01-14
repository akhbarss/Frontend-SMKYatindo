import {
    Box,
    Button,
    Card,
    Image,
    Text
} from '@mantine/core'
import { Link } from 'react-router-dom'
import { useBreakPoints } from '../../utils/UseBreakpoints'

const Ppdb = () => {
    const { xs } = useBreakPoints()

    return (
        <>
            <Box id="ppdb" pt={60} className='flex gap-10 lg:flex-row flex-col mx-auto' >
                

                <Card
                    shadow="sm"
                    padding={"xl"}
                    className="group/card "
                >
                    <Card.Section inheritPadding withBorder py={"xs"}>
                        <Text size={20} align="center" weight={"bold"}>Daftar PPDB SMK</Text>
                    </Card.Section>
                    <Card.Section sx={{ overflow: "hidden" }}>
                        <Image
                            className=" transition  duration-300 ease-in-out group-hover/card:scale-105 "
                            src="/smk.jpg"
                            height={xs ? 260 : 200}
                            width={xs ? 500 : 300}
                            alt="smp"
                        />
                    </Card.Section>
                    <Card.Section p={20}>
                        <Button
                            fullWidth
                            // className="bg-[#2A166F]"
                            color="orange"
                            component={Link}
                            to="/ppdb/auth/register/smk"
                        >
                            Daftar
                        </Button>
                    </Card.Section>
                </Card>
                <Card
                    shadow="sm"
                    padding={"xl"}
                    className="group/card "
                >
                    <Card.Section inheritPadding withBorder py={"xs"}>
                        <Text size={20} align="center" weight={"bold"}>Daftar PPDB SMP</Text>
                    </Card.Section>
                    <Card.Section sx={{ overflow: "hidden" }}>
                        <Image
                            className=" transition  duration-300 ease-in-out group-hover/card:scale-105 "
                            src="/smp.jpg"
                            height={xs ? 260 : 200}
                            width={xs ? 500 : 300}
                            alt="smp"
                        />
                    </Card.Section>
                    <Card.Section p={20}>
                        <Button
                            fullWidth
                            className="bg-[#2A166F]"
                            // color="orange"
                            component={Link}
                            to="/ppdb/auth/register/smp"
                        >
                            Daftar
                        </Button>
                    </Card.Section>
                </Card>
            </Box>
        </>
    )
}

export default Ppdb;