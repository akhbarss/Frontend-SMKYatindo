import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";

export type DeleteGelombangPayload = {
    id: number
};

export const deleteGelombang = async (payload: DeleteGelombangPayload): Promise<ResponseType<Response>> => {

    console.log(payload)
    
    const response = await axios.delete("/v1/admin/registration-batch/delete?id=" + payload.id,);

    return response.data;
};
