import { JalurPendaftaranPPDB } from "../../types/global";



export type TypeDataJalurPendaftaranPembelian = [
  {
    id: number,
    tipe: string,
    nama_jalur_pendaftaran: string
    waktu_dibuka: string
    waktu_ditutup: string
    biaya_pendaftaran: number
    informasi_umum: {
      keterangan: [
        {
          id: number
          nama_keterangan: string
          deskripsi_keterangan: string
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
          //   waktu_dibuka: "2023-10-11T10:00:00",
          //   waktu_ditutup: "2023-11-11T10:00:00",
          //   lokasi_test: "",
          //   kkm: 70,
          // },
          // {
          //   id: 2,
          //   nama_ujian_penerimaan: "Test Akademik Gel.2",
          //   media_test: "test-online",
          //   keterangan: "tes online",
          //   waktu_dibuka: "2023-10-11T10:00:00",
          //   waktu_ditutup: "2023-11-11T10:00:00",
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
            waktu_dibuka: "2023-10-11T10:00:00",
            waktu_ditutup: "2023-11-11T10:00:00",
          },
        ],
      },
    ],  
  }
]

export const dataJalurPendaftaranPembelian = [
  {
    id: 1,
    tipe: "pembelian",
    nama_jalur_pendaftaran: "PEMBELIAN FORMULIR",
    waktu_dibuka: "2023-10-11T10:00:00",
    waktu_ditutup: "2023-10-12T10:00:00",
    biaya_pendaftaran: 100.000,
    informasi_umum: {
      keterangan: [
        {
          id: 1,
          nama_keterangan: "",
          deskripsi_keterangan: ``,
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
          //   waktu_dibuka: "2023-10-11T10:00:00",
          //   waktu_ditutup: "2023-11-11T10:00:00",
          //   lokasi_test: "",
          //   kkm: 70,
          // },
          // {
          //   id: 2,
          //   nama_ujian_penerimaan: "Test Akademik Gel.2",
          //   media_test: "test-online",
          //   keterangan: "tes online",
          //   waktu_dibuka: "2023-10-11T10:00:00",
          //   waktu_ditutup: "2023-11-11T10:00:00",
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
            waktu_dibuka: "2023-10-11T10:00:00",
            waktu_ditutup: "2023-11-11T10:00:00",
          },
        ],
      },
    ],
  },
];

export const dataJalurPendaftaran: JalurPendaftaranPPDB[] = [
  {
    id: 1,
    tipe: "pembelian",
    nama_jalur_pendaftaran: "PEMBELIAN FORMULIR",
    waktu_dibuka: "2023-10-11T10:00:00",
    waktu_ditutup: "2023-10-28T10:00:00",
    biaya_pendaftaran: 1,
    informasi_umum: {
      keterangan: [
        {
          id: 1,
          nama_keterangan: "Test",
          deskripsi_keterangan: `Test`,
        },
        {
          id: 2,
          nama_keterangan: "Test",
          deskripsi_keterangan: `Test`,
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
          //   waktu_dibuka: "2023-10-11T10:00:00",
          //   waktu_ditutup: "2023-11-11T10:00:00",
          //   lokasi_test: "",
          //   kkm: 70,
          // },
          // {
          //   id: 2,
          //   nama_ujian_penerimaan: "Test Akademik Gel.2",
          //   media_test: "test-online",
          //   keterangan: "tes online",
          //   waktu_dibuka: "2023-10-11T10:00:00",
          //   waktu_ditutup: "2023-11-11T10:00:00",
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
            waktu_dibuka: "2023-10-11T10:00:00",
            waktu_ditutup: "2023-11-11T10:00:00",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    tipe: "pengembalian",
    nama_jalur_pendaftaran: "PENGEMBALIAN FORMULIR REGULER",
    waktu_dibuka: "2023-10-11T10:00:00",
    waktu_ditutup: "2024-01-01T10:00:00",
    biaya_pendaftaran: 1,
    informasi_umum: {
      keterangan: [
        {
          id: 1,
          nama_keterangan: "pengembalian",
          deskripsi_keterangan: "pengembalian",
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
            waktu_dibuka: "2023-10-11T10:00:00",
            waktu_ditutup: "2023-11-11T10:00:00",
            lokasi_test: "",
            kkm: 70,
          },
          {
            id: 2,
            nama_ujian_penerimaan: "Test Ujian Akademik Gel.1",
            media_test: "test-online",
            keterangan: "tes online",
            waktu_dibuka: "2023-10-11T10:00:00",
            waktu_ditutup: "2023-11-11T10:00:00",
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
            waktu_dibuka: "2023-10-11T10:00:00",
            waktu_ditutup: "2023-11-11T10:00:00",
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
            waktu_dibuka: "2023-10-11T10:00:00",
            waktu_ditutup: "2023-11-11T10:00:00",
            lokasi_test: "",
            kkm: 70,
          },
          {
            id: 2,
            nama_ujian_penerimaan: "Test Ujian Akademik Gel.2",
            media_test: "test-online",
            keterangan: "tes online",
            waktu_dibuka: "2023-10-11T10:00:00",
            waktu_ditutup: "2023-11-11T10:00:00",
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
            waktu_dibuka: "2023-10-11T10:00:00",
            waktu_ditutup: "2023-11-11T10:00:00",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    tipe: "pengembalian",
    nama_jalur_pendaftaran: "PENGEMBALIAN FORMULIR PRESTASI",
    waktu_dibuka: "2023-10-11T10:00:00",
    waktu_ditutup: "2023-11-11T10:00:00",
    biaya_pendaftaran: 1,
    informasi_umum: {
      keterangan: [
        // {
        //   id: 1,
        //   nama_keterangan: "",
        //   deskripsi_keterangan: "",
        // },
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
            waktu_dibuka: "2023-10-11T10:00:00",
            waktu_ditutup: "2023-11-11T10:00:00",
            lokasi_test: "",
            kkm: 70,
          },
          {
            id: 2,
            nama_ujian_penerimaan: "Test Akademik Gel.2",
            media_test: "test-online",
            keterangan: "tes online",
            waktu_dibuka: "2023-10-11T10:00:00",
            waktu_ditutup: "2023-11-11T10:00:00",
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
            waktu_dibuka: "2023-10-11T10:00:00",
            waktu_ditutup: "2023-11-11T10:00:00",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    tipe: "pengembalian",
    nama_jalur_pendaftaran: "PENGEMBALIAN FORMULIR DISKON",
    waktu_dibuka: "2023-10-11T10:00:00",
    waktu_ditutup: "2023-10-19T10:00:00",
    biaya_pendaftaran: 1,
    informasi_umum: {
      keterangan: [
        // {
        //   id: 1,
        //   nama_keterangan: "",
        //   deskripsi_keterangan: "",
        // },
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
            waktu_dibuka: "2023-10-11T10:00:00",
            waktu_ditutup: "2023-11-11T10:00:00",
            lokasi_test: "",
            kkm: 70,
          },
          {
            id: 2,
            nama_ujian_penerimaan: "Test Akademik Gel.2",
            media_test: "test-online",
            keterangan: "tes online",
            waktu_dibuka: "2023-10-11T10:00:00",
            waktu_ditutup: "2023-11-11T10:00:00",
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
            waktu_dibuka: "2023-10-11T10:00:00",
            waktu_ditutup: "2023-11-11T10:00:00",
          },
        ],
      },
    ],
  },
];
