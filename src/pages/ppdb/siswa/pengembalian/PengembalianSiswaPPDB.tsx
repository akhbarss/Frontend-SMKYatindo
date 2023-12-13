import { Divider, ScrollArea, Skeleton, Stack, Tabs, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaAddressCard, FaRegFlag } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { RiGitMergeFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "../../../../apis/alur/decodeJWT";
import { getLastoffset } from "../../../../apis/pembelian";
import Page from "../../../../components/Page";
import PageLabel from "../../../../components/PageLabel";
import StepBiodata from "../../../../components/ppdb/siswa/StepBiodata";
import StepCetakKartu from "../../../../components/ppdb/siswa/StepCetakKartu";
import StepGelombang from "../../../../components/ppdb/siswa/StepGelombang";
import StepPembayaran from "../../../../components/ppdb/siswa/StepPembayaran";
import StepPilihJurusan from "../../../../components/ppdb/siswa/StepPilihJurusan";
import TabList from "../../../../components/ppdb/siswa/tabList";
import { StyledTabsProps } from "../../../../types/global";
import generateQueryparam from "../../../../utils/generateQueryParam";
import useFilter from "../../../../utils/useFilter";

function StyledTabs(props: StyledTabsProps) {
  const { grade } = props
  return (
    <Tabs
      unstyled
      styles={(theme) => ({
        tab: {
          ...theme.fn.focusStyles(),
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
          color: theme.colorScheme === "dark" ? "white" : theme.colors.gray[9],
          border: "0.1625rem solid #dee2e6",
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
            background: `linear-gradient(45deg, ${(grade == "SMP" && "#2A166F") || (grade == "SMK" && "#FF6C22")}, ${(grade == "SMP" && "#6548DB") || (grade == "SMK" && "#ff9f22")})`,
            borderColor: "green",
            color: theme.white,
            boxShadow: "0 10px 20px -10px rgba(0,0,0,0.5)",
          },
        },

        tabsList: {
          overflowX: "auto",
        },
      })}
      {...props}
    />
  );
}

const cardSMK = [
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
    label: "Pilih Jurusan",
    icon: FaRegFlag,
    content: <StepPilihJurusan type={"PENGEMBALIAN"} />,
  },
  {
    index: 5,
    label: "Cetak Kartu Peserta",
    icon: FaAddressCard,
    content: <StepCetakKartu type={"PENGEMBALIAN"} />,
  },
];
const cardSMP = [
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
  // {
  //   index: 4,
  //   label: "Pilih Jurusan",
  //   icon: FaRegFlag,
  //   content: <StepPilihJurusan type={"PENGEMBALIAN"} />,
  // },
  {
    index: 4,
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
    isSuccess,
    isFetching
  } = useQuery({
    queryKey: ["get_last_offset_batch"],
    queryFn: () => getLastoffset("PENGEMBALIAN"),
    staleTime: 0,
    notifyOnChangeProps: "all",
  });

  const {
    data: user,
  } = useQuery({
    queryFn: jwtDecode,
    queryKey: ["session"],
  });

  const queryFilter = useFilter(filter);
  const location = useLocation();
  const navigate = useNavigate();
  const grade = user?.data?.student?.grade

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

    navigate(`${location.pathname}?${generateQueryparam(toFilter)}`);
  };

  const stagingCardFilterByGrade = isSuccess && stagings?.data?.filter(staging => staging?.grade === grade)

  return (
    <Page title={"Pengembalian"}>
      <PageLabel label={"Pengembalian"} />
      <Stack className={"style-box max-w-[100rem] mx-auto"}>
        {
          user?.data?.student?.isPurchasingDone ?
            (
              <StyledTabs value={`${filter.step}`} onTabChange={toStep} grade={grade}>
                {
                  isFetching ? <Skeleton mt={40} width={"100%"} height={200} visible /> : (
                    <>
                      {isSuccess && (
                        <ScrollArea w={"100%"} display={"flex"} type="always" sx={{ display: 'block' }} offsetScrollbars >
                          {
                            grade == "SMP" && <TabList
                              activeTabIndex={+filter.step}
                              card={stagingCardFilterByGrade?.map((staging, index) => {
                                return {
                                  label: staging.name,
                                  index: staging.index,
                                  icon: cardSMP[index]?.icon,
                                  is_done: staging.is_done === 1,
                                };
                              })}
                            />
                          }
                          {
                            grade == "SMK" && <TabList
                              activeTabIndex={+filter.step}
                              card={stagingCardFilterByGrade?.map((staging, index) => {
                                return {
                                  label: staging.name,
                                  index: staging.index,
                                  icon: cardSMK[index]?.icon,
                                  is_done: staging.is_done === 1,
                                };
                              })}
                            />
                          }
                        </ScrollArea>
                      )}
                    </>
                  )
                }

                <Divider my={20} />

                {
                  isFetching ? <Skeleton mt={40} width={"100%"} height={200} visible /> : (
                    <>
                      {grade == "SMP" && cardSMP.find((c) => c.index === filter.step)?.content}
                      {grade == "SMK" && cardSMK.find((c) => c.index === filter.step)?.content}
                    </>
                  )
                }
              </StyledTabs>
            ) : (
              <>
                <Text mt={40} align="center" maw={450} mx={'auto'}>
                  Anda belum melakukan menyelesaikan step pembelian, mohon selesaikan step pembelian dahulu
                </Text>
              </>
            )}
      </Stack>
    </Page>
  );
};

export default PengembalianSiswaPPDB;
