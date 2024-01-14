import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";
import { Student } from "../../types/student";

export type UserSession = {
  id: number;
  username: string;
  fullname: string;
  role: string;
  role_id: {
    id: number;
    role_name: string;
    rolesMenus: {
      id: number;
      path: string;
    }[];
  };
  joinAt: null;
  student: Student;
};

export const jwtDecode = async (): Promise<ResponseType<UserSession>> => {
  const response = await axios.get("/v1/admin/session");

  return response.data;
};
