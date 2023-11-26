import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";

export type TipeJalur = "PENGEMBALIAN" | "PEMBELIAN"

export type CreateJalurPayload = {
    name: string,
    type: TipeJalur,
    start_date: string,
    end_date: string
    price: number
};

type CreateJalurRequest = {
    name: string,
    type: TipeJalur,
    start_date: string,
    end_date: string
    price: number
}

export const createJalur = async (payload: CreateJalurPayload): Promise<ResponseType<Response>> => {

    const data: CreateJalurRequest = payload

    console.log(data)

    const response = await axios.post("/v1/admin/registration-paths/post-multi", data);

    return response.data;
};
