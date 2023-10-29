import axios from "../../../utils/axios";
import { ResponseType } from "../../../types/global";

export type CreateBiayaTambahanPayload = {
    namePrice: string;
    path_id: number;
    priceDetails: {
        subTitle: string;
        price: number;
    }[]
};

export const createBiayaTambahan = async (payload: CreateBiayaTambahanPayload): Promise<ResponseType<Response>> => {
    const response = await axios.post("/v1/admin/additional-prices/post", payload);

    return response.data;
};
