import React from "react";
import { Step } from "../../../types/global";
import { Box, Button, Stack, Title } from "@mantine/core";
import FormFieldBiodata, { TFormFieldBiodata } from "../../FormFieldBiodata";
import FormWrapper from "../../FormWrapper";
import FormFieldInformasiOrangTua, {
  TFormFieldInformasiOrangTua,
} from "../../FormFieldInformasiOrangTua";
import { SubmitHandler } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getOffsetStatus } from "../../../apis/pembelian";
import useQueryFilter from "../../../hooks/useQueryFilter";

const StepBiodata: React.FC<Step> = ({ type = "PENGEMBALIAN" }) => {
  const filter = useQueryFilter({ step: 3, stagingId: null });
  const onSubmitBiodata: SubmitHandler<
    TFormFieldBiodata & TFormFieldInformasiOrangTua
  > = (data) => {
    console.log(data);
  };

  const {
    data: offset,
    isLoading: statusLoading,
    isSuccess: statusSuccess,
  } = useQuery({
    queryKey: ["student_staging_offset", filter.stagingId, type],
    queryFn: () => getOffsetStatus(filter.stagingId, type),
    enabled: !!filter.stagingId,
  });

  return (
    <FormWrapper
      id={"form-biodata"}
      initialValues={statusSuccess ? offset.data?.student : null}
      onSubmit={onSubmitBiodata}
    >
      {statusSuccess &&
      offset.data.current_state?.status === "WAITING_PAYMENT" &&
      offset.data.current_state?.type === type ? (
        <Box
          sx={(theme) => ({
            backgroundColor: `${
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
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
          <Box
            sx={(theme) => ({
              backgroundColor: `${
                theme.colorScheme === "dark"
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
              backgroundColor: `${
                theme.colorScheme === "dark"
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
              <Button type={"submit"} variant={"filled"}>
                Submit
              </Button>
            </Stack>
          </Box>
        </>
      )}
    </FormWrapper>
  );
};

export default StepBiodata;
