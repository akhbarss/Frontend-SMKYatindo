import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";

export type DeleteAlurPayload = {
    id: number
};

export const deleteAlur = async (payload: DeleteAlurPayload): Promise<ResponseType<Response>> => {
    const response = await axios.delete("/v1/admin/alur-ppdb/delete?id=" + payload.id,);

    return response.data;
};
