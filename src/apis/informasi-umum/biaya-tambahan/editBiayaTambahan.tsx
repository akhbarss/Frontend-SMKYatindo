import axios from "../../../utils/axios";
import { ResponseType } from "../../../types/global";

export type EditBiayaTambahanPayload = {
    id: number;
    namePrice: string;
    priceDetails: {
        subTitle: string;
        price: number;
    }[]
};

export const editBiayaTambahan = async (payload: EditBiayaTambahanPayload): Promise<ResponseType<Response>> => {

    const { namePrice, id, priceDetails } = payload

    const data = {
        namePrice,
        priceDetails
    }

    const response = await axios.patch("/v1/admin/additional-prices/update?id=" + id, data);

    return response.data;
};
