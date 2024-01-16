import { ResponseType } from "../../types/global"
import axios from "../../utils/axios"

interface ResponseCountStatisticDashboard {
    payment_Confirmed: number;
    registered: number;
    waiting_Payment: number;
}

export const countStatisticDashboard = async (): Promise<ResponseType<ResponseCountStatisticDashboard>> => {
    const response = await axios.get("/v1/admin/dashboard-stat/count-statistics")
    return response.data
}
