import axios from "../../../utils/axios";
import { ResponseType } from "../../../types/global";

export type DeleteBiayaTambahanPayload = {
    id: number
};

export const deleteBiayaTambahan = async (payload: DeleteBiayaTambahanPayload): Promise<ResponseType<Response>> => {
    
    const response = await axios.delete("/v1/admin/additional-prices/delete?id=" + payload.id,);

    return response.data;
};
