/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Box,
    Stack,
    Title
} from "@mantine/core";
import { UseQueryResult, useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { updateBio } from "../../../../apis/updateBio";
import FormFieldBiodata, { TFormFieldBiodata } from "../../../../components/Form/FormFieldBiodata";
import FormFieldInformasiOrangTua, { TFormFieldInformasiOrangTua } from "../../../../components/Form/FormFieldInformasiOrangTua";
import FormWrapper from "../../../../components/Form/FormWrapper";
import { ResponseType } from "../../../../types/global";
import { Student } from "../../../../types/student";
import ResponseError from "../../../../utils/ResponseError";
import { convertToFileObject } from "../../../../utils/imageUtils";

type TBiodataAdmin = {
    studentQuery: UseQueryResult<ResponseType<Student>, Error>
}

const BiodataAdmin: React.FC<TBiodataAdmin> = ({ studentQuery }) => {
    const {
        data: student,
    } = studentQuery

    const [load, setLoad] = useState(false)
    const [initialValues, setInit] = useState<Student | null>(null);
    const queryClient = useQueryClient();
    const updateBioMutation = useMutation({
        mutationFn: updateBio,
    });

    const onSubmitBiodata: SubmitHandler<
        TFormFieldBiodata & TFormFieldInformasiOrangTua
    > = (data) => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            if (value !== null) {
                if (
                    key === "profile_picture" ||
                    key === "family_card" ||
                    key === "birth_card"
                ) {
                    formData.append(key, value?.[0]);
                } else if (key === "birth_date") {
                    formData.append(key, dayjs(value as Date).format("YYYY-MM-DD"));
                } else {
                    formData.append(key, value as string);
                }
            }
        }

        updateBioMutation.mutate({
            data: formData,
            studentId: student?.data?.id
        }, {
            onSuccess: () => {
                toast.success("Sukses update informasi biodata");
                queryClient.invalidateQueries({
                    queryKey: ["get_student"],
                });
            },
            onError: (err) => ResponseError(err),
        });
    };

    const setValues = useCallback(async () => {

        setLoad(true)
        if (typeof student?.data?.profile_picture === "string") {
            try {
                student.data.profile_picture = await convertToFileObject(
                    student?.data.profile_picture as string
                )

                student.data.birth_card = await convertToFileObject(
                    student?.data.birth_card as string
                )

                student.data.family_card = await convertToFileObject(
                    student?.data.family_card as string
                )
                setInit({
                    ...student?.data,
                    birth_date: student?.data.birth_date
                        ? dayjs(student?.data.birth_date).toDate()
                        : null,
                });
                setLoad(false)
            } catch (error) {
                setLoad(false)
                toast.error("Gagal mengambil data biodata, silakan coba lagi")
            }
        } else if (student?.data?.profile_picture === null) {
            setInit({
                // address: ""
                // ...studen?.d
                ...student?.data,
                birth_date: student?.data?.birth_date
                    ? dayjs(student?.data?.birth_date).toDate()
                    : null,
            });
            setLoad(false)
        } else {
            try {
                student.data.profile_picture = await convertToFileObject(
                    student?.data.profile_picture[0].name as string
                )

                student.data.birth_card = await convertToFileObject(
                    student.data.birth_card[0].name as string
                )

                student.data.family_card = await convertToFileObject(
                    student.data.family_card[0].name as string
                )
                setInit({
                    ...student?.data,
                    birth_date: student?.data?.birth_date
                        ? dayjs(student?.data?.birth_date).toDate()
                        : null,
                });
                setLoad(false)
            } catch (error) {
                console.log({ error })
                setLoad(false)
                toast.error("Gagal mengambil data biodata, silakan coba lagi")
            }
        }
    }, [])
    useEffect(() => {
        console.log({ student })
        if (student) {
            setValues();
        }
    }, [student, setValues]);

    return (
        <>
            <FormWrapper
                id={"form-biodata"}
                initialValues={initialValues}
                onSubmit={onSubmitBiodata}
            >
                <Box pos={"relative"}>
                    <Box
                        sx={(theme) => ({
                            backgroundColor: `${theme.colorScheme === "dark"
                                ? theme.colors.dark[7]
                                : theme.white
                                }`,
                            padding: "2rem",
                            boxShadow: "0 5px 10px -8px black",
                            borderRadius: "7px",
                        })}
                    >
                        <Stack>
                            <Title>Biodata Siswa</Title>

                            <FormFieldBiodata />
                        </Stack>
                    </Box>
                    <Box
                        sx={(theme) => ({
                            backgroundColor: `${theme.colorScheme === "dark"
                                ? theme.colors.dark[7]
                                : theme.white
                                }`,
                            marginTop: 10,
                            padding: "2rem",
                            boxShadow: "0 5px 10px -8px black",
                            borderRadius: "7px",
                        })}
                    >
                        <Stack>
                            <Title>Informasi Orang Tua</Title>

                            <FormFieldInformasiOrangTua />
                        </Stack>
                    </Box>
                </Box>
            </FormWrapper>
        </>
    )
}

export default BiodataAdmin