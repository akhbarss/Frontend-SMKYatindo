import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";

export type TipeJalur = "PENGEMBALIAN" | "PEMBELIAN"

export type CreateJalurPayload = {
    name: string,
    type: TipeJalur,
    start_date: Date,
    end_date: Date
    price: string
};

type CreateJalurRequest = {
    name: string,
    type: TipeJalur,
    start_date: string,
    end_date: string
    price: string
}

export const createJalur = async (payload: CreateJalurPayload): Promise<ResponseType<Response>> => {

    const {
        end_date,
        name,
        price,
        start_date,
        type,
    } = payload

    const data: CreateJalurRequest = {
        end_date: end_date.toISOString(),
        name,
        price,
        start_date: start_date.toISOString(),
        type
    }

    console.log(data)
    
    const response = await axios.post("/v1/admin/registration-paths/post-multi", data);

    return response.data;
};
