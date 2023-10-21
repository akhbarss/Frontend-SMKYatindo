export type JWT = {
  sub: string
}

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

export type TipeJalurPendafaran = "pembelian" | "pengembalian";

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
