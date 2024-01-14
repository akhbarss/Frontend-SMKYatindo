import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";

export type CreateAlurPayload = {
    title: string;
    content: string;
    grade: "SMK" | "SMP"
};

export const createAlur = async (payload: CreateAlurPayload): Promise<ResponseType<Response>> => {
    const response = await axios.post("/v1/admin/alur-ppdb/post", payload);

    return response.data;
};
