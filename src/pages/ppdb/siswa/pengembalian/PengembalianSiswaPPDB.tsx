import { Divider, Skeleton, Stack, Tabs, TabsProps } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { FaAddressCard, FaRegFlag } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { RiGitMergeFill } from "react-icons/ri";
import Page from "../../../../components/Page";
import TabList from "../../../../components/ppdb/siswa/tabList";
import PageLabel from "../../../../components/PageLabel";
import { getLastoffset } from "../../../../apis/pembelian";
import ResponseError from "../../../../utils/ResponseError";
import useFilter from "../../../../utils/useFilter";
import { useLocation, useNavigate } from "react-router-dom";
import generateQueryparam from "../../../../utils/generateQueryParam";
import { useQuery } from "@tanstack/react-query";
import StepGelombang from "../../../../components/ppdb/siswa/StepGelombang";
import StepPembayaran from "../../../../components/ppdb/siswa/StepPembayaran";
import StepCetakKartu from "../../../../components/ppdb/siswa/StepCetakKartu";
import { Toaster } from "react-hot-toast";
import StepBiodata from "../../../../components/ppdb/siswa/StepBiodata";

function StyledTabs(props: TabsProps) {
  return (
    <Tabs
      unstyled
      styles={(theme) => ({
        tab: {
          ...theme.fn.focusStyles(),
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
          color: theme.colorScheme === "dark" ? "white" : theme.colors.gray[9],
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
            color:
              theme.colorScheme === "dark"
                ? theme.colors.gray[4]
                : theme.colors.gray[8],
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[4],
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

const card = [
  {
    index: 1,
    label: "Pilih Jalur PPDB",
    icon: RiGitMergeFill,
    content: <StepGelombang type={"PENGEMBALIAN"} />,
  },
  {
    index: 2,
    label: "Transaksi Pengembalian",
    icon: FaMoneyCheckDollar,
    content: <StepPembayaran type={"PENGEMBALIAN"} />,
  },
  {
    index: 3,
    label: "Isi Biodata",
    icon: IoPerson,
    content: <StepBiodata type={"PENGEMBALIAN"} />,
  },
  {
    index: 4,
    label: "Isi Data Prestasi",
    icon: FaRegFlag,
    content: <div>Isi biodata</div>,
  },
  {
    index: 5,
    label: "Cetak Kartu Peserta",
    icon: FaAddressCard,
    content: <StepCetakKartu type={"PENGEMBALIAN"} />,
  },
];

const PengembalianSiswaPPDB = () => {
  const [filter, setFilter] = useState<{ step: number; stagingId?: number }>({
    step: 1,
    stagingId: null,
  });

  const {
    data: stagings,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["get_last_offset_batch"],
    queryFn: () => getLastoffset("PENGEMBALIAN"),
    staleTime: 0,
  });

  const queryFilter = useFilter(filter);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setFilter(
      queryFilter?.initialValues as { step: number; stagingId?: number }
    );
  }, [queryFilter]);

  useEffect(() => {
    if (isSuccess) {
      const doneBatches = stagings.data.filter((batch) => batch.is_done === 1);
      if (doneBatches.length > 0) {
        // is last
        if (
          stagings.data[stagings.data.length - 1].index !==
          doneBatches[doneBatches.length - 1].index
        ) {
          const index = doneBatches[doneBatches.length - 1].index + 1;
          const toFilter = {
            step: index,
            stagingId: stagings.data.find((batch) => batch.index === index).id,
          };

          setFilter(toFilter);
          navigate(`${location.pathname}?${generateQueryparam(toFilter)}`);
        }
      } else {
        const toFilter = {
          step: 1,
          stagingId: stagings.data.find((batch) => batch.index === 1).id,
        };
        setFilter(toFilter);
        navigate(`${location.pathname}?${generateQueryparam(toFilter)}`);
      }
    }
  }, [stagings, isSuccess]);

  const toStep = (index: string) => {
    const toFilter = {
      step: +index,
      stagingId: stagings.data.find((batch) => batch.index === +index).id,
    };

    navigate(`${location.pathname}?${generateQueryparam(toFilter)}`);
  };

  return (
    <Page title={"Pengembalian"}>
      <PageLabel label={"Pengembalian"} />
      <Stack className={"style-box"}>
        <StyledTabs value={`${filter.step}`} onTabChange={toStep}>
          {isLoading && <Skeleton width={"100%"} />}
          {isSuccess && (
            <TabList
              activeTabIndex={+filter.step}
              card={stagings.data.map((staging, index) => {
                return {
                  label: staging.name,
                  index: staging.index,
                  icon: card[index]?.icon,
                  is_done: staging.is_done === 1,
                };
              })}
            />
          )}
          <Divider my={20} />
          {card.find((c) => c.index === filter.step)?.content}
        </StyledTabs>
      </Stack>
      <Toaster position="top-center" reverseOrder={false} />
    </Page>
  );
};

export default PengembalianSiswaPPDB;
