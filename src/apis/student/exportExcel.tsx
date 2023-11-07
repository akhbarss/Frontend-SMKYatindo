import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";


export const exportExcel = async (): Promise<
    ResponseType<{}> 
> => {

    const request = await axios.get(`/v1/student/get-student-to-excel`);
    console.log(request)
    
    return request.data;
};
