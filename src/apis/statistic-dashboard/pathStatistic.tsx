import { ResponseType } from "../../types/global";
import axios from "../../utils/axios"

interface ResponsePathStatistic {
    grade: "SMP" | "SMK";
    id: number;
    name: string;
    registered: number;
    type: "PEMBELIAN" | "PENGEMBALIAN";
}

export const pathStatistic = async (): Promise<ResponseType<ResponsePathStatistic[]>> => {
    const response = await axios.get("/v1/admin/dashboard-stat/count-all-path-statistics")

    return response.data
}
