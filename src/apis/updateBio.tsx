import { ResponseType } from "../types/global";
import axios from "../utils/axios";

export const updateBio = async (
    payload: {
        data: FormData;
        studentId: number
    },
): Promise<ResponseType<{
    message: string;
    status: string;
}
>> => {
    const { data, studentId } = payload
    const response = await axios.put(`/v1/student/update-bio?id=${studentId}`, data);
    return response.data;
};
