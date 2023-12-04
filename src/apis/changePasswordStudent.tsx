import { ResponseType } from "../types/global"
import axios from "../utils/axios"

export type ChangePasswordPayloadStudent = {
    password: string
    id: number
}

export const changePasswordStudent = async (payload: ChangePasswordPayloadStudent): Promise<ResponseType<Response>> => {
    const { id, password } = payload

    const response = await axios.put("/v1/admin/update-password/student?studentId=" + id, { password })
    return response.data
}