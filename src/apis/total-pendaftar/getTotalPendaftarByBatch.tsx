import { ResponseType } from "../../types/global";
import axios from "../../utils/axios";

type TotalPendaftarByBatch = {
    totalStudents: number;
    studentAccepted: number;
}

export const getTotalPendaftarByBatch = async (gelombangId: string): Promise<
    ResponseType<TotalPendaftarByBatch>
> => {

    const response = await axios.get(
        "/v1/admin/registration-batch/count-data?batchId=" + gelombangId
    );

    return response.data;
};