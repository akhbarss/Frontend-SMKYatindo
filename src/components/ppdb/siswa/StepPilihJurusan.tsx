import { Button, Paper, Stack, Text, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { chooseMajor, getOffsetStatus } from "../../../apis/pembelian";
import useQueryFilter from "../../../hooks/useQueryFilter";
import { Step } from "../../../types/global";
import ResponseError from "../../../utils/ResponseError";
import MultiSelectStatus from "../../MultiSelectStatus";
import SelectStatus from "../../SelectStatus";

const StepPilihJurusan: React.FC<Step> = ({ type = "PEMBELIAN" }) => {
  const filter = useQueryFilter({ step: 3, stagingId: null });
  const [choosed, setChoosed] = useState<string | string[]>(null);
  const { data: offset, isSuccess: statusSuccess } = useQuery({
    queryKey: ["student_staging_offset", filter.stagingId, type],
    queryFn: () => getOffsetStatus(filter.stagingId, type),
    enabled: !!filter.stagingId,
  });
  const queryClient = useQueryClient();

  const chooseMutation = useMutation({
    mutationFn: chooseMajor,
  });

  const onChooseMajor = () => {
    const onAccept = () => {
      chooseMutation.mutate(
        {
          type: type,
          major: choosed.toString(),
          stagingId: filter.stagingId,
        },
        {
          onSuccess: () => {
            toast.success("Sukses memilih Jurusan");
            queryClient.invalidateQueries({
              queryKey: ["get_last_offset_batch"],
            });
          },
          onError: (err) => ResponseError(err),
        }
      );
    };
    const onCancel = () => console.log("cancel");
    if (choosed == "" || !choosed) {
      toast.error("Wajib pilih salah satu jurusan");
    } else {
      modals.openContextModal({
        modal: "createInformasi",
        innerProps: {
          onAccept,
          onCancel,
          modalBody: `Anda yakin ingin memilih jurusan ini ?`,
        },
      });
    }
  };
  useEffect(() => {
    if (statusSuccess && offset.data.current_state?.majors) {
      setChoosed(offset.data.current_state?.majors?.split(","));
    } else if (offset?.data?.major) {
      // setChoosed(offset?.data?.major?.name);
    }
    // if (statusSuccess && offset.data?.current_state) {
    //   setChoosed(offset.data.current_state?.majors?.split(","));
    // }
  }, [statusSuccess, offset]);

  return (
    <Paper
      withBorder
      sx={(theme) => ({
        backgroundColor: `${theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white
          }`,
        padding: "2rem",
        boxShadow: "0 5px 10px -8px black",
        borderRadius: "7px",
      })}
    >
      <Stack>
        <Title>Pilih Jurusan</Title>
        {type === "PEMBELIAN" && (
          <Text>*Anda dapat memilih lebih dari satu untuk peminatan awal</Text>
        )}
        {statusSuccess &&
          offset.data.current_state?.status === "WAITING_PAYMENT" &&
          offset.data.current_state?.type === type ? (
          <p>
            Harap menunggu konfirmasi pembayaran terlebih dahulu sebelum memilih
            jurusan
          </p>
        ) : (
          <>
            {type === "PEMBELIAN" ? (
              <MultiSelectStatus
                type={"MAJOR"}
                readOnly={Boolean(
                  statusSuccess && offset.data.current_state?.majors ? offset.data.current_state?.majors : undefined
                  // statusSuccess && offset.data.current_state?.majors
                )}
                onChange={(value) => setChoosed(value)}
                value={choosed && Array.from(choosed)}
              />
            ) : (
              <SelectStatus
                type={"MAJOR"}
                readOnly={Boolean(
                  statusSuccess && offset.data.current_state?.majors ? offset.data.current_state?.majors : undefined
                  // statusSuccess && offset.data.current_state?.majors
                )}
                onChange={(value) => setChoosed(value)}
                value={choosed && choosed.toString()}
              />
            )}

            <Button
              variant={"filled"}
              onClick={onChooseMajor}
              loading={chooseMutation.isPending}
              disabled={Boolean(
                statusSuccess && offset.data.current_state?.majors
                // statusSuccess && offset.data.current_state?.majors
              )}
            >
              Submit
            </Button>
          </>
        )}
      </Stack>
    </Paper>
  );
};

export default StepPilihJurusan;
