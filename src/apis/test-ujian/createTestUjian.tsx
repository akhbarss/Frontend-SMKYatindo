import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";

export type CreateTesUjianPayload = {
    title: string;
    // for_major: "TAV";
    link: string;
    startDate: string;
    endDate: string;
    batchId: number;
};

export const createTestUjian = async (payload: CreateTesUjianPayload): Promise<ResponseType<Response>> => {
    const response = await axios.post("/v1/user/exam-information/create", payload);
    return response.data;
};
