import { Lookup } from "../types/lookup";
import { ResponseType } from "../types/global";
import axios from "../utils/axios";

export const getLookup = async (
  type: string
): Promise<ResponseType<Lookup[]>> => {
  const response = await axios.get("/v1/admin/lookup?type=" + type);
  return response.data;
};
