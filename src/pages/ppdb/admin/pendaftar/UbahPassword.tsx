import {
    Button,
    Group,
    PasswordInput,
    Stack,
    Text,
    TextInput
} from "@mantine/core"
import { matchesField, useForm } from '@mantine/form'
import { useMutation } from '@tanstack/react-query'
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { ChangePasswordPayloadStudent, changePasswordStudent } from '../../../../apis/changePasswordStudent'

const UbahPassword = () => {
    const { userId } = useParams()
    const changePasswordMutation = useMutation({
        mutationFn: changePasswordStudent
    })

    const form = useForm({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: ""
        },
        validate: {
            confirmPassword: matchesField("password", "Password tidak sama")
        }
    })

    const submitChangePassword = (payload: ChangePasswordPayloadStudent) => {
        changePasswordMutation.mutate(payload, {
            onSuccess: () => {
                toast.success("Ubah password berhasil!")
                form.reset()
            },
            onError: () => {
                toast.error("Gagal mengubah password")
            }
        })
    }

    const submitHandler = (data: typeof form.values) => {
        submitChangePassword({ password: data.password, id: parseInt(userId) , username: data.username})
    }

    return (
        <form onSubmit={form.onSubmit(submitHandler)}>
            <Stack mt={30}>
                <Text mt={20} fz={30} fw={600}>Ubah Kredensial Akun</Text>
                <TextInput
                    label="No Telpon"
                    {...form.getInputProps("username")}
                />
                <PasswordInput label="Password Baru" {...form.getInputProps("password")} />
                <PasswordInput label="Konfirmasi Password" {...form.getInputProps("confirmPassword")} />
                <Group position='right' mt={20} >
                    <Button type='submit' loading={changePasswordMutation.status === "pending"} >Ubah Password</Button>
                </Group>
            </Stack>
        </form>
    )
}

export default UbahPassword