import { ResponseType, TipeJalurPendafaran } from "../../types/global";
import axios from "../../utils/axios";

type TJalurPendaftaranTypePembelian = {
    id: number;
    name: string;
    type: string;
    start_date: string;
    end_date: string;
    price: string;
    
}

export const getJalurPendaftaranByType = async (type: TipeJalurPendafaran): Promise<
    ResponseType<TJalurPendaftaranTypePembelian[]>
> => {

    const response = await axios.get(
        "/v1/admin/registration-paths/get-type?type=" + type
    );

    return response.data;
};