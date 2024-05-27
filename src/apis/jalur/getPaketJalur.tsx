import { ResponseType } from "../../types/global";
import { PaketJalur } from "./createJalur";
import axios from "../../utils/axios";

type ResponseGetPaketJalur = {
  id: number;
  pathType: PaketJalur;
};

export const getPaketJalur = async (
  id: number
): Promise<ResponseType<ResponseGetPaketJalur>> => {
  const response = await axios.get(
    "/v1/admin/registration-paths/get-path-type?pathId=" + id
  );
  return response.data;
};
