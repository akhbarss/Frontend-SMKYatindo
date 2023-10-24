import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";

export type AlurPendaftaran = {
  id: number;
  content: string;
  title: string;
};

export const GetAllAlurPendaftaran = async (): Promise<
  ResponseType<AlurPendaftaran[]>
> => {
  const request = await axios.get("/v1/admin/alur-ppdb/index");
  return request.data;
};
