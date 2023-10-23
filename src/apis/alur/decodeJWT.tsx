import axios from "../../utils/axios";
import { AccessToken, ResponseType } from "../../types/global";

export const jwtDecode = async (
    payload: string
): Promise<ResponseType<Response>> => {
    const response = await axios.get("/v1/auth/session?token=" + payload);

    return response.data;
};
