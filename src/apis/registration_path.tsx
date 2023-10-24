import axios from "../utils/axios";
import { ResponseType } from "../types/global";

type TCreateNewRegistrationPath = {
  name: string;
  path: string;
};

export const createNewRegistrationPath = async (
  payload: TCreateNewRegistrationPath
): Promise<ResponseType<any>> => {
  const response = await axios.post("/v1/registration-paths", payload);
  return response.data;
};
