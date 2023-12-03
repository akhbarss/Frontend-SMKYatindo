import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";

export type EditAlurPayload = {
    id: number
    title: string
    content: string
    grade: "SMP" | "SMK"
};

export const editAlur = async (payload: EditAlurPayload): Promise<ResponseType<Response>> => {

    const data = {
        title: payload.title,
        content: payload.content
    }

    const response = await axios.put("/v1/admin/alur-ppdb/update?dataId=" + payload.id, data);

    return response.data;
};
