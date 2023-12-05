import { ResponseType } from "../types/global"
import axios from "../utils/axios"

export type ChangePasswordPayloadAdmin = {
    password: string
    id: number
}

export const changePasswordAdmin = async (payload: ChangePasswordPayloadAdmin): Promise<ResponseType<Response>> => {
    const { id, password } = payload

    const response = await axios.put("/v1/admin/update-password/admin?id="+ id, { password })
    return response.data
}