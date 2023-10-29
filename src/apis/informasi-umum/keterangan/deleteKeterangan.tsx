import axios from "../../../utils/axios";
import { ResponseType } from "../../../types/global";

export type DeleteKeteranganPayload = {
    id: number
};

export const deleteKeterangan = async (payload: DeleteKeteranganPayload): Promise<ResponseType<Response>> => {
    
    const response = await axios.delete("/v1/admin/registration-info/delete?id=" + payload.id,);

    return response.data;
};
