import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";
import { TipeJalur } from "./createJalur";

export type EditJalurPayload = {
    id: number
    name: string,
    type: TipeJalur,
    start_date: string,
    end_date: string
    price: number
};

type EditJalurRequest = {
    name: string,
    type: TipeJalur,
    start_date: string,
    end_date: string
    price: number
}

export const editJalur = async (payload: EditJalurPayload): Promise<ResponseType<Response>> => {

    const {
        end_date,
        id,
        name,
        price,
        start_date,
        type,
    } = payload

    const data: EditJalurRequest = {
        end_date,
        name,
        price,
        start_date,
        type
    }

    const response = await axios.patch("/v1/admin/registration-paths/update?id=" + id, data);

    return response.data;
};
