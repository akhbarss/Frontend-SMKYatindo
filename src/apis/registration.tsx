import axios from "../utils/axios";
import { ResponseType } from "../types/global";

export type RegistrationPayload = {
  username: string;
  password: string
  role: string
  studentData: {
    name: string;
    address: string
    school_origin: string
  }
};

export type Response = {
  username: string;
  password: string
  role: string
  studentData: {
    name: string;
    address: string
    school_origin: string
  }

};

export const registration = async (
  payload: RegistrationPayload
): Promise<ResponseType<Response>> => {
  const response = await axios.post("/v1/auth/register-student", payload);

  return response.data;
};
