import {
    Avatar,
    Box,
    Button,
    Card,
    Group,
    PasswordInput,
    Stack,
    Text,
    TextInput
} from "@mantine/core";
import {
    isNotEmpty,
    matchesField,
    useForm
} from "@mantine/form";
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from "react";
import toast from 'react-hot-toast';
import { jwtDecode } from '../../apis/alur/decodeJWT';
import { ChangePasswordPayloadAdmin, changePasswordAdmin } from "../../apis/changePasswordAdmin";
import Page from '../../components/Page';
import PageLabel from '../../components/PageLabel';
import { useBreakPoints } from "../../utils/UseBreakpoints";
import { formattedNameFn } from "../../utils/formattedName";

const color = ["teal", "violet", "blue", "pink", "green", "yellow", "red", "orange", "indigo", "cyan", "grape", "#a436b5", "#36b59e", "#b56536"]

const Profile = () => {
    const { md } = useBreakPoints()
    const changePasswordMutation = useMutation({
        mutationFn: changePasswordAdmin
    })

    const form = useForm({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validate: {
            password: isNotEmpty("Harap isi password password baru anda"),
            confirmPassword: matchesField("password", "Password tidak sama")
        }
    })

    const {
        isError,
        isSuccess,
        data: user,
    } = useQuery({
        queryFn: jwtDecode,
        queryKey: ["session-profile"],
    });

    const submitChangePassword = (payload: ChangePasswordPayloadAdmin) => {
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
        submitChangePassword({ password: data.password, id: user?.data?.id })
    }

    const student = isSuccess && user?.data?.student
    const admin = isSuccess && user?.data
    const isStudent = isSuccess && user?.data.role_id.role_name === "User"
    const isAdmin = isSuccess && user?.data.role_id.role_name === "Admin"
    const adminName = admin?.fullname
    const studentName = student?.name

    const formattedNameStudent = formattedNameFn(studentName)
    const formattedNameAdmin = formattedNameFn(adminName)

    const randomNum = useMemo(() => {
        return Math.floor(Math.random() * 14) + 1
    }, [])

    if (isError) return <Text size={40}>Oops, Terjadi Kesalahan</Text>

    return (
        <>
            <Page title='Profile'>
                <PageLabel label='Profile' />
                <Stack mt={40} spacing={"2rem"} className={"style-box max-w-[70rem] mx-auto"} >

                    <Card withBorder>
                        <Card.Section
                            className="bg-cover bg-no-repeat bg-center"
                            h={150}
                            sx={{
                                background: `url(/profile/${randomNum}.avif)`,
                            }}
                        />
                        <Card.Section
                            py={!md ? "1rem" : "1rem"}
                            pl={!md ? "0" : "12rem"}
                            sx={{
                                display: "flex",
                                position: "relative",
                                justifyContent: !md ? "center" : null,
                            }}
                        >
                            <Box
                                sx={theme => ({
                                    position: "absolute",
                                    top: -65,
                                    left: !md ? null : 40,
                                    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
                                    borderRadius: "50%"
                                })}
                            >
                                <Avatar
                                    color={color[randomNum - 1]}
                                    variant="filled"
                                    radius={"50%"}
                                    size={120}
                                    sx={{
                                        border: `4px solid transparent`,
                                    }}
                                >
                                    {formattedNameStudent ? formattedNameStudent : ""}
                                    {formattedNameAdmin ? formattedNameAdmin : ""}
                                </Avatar>
                            </Box>
                            <Text size={30} fw={700} mt={!md ? 40 : 0}>
                                {isSuccess && isAdmin ? adminName : ""}
                                {isSuccess && isStudent ? studentName : ""}
                            </Text>
                        </Card.Section>
                    </Card>
                    {isSuccess && isAdmin ? (
                        <>
                            <TextInput label="Nama" readOnly value={admin?.fullname} />

                            <TextInput label="No Telepon" readOnly value={admin?.username} />
                        </>
                    ) : ""}
                    {isSuccess && isStudent ? (
                        <>
                            <TextInput label="Nama" readOnly value={student?.name} />

                            <TextInput label="No Telepon" readOnly value={student?.phone} />
                        </>
                    ) : ""}
                    {
                        isAdmin && <form onSubmit={form.onSubmit(submitHandler)}>
                            <Stack mt={30}>
                                <Text mt={20} fz={30} fw={600}>Ubah Password</Text>
                                <PasswordInput label="Password Baru" {...form.getInputProps("password")} />
                                <PasswordInput label="Konfirmasi Password" {...form.getInputProps("confirmPassword")} />
                                <Group position='right' mt={20} >
                                    <Button type='submit' loading={changePasswordMutation.status === "pending"} >Ubah Password</Button>
                                </Group>
                            </Stack>
                        </form>
                    }
                </Stack>
            </Page>
        </>
    )
}

export default Profile