import {
    Group,
    Box,
    Stack,
    Paper,
    PasswordInput,
    Text,
    Button
} from "@mantine/core"
import { useMutation } from '@tanstack/react-query'
import { useForm } from '@mantine/form'
import { isNotEmpty, matchesField } from '@mantine/form'
import { ChangePasswordPayloadStudent, changePasswordStudent } from '../../../../apis/changePasswordStudent'
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"

const UbahPassword = () => {
    const { userId } = useParams()
    const changePasswordMutation = useMutation({
        mutationFn: changePasswordStudent
    })

    const form = useForm({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validate: {
            password: isNotEmpty("Harap isi password password baru"),
            confirmPassword: matchesField("password", "Password tidak sama")
        }
    })

    const submitChangePassword = (payload: ChangePasswordPayloadStudent) => {
        changePasswordMutation.mutate(payload, {
            onSuccess: (res) => {
                toast.success("Ubah password berhasil!")
                form.reset()
            },
            onError: (err) => {
                toast.error("Gagal mengubah password")
            }
        })
    }

    const submitHandler = (data: typeof form.values) => {
        submitChangePassword({ password: data.password, id: parseInt(userId) })
    }

    return (
        <form onSubmit={form.onSubmit(submitHandler)}>
            <Stack mt={30}>
                <Text mt={20} fz={30} fw={600}>Ubah Password</Text>
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