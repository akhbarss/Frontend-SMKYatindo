import { ResponseType } from "../types/global";
import { Staging } from "../types/student";
import axios from "../utils/axios";

export const updateBio = async (
  payload: FormData
): Promise<ResponseType<Staging>> => {
  const response = await axios.put("/v1/student/update-bio", payload);
  return response.data;
};
