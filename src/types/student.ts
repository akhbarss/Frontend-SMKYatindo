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
  birth_date: string | Date;
  address: "";
  province: null;
  city: null;
  district: null;
  sub_district: null;
  postal_code: null;
  school_origin: "Yatindo";
  profile_picture?: File[] | string;
  status: null;
  major: string;
  staging_id: null;
  pathName: string;
  path_id: null;
  batch_id: null;
  registrationBatch: null;
  registrationPaths: null;
  grade: "SMP" | "SMK";
  formulirId: string;
  dad_name: string;
  dad_phone: string;
  dad_job: string;
  dad_address: string;

  isPurchasingDone: boolean |null;
  isReturningDone : boolean |null;

  mother_name: string;
  mother_phone: string;
  mother_job: string;
  mother_address: string;
  family_card: File[] | string;
  birth_card: File[] | string;
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
  majors: string;
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
