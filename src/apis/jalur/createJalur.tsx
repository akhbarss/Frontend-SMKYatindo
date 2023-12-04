import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";

export type TipeJalur = "PENGEMBALIAN" | "PEMBELIAN"

export type CreateJalurPayload = {
    name: string,
    type: TipeJalur,
    start_date: string,
    end_date: string
    price: number;
    grade: "SMP" | "SMK"
};

type CreateJalurRequest = {
    name: string,
    type: TipeJalur,
    start_date: string,
    end_date: string
    price: number;
    grade: "SMP" | "SMK"
}

export const createJalur = async (payload: CreateJalurPayload): Promise<ResponseType<Response>> => {

    const data: CreateJalurRequest = payload

    const response = await axios.post("/v1/admin/registration-paths/post-multi", data);

    return response.data;
};
