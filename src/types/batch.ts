export type GetBatchOffsetType = {
  name: string;
  id: number;
  index: number;
  is_done: number;
  grade: "SMP" | "SMK";
};

export type BaseBatch = {
  id: number;
  name: string;
  index: number;
  max_quota: number;
  start_date: number;
  end_date: number;
  bank_name: string;
  bank_user: string;
  price: number;
  bank_account: string;
  isOpen: boolean;
};
