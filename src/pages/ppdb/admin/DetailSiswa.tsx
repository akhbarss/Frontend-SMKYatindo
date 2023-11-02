import {
    Title,
    Divider,
    Stack,
    Image,
    ThemeIcon,
    Group,
    Box,
    Paper,
    Flex,
    Text,

} from "@mantine/core"
import { Link, useParams } from 'react-router-dom'
import { DarkTheme } from '../../../utils/darkTheme'
import { BsWhatsapp } from "react-icons/bs"
import PageLabel from '../../../components/PageLabel'
import Page from '../../../components/Page'

const DetailSiswa = () => {
    const { userId } = useParams()
    const dark = DarkTheme()

    return (
        <Page title='Detail Informasi Pendaftar'>
            <PageLabel label='Detail Informasi Pendaftar' />
            <Stack >
                <Paper p={"lg"} mt={40}>
                    <Group>
                        <Box>
                            <Image src='/yayasan.png' width={50} />
                        </Box>
                        <Box>
                            <Text size={"xl"} weight={"bolder"}>Muhammad Putra Ramadhan</Text>
                            <Text color='#80849C' weight={"bold"}>KP. ciketing rawamulya RT 05/02 mustika jaya</Text>
                        </Box>
                    </Group>
                    <Flex
                        mt={20}
                        direction={{ base: 'column', sm: 'row' }}
                        gap={{ base: 'sm', sm: 'lg' }}
                    >
                        <Paper
                            p={"lg"}
                            sx={theme => ({ backgroundColor: dark ? theme.colors.dark[8] : theme.colors.gray[1], flex: 1 })}
                        >
                            <Flex
                                direction={{ base: 'column', xl: 'row' }}
                                gap={{ base: 'sm', sm: 'lg' }}
                            >
                                <Box>
                                    <Text color='#80849C' weight={"bold"}>No Telepon</Text>
                                    <Box target="_blank" component={Link} to={`https://wa.me/089513759404?text=Halo%20nak`} className='flex items-center no-underline gap-2'>
                                        <ThemeIcon size={30} radius={"lg"} color='green'>
                                            <BsWhatsapp />
                                        </ThemeIcon>
                                        <Text size={"xl"} color='#2A166F' weight={"bold"}>089513759404</Text>
                                    </Box>
                                </Box>
                                <Box>
                                    <Text color='#80849C' weight={"bold"}>Tanggal Mendaftar</Text>
                                    <Text size={"xl"} color='#2A166F' weight={"bold"}>Kamis, 18 November 2023</Text>
                                </Box>
                            </Flex>
                        </Paper>
                        <Paper
                            p={"lg"}
                            sx={theme => ({ backgroundColor: dark ? theme.colors.dark[8] : theme.colors.gray[1], flex: 1 })}
                        >
                            <Text color='#80849C' weight={"bold"}>Status</Text>
                            <Text color='#2A166F' weight={"bold"} size={"xl"}>Menunggu Konfirmasi Pembayaran</Text>
                        </Paper>
                    </Flex>
                </Paper>

                <Paper p={"lg"}>
                    <Title order={2}>Pembayaran</Title>
                    <Divider />
                </Paper>
            </Stack>
        </Page>

    )
}

export default DetailSiswa