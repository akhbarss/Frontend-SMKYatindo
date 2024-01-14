import { ResponseType } from "../types/global"
import axios from "../utils/axios"

export type ChangePasswordPayloadStudent = {
    username: string;
    password: string
    id: number
}

export const changePasswordStudent = async (payload: ChangePasswordPayloadStudent): Promise<ResponseType<Response>> => {
    const { id, password, username } = payload

    const response = await axios.put("/v1/admin/update-password/student?studentId=" + id, { password, username })
    return response.data
}