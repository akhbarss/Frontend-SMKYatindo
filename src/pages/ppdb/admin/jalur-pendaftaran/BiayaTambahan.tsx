/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Modal,
  Paper,
  Text,
  Title,
  useMantineTheme
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId, useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import {
  CreateBiayaTambahanPayload,
  createBiayaTambahan,
} from "../../../../apis/informasi-umum/biaya-tambahan/createBiayaTambahan";
import {
  DeleteBiayaTambahanPayload,
  deleteBiayaTambahan,
} from "../../../../apis/informasi-umum/biaya-tambahan/deleteBiayaTambahan";
import {
  EditBiayaTambahanPayload,
  editBiayaTambahan,
} from "../../../../apis/informasi-umum/biaya-tambahan/editBiayaTambahan";
import {
  TBiayaTambahan,
  getAllBiayaTambahan,
} from "../../../../apis/informasi-umum/biaya-tambahan/getAllBiayaTambahan";
import ModalBiayaTambahanCreate, {
  FormCreateBiayaTambahan,
} from "../../../../components/modal/modalBiayaTambahanCreate";
import ModalBiayaTambahanEdit, {
  FormEditBiayaTambahan,
} from "../../../../components/modal/modalBiayaTambahanEdit";
import { DarkTheme } from "../../../../utils/darkTheme";

