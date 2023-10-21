import {
    TextInput,
    Stack,
    Button,
    Group,


} from "@mantine/core"
import { modals } from "@mantine/modals"
import { useNavigate } from "react-router-dom"

const RegisterInformasiKredensial: React.FC = () => {

    const navigate = useNavigate()
    
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const onAccept = () => {
            console.log("go to homepage")

            navigate("/ppdb/main/home")
            // handleStepChange(active + 1)
        }

        modals.openContextModal({
            modal: 'modalSuccess',
            innerProps: {
                onAccept,
                modalBody:
                    `Selamat, anda telah berhasil memulai awal PPDB. silahkan klik lanjutkan`,
            },
            closeOnClickOutside: false,
            closeOnEscape: false,
            withCloseButton: false
        })
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
                />

                <TextInput
                    label="Konfirmasi Password"
                    withAsterisk
                    required
                    type="password"
                />

                <Group position="center" mt="xl">
                    <Button type="submit">Simpan dan lanjutkan</Button>
                </Group>

            </Stack>
        </form>
    )
}

export default RegisterInformasiKredensial