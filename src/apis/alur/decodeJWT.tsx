import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";
import { Response } from "../registration";
import { Student } from "../../types/student";

export type UserSession = {
  id: number;
  username: string;
  role: string;
  joinAt: null;
  student: Student;
};

export const jwtDecode = async (): Promise<ResponseType<UserSession>> => {
  const response = await axios.get("/v1/admin/session");

  return response.data;
};
