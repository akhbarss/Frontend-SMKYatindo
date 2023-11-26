import { ResponseType } from "../types/global"
import axios from "../utils/axios"

export type ChangePasswordPayload = {
    password: string
}

export const changePassword = async (payload: ChangePasswordPayload): Promise<ResponseType<Response>> => {
    const response = await axios.put("/v1/admin/update-profile", payload)
    return response.data
}