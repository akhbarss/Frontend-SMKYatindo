
import { ResponseType } from "../../types/global";
import axios from "../../utils/axios";

// http://localhost:8080/api/v1/admin/registration-batch/all-batch

interface ResponseGetAllGelombangPendaftar  {
    id: number;
    grade: "SMK" | "SMP";
    name: string;
    total: number;
    type: "PEMBELIAN" | "PENGEMBALIAN";
}

export const getAllGelombangPendaftar = async ():Promise<ResponseType<ResponseGetAllGelombangPendaftar[]>>  => {
    const response = await axios.get("/v1/admin/registration-batch/all-batch")

    return response.data
}
