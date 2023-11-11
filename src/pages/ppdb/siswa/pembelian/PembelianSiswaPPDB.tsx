import { Divider, ScrollArea, Skeleton, Stack, Tabs, TabsProps } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaAddressCard, FaRegFlag } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { RiGitMergeFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { getLastoffset } from "../../../../apis/pembelian";
import Page from "../../../../components/Page";
import PageLabel from "../../../../components/PageLabel";
import StepCetakKartu from "../../../../components/ppdb/siswa/StepCetakKartu";
import StepGelombang from "../../../../components/ppdb/siswa/StepGelombang";
import StepPembayaran from "../../../../components/ppdb/siswa/StepPembayaran";
import StepPilihJurusan from "../../../../components/ppdb/siswa/StepPilihJurusan";
import TabList from "../../../../components/ppdb/siswa/tabList";
import generateQueryparam from "../../../../utils/generateQueryParam";
import useFilter from "../../../../utils/useFilter";

const StyledTabs = (props: TabsProps) => {
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
          cursor: "pointer",
          fontSize: theme.fontSizes.sm,
          borderRadius: "5px",

          "&:disabled": {
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
          // overflowX: "auto",
          // marginBlock: "4rem"
        },
      })}
      {...props}
    />
  );
};

const card = [
  {
    index: 1,
    label: "Pilih Gelombang PPDB",
    icon: RiGitMergeFill,
    content: <StepGelombang type="PEMBELIAN" />,
  },
  {
    index: 2,
    label: "Transaksi Pembelian",
    icon: FaMoneyCheckDollar,
    content: <StepPembayaran />,
  },
  {
    index: 3,
    label: "Pilih Jurusan",
    icon: FaRegFlag,
    content: <StepPilihJurusan />,
  },
  {
    index: 4,
    label: "Cetak Kartu Peserta",
    icon: FaAddressCard,
    content: <StepCetakKartu />,
  },
];

const PembelianSiswaPPDB = () => {
  const [filter, setFilter] = useState<{ step: number; stagingId?: number }>({
    step: 1,
    stagingId: null,
  });

  const {
    data: stagings,
    isLoading,
    isSuccess,
    isFetching
  } = useQuery({
    queryKey: ["get_last_offset_batch"],
    queryFn: () => getLastoffset("PEMBELIAN"),
    staleTime: 0,
    notifyOnChangeProps: "all",
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
          toStep(index.toString());
        } else {
          toStep(doneBatches[doneBatches.length - 1].index.toString());
        }
      } else {
        toStep("1");
      }
    }
  }, [stagings, isSuccess]);

  const toStep = (index: string) => {
    const toFilter = {
      step: +index,
      stagingId: stagings.data.find((batch) => batch.index === +index)?.id,
    };
    setFilter(toFilter);
    navigate(`${location.pathname}?${generateQueryparam(toFilter)}`);
  };

  return (
    <Page title={"Pembelian"}>
      <PageLabel label={"Pembelian"} />
      <Stack className={"style-box "}>
        <StyledTabs value={`${filter.step}`} onTabChange={toStep}>
          <>
            {isFetching ? <Skeleton mt={40} width={"100%"} height={200} visible /> : (
              <>
                {isSuccess && (
                  <ScrollArea w={"100%"} display={"flex"} type="always" sx={{ display: 'block' }} offsetScrollbars >
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
                  </ScrollArea>
                )}
              </>
            )}
          </>

          <Divider my={20} />

          {
            isFetching ? <Skeleton mt={40} width={"100%"} height={200} visible /> : (
              <>
                {card.find((c) => c.index === filter.step)?.content}
              </>
            )
          }
        </StyledTabs>
      </Stack>
    </Page>
  );
};

export default PembelianSiswaPPDB;
