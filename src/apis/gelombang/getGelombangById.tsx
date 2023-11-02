import { ResponseType } from "../../types/global";
import axios from "../../utils/axios";
import { TGelombang } from "../jalur/getJalur";

export const getGelombangById = async (gelombangId: string): Promise<
    ResponseType<TGelombang>
> => {

    const response = await axios.get(
        "/v1/admin/registration-batch/get?id=" + gelombangId
    );

    return response.data;
};