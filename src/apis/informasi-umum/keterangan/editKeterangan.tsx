import axios from "../../../utils/axios";
import { ResponseType } from "../../../types/global";

export type EditKeteranganPayload = {
    name: string;
    description: string;
    index: string;
    idKeterangan: number
};

export const editKeterangan = async (payload: EditKeteranganPayload): Promise<ResponseType<Response>> => {

    const {
        description,
        idKeterangan,
        index,
        name
    } = payload

    const data = {
        description,
        index,
        name
    }


    const response = await axios.patch("/v1/admin/registration-info/update?id=" + idKeterangan, data);

    return response.data;
};
