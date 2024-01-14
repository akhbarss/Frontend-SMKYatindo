import { ResponseType, TGlobalRegistrationPath } from "../../types/global";
import axios from "axios"
import { BASE_URL } from "../../utils/axios";

export const getJalurGlobal = async (): Promise<
    ResponseType<TGlobalRegistrationPath>
> => {

    const response = await axios.get(
        BASE_URL + "/public/index-registration-path"
    );

    return response.data;
};