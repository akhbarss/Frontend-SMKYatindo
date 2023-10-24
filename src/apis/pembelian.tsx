import { ResponseType } from "../types/global";
import axios from "../utils/axios";

export const chooseBatch = async (
  batchId: number
): Promise<ResponseType<any>> => {
  const response = await axios.put("/v1/student/choose-batch", {
    batch_id: batchId,
  });
  return response.data;
};
