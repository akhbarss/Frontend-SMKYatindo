import { ResponseType } from "../../types/global";
import axios from "../../utils/axios";

type GetTestUjianResponse = {
    id: number,
    title: string,
    for_major: string,
    link: string,
    startDate: number,
    endDate: number,
    isOpen: boolean,
    batchId: number
}

export const getTestUjian = async (gelombangId: number): Promise<
    ResponseType<GetTestUjianResponse[]>
> => {

    const response = await axios.get(
        "/v1/user/exam-information/index?batchId=" + gelombangId
    );

    return response.data;
};