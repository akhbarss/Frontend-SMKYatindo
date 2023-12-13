import { ResponseType } from "../../types/global"
import axios from "../../utils/axios"
// http://localhost:8080/api/v1/admin/registration-batch/delete-student-from-batch?studentId=2

export const deleteStudentFromBatch = async (id: number): Promise<ResponseType<any>> => {
    const response = await axios.delete("/v1/admin/registration-batch/delete-student-from-batch?studentId=" + id)
    return response.data
}