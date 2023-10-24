import { AxiosResponse } from "axios";
import axios from "../../utils/axios";
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";

export type AlurPendaftaran = {
    id: number;
    content: string;
    title: string;
}

export type TGetAllAlurPendaftaran = {
    data: AlurPendaftaran[],
    load: boolean,
    isErr: boolean
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<AxiosResponse<any, any>, Error>>;
}

export const GetAllAlurPendaftaran = () => {

    const accessToken = localStorage.getItem("_TuVbwpW")

    const {
        data,
        isLoading,
        isError,
        refetch,
        error
     } = useQuery({
            queryKey: ["getAllAlurPendaftaran"],
            queryFn: () => axios.get("/v1/admin/alur-ppdb/index", {
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
    } as TGetAllAlurPendaftaran

};
