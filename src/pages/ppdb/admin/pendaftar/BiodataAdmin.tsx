/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Title } from "@mantine/core";
import {
  UseQueryResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { updateBio } from "../../../../apis/updateBio";
import FormFieldBiodata, {
  TFormFieldBiodata,
} from "../../../../components/Form/FormFieldBiodata";
import FormFieldInformasiOrangTua, {
  TFormFieldInformasiOrangTua,
} from "../../../../components/Form/FormFieldInformasiOrangTua";
import FormWrapper from "../../../../components/Form/FormWrapper";
import { ResponseType } from "../../../../types/global";
import { Student } from "../../../../types/student";
import ResponseError from "../../../../utils/ResponseError";
import { convertToFileObject } from "../../../../utils/imageUtils";
import FormFieldDiskon from "../../../../components/Form/FormFieldDiskon";
import FormFieldPrestasi from "../../../../components/Form/FormFieldPrestasi";

type TBiodataAdmin = {
  studentQuery: UseQueryResult<ResponseType<Student>, Error>;
};

type OverrideTypeStudent = Student & {
  studentDiscounts: {
    discountAttachment: string | File[];
    discountDescription: string;
  }[];

  studentAchievements: {
    attachment: string | File[];
    title: string;
    organization: string;
    description: string;
  }[];

  discountAttachment1: File[];
  discountAttachment2: File[];
  discountDescription1: string;
  discountDescription2: string;

  achievementAttachment1: File[];
  achievementTitle1: string;
  achievementOrganization1: string;
  achievementDescription1: string;
  achievementAttachment2: File[];
  achievementTitle2: string;
  achievementOrganization2: string;
  achievementDescription2: string;
};

function Card({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: `${
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
        }`,
        marginTop: 10,
        padding: "2rem",
        boxShadow: "0 5px 10px -8px black",
        borderRadius: "7px",
      })}
    >
      <Title>{title}</Title>

      {children}
    </Box>
  );
}

const BiodataAdmin: React.FC<TBiodataAdmin> = ({ studentQuery }) => {
  const { data: student } = studentQuery as UseQueryResult<
    ResponseType<OverrideTypeStudent>,
    Error
  >;

  const [load, setLoad] = useState(false);
  const [initialValues, setInit] = useState<Student | null>(null);
  console.log({ initialValues });
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

    updateBioMutation.mutate(
      {
        data: formData,
        studentId: student?.data?.id,
      },
      {
        onSuccess: () => {
          toast.success("Sukses update informasi biodata");
          queryClient.invalidateQueries({
            queryKey: ["get_student"],
          });
        },
        onError: (err) => ResponseError(err),
      }
    );
  };

  const setValues = useCallback(async () => {
    setLoad(true);
    if (
      typeof student?.data?.profile_picture === "string" ||
      typeof student?.data?.birth_card === "string" ||
      typeof student?.data?.family_card === "string"
    ) {
      // check if dicount provement is valid
      if (student?.data?.studentDiscounts?.length > 0) {
        student.data.discountAttachment1 = await convertToFileObject(
          student.data.studentDiscounts?.[0].discountAttachment as string
        );
        student.data.discountDescription1 =
          student.data.studentDiscounts?.[0].discountDescription;

        student.data.discountAttachment2 = await convertToFileObject(
          student.data.studentDiscounts?.[1].discountAttachment as string
        );
        student.data.discountDescription2 =
          student.data.studentDiscounts?.[1].discountDescription;
      }
      if (student?.data?.studentAchievements?.length > 0) {
        student.data.achievementAttachment1 = await convertToFileObject(
          student.data.studentAchievements?.[0].attachment as string
        );
        student.data.achievementDescription1 =
          student.data.studentAchievements?.[0].description ?? "";
        student.data.achievementOrganization1 =
          student.data.studentAchievements?.[0].organization ?? "";
        student.data.achievementTitle1 =
          student.data.studentAchievements?.[0].title ?? "";

          
        student.data.achievementAttachment2 = await convertToFileObject(
          student.data.studentAchievements?.[1].attachment as string
        );
        student.data.achievementDescription2 =
          student.data.studentAchievements?.[1].description ?? "";
        student.data.achievementOrganization2 =
          student.data.studentAchievements?.[1].organization ?? "";
        student.data.achievementTitle2 =
          student.data.studentAchievements?.[1].title ?? "";
      }

      try {
        student.data.profile_picture = await convertToFileObject(
          student?.data.profile_picture as string
        );

        student.data.birth_card = await convertToFileObject(
          student?.data.birth_card as string
        );

        student.data.family_card = await convertToFileObject(
          student?.data.family_card as string
        );

        // student.data.studentAchievements[1].attachment = await convertToFileObject(
        //   student.data.studentAchievements[1].attachment as string
        // )
        // student.data.studentDiscounts[0].discountAttachment = await convertToFileObject(
        //   student.data.studentDiscounts[0].discountAttachment as string
        // )
        // student.data.studentDiscounts[1].discountAttachment = await convertToFileObject(
        //   student.data.studentDiscounts[1].discountAttachment as string
        // )

        setInit({
          ...student?.data,
          birth_date: student?.data.birth_date
            ? dayjs(student?.data.birth_date).toDate()
            : null,
        });
        setLoad(false);
      } catch (error) {
        console.log({ error });
        setLoad(false);
        toast.error("Gagal mengambil data biodata, silakan coba lagi");
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
      setLoad(false);
    } else {
      try {
        student.data.profile_picture = await convertToFileObject(
          student?.data.profile_picture[0].name as string
        );

        student.data.birth_card = await convertToFileObject(
          student.data.birth_card[0].name as string
        );

        student.data.family_card = await convertToFileObject(
          student.data.family_card[0].name as string
        );
        setInit({
          ...student?.data,
          birth_date: student?.data?.birth_date
            ? dayjs(student?.data?.birth_date).toDate()
            : null,
        });
        setLoad(false);
      } catch (error) {
        console.log({ error });
        setLoad(false);
        toast.error("Gagal mengambil data biodata, silakan coba lagi");
      }
    }
  }, []);

  useEffect(() => {
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
          <Card title="Biodata Siswa">
            <FormFieldBiodata />
          </Card>
          <Card title="Informasi Orang Tua">
            <FormFieldInformasiOrangTua />
          </Card>
          <Card title="Informasi Diskon">
            <FormFieldDiskon />
          </Card>
          <Card title="Informasi Prestasi">
            <FormFieldPrestasi />
          </Card>
        </Box>
      </FormWrapper>
    </>
  );
};

export default BiodataAdmin;
