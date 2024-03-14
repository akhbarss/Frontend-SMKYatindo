import {
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import React, { createContext, useMemo } from "react";
import {
  GetAllAlurPendaftaran,
  createAlur,
  deleteAlur,
  editAlur,
  type AlurPendaftaran,
  type CreateAlurPayload,
  type DeleteAlurPayload,
} from "../apis/alur";
import { type ResponseType } from "../types/global";

type AlurContextProviderProps = {
  children: React.ReactNode;
};

export type AlurContextProps = {
  alurQuery: UseQueryResult<ResponseType<AlurPendaftaran[]>, Error>;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  alurBySmp: AlurPendaftaran[];
  alurBySmk: AlurPendaftaran[];
  loadingActionAlur: boolean;

  createAlurMutation: UseMutationResult<
    ResponseType<Response>,
    Error,
    CreateAlurPayload,
    unknown
  >;
  deleteAlurMutation: UseMutationResult<
    ResponseType<Response>,
    Error,
    DeleteAlurPayload,
    unknown
  >;
  editAlurMutation: UseMutationResult<
    ResponseType<Response>,
    Error,
    DeleteAlurPayload,
    unknown
  >;
};

const AlurContext = createContext<AlurContextProps>({
  alurQuery: null,
  isError: false,
  isFetching: false,
  isLoading: false,
  alurBySmk: null,
  alurBySmp: null,
  loadingActionAlur: false,
  createAlurMutation: null,
  deleteAlurMutation: null,
  editAlurMutation: null,
});

export const AlurContextProvider = ({ children }: AlurContextProviderProps) => {


  const alurQuery = useQuery({
    queryKey: ["get_all_alur"],
    queryFn: GetAllAlurPendaftaran,
  });

  const { data, isError, isFetching, isLoading } = alurQuery;

  const createAlurMutation = useMutation({ mutationFn: createAlur });
  const deleteAlurMutation = useMutation({ mutationFn: deleteAlur });
  const editAlurMutation = useMutation({ mutationFn: editAlur });
  const loadCreate = createAlurMutation.status == "pending";
  const loadEdit = editAlurMutation.status == "pending";
  const loadDelete = deleteAlurMutation.status == "pending";
  const loading = useMemo(() => loadCreate || loadEdit || loadDelete, [])

  const filterAlurBySMP = useMemo(
    () =>
      data?.data
        ?.filter((alur) => alur.grade === "SMP")
        .sort((a, b) => a.id - b.id),
    [data]
  );
  const filterAlurBySMK = useMemo(
    () =>
      data?.data
        ?.filter((alur) => alur.grade === "SMK")
        .sort((a, b) => a.id - b.id),
    [data]
  );

  return (
    <AlurContext.Provider
      value={{
        alurQuery,
        isError,
        isFetching,
        isLoading,
        alurBySmk: filterAlurBySMK,
      alurBySmp: filterAlurBySMP,
        createAlurMutation,
        deleteAlurMutation,
        editAlurMutation,
        loadingActionAlur: loading,
      }}
    >
      {children}
    </AlurContext.Provider>
  );
};

export default AlurContext;
