import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";

// {
//     "name": "Pembelian",
//     "index":1,
//     "max_quota":100,
//     "start_date":"2023-10-22T10:00:00",
//     "end_date":"2023-10-24T10:00:00",
//     "bank_name":"BCA",
//     "bank_user":"heru boris",
//     "price":100000,
//     "bank_account":"3498123749182347",
// }

export type CreateGelombangPayload = {
    idJalur: string,
    payloadCreate: {
        name: string,
        index: number;
        max_quota: number;
        start_date: Date;
        end_date: Date;
        bank_account: string;
        bank_name: string;
        bank_user: string;
        price: string;
    },
};

type CreateGelombangRequest = {
    name: string,
    index: number;
    max_quota: number;
    start_date: string;
    end_date: string
    bank_account: string;
    bank_name: string;
    bank_user: string;
    price: string;
}

export const createGelombang = async (payload: CreateGelombangPayload): Promise<ResponseType<Response>> => {
    const {
        idJalur,
        payloadCreate: {
            bank_account,
            bank_name,
            bank_user,
            end_date,
            index,
            max_quota,
            name,
            price,
            start_date
        }

    } = payload

    // console.log(payloadCreate)


    const data: CreateGelombangRequest = {
        bank_account,
        bank_name,
        bank_user,
        end_date: end_date.toISOString(),
        index,
        max_quota,
        name,
        price,
        start_date: start_date.toISOString()
    }


    const response = await axios.post("/v1/admin/registration-batch/post?regisId=" + idJalur, data);

    return response.data;
};
