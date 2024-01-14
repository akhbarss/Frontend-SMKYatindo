import {
  Loader,
  LoadingOverlay,
  Paper,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "../../../apis/alur/decodeJWT";
import { getAllGelombangByTypeJalur } from "../../../apis/gelombang/getAllGelombangByTypeJalur";
import { chooseBatch, getOffsetStatus } from "../../../apis/pembelian";
import useQueryFilter from "../../../hooks/useQueryFilter";
import { Step } from "../../../types/global";
import ResponseError from "../../../utils/ResponseError";
import CardChooseBatch from "./CardChooseBatch";

const StepGelombang: React.FC<Step> = ({ type = "PEMBELIAN" }) => {
  const filter = useQueryFilter({ step: 1, stagingId: null });

  const queryClient = useQueryClient();
  const { data, isSuccess: getGradeSuccess } = useQuery({
    queryKey: ["get_session_grade"],
    queryFn: jwtDecode
  })

  const grade = data?.data?.student?.grade

  const {
    data: jalur,
    isLoading: jalurLoading,
    isSuccess: jalurSuccess,
  } = useQuery({
    queryKey: [`jalur_pendaftaran_${type}`],
    queryFn: () => getAllGelombangByTypeJalur(type),
  });

  const {
    data: offset,
    isLoading: statusLoading,
    isSuccess: statusSuccess,
  } = useQuery({
    queryKey: ["student_staging_offset", filter.stagingId, type],
    queryFn: () => getOffsetStatus(filter.stagingId, type),
    enabled: !!filter.stagingId,
  });

  const chooseBatchMutation = useMutation({
    mutationFn: chooseBatch,
  });

  const onChooseBatch = (id: number, name: string, grade: "SMP" | "SMK") => {
    const onAccept = () => {
      chooseBatchMutation.mutate(
        { batchId: id, type: type, grade: grade },
        {
          onSuccess: () => {
            toast.success("Sukses memilih gelommbang pendaftaran");
            queryClient.invalidateQueries({
              queryKey: ["get_last_offset_batch"],
            });
          },
          onError: (err) => ResponseError(err),
        }
      );
    };

    const onCancel = () => {
      console.log("cancel");
    };

    modals.openContextModal({
      modal: "createInformasi",
      innerProps: {
        onAccept,
        onCancel,
        modalBody: `Anda yakin ingin memilih ${name}?`,
      },
    });
  };

  const filteringJalurByGrade = (jalurSuccess &&
    jalur && getGradeSuccess && data) && jalur?.data?.filter(item => item.grade === grade?.toUpperCase())

  return (
    <Paper
      withBorder
      radius="md"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
        padding: "2rem",
      })}
    >
      <LoadingOverlay
        visible={chooseBatchMutation.isPending || statusLoading}
      />
      {statusSuccess && offset.data.offset_data ? (
        <>
          <Text weight={500}>Pilihan Anda</Text>
          <Stack mt={20}>
            <CardChooseBatch {...offset.data.offset_data.registrationBatch} />
          </Stack>
        </>
      ) : statusLoading ? (
        <Loader />
      ) : (
        <>
          <Text weight={500}>Pilih Salah Satu Gelombang</Text>
          <Stack mt={20}>
            {jalurLoading && <Skeleton content={"Lorem ipsum"} />}
            {
              filteringJalurByGrade?.length > 0 ?
                filteringJalurByGrade?.sort((a, b) => a.id - b.id).map((batch) => (

                  <CardChooseBatch
                    {...batch}
                    key={batch.id}
                    onClick={() => onChooseBatch(batch.id, batch.name, batch.grade)}
                  />

                ))
                : (
                  <>
                    <Text size={"xl"} weight={"bold"}>
                      Belum ada gelombang {type === "PEMBELIAN" ? "pembelian" : "pengembalian"} yang tersedia
                    </Text>
                  </>
                )
            }
          </Stack>
        </>
      )}
    </Paper>
  );
};

export default StepGelombang;
