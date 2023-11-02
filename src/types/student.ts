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
  registrationPaths: null;

  dad_name: string;
  dad_phone: string;
  dad_job: string;
  dad_address: string;

  mother_name: string;
  mother_phone: string;
  mother_job: string;
  mother_address: string;
  family_card: string;
  birth_card: string;
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
  student?: Student;
  payment_status?: PaymentStatus;
  current_state?: Staging;
  registration_batch: BaseBatch;
};
