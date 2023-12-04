/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Box,
  Button,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { getOffsetStatus, uploadbuktibayar } from "../../../apis/pembelian";
import useQueryFilter from "../../../hooks/useQueryFilter";
import { Step } from "../../../types/global";
import ResponseError from "../../../utils/ResponseError";
import { formatAngka } from "../../../utils/formatRupiah";
import DataTable from "../../DataTable";
import FormFieldPembayaran from "../../FormFieldPembayaran";
import FormWrapper from "../../FormWrapper";
import SelectStatus from "../../SelectStatus";
import WaitingPaymentConfirmation from "../../WaitingPaymentConfirmation";

const paymentMethod = {
  CASH: "Tunai",
  TRANSFER: "Transfer",
};

const StepPembayaran: React.FC<Step> = ({ type = "PEMBELIAN" }) => {
  const filter = useQueryFilter({ step: 2, stagingId: null });
  const queryClient = useQueryClient();
  const uploadMutation = useMutation({
    mutationFn: uploadbuktibayar,
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

  const columns = useMemo(() => {
    return [
      {
        id: "Metode Pembayaran",
        header: "Metode Pembayaran",
        accessorFn: (data) => paymentMethod[data.method],
      },
      {
        id: "Bank",
        header: "Bank",
        accessorFn: (data) => data.bank_name,
      },
      {
        id: "Nomor Rekening",
        header: "Nomor Rekening",
        accessorFn: (data) => data.bank_account,
      },
      {
        id: "Atas Nama",
        header: "Atas Nama",
        accessorFn: (data) => data.bank_user,
      },
    ];
  }, []);

  const onSubmitPayment: SubmitHandler<any> = (data) => {
    if (data?.amount !== offset?.data?.registration_batch?.price) {
      toast.error("Nominal tidak sesuai")
      return;
    }
    
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key === "payment_prove") {
        formData.append("file", value?.[0]);
      } else {
        // @ts-ignore
        formData.append(key, value);
      }
    }
    formData.append("type", type);

    uploadMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Sukses upload bukti bayar");
        queryClient.invalidateQueries({
          queryKey: ["get_last_offset_batch"],
        });
      },
      onError: (err) => ResponseError(err),
    });
  };

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
        <Title>Bayar Pendaftaran</Title>

        <Text className="font-semibold">
          Silahkan melakukan transfer ke rekening dibawah ini jika anda memilih
          metode pembayaran transfer :
        </Text>

        <table className="w-full overflow-x-auto">
          <tbody>
            <tr>
              <td>Bank</td>
              <td>
                {statusLoading && <Skeleton content={"Lorem Ipsum"} />}
                {statusSuccess && (
                  <Text>
                    :{" "}
                    <Text component="span" weight={"bold"}>
                      {offset.data.registration_batch?.bank_name}
                    </Text>
                  </Text>
                )}
              </td>
            </tr>
            <tr>
              <td>Nominal yang harus dibayarkan</td>
              <td>
                {statusLoading && <Skeleton content={"Lorem Ipsum"} />}
                {statusSuccess && (
                  <Text>
                    :{" "}
                    <Text component="span" weight={"bold"}>
                      {formatAngka(
                        // @ts-ignore
                        offset.data.registration_batch?.price ?? "0",
                        "Rp "
                      )}
                    </Text>
                  </Text>
                )}
              </td>
            </tr>
            <tr>
              <td>Nomor Rekening</td>
              <td>
                {statusLoading && <Skeleton content={"Lorem Ipsum"} />}
                {statusSuccess && (
                  <Text>
                    :{" "}
                    <Text component="span" weight={"bold"}>
                      {offset.data.registration_batch?.bank_account}
                    </Text>
                  </Text>
                )}
              </td>
            </tr>
            <tr>
              <td>Atas Nama</td>
              <td>
                {statusLoading && <Skeleton content={"Lorem Ipsum"} />}
                {statusSuccess && (
                  <Text>
                    :{" "}
                    <Text component="span" weight={"bold"}>
                      {offset.data.registration_batch?.bank_user}
                    </Text>
                  </Text>
                )}
              </td>
            </tr>
            <tr>
              <td>Status Pembayaran</td>
              <td>
                {statusLoading && <Skeleton content={"Lorem Ipsum"} />}
                {statusSuccess && (
                  <SelectStatus
                    type={"STATUS"}
                    readOnly={true}
                    value={offset.data.payment_status?.status}
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </Stack>
      {statusSuccess && offset.data.payment_status ? (
        <>
          <WaitingPaymentConfirmation />
          <Box mt={10} w={"100%"}>
            <DataTable
              useHeader={true}
              data={[{ ...offset.data.payment_status }]}
              columns={columns}
              noCard={true}
              usePagination={false}
            />
          </Box>
        </>
      ) : (
        <>
          <FormWrapper id={"form-uploadbukti"} onSubmit={onSubmitPayment}>
            <Title order={3} my={50}>
              Bukti Transfer
            </Title>
            <Divider />
            <FormFieldPembayaran />
            <Button type={"submit"} mt={10}>
              Submit
            </Button>
          </FormWrapper>
        </>
      )}
    </Paper>
  );
};

export default StepPembayaran;
