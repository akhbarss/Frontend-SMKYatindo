import axios from "../utils/axios";
import { ResponseType } from "../types/global";

export type LoginPayload = {
  username: string
  password: string
};

export type ResponseLogin = {
  username: string;
  password: string
  role: string
  studentData: {
    name: string;
    address: string
    school_origin: string
  }

};

export const login = async (
  payload: LoginPayload
): Promise<ResponseType<Response>> => {
  const response = await axios.post("/v1/auth/login", payload);

  return response.data;
};
