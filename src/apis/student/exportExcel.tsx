import axios from "axios";
import { ResponseType } from "../../types/global";
import { BASE_URL } from "../../utils/axios";

export const exportExcel = async (batchId: string): Promise<
    ResponseType<any>
> => {
    axios.get(BASE_URL + "/public/get-student-to-excel?batchId=" + batchId, {
        responseType: 'blob', // Menangani tipe 
    })
        .then(response => {

            const contentDisposition = response.headers['Content-Disposition'];

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

    return;
};
