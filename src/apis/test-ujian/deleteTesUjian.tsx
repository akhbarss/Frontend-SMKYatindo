import { ResponseType } from "../../types/global"
import axios from "../../utils/axios"

export type DeleteTesUjianPayload = {
    id: number
}

export const deleteTesUjian = async (payload: DeleteTesUjianPayload): Promise<ResponseType<Response>> => {
    const { id } = payload
    const response = await axios.delete("/v1/admin/exam-information/delete?id=" + id)
    return response.data
}