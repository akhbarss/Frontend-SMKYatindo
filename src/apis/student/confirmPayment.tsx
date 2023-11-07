import axios from "../../utils/axios";
import { ResponseType } from "../../types/global";

export type ResConfirmPayment = {
    id: number;
    total: number;
    method: "CASH" | "TRANSFER";
    status: "WAITING_PAYMENT" | "PAYMENT_CONFIRMED";
    path_id: number;
    batch_id: number;
    image: string;
    type: "PEMBELIAN" | "PENGEMBALIAN";
    bank_name: null,
    bank_account: null,
    bank_user: null
};

export type ConfirmPaymentPayload = {
    payment_id: number;
    student_id: number;
}

export const confirmPayment = async (payload: ConfirmPaymentPayload): Promise<
    ResponseType<ResConfirmPayment[]>
> => {
    const { batchId, userId } = payload

    const request = await axios.get(`/v1/student/get-payments?batchId=${batchId}&studentId=${userId}`);
    return request.data;
};
