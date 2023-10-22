import { Divider, Stack, Tabs, TabsProps } from "@mantine/core";
import { useState } from "react";
import { FaAddressCard, FaRegFlag } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { RiGitMergeFill } from "react-icons/ri";
import Page from "../../../../components/Page";
import TabList from "../../../../components/ppdb/siswa/tabList";
import TabsContentPengembalian from "../../../../components/ppdb/siswa/tabsContentPengembalian";
import { JalurPendaftaranPPDB } from "../../../../types/global";


const card = [
  {
    label: "Pilih Jalur PPDB",
    icon: RiGitMergeFill,
  },
  {
    label: "Transaksi Pengembalian",
    icon: FaMoneyCheckDollar,
  },
  {
    label: "Isi Biodata",
    icon: IoPerson,
  },
  {
    label: "Pilih Jurusan",
    icon: FaRegFlag,
  },
  {
    label: "Cetak Kartu Peserta",
    icon: FaAddressCard,
  },
];

const PengembalianSiswaPPDB = () => {
  function StyledTabs(props: TabsProps) {
    return (
      <Tabs
        unstyled
        styles={(theme) => ({
          tab: {
            ...theme.fn.focusStyles(),
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
            color:
              theme.colorScheme === "dark" ? "white" : theme.colors.gray[9],
            border: "none",
            boxShadow: "0 10px 20px -10px rgba(0,0,0,0.2)",
            // padding: `${theme.spacing.xs} ${theme.spacing.md}`,
            cursor: "pointer",
            fontSize: theme.fontSizes.sm,
            borderRadius: "5px",
            // gap: "1rem",

            "&:disabled": {
              // opacity: 0.5,
              cursor: "not-allowed",
              color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.colors.gray[8],
              backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4],
            },

            "&[data-active]": {
              background: "linear-gradient(45deg, #4c6ef5 0%, #15aabf 100%)",
              borderColor: theme.colors.blue[7],
              color: theme.white,
              boxShadow: "0 10px 20px -10px rgba(0,0,0,0.5)",
            },
          },

          tabsList: {
            overflowX: "auto",
          },
          panel: {
            // width: "100px"
          },
        })}
        {...props}
      />
    );
  }


  const [activeTabIndex, setActiveTabIndex] = useState(1);

  // gelombang
  const [focus, setFocus] = useState("");
  const [pilihanGelombang, setPilihanGelombang] =
    useState<JalurPendaftaranPPDB | null>(null);

  // pemvbelian formulir
  const [konfirmasiPembelian, setKonfirmasiPembelian] = useState(false);
  const [konfirmasiPembayaran, setKonfirmasiPembayaran] = useState(false);

  const [load, setLoad] = useState(false);

  return (
    <Page title={"Pengembalian"}>
      <Stack className={"style-box"}>
        <StyledTabs defaultValue={card[activeTabIndex - 1].label}>

          <TabList activeTabIndex={activeTabIndex} card={card} />

          <Divider mt={20} />

          <TabsContentPengembalian
            activeTabIndex={activeTabIndex}
            focus={focus}
            setFocus={setFocus}
            pilihanGelombang={pilihanGelombang}
            setPilihanGelombang={setPilihanGelombang}
            setActiveTabIndex={setActiveTabIndex}
            konfirmasiPembelian={konfirmasiPembelian}
            setKonfirmasiPembelian={setKonfirmasiPembelian}
            konfirmasiPembayaran={konfirmasiPembayaran}
            setKonfirmasiPembayaran={setKonfirmasiPembayaran}
            setLoad={setLoad}
            load={load}
          />
        </StyledTabs>
      </Stack>
    </Page>
  );
};

export default PengembalianSiswaPPDB;
