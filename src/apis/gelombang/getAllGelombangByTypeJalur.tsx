import { ResponseType, TipeJalurPendafaran } from "../../types/global";
import axios from "../../utils/axios";
import { TGelombang } from "../jalur/getJalur";

// type TJalurPendaftaranTypePembelian = {
//     id: number;
//     name: string;
//     type: string;
//     start_date: string;
//     end_date: string;
//     price: string;

// }

export const getAllGelombangByTypeJalur = async (
  type: TipeJalurPendafaran
): Promise<ResponseType<TGelombang[]>> => {
  const response = await axios.get(
    "/v1/admin/registration-batch/getByType?type=" + type
  );

  return response.data;
};
