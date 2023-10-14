/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Button,
    Group,
    PasswordInput,
    TextInput,
    useMantineTheme
} from "@mantine/core"
import { useBreakPoints } from "../../utils/UseBreakpoints"

// type LoginDaftarFormValues = {
//     namaLengkap: string 
//     noWhatsapp: string | number
//     alamatLengkap: string
//     asalSekolah: string
//     password: string | number
//     confirmPassword: string | number
// }

const AuthDaftar = ({
    auth,
    load,
    setLoad,
    setValue
}: {
    auth: string
    load: boolean
    setLoad: React.Dispatch<React.SetStateAction<boolean>>
    setValue: React.Dispatch<React.SetStateAction<string>>
}) => {

    const { md } = useBreakPoints()
    const theme = useMantineTheme()
    const dark = theme.colorScheme === 'dark'

    if (auth === "daftar") return (
        <form className='mt-5'>
            <TextInput
                autoFocus={md}
                label="Nama Lengkap"
                styles={{
                    label: {
                        fontWeight: "bold"
                    },
                    input: {

                    },
                }}
            />
            <TextInput
                mt={16}
                label="No Whatsapp"
                styles={{
                    label: {
                        fontWeight: "bold"
                    },
                }}
            />
            <TextInput
                mt={16}
                label="Alamat Lengkap"
                styles={{
                    label: {
                        fontWeight: "bold"
                    },
                }}
            />
            <TextInput
                mt={16}
                label="Asal Sekolah"
                styles={{
                    label: {
                        fontWeight: "bold"
                    },
                }}
            />
            <PasswordInput
                mt={16}
                label="Password"
                styles={{
                    label: { fontWeight: "bold" },
                    visibilityToggle: {
                        color: "gray"
                    }
                }}
            />
            <PasswordInput
                mt={16}
                label="Ulangi Password"
                styles={{
                    label: { fontWeight: "bold" },
                    visibilityToggle: {
                        color: "gray"
                    }
                }}
            />
            <Group className='mt-5 '>
                <Button
                    loading={load}
                    className='ml-auto '
                    variant='outline'
                    color={`${dark ? "indigo" : "black"}`}
                    onClick={() => {
                        setLoad(true)
                        setTimeout(() => {
                            setLoad(false)
                            setValue('masuk')
                        }, 1000)
                    }}
                >
                    Daftar
                </Button>
            </Group>
        </form>
    )
}

export default AuthDaftar