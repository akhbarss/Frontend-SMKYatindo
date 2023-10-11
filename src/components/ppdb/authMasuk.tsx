/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup"
import {
    Button,
    Group,
    PasswordInput,
    TextInput,
    useMantineTheme
} from "@mantine/core"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { FaCheck } from 'react-icons/fa'
import { ImCancelCircle } from 'react-icons/im'
import { Link, useNavigate } from "react-router-dom"
import * as yup from "yup"
import { user } from "../../utils/user"

const schema = yup.object({
    noWhatsapp: yup
        .string()
        .when({
            is: "admin",
            then: () => yup.string(),
            otherwise: () => yup.string().required("Tolong masukan no whatsapp anda").matches(/^(0)8[1-9][0-9]{6,9}$/, "No whatsapp tidak valid")
        }),
    password: yup.string().required("Tolong masukan password anda")
})

const AuthMasuk = ({
    auth,
    load,
    setLoad
}: {
    auth: string
    load: boolean
    setLoad: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const [success, setSuccess] = useState(false)

    const usersdata = user

    const navigate = useNavigate()
    const theme = useMantineTheme()
    const dark = theme.colorScheme === 'dark'

    const form = useForm({
        resolver: yupResolver(schema)
    });
    const { register, handleSubmit, formState: { errors }, setError } = form;

    const loginHandler = (data: any) => {

        setLoad(true)

        setTimeout(() => {
            const userValid = usersdata.find(item => item.name == data.noWhatsapp)
            if (userValid) {
                const passwordValid = userValid.password == data.password
                if (passwordValid) {
                    setLoad(false)
                    setSuccess(true)
                    if (userValid.role == "student") {
                        setTimeout(() => {
                            navigate("/ppdb/siswa")
                            setSuccess(false)
                        }, 500)
                    }
                    if (userValid.role == "admin") {
                        setTimeout(() => {
                            navigate("/ppdb/admin")
                            setSuccess(false)
                        }, 500)
                    }
                } else {
                    setError("root", { message: "No Whatsapp atau password anda salah, silakan coba lagi" })
                    setLoad(false)
                }
            } else {
                setError("root", { message: "Akun tidak ditemukan" })
                setLoad(false)
            }
        }, 500)

        return
    }

    const errWhatsapp = errors.noWhatsapp?.message
    const errPw = errors.password?.message

    if (auth === "masuk") return (
        <form className='mt-5' onSubmit={handleSubmit(loginHandler)}>
            {errors.root && errors.root.message && (
                <div className="text-red-600 p-2 mb-4 bg-red-100 border border-red-600 flex items-center gap-2">
                    <ImCancelCircle />{errors.root.message}
                </div>
            )}

            <TextInput
                autoFocus
                label="No Whatsapp"
                styles={{
                    label: {
                        fontWeight: "bold"
                    },
                }}
                {...register("noWhatsapp")}
                error={errWhatsapp}
            />

            <PasswordInput
                mt={16}
                label="Password"
                styles={{
                    label: { fontWeight: "bold" },
                    input: {

                    },
                    visibilityToggle: {
                        color: "gray"
                    }
                }}
                {...register("password")}
                error={errPw}
            />

            <Group className='mt-5 '>

                <Link to={'/lupa-password'} >Lupa Password?</Link>

                <Group className='ml-auto '>
                    <Button
                        className={`ml-auto `}
                        variant='outline'
                        loading={load}
                        loaderProps={{ type: "dots" }}
                        type="submit"
                        color={`${dark ? (success ? "green" : "indigo") : (success ? "green" : "dark")}`}
                        leftIcon={success && <FaCheck size={15} />}
                    >
                        {success ? "SUCCESS" : "Masuk"}
                    </Button>
                </Group>
            </Group>
        </form>
    )
}

export default AuthMasuk