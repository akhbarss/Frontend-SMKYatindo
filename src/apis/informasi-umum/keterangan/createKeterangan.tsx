import axios from "../../../utils/axios";
import { ResponseType } from "../../../types/global";

export type CreateKeteranganPayload = {
    name: string;
    description: string;
    index: string;
    path_id: number
};

export const createKeterangan = async (payload: CreateKeteranganPayload): Promise<ResponseType<Response>> => {
    const response = await axios.post("/v1/admin/registration-info/post", payload);

    return response.data;
};
