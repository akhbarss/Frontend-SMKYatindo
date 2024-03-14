/* eslint-disable @typescript-eslint/ban-ts-comment */
import toast from "react-hot-toast";
import {
  CreateAlurPayload,
  DeleteAlurPayload,
  EditAlurPayload,
} from "../apis/alur";
import { useQueryClient } from "@tanstack/react-query";
import { useAlur } from "./useAlur";
import { useModal } from "./useModal";
import { useAlurFormContext } from "../context/form-context";

export const useAlurAction = () => {
  const queryClient = useQueryClient();
  const {closeCreate, closeDelete, closeEdit} = useModal()
  const formAlur = useAlurFormContext()
  const {  createAlurMutation, deleteAlurMutation, editAlurMutation } =
    useAlur();

  const submitCreateAlur = async (payload: CreateAlurPayload) => {
    createAlurMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Data berhasil ditambahkan");
        formAlur.reset();
        closeCreate();
        queryClient.invalidateQueries({ queryKey: ["get_all_alur"] });
      },
      onError: (err) => {
        // @ts-ignore
        const status = err?.response?.status;
        if (status === 400) {
          toast.error("Data tidak boleh kosong");
        } else {
          toast.error("Gagal membuat alur");
        }

        console.log({ err });
      },
    });
  };

  const submitEditAlur = (payload: EditAlurPayload) => {
    editAlurMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Data berhasil diubah");
        formAlur.reset();
        closeEdit();
        queryClient.invalidateQueries({ queryKey: ["get_all_alur"] });
      },
      onError: (err) => {
        // @ts-ignore
        const status = err?.response?.status;
        if (status === 400) {
          toast.error("Data tidak boleh kosong");
        } else {
          toast.error("Gagal mengubah alur");
        }
      },
    });
  };

  const submitDeleteAlur = (payload: DeleteAlurPayload) => {
    deleteAlurMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Data berhasil dihapus");
        closeDelete();
        queryClient.invalidateQueries({ queryKey: ["get_all_alur"] });
        formAlur.reset();
      },
      onError: () => {
        toast.error("Gagal menghapus alur pendaftaran");
      },
    });
  };

  return {
    submitCreateAlur,
    submitDeleteAlur,
    submitEditAlur,
  };
};
