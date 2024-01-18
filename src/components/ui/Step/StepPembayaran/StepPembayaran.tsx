/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { FileImage } from "lucide-react";
import React, { useMemo } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { getOffsetStatus, uploadbuktibayar } from "../../../../apis/pembelian";
import useQueryFilter from "../../../../hooks/useQueryFilter";
import { Step } from "../../../../types/global";
import ResponseError from "../../../../utils/ResponseError";
import { formatAngka } from "../../../../utils/formatRupiah";
import { openModalImage } from "../../../../utils/openModalImage";
import SelectStatus from "../../../Fields/SelectStatus";
import FormFieldPembayaran from "../../../Form/FormFieldPembayaran";
import FormWrapper from "../../../Form/FormWrapper";
import WaitingPaymentConfirmation from "../../../Result/WaitingPaymentConfirmation";
import DataTable from "../../../Table/DataTable";

type ColumnResultStepPembayaran = {
  method: "CASH" | "TRANSFER";
  bank_name: string;
  bank_account: string;
  bank_user: string;
}

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
    isSuccess: statusSuccess,
  } = useQuery({
    queryKey: ["student_staging_offset", filter.stagingId, type],
    queryFn: () => getOffsetStatus(filter.stagingId, type),
    enabled: !!filter.stagingId,
  });

  const img = offset?.data?.payment_status?.image

  const columns = useMemo<ColumnDef<ColumnResultStepPembayaran, any>[]>(() => {
    return [
      {
        id: "file",
        header: "File",
        accessorKey: "file",
        cell: () => (
          img ? (
            <ActionIcon
              size={30}
              variant="filled"
              color="blue"
              onClick={() => openModalImage(img)}
            >
              <FileImage size={20} />
            </ActionIcon>
          ) : "-"
        )
      },
      {
        id: "Metode Pembayaran",
        header: "Metode Pembayaran",
        accessorFn: (data) => paymentMethod[data.method],
      },
      {
        id: "Bank",
        header: "Bank",
        accessorFn: (data) => data.bank_name,
        cell: (val) => val.getValue() ?? "-"
      },
      {
        id: "Nomor Rekening",
        header: "Nomor Rekening",
        accessorFn: (data) => data.bank_account,
        cell: (val) => val.getValue() ?? "-"
      },
      {
        id: "Atas Nama",
        header: "Atas Nama",
        accessorFn: (data) => data.bank_user,
        cell: (val) => val.getValue() ?? "-"
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
    <>
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

          <Box>
            <Flex direction={{ xs: "row", base: "column" }}>
              <Text style={{ flex: 1 }}>Bank</Text>
              <Text fw={"bold"} style={{ flex: 1 }}>: {offset?.data?.registration_batch?.bank_name}</Text>
            </Flex>
            <Flex direction={{ xs: "row", base: "column" }}>
              <Text style={{ flex: 1 }}>Nominal yang harus dibayarkan</Text>
              <Text fw={"bold"} style={{ flex: 1 }}>
                : {formatAngka(
                  // @ts-ignore
                  offset?.data.registration_batch?.price ?? "0",
                  "Rp "
                )}
              </Text>
            </Flex>
            <Flex direction={{ xs: "row", base: "column" }}>
              <Text style={{ flex: 1 }}>Nomor Rekening</Text>
              <Text fw={"bold"} style={{ flex: 1 }}>
                : {offset?.data?.registration_batch?.bank_account}
              </Text>
            </Flex>
            <Flex direction={{ xs: "row", base: "column" }}>
              <Text style={{ flex: 1 }}>Atas Nama</Text>
              <Text fw={"bold"} style={{ flex: 1 }}>
                : {offset?.data?.registration_batch?.bank_user}
              </Text>
            </Flex>
            <Flex direction={{ xs: "row", base: "column" }}>
              <Text style={{ flex: 1 }}>Status Pembayaran</Text>
              <Group style={{ flex: 1 }}>
                {statusSuccess && (
                  <SelectStatus
                    type={"STATUS"}
                    readOnly={true}
                    value={offset?.data?.payment_status?.status}
                  />
                )}
              </Group>
            </Flex>
          </Box>
        </Stack>

        {statusSuccess && offset.data.payment_status ? (
          <>
            <WaitingPaymentConfirmation />
            <Box mt={10} w={"100%"}>
              <DataTable
                useHeader={true}
                data={[{ ...offset.data.payment_status } as any]}
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
    </>
  );
};

export default StepPembayaran;
