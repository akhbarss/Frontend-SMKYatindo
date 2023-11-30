import { ResponseType, Status } from "../../types/global";
import axios from "../../utils/axios";

type TStudent = {
    id: number;
    name: string;
    phone: string
    address: string
    status: Status
    registration_Date: number | null
}


type ResponseGetAllStudentByBatchId = {
    content: TStudent[];
    pageable: {
        pageNumber: number,
        pageSize: number,
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        },
        offset: number;
        unpaged: boolean;
        paged: boolean;
    },
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    },
    first: boolean;
    numberOfElements: number;
    empty: false
}


export const getAllStudentByBatchId = async (gelombangId: string): Promise<
    ResponseType<ResponseGetAllStudentByBatchId>
> => {

    const response = await axios.get(
        `/v1/admin/registration-batch/get-students?batchId=${gelombangId}&page=0&size=1000`
    );

    return response.data;
};