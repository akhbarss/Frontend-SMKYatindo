import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";

export type EditGelombangPayload = {
    id: number
    name: string,
    index: number;
    max_quota: number;
    start_date: string;
    end_date: string
    bank_account: string;
    bank_name: string;
    bank_user: string;
    price: number;
    batchCode: string;
};

type EditGelombangRequest = {
    name: string,
    index: number;
    max_quota: number;
    start_date: string;
    end_date: string
    bank_account: string;
    bank_name: string;
    bank_user: string;
    price: number;
    batchCode: string;
}

export const editGelombang = async (payload: EditGelombangPayload): Promise<ResponseType<Response>> => {

    const {
        id,
        bank_account,
        bank_name,
        bank_user,
        end_date,
        index,
        max_quota,
        name,
        price,
        start_date,
        batchCode
    } = payload

    const data: EditGelombangRequest = {
        bank_account,
        bank_name,
        bank_user,
        start_date,
        end_date,
        index,
        max_quota,
        name,
        price,
        batchCode
    }

    const response = await axios.patch("/v1/admin/registration-batch/update?id=" + id, data);

    return response.data;
};
