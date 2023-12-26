import axios from "../../utils/axios";
import { ResponseType, Status } from "../../types/global";
import { Student } from "../../types/student";

export type TStudentDetail = {
    id: number
    address: string;
    batch_id: number
    birth_card: string | null;
    birth_date: null | string | number;
    birth_place: null | string | number;
    city: string
    dad_address: string
    dad_job: string
    dad_name: string
    dad_phone: string
    district: string
    family_card: string
    formulirId: string
    gender: string
    grade: "SMK" | "SMP"
    lastInsertedNumber: string
    major: null
    mother_address: string
    mother_job: string
    mother_name: string
    mother_phone: string
    name: string
    nisn: string
    path_id: number
    phone: string
    postal_code: string
    profile_picture: string
    province: string
    registrationDate: number
    religion: string
    school_origin: string
    staging_id: number
    status: Status
    sub_district: string
    surname: string
}

export type GetStudentPayload = {
    userId: string;
}

export const getStudent = async (payload: GetStudentPayload): Promise<
    ResponseType<Student>
> => {
    const { userId } = payload

    const request = await axios.get(`/v1/admin/registration-batch/detail?studentId=${userId}`);
    return request.data;
};
