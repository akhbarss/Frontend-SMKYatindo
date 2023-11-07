import { ResponseType } from "../../types/global";
import axios from "../../utils/axios";
import { TGelombang } from "../jalur/getJalur";

export const getGelombangByIdJalur = async (idJalur: string): Promise<
    ResponseType<TGelombang[]>
> => {

    const response = await axios.get("/v1/admin/registration-batch/index?pathId=" + idJalur)

    return response.data;
};