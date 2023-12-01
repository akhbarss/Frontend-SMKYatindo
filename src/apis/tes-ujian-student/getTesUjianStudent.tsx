import { ResponseType } from "../../types/global"
import axios from "../../utils/axios"

type ResponseGetTesUjianStudent = {
    id: number;
    batchId: number;
    title: string;
    link: string;
    startDate: number;
    endDate: number;
}

export const getTesUjianStudent = async (): Promise<ResponseType<ResponseGetTesUjianStudent[]>> => {
    const response = await axios.get("/v1/user/exam-information/index-all")

    return response.data
}