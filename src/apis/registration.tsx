/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseType } from "../types/global";
import axios from "../utils/axios";

export type RegistrationPayload = {
  username: string;
  password: string;
  role: string;
  studentData: {
    name: string;
    address: string;
    school_origin: string;
    grade: "SMK" | "SMP";
  };
};

export type RegistrationAdminPayload = {
  username: string;
  fullname: string;
  password: string;
};

export type Response = {
  username: string;
  password: string;
  role: string;
  studentData: {
    name: string;
    address: string;
    school_origin: string;
  };
};

export type RegistrationResponse = {
  access_token: string;
  refresh_token: string;
  roles: string;
};

export const registration = async (
  payload: RegistrationPayload
): Promise<ResponseType<ResponseType<RegistrationResponse>>> => {
  const response = await axios.post("/v1/auth/register-student", payload);
  return response.data;
};

export const registrationAdmin = async (
  payload: RegistrationAdminPayload
): Promise<ResponseType<any>> => {
  const response = await axios.post("/v1/auth/register", payload);
  return response.data;
};
