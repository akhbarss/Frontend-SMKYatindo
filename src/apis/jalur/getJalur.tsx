import { AxiosResponse } from "axios";
import axios from "../../utils/axios";
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";

export type Gelombang = {
    id: number;
    index: number;
    max_quota: number;
    start_date: string;
    end_date: string;
    bank_name: string
    bank_user: string

}

export type JalurPendaftaran = {
    id: number;
    name: string;
    type: string;
    start_date: string;
    end_date: string;
    price: string;
    registrationBatches: Gelombang[];
}

export type TGetAllJalurPendaftaran = {
    data: JalurPendaftaran[],
    load: boolean,
    isErr: boolean
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<AxiosResponse<any, any>, Error>>;
}

export const GetAllJalurPendaftaran = () => {

    const accessToken = localStorage.getItem("_TuVbwpW")

    const {
        data,
        isLoading,
        isError,
        refetch,
        error
    } = useQuery({
        queryKey: ["getAllJalurPendaftaran"],
        queryFn: () => axios.get("/v1/admin/registration-paths/index", {
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        })
    })

    console.log(error?.message)

    return {
        data: data?.data?.data,
        load: isLoading,
        isErr: isError,
        refetch
    } as TGetAllJalurPendaftaran

};
