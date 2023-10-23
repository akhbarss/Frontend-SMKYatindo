import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";

export type DeleteJalurPayload = {
    id: number
};

export const deleteJalur = async (payload: DeleteJalurPayload): Promise<ResponseType<Response>> => {

    console.log(payload)
    
    const response = await axios.delete("/v1/admin/registration-paths/delete?id=" + payload.id,);

    return response.data;
};
