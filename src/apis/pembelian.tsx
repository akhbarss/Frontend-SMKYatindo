import { ResponseType } from "../types/global";
import axios from "../utils/axios";
import { GetBatchOffsetType } from "../types/batch";
import { StudentStagingOffset } from "../types/student";

export const chooseBatch = async (
  batchId: number
): Promise<ResponseType<any>> => {
  const response = await axios.put("/v1/student/choose-batch", {
    batch_id: batchId,
  });
  return response.data;
};

export const getLastoffset = async (
  type: "PEMBELIAN" | "PENGEMBALIAN"
): Promise<ResponseType<GetBatchOffsetType[]>> => {
  const response = await axios.get(
    "/v1/staging/get-student-offset?type=" + type
  );
  return response.data;
};

export const getOffsetStatus = async (
  stagingId: number
): Promise<ResponseType<StudentStagingOffset>> => {
  const response = await axios.get(
    "/v1/student/get-staging-status?stagingId=" + stagingId
  );
  return response.data;
};

export const uploadbuktibayar = async (
  payload: FormData
): Promise<ResponseType<any>> => {
  const response = await axios.post("/v1/student/upload-payment", payload);
  return response.data;
};
