import axios from "axios"
import { ResponseType } from "../../types/global";
import { BASE_URL } from "../../utils/axios";

export type AlurPendaftaran = {
  id: number;
  content: string;
  title: string;
  grade: "SMP" | "SMK"
};

export const GetAllAlurPendaftaran = async (): Promise<
  ResponseType<AlurPendaftaran[]>
> => {
  const request = await axios.get(BASE_URL + "/public/index-alur-ppdb");
  return request.data;
};
