import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";

export type EditTesUjianPayload = {
    id: number
    title: string;
    // for_major: "TAV";
    link: string;
    startDate: string;
    endDate: string;
};

export const editTesUjian = async (payload: EditTesUjianPayload): Promise<ResponseType<Response>> => {
    const { id, ...data } = payload

    const response = await axios.patch("/v1/user/exam-information/update?id=" + id, data);
    return response.data;
};