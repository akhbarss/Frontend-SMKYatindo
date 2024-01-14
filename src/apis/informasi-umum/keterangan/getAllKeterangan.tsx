import axios from "../../../utils/axios";
import { ResponseType } from "../../../types/global";

export type InformmasiUmumKeterangan = {
    id: number;
    name: string;
    description: string;
    index: number;
    path_id: number
};

export const getAllKeterangan = async (pathId: number): Promise<
    ResponseType<InformmasiUmumKeterangan[]>
> => {

    const request = await axios.get("/v1/admin/registration-info/index?regisPathsId=" + pathId);

    return request.data;
};
