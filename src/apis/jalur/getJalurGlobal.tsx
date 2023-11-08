import axios from "../../utils/axios";
import { ResponseType, TGlobalRegistrationPath } from "../../types/global";

export const getJalurGlobal = async (): Promise<
    ResponseType<TGlobalRegistrationPath>
> => {

    const response = await axios.get(
        "/v1/admin/registration-paths/index-recursion"
    );

    return response.data;
};