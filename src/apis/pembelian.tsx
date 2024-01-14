import { ResponseType } from "../types/global";
import axios from "../utils/axios";
import { GetBatchOffsetType } from "../types/batch";
import { Staging, StudentStagingOffset } from "../types/student";

export const chooseBatch = async ({
  batchId,
  type,
  grade
}: {
  batchId: number;
  type: "PEMBELIAN" | "PENGEMBALIAN";
  grade: "SMP" | "SMK"
}): Promise<ResponseType<any>> => {
  const response = await axios.put("/v1/student/choose-batch", {
    batch_id: batchId,
    type,
    grade
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
  stagingId: number,
  type: "PEMBELIAN" | "PENGEMBALIAN"
): Promise<ResponseType<StudentStagingOffset>> => {
  const response = await axios.get(
    "/v1/student/get-staging-status?stagingId=" + stagingId + "&type=" + type
  );
  return response.data;
};

export const chooseMajor = async ({
  major,
  type,
  stagingId,
}: {
  major: string;
  type: "PEMBELIAN" | "PENGEMBALIAN";
  stagingId: number;
}): Promise<ResponseType<Staging>> => {
  const request = await axios.put("/v1/student/choose-major", {
    major,
    type,
    stagingId,
  });

  return request.data;
};

export const printCard = async ({
  type,
  stagingId,
}: {
  type: "PEMBELIAN" | "PENGEMBALIAN";
  stagingId: number;
}): Promise<ResponseType<Staging>> => {
  const request = await axios.put("/v1/student/print-card", {
    type,
    stagingId,
  });

  return request.data;
};

export const uploadbuktibayar = async (
  payload: FormData
): Promise<ResponseType<any>> => {
  const response = await axios.post("/v1/student/upload-payment", payload);
  return response.data;
};
