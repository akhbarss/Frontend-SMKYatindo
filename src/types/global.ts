import { TabsProps } from "@mantine/core";

export type JWT = {
  sub: string;
};

export interface Biaya {
  id: number;
  nama_biaya: string;
  jumlah_biaya: number;
}

export interface BiayaJalurPendaftaran {
  id: number;
  judul_biaya: string;
  biaya: Biaya[];
}

export type TipeJalurPendafaran = "PEMBELIAN" | "PENGEMBALIAN";

export interface JalurPendaftaranPPDB {
  id: number;
  tipe: TipeJalurPendafaran;
  nama_jalur_pendaftaran: string;
  waktu_dibuka: string;
  waktu_ditutup: string;
  biaya_pendaftaran: number;
  // biaya_jalur_pendaftaran: BiayaJalurPendaftaran[]
  informasi_umum: {
    keterangan: {
      id: number;
      nama_keterangan: string;
      deskripsi_keterangan: string;
    }[];
    biaya_tambahan: {
      id: number;
      judul_biaya: string;
      biaya: {
        id: number;
        nama_biaya_tambahan: string;
        jumlah_biaya_tambahan: number;
      }[];
    }[];
  };
  gelombang: {
    id: number;
    nama_gelombang: string;
    jumlah_penerimaan: number;
    waktu_oendaftaran_dibuka: string;
    waktu_oendaftaran_ditutup: string;
    nama_bank: string;
    nomor_rekening: number;
    nama_pemilik_rekening: string;
    biaya_pendaftaran: number;
    ujian_penerimaan: {
      id: number;
      nama_ujian_penerimaan: string;
      media_test: "bertemu-langsung" | "test-online";
      keterangan: string;
      waktu_dibuka: string;
      waktu_ditutup: string;
      lokasi_test: string;
      kkm: number;
    }[];
    pengumuman: {
      nama_pengumuman: string;
      tanggal_pengumuman: string;
    }[];
    kegiatan: {
      nama_kegiatan: string;
      waktu_dibuka: string;
      waktu_ditutup: string;
    }[];
  }[];
}
[];

export type Step = {
  type?: "PEMBELIAN" | "PENGEMBALIAN";
};

export interface ResponseType<T> {
  data: T;
  timestamps: string;
  statusCode: number;
}

export interface RefreshToken {
  refresh_token: string;
  access_token: string;
}

export interface AccessToken {
  token: string;
}

export type Status =
  | "REGISTERED"
  | "FILE_SELECTION"
  | "WAITING_PAYMENT"
  | "WAITING_ANNOUNCEMENT"
  | "CHOOSING_FIRST_MAJORS"
  | "CHOOSING_FIX_MAJOR"
  | "FILLING_BIO"
  | "FILE_CONFIRMED"
  | "PAYMENT_CONFIRMED"
  | "PRINT_CARD_PURCHASED"
  | "PRINT_CARD_RETURNING"
  | "SELECTION_PASSED"
  | "SELECTION_NOT_PASSED";

export type TGRegistrationBatch = {
  id: number;
  name: string;
  index: number;
  max_quota: number;
  batchCode: string;
  start_date: number;
  end_date: number;
  bank_name: string;
  bank_user: string;
  price: number;
  bank_account: string;
};

export type TGGeneralInformations = {
  id: number;
  name: string;
  description: string;
};

export type TGPriceDetail = {
  id: number;
  subTitle: string;
  price: number;
};

export type TGAdditionalPrices = {
  id: number;
  namePrice: string;
  priceDetails: TGPriceDetail[];
};

export type TGRegistrationPath = {
  id: number;
  name: string;
  grade: "SMP" | "SMK";
  registrationBatches: TGRegistrationBatch[];
  generalInformations: TGGeneralInformations[];
  additionalPrices: TGAdditionalPrices[];
};

export type TGlobalRegistrationPath = TGRegistrationPath[];

export interface StyledTabsProps extends TabsProps {
  grade: "SMP" | "SMK";
}
