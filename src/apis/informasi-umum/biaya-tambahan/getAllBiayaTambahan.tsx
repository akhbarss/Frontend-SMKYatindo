import axios from "../../../utils/axios";
import { ResponseType } from "../../../types/global";

type DetailBiaya = {
    id: number;
    subTitle: string;
    price: number;
}

export type TBiayaTambahan = {
    id: number;
    namePrice: string;
    path_id: string;
    priceDetails: DetailBiaya[]
};

export const getAllBiayaTambahan = async (pathId: number): Promise<
    ResponseType<TBiayaTambahan[]>
> => {

    const response = await axios.get("/v1/admin/additional-prices/index?pathId=" + pathId);
    return response.data;
};
