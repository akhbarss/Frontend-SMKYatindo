import { AxiosResponse } from "axios";
import axios from "../../utils/axios";
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import { TGelombang } from "../jalur/getJalur";

export type TGetGelombangByIdJalur = {
    data: TGelombang[],
    load: boolean,
    isErr: boolean,
    err: Error
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<AxiosResponse<any, any>, Error>>;
}

export const GetGelombangByIdJalur = (idJalur: string) => {

    const accessToken = localStorage.getItem("_TuVbwpW")

    const {
        data,
        isLoading,
        isError,
        refetch,
        error
    } = useQuery({
        queryKey: ["GetGelombangByIdJalur"],
        queryFn: () => axios.get("/v1/admin/registration-batch/get-batch-by-pathsId?pathsId=" + idJalur, {
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        })
    })

    // console.log(error?.message)

    return {
        data: data?.data?.data,
        load: isLoading,
        isErr: isError,
        refetch,
        err: error
    } as TGetGelombangByIdJalur

};