const BiayaTambahan = () => {
  const dark = DarkTheme();
  const theme = useMantineTheme()
  const { idJalurPendaftaran } = useParams();

  const [openedCreate, { open: openCreate, close: closeCreate }] = useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      id: 0,
      judulBiaya: "",
      priceDetails: [{ name: "", biaya: "", key: randomId() }],
    },
  });

  const { data: biayaTambahan } = useQuery({
    queryKey: ["get_all_biaya_tambahan"],
    queryFn: () => getAllBiayaTambahan(+idJalurPendaftaran),
  });

  const createBiayaTambahanMutation = useMutation({
    mutationFn: createBiayaTambahan,
  });

  const deleteBiayaTambahanMutation = useMutation({
    mutationFn: deleteBiayaTambahan,
  });

  const editBiayaTambahanMutation = useMutation({
    mutationFn: editBiayaTambahan,
  });

  const submitCreateBiayaTambahan = (payload: CreateBiayaTambahanPayload) => {
    createBiayaTambahanMutation.mutate(payload, {
      onSuccess: () => {
        closeCreate();
        toast.success("Data berhasil dtambahkan");
        form.reset()
        queryClient.invalidateQueries({ queryKey: ["get_all_biaya_tambahan"] });
      },
      onError: (err: Error) => {
        // @ts-ignore
        const status = err?.response?.status;
        if (status === 400) {
          toast.error("Data tidak boleh kosong");
        }
        toast.error("Gagal menambah data");
      },
    });
  };

  const submitDeleteBiayaTambahan = (payload: DeleteBiayaTambahanPayload) => {
    deleteBiayaTambahanMutation.mutate(payload, {
      onSuccess: () => {
        closeDelete()
        toast.success("Data berhasil dihapus");
        queryClient.invalidateQueries({ queryKey: ["get_all_biaya_tambahan"] });
        form.reset()
      },
      onError: () => {
        toast.error("Gagal mengubah data");
      },
    });
  };

  const submitEditBiayaTambahan = (payload: EditBiayaTambahanPayload) => {
    editBiayaTambahanMutation.mutate(payload, {
      onSuccess: () => {
        closeEdit();
        toast.success("Data berhasil diubah");
        form.reset()
        queryClient.invalidateQueries({ queryKey: ["get_all_biaya_tambahan"] });
      },
      onError: (err) => {
        // @ts-ignore
        const status = err?.response?.status;
        if (status === 400) {
          toast.error("Data tidak boleh kosong");
        }
        toast.error("Gagal mengubah data");
      },
    });
  };

  function tambahBiayaTambahanHandler(data: FormCreateBiayaTambahan) {
    const { namePrice, priceDetails } = data;
    const numberPriceDetails = priceDetails.map((item) => ({
      subTitle: item.subTitle,
      price: +item.price,
    }));
    const payload: CreateBiayaTambahanPayload = {
      namePrice: namePrice,
      path_id: +idJalurPendaftaran,
      priceDetails: numberPriceDetails,
    };
    submitCreateBiayaTambahan(payload);
  }

  function deleteBiayaTambahanHander(id: number) {
    submitDeleteBiayaTambahan({ id });
  }

  function editBiayaTambahanHandler(data: FormEditBiayaTambahan) {
    const { id, namePrice, priceDetails } = data;
    const numberPriceDetails = priceDetails.map((item) => ({
      subTitle: item.subTitle,
      price: +item.price,
    }));
    const payload: EditBiayaTambahanPayload = {
      id,
      namePrice,
      priceDetails: numberPriceDetails,
    };
    submitEditBiayaTambahan(payload);
  }

  // Accordion
  function AccordionControl({
    propss,
    data,
  }: {
    propss: AccordionControlProps;
    data: TBiayaTambahan;
  }): JSX.Element {
    return (
      <Center>
        <Accordion.Control {...propss} className="font-bold" />
        <div
          style={{
            paddingInline: "16px",
            display: "flex",
            gap: "8px",
          }}
        >
          <ActionIcon
            variant="filled"
            className="bg-[#2A166F] hover:bg-[#2A166F]"
            size={40}
            radius={100}
            onClick={() => {
              const defaultValuesWithKey = data?.priceDetails.map((item) => ({
                name: item.subTitle,
                biaya: `Rp. ${item.price}`,
                key: randomId(),
              }));

              form.setValues({
                id: data.id,
                judulBiaya: data.namePrice,
                priceDetails: defaultValuesWithKey,
              });

              openEdit();
            }}
          >
            <AiFillEdit size={20} />
          </ActionIcon>

          <ActionIcon
            variant="filled"
            color="#2A166F"
            className="bg-[#2A166F] hover:bg-[#2A166F]"
            size={40}
            radius={100}
            onClick={() => {
              openDelete()
              form.setValues({
                id: data.id,
                judulBiaya: data.namePrice
              })
            }}
          >
            <BsFillTrashFill size={20} />
          </ActionIcon>
        </div>
      </Center>
    );
  }

  return (
    <Box sx={{ flex: "1" }}>
      <Paper
        withBorder
        shadow="sm"
        radius={"4rem"}
        px={"2.5rem"}
        bg={dark ? theme.colors.dark[8] : "white"}
        sx={{ padding: "1rem" }}
      >
        <Flex justify={"space-between"} align={"center"}>
          <Text weight={"bold"} size={"xl"}>Biaya Tambahan</Text>

          <Button onClick={openCreate}>Tambah</Button>
        </Flex>
      </Paper>

      <Accordion
        mt={30}
        mb={50}
        multiple
        variant="separated"
        chevronPosition="left"
      >
        {biayaTambahan &&
          biayaTambahan?.data?.sort((a, b) => a.id - b.id).map((biaya) => {
            const BiayaDetail = biaya.priceDetails;
            return (
              <Accordion.Item
                mb={15}
                key={biaya.id}
                value={biaya.id.toString()}
                sx={{
                  boxShadow: "0 4px 10px -6px black",
                  backgroundColor: `${dark ? theme.colors.dark[9] : "white"}`,
                  padding: "0.5rem 0.5rem",
                  border: "0.0625rem solid #dee2e6",
                  '&[data-active]': {
                    backgroundColor: dark ? theme.colors.dark[9] : "white",
                    border: "0.0625rem solid #dee2e6",
                  },
                }}
              >
                <AccordionControl
                  propss={{
                    id: biaya.id.toString(),
                    children: <Title order={3}>{biaya.namePrice}</Title>,
                  }}
                  data={biaya}
                />

                <Accordion.Panel
                  sx={{ borderTop: `1px solid ${dark ? "gray" : "#d9d9d9"}` }}
                >
                  <table className="w-full text-left  p-5">
                    <tbody>
                      {BiayaDetail.map((b) => {
                        const harga = b.price;

                        return (
                          <tr key={b.id}>
                            <td className="px-4">{b.subTitle}</td>
                            <td>
                              {harga
                                ?.toLocaleString("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                })
                                .slice(0, -3)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Accordion.Panel>
              </Accordion.Item>
            );
          })}
      </Accordion>

      <ModalBiayaTambahanCreate
        form={form}
        close={() => {
          closeCreate()
          form.reset()
        }}
        opened={openedCreate}
        tambahBiayaTambahanHandler={tambahBiayaTambahanHandler}
        titleModal="Tambah Biaya Tambahan"
        loading={createBiayaTambahanMutation.status === "pending"}
      />

      <ModalBiayaTambahanEdit
        form={form}
        opened={openedEdit}
        close={() => {
          closeEdit()
          form.reset()
        }}
        editBiayaTambahanHandler={editBiayaTambahanHandler}
        titleModal="Ubah Biaya Tambahan"
        loading={editBiayaTambahanMutation.status === "pending"}
      />

      {/* DELETE BIAYA TAMBAHAN */}
      <Modal
        centered
        closeOnEscape={false}
        closeOnClickOutside={false}
        withCloseButton={false}
        opened={openedDelete}
        onClose={() => {
          closeDelete()
          form.reset()
        }}
      >
        <Title order={3}>
          Hapus Biaya Tambahan
        </Title>
        <Text mt={20}>
          Anda yakin ingin menghapus biaya tambahan {form.values.judulBiaya}?
        </Text>
        <Group mt={20} position="right">
          <Button
            disabled={deleteBiayaTambahanMutation.status === "pending"}
            variant="outline"
            onClick={() => {
              closeDelete()
              form.reset()
            }}
          >
            Batal
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteBiayaTambahanHander(form.values.id)}
            loading={deleteBiayaTambahanMutation.status === "pending"}
          >
            Hapus
          </Button>
        </Group>
      </Modal>
    </Box>
  );
};

export default BiayaTambahan;
