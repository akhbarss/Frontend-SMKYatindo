import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";

export type CreateGelombangPayload = {
    idJalur: number
    payloadCreate: {
        name: string,
        index: number;
        max_quota: number;
        start_date: string;
        end_date: string;
        bank_account: string;
        bank_name: string;
        bank_user: string;
        price: number;
        batchCode: string;
    },
};

type CreateGelombangRequest = {
    path_id: number;
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

export const createGelombang = async (payload: CreateGelombangPayload): Promise<ResponseType<Response>> => {
    const {
        idJalur,
        payloadCreate
    } = payload
    const data: CreateGelombangRequest = { ...payloadCreate, path_id: idJalur }

    const response = await axios.post("/v1/admin/registration-batch/post", data);
    return response.data;
};
