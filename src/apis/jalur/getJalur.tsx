/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  QueryObserverResult,
  RefetchOptions
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ResponseType } from "../../types/global";
import axios from "../../utils/axios";

export type TGelombang = {
  id: number;
  name: string;
  index: number;
  max_quota: number;
  start_date: string;
  end_date: string;
  bank_name: string;
  bank_user: string;
  price: number;
  bank_account: string;
  isOpen: string;
  countStudent: number;
  batchCode: string;
  students: [];
};

export type JalurPendaftaran = {
  id: number;
  name: string;
  type: string;
  start_date: number;
  end_date: number;
  price: string;
  countStudent: number
};

export type TGetAllJalurPendaftaran = {
  data: JalurPendaftaran[];
  load: boolean;
  isErr: boolean;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, Error>>;
};

export type GetAllJalurPendaftaranPayload = "SMK" | "SMP"

type ResponseGetAllJalurPendaftaranPayload = {
  countStudent: boolean;
  end_date: number;
  grade: "SMP" | "SMK"
  id: number;
  name: string;
  price: number;
  start_date: number;
  type: string;
}

export const getAllJalurPendaftaran = async (payload: GetAllJalurPendaftaranPayload): Promise<ResponseType<ResponseGetAllJalurPendaftaranPayload[]>> => {
  const response = await axios.get("/v1/admin/registration-paths/index?grade=" + payload)

  return response.data
}
