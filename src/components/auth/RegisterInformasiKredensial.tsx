import {
    TextInput,
    Stack,
    Button,
    Group,
} from "@mantine/core"
import { modals } from "@mantine/modals"
import { useNavigate } from "react-router-dom"

type TRegisterInformasiKredensial = {
    noWhatsapp: string
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
    onSubmit: () => void
}

const RegisterInformasiKredensial: React.FC<TRegisterInformasiKredensial> = ({
    noWhatsapp,
    password,
    setPassword,
    onSubmit
}) => {

    const navigate = useNavigate()

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        onSubmit()
        // const onAccept = () => {
        //     console.log("go to homepage")

        //     navigate("/ppdb/main/home")
        // }

        // modals.openContextModal({
        //     modal: 'modalSuccess',
        //     innerProps: {
        //         onAccept,
        //         modalBody:
        //             `Selamat, anda telah berhasil memulai awal PPDB. silahkan klik lanjutkan`,
        //     },
        //     closeOnClickOutside: false,
        //     closeOnEscape: false,
        //     withCloseButton: false
        // })
    }

    return (
        <form onSubmit={submitHandler}>
            <Stack mt={20}>

                <TextInput
                    label="Password"
                    withAsterisk
                    required
                    type="password"
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* <TextInput
                    label="Konfirmasi Password"
                    withAsterisk
                    required
                    type="password"
                /> */}

                <Group position="center" mt="xl">
                    <Button
                     type="submit"
                     
                     >Simpan dan lanjutkan</Button>
                    {/* <Button onClick={() => console.log(noWhatsapp)}>Get Whatsapp</Button> */}
                </Group>

            </Stack>
        </form>
    )
}

export default RegisterInformasiKredensial