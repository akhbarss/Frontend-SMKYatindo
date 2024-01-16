/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, LoadingOverlay, Stack, Title } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { getOffsetStatus } from "../../../../apis/pembelian";
import { fillBio } from "../../../../apis/pengembalian";
import useQueryFilter from "../../../../hooks/useQueryFilter";
import { Step } from "../../../../types/global";
import { Student } from "../../../../types/student";
import ResponseError from "../../../../utils/ResponseError";
import {
  convertToFileObject,
} from "../../../../utils/imageUtils";
import FormFieldBiodata, { TFormFieldBiodata } from "../../../Form/FormFieldBiodata";
import FormFieldInformasiOrangTua, {
  TFormFieldInformasiOrangTua,
} from "../../../Form/FormFieldInformasiOrangTua";
import FormWrapper from "../../../Form/FormWrapper";

const StepBiodata: React.FC<Step> = ({ type = "PENGEMBALIAN" }) => {
  const [load, setLoad] = useState(false)
  const filter = useQueryFilter({ step: 3, stagingId: null });
  const [initialValues, setInit] = useState<Student>(null);
  const queryClient = useQueryClient();
  const updateBioMutation = useMutation({
    mutationFn: fillBio,
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
