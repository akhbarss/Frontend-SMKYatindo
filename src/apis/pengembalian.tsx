import { ResponseType } from "../types/global";
import { Staging } from "../types/student";
import axios from "../utils/axios";

export const fillBio = async (
  payload: FormData
): Promise<ResponseType<Staging>> => {
  const response = await axios.put("/v1/student/fill-bio", payload);
  return response.data;
};
