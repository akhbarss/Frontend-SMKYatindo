/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Step } from "../../../types/global";
import { Box, Button, Stack, Title, LoadingOverlay } from "@mantine/core";
import FormFieldBiodata, { TFormFieldBiodata } from "../../FormFieldBiodata";
import FormWrapper from "../../FormWrapper";
import FormFieldInformasiOrangTua, {
  TFormFieldInformasiOrangTua,
} from "../../FormFieldInformasiOrangTua";
import { SubmitHandler } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOffsetStatus } from "../../../apis/pembelian";
import useQueryFilter from "../../../hooks/useQueryFilter";
import { fillBio } from "../../../apis/pengembalian";
import toast from "react-hot-toast";
import ResponseError from "../../../utils/ResponseError";
import dayjs from "dayjs";
import { Student } from "../../../types/student";
import {
  convertToFileObject,
} from "../../../utils/imageUtils";
import { jwtDecode } from "../../../apis/alur/decodeJWT";

const StepBiodata: React.FC<Step> = ({ type = "PENGEMBALIAN" }) => {
  const [load, setLoad] = useState(false)
  const filter = useQueryFilter({ step: 3, stagingId: null });
  const [initialValues, setInit] = useState<Student>(null);
  const queryClient = useQueryClient();
  const updateBioMutation = useMutation({
    mutationFn: fillBio,
  });

  const { data } = useQuery({
    queryKey: ["get-session-from-bio"],
    queryFn: jwtDecode
  })

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

    updateBioMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Sukses update informasi biodata");
        queryClient.invalidateQueries({
          queryKey: ["get_last_offset_batch"],
        });
      },
      onError: (err) => ResponseError(err),
    });
  };

  const { data: offset, isSuccess: statusSuccess } = useQuery({
    queryKey: ["student_staging_offset", filter.stagingId, type],
    queryFn: () => getOffsetStatus(filter.stagingId, type),
    enabled: !!filter.stagingId,
  });

  const setValues = async () => {
    const student: Student = offset.data?.student;
    setLoad(true)
    if (typeof student?.profile_picture === "string") {
      try {
        student.profile_picture = await convertToFileObject(
          student.profile_picture as string
        )

        student.birth_card = await convertToFileObject(
          student.birth_card as string
        )

        student.family_card = await convertToFileObject(
          student.family_card as string
        )
        setInit({
          ...student,
          birth_date: student.birth_date
            ? dayjs(student.birth_date).toDate()
            : null,
        });
        setLoad(false)
      } catch (error) {
        setLoad(false)
        toast.error("Gagal mengambil data biodata, silakan coba lagi")
      }
    } else if (student?.profile_picture === null) {
      setInit({
        ...student,
        birth_date: student.birth_date
          ? dayjs(student.birth_date).toDate()
          : null,
      });
      setLoad(false)
    } else {
      try {
        student.profile_picture = await convertToFileObject(
          student.profile_picture[0].name as string
        )

        student.birth_card = await convertToFileObject(
          student.birth_card[0].name as string
        )

        student.family_card = await convertToFileObject(
          student.family_card[0].name as string
        )
        setInit({
          ...student,
          birth_date: student.birth_date
            ? dayjs(student.birth_date).toDate()
            : null,
        });
        setLoad(false)
      } catch (error) {
        setLoad(false)
        toast.error("Gagal mengambil data biodata, silakan coba lagi")
      }
    }
  };

  useEffect(() => {
    if (statusSuccess) {
      setValues();
    }
  }, [statusSuccess]);

  return (
    <FormWrapper
      id={"form-biodata"}
      initialValues={initialValues}
      onSubmit={onSubmitBiodata}
    >
      {statusSuccess &&
        offset.data.current_state?.status === "WAITING_PAYMENT" &&
        offset.data.current_state?.type === type ? (
        <Box
          sx={(theme) => ({
            backgroundColor: `${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
              }`,
            padding: "2rem",
            boxShadow: "0 5px 10px -8px black",
            borderRadius: "7px",
          })}
        >
          <Stack>
            <Title>Isi Biodata</Title>

            <p>
              Harap menunggu konfirmasi pembayaran terlebih dahulu sebelum isi
              biodata
            </p>
          </Stack>
        </Box>
      ) : (
        <>
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
                <Title>Isi Biodata</Title>

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
                <Button
                  type={"submit"}
                  variant={"filled"}
                  loading={updateBioMutation.isPending}
                >
                  Submit
                </Button>
              </Stack>
            </Box>
            <LoadingOverlay visible={load} zIndex={10} />

          </Box>

        </>
      )}
    </FormWrapper>
  );
};

export default StepBiodata;
