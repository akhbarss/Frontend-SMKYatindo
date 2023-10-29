import { BaseBatch } from "./batch";
import { Lookup } from "./lookup";

export type Student = {
  id: number;
  nisn?: string;
  name: string;
  phone: string;
  surname: string;
  gender: string;
  religion: string;
  birth_place: string;
  birth_date: string;
  address: "";
  province: null;
  city: null;
  district: null;
  sub_district: null;
  postal_code: null;
  school_origin: "Yatindo";
  profile_picture: null;
  status: null;
  major: null;
  staging_id: null;
  path_id: null;
  batch_id: null;
  registrationBatch: null;
  userId: {
    id: 1;
    username: "088210891684";
    role: "USER";
    role_id: {
      id: 1;
      role_name: "User";
      rolesMenus: [];
    };
    joinAt: "24 October 2023 23:22";
    student: 1;
  };
  registrationPaths: null;
};

export type Staging = {
  id: number;
  created_at: string;
  updated_at: string;
  path_id: number;
  remark: string;
  type: string;
  status: string;
  staging_id: number;
  registrationBatch: BaseBatch;
};

type PaymentStatus = {
  batch_id: number;
  id: number;
  image: string;
  method: string;
  path_id: number;
  status: string;
  total: number;
  type: string;
};

export type StudentStagingOffset = {
  offset_data?: Staging;
  major?: Lookup;
  payment_status?: PaymentStatus;
  current_state?: Staging;
  registration_batch: BaseBatch;
};
