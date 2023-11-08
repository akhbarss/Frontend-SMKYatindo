import { ResponseType, Status } from "../../types/global";
import axios from "../../utils/axios";

type TStudent = {
    id: number;
    name: string;
    phone: string
    address: string
    status: Status
    registrationDate: number | null
}

export const getAllStudentByBatchId = async (gelombangId: string): Promise<
    ResponseType<TStudent[]>
> => {

    const response = await axios.get(
        "/v1/admin/registration-batch/get-students?batchId=" + gelombangId
    );

    return response.data;
};