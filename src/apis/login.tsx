import axios from "../utils/axios";
import { ResponseType } from "../types/global";
import { RegistrationResponse } from "./registration";

export type LoginPayload = {
  username: string;
  password: string;
};

export const login = async (
  payload: LoginPayload
): Promise<ResponseType<ResponseType<RegistrationResponse>>> => {
  const response = await axios.post("/v1/auth/login", payload);

  return response.data;
};
