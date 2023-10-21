import { yupResolver } from "@hookform/resolvers/yup";
import {
    Box,
    Button,
    Select
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

type FormValuesJurusan = {
    jurusan: string
}

const schema = yup.object({
    jurusan: yup.string().required("Tolong pilih jurusan yang anda minati")
})

interface TPilihJurusan {
    setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>
}

const PilihJurusan: React.FC<TPilihJurusan> = ({
    setActiveTabIndex
}) => {

    const form = useForm<FormValuesJurusan>({
        resolver: yupResolver(schema)
    })

    const {
        control,
        register,
        setError,
        handleSubmit,
        setValue,
        formState: { errors }
    } = form

    const submitHandler = (data: FormValuesJurusan) => {
        console.log(data)
        setActiveTabIndex(index => index + 1)
    }

    return (
        <Box
            sx={theme => ({
                backgroundColor: `${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white}`,
                padding: "2rem",
                boxShadow: "0 5px 10px -8px black",
                borderRadius: "7px"
            })}
        >
            <form onSubmit={handleSubmit(submitHandler)}>

                <Controller
                    name="jurusan"
                    control={control}
                    render={() => (
                        <Select
                            label="Pilih Jurusan"
                            withAsterisk
                            data={[
                                {
                                    value: 'TEKNIK JARINGAN KOMPUTER DAN TELEKOMUNIKASI (TJKT)',
                                    label: 'TEKNIK JARINGAN KOMPUTER DAN TELEKOMUNIKASI (TJKT)'
                                },
                                {
                                    value: 'TEKNIK ELEKTRONIKA (TE)',
                                    label: 'TEKNIK ELEKTRONIKA (TE)'
                                },
                                {
                                    value: 'TEKNIK OTOMOTIF (TO)',
                                    label: 'TEKNIK OTOMOTIF (TO)'
                                },
                                {
                                    value: 'KOMPETENSI KEAHLIAN AKUTANSI DAN LEMBAGA KEUANGAN', label: 'KOMPETENSI KEAHLIAN AKUTANSI DAN LEMBAGA KEUANGAN'
                                },
                            ]}
                            {...register("jurusan")}
                            error={errors.jurusan?.message}
                            onChange={(value) => {
                                console.log(value)
                                if (value) {
                                    setValue("jurusan", value)
                                    setError("jurusan", {
                                        message: ""
                                    })
                                }
                            }}

                        />
                    )}
                />

                <Button type="submit" mt={40}>
                    Simpan
                </Button>
            </form>
        </Box>
    )
}

export default PilihJurusan