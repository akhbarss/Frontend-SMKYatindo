import axios from "../utils/axios";
import { ResponseType } from "../types/global";

export type RegistrationPayload = {
  name: string;
};

export type Response = {
  name: string;
};

export const registration = async (
  payload: RegistrationPayload
): Promise<ResponseType<Response>> => {
  const response = await axios.post("/v1/registration", payload);

  return response.data;
};
