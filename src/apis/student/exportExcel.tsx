import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";


export const exportExcel = async (batchId: string): Promise<
    ResponseType<any>
> => {

    // const request = await axios.post(`/v1/student/get-student-to-excel?batchId=` + batchId);
    // const request = await axios.get(`/public/generate-excel`, {
    //     headers: {
    //         "Content-Type": "application/octet-stream"
    //     }
    // });

    // axios.post("/public/generate-excel", {
    axios.post(`/v1/student/get-student-to-excel?batchId=` + batchId, {
        responseType: 'blob', // Menangani tipe respons sebagai blob (file),
        
    })
        .then(response => {

            const contentDisposition = response.headers['Content-Disposition'];
            console.log(contentDisposition)
            
            // console.log(response)
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'student_data.xls');
            document.body.appendChild(link);
            link.click();
        })
        .catch(error => {
            console.error('Gagal mengunduh file Excel:', error);
        });

    return ;
};
