import { ResponseType, TipeJalurPendafaran } from "../../types/global";
import axios from "../../utils/axios";

type ResponseGetAllGelombangByTypeJalur = {
  bank_account: string;
  bank_name: string;
  bank_user: string;
  batchCode: string;
  countStudent: number;
  end_date: number;
  grade: "SMK" | "SMP"
  id: number;
  index: number;
  isOpen: true
  max_quota: number;
  name: string;
  path_id: number;
  price: number;
  start_date: number;
}

export const getAllGelombangByTypeJalur = async (
  type: TipeJalurPendafaran
): Promise<ResponseType<ResponseGetAllGelombangByTypeJalur[]>> => {
  const response = await axios.get(
    "/v1/admin/registration-batch/getByType?type=" + type
  );

  return response.data;
};
