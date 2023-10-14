import { JalurPendaftaranPPDB } from "../../types/global";

export const dataJalurPendaftaran: JalurPendaftaranPPDB[] = [
  {
    id: 1,
    tipe: "pembelian",
    nama_jalur_pendaftaran: "PEMBELIAN FORMULIR",
    waktu_dibuka: "2022-11-01 06:00:00",
    waktu_ditutup: "2023-08-31 15:00:00",
    biaya_pendaftaran: 1,
    informasi_umum: {
      keterangan: [
        {
          id: 1,
          nama_keterangan: "",
          deskripsi_keterangan: "",
        },
      ],
      biaya_tambahan: [
        // {
        //   id: 1,
        //   judul_biaya: "Biaya Uang Gedung",
        //   biaya: [
        //     {
        //       id: 1,
        //       nama_biaya_tambahan: "Gelombang 1",
        //       jumlah_biaya_tambahan: 1
        //     },
        //     {
        //       id: 2,
        //       nama_biaya_tambahan: "Gelombang 2",
        //       jumlah_biaya_tambahan: 1
        //     },
        //   ]
        // }
      ],
    },
    gelombang: [
      {
        id: 1,
        nama_gelombang: "PEMBELIAN FORMULIR",
        jumlah_penerimaan: 200,
        waktu_oendaftaran_dibuka: "1 November 2023",
        waktu_oendaftaran_ditutup: "30 November 2023",
        nama_bank: "BCA",
        nomor_rekening: 123456789,
        nama_pemilik_rekening: "",
        biaya_pendaftaran: 1,
        ujian_penerimaan: [
          // {
          //   id: 1,
          //   nama_ujian_penerimaan: "Test Akademik Gel.1",
          //   media_test: "test-online",
          //   keterangan: "tes online",
          //   waktu_dibuka: "1 Desember 2023 00:00",
          //   waktu_ditutup: "1 Desember 2023 23:59",
          //   lokasi_test: "",
          //   kkm: 70,
          // },
          // {
          //   id: 2,
          //   nama_ujian_penerimaan: "Test Akademik Gel.2",
          //   media_test: "test-online",
          //   keterangan: "tes online",
          //   waktu_dibuka: "1 Desember 2023 00:00",
          //   waktu_ditutup: "1 Desember 2023 23:59",
          //   lokasi_test: "",
          //   kkm: 70,
          // },
        ],
        pengumuman: [
          {
            nama_pengumuman: "",
            tanggal_pengumuman: "",
          },
        ],
        kegiatan: [
          {
            nama_kegiatan: "",
            waktu_dibuka: "",
            waktu_ditutup: "",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    tipe: "pengembalian",
    nama_jalur_pendaftaran: "PENGEMBALIAN FORMULIR REGULER",
    waktu_dibuka: "2022-11-01 06:00:00",
    waktu_ditutup: "2023-08-31 15:00:00",
    biaya_pendaftaran: 1,
    informasi_umum: {
      keterangan: [
        {
          id: 1,
          nama_keterangan: "",
          deskripsi_keterangan: "",
        },
      ],
      biaya_tambahan: [
        {
          id: 1,
          judul_biaya: "Biaya Uang Gedung",
          biaya: [
            {
              id: 1,
              nama_biaya_tambahan: "Gelombang 1",
              jumlah_biaya_tambahan: 2950000,
            },
            {
              id: 2,
              nama_biaya_tambahan: "Gelombang 2",
              jumlah_biaya_tambahan: 3250000,
            },
          ],
        },
      ],
    },
    gelombang: [
      {
        id: 1,
        nama_gelombang: "PENGEMBALIAN FORMULIR REGULER GEL.1",
        jumlah_penerimaan: 100,
        waktu_oendaftaran_dibuka: "1 November 2023",
        waktu_oendaftaran_ditutup: "31 Mei 2024",
        nama_bank: "BCA",
        nomor_rekening: 123456789,
        nama_pemilik_rekening: "",
        biaya_pendaftaran: 1,
        ujian_penerimaan: [
          {
            id: 1,
            nama_ujian_penerimaan: "Test Akademik Gel.1",
            media_test: "test-online",
            keterangan: "tes online",
            waktu_dibuka: "21 Mei 2023 00:00",
            waktu_ditutup: "21 Mei 2023 23:59",
            lokasi_test: "",
            kkm: 70,
          },
          {
            id: 2,
            nama_ujian_penerimaan: "Test Ujian Akademik Gel.1",
            media_test: "test-online",
            keterangan: "tes online",
            waktu_dibuka: "27 Mei 2023 00:00",
            waktu_ditutup: "27 Mei 2023 23:59",
            lokasi_test: "",
            kkm: 70,
          },
        ],
        pengumuman: [
          {
            nama_pengumuman: "",
            tanggal_pengumuman: "",
          },
        ],
        kegiatan: [
          {
            nama_kegiatan: "",
            waktu_dibuka: "",
            waktu_ditutup: "",
          },
        ],
      },
      {
        id: 2,
        nama_gelombang: "PENGEMBALIAN FORMULIR REGULER GEL.2",
        jumlah_penerimaan: 240,
        waktu_oendaftaran_dibuka: "1 Juni 2024",
        waktu_oendaftaran_ditutup: "15 Juli 2024",
        nama_bank: "BCA",
        nomor_rekening: 123456789,
        nama_pemilik_rekening: "",
        biaya_pendaftaran: 1,
        ujian_penerimaan: [
          {
            id: 1,
            nama_ujian_penerimaan: "Test Akademik Gel.2",
            media_test: "test-online",
            keterangan: "tes online",
            waktu_dibuka: "12 Juli 2024 00:00",
            waktu_ditutup: "12 Juli 2024 23:59",
            lokasi_test: "",
            kkm: 70,
          },
          {
            id: 2,
            nama_ujian_penerimaan: "Test Ujian Akademik Gel.2",
            media_test: "test-online",
            keterangan: "tes online",
            waktu_dibuka: "13 Juli 2024 00:00",
            waktu_ditutup: "13 Juli 2024 23:59",
            lokasi_test: "",
            kkm: 70,
          },
        ],
        pengumuman: [
          {
            nama_pengumuman: "",
            tanggal_pengumuman: "",
          },
        ],
        kegiatan: [
          {
            nama_kegiatan: "",
            waktu_dibuka: "",
            waktu_ditutup: "",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    tipe: "pengembalian",
    nama_jalur_pendaftaran: "PENGEMBALIAN FORMULIR PRESTASI",
    waktu_dibuka: "2022-11-01 06:00:00",
    waktu_ditutup: "2023-08-31 15:00:00",
    biaya_pendaftaran: 1,
    informasi_umum: {
      keterangan: [
        {
          id: 1,
          nama_keterangan: "",
          deskripsi_keterangan: "",
        },
      ],
      biaya_tambahan: [
        // {
        //   id: 1,
        //   judul_biaya: "Biaya Uang Gedung",
        //   biaya: [
        //     {
        //       id: 1,
        //       nama_biaya_tambahan: "Gelombang 1",
        //       jumlah_biaya_tambahan: 1
        //     },
        //     {
        //       id: 2,
        //       nama_biaya_tambahan: "Gelombang 2",
        //       jumlah_biaya_tambahan: 1
        //     },
        //   ]
        // }
      ],
    },
    gelombang: [
      {
        id: 1,
        nama_gelombang: "PENGEMBALIAN FORMULIR REGULER GEL.1",
        jumlah_penerimaan: 200,
        waktu_oendaftaran_dibuka: "1 November 2023",
        waktu_oendaftaran_ditutup: "30 November 2023",
        nama_bank: "BCA",
        nomor_rekening: 123456789,
        nama_pemilik_rekening: "",
        biaya_pendaftaran: 1,
        ujian_penerimaan: [
          {
            id: 1,
            nama_ujian_penerimaan: "Test Akademik Gel.1",
            media_test: "test-online",
            keterangan: "tes online",
            waktu_dibuka: "1 Desember 2023 00:00",
            waktu_ditutup: "1 Desember 2023 23:59",
            lokasi_test: "",
            kkm: 70,
          },
          {
            id: 2,
            nama_ujian_penerimaan: "Test Akademik Gel.2",
            media_test: "test-online",
            keterangan: "tes online",
            waktu_dibuka: "1 Desember 2023 00:00",
            waktu_ditutup: "1 Desember 2023 23:59",
            lokasi_test: "",
            kkm: 70,
          },
        ],
        pengumuman: [
          {
            nama_pengumuman: "",
            tanggal_pengumuman: "",
          },
        ],
        kegiatan: [
          {
            nama_kegiatan: "",
            waktu_dibuka: "",
            waktu_ditutup: "",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    tipe: "pengembalian",
    nama_jalur_pendaftaran: "PENGEMBALIAN FORMULIR DISKON",
    waktu_dibuka: "2022-11-01 06:00:00",
    waktu_ditutup: "2023-08-31 15:00:00",
    biaya_pendaftaran: 1,
    informasi_umum: {
      keterangan: [
        {
          id: 1,
          nama_keterangan: "",
          deskripsi_keterangan: "",
        },
      ],
      biaya_tambahan: [
        // {
        //   id: 1,
        //   judul_biaya: "Biaya Uang Gedung",
        //   biaya: [
        //     {
        //       id: 1,
        //       nama_biaya_tambahan: "Gelombang 1",
        //       jumlah_biaya_tambahan: 1
        //     },
        //     {
        //       id: 2,
        //       nama_biaya_tambahan: "Gelombang 2",
        //       jumlah_biaya_tambahan: 1
        //     },
        //   ]
        // }
      ],
    },
    gelombang: [
      {
        id: 1,
        nama_gelombang: "PENGEMBALIAN FORMULIR REGULER GEL.1",
        jumlah_penerimaan: 200,
        waktu_oendaftaran_dibuka: "1 November 2023",
        waktu_oendaftaran_ditutup: "30 November 2023",
        nama_bank: "BCA",
        nomor_rekening: 123456789,
        nama_pemilik_rekening: "",
        biaya_pendaftaran: 1,
        ujian_penerimaan: [
          {
            id: 1,
            nama_ujian_penerimaan: "Test Akademik Gel.1",
            media_test: "test-online",
            keterangan: "tes online",
            waktu_dibuka: "1 Desember 2023 00:00",
            waktu_ditutup: "1 Desember 2023 23:59",
            lokasi_test: "",
            kkm: 70,
          },
          {
            id: 2,
            nama_ujian_penerimaan: "Test Akademik Gel.2",
            media_test: "test-online",
            keterangan: "tes online",
            waktu_dibuka: "1 Desember 2023 00:00",
            waktu_ditutup: "1 Desember 2023 23:59",
            lokasi_test: "",
            kkm: 70,
          },
        ],
        pengumuman: [
          {
            nama_pengumuman: "",
            tanggal_pengumuman: "",
          },
        ],
        kegiatan: [
          {
            nama_kegiatan: "",
            waktu_dibuka: "",
            waktu_ditutup: "",
          },
        ],
      },
    ],
  },
];
