import {
  Button,
  Divider,
  Paper,
  ScrollArea,
  Skeleton,
  Stack,
  Tabs,
  Text
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaAddressCard, FaRegFlag } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { RiGitMergeFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "../../../../apis/alur/decodeJWT";
import { getLastoffset } from "../../../../apis/pembelian";
import Page from "../../../../components/Page";
import PageLabel from "../../../../components/PageLabel";
import TabList from "../../../../components/TabList/TabList";
import StepCetakKartu from "../../../../components/ui/Step/StepCetakKartu/StepCetakKartu";
import StepGelombang from "../../../../components/ui/Step/StepGelombang/StepGelombang";
import StepPilihJurusan from "../../../../components/ui/Step/StepJurusan/StepPilihJurusan";
import StepPembayaran from "../../../../components/ui/Step/StepPembayaran/StepPembayaran";
import { StyledTabsProps } from "../../../../types/global";
import generateQueryparam from "../../../../utils/generateQueryParam";
import useFilter from "../../../../utils/useFilter";

const StyledTabs = (props: StyledTabsProps) => {
  const { grade } = props;
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
            background: `linear-gradient(45deg, ${
              (grade == "SMP" && "#2A166F") || (grade == "SMK" && "#FF6C22")
            }, ${
              (grade == "SMP" && "#6548DB") || (grade == "SMK" && "#ff9f22")
            })`,
            borderColor: "green",
            color: theme.white,
            boxShadow: "0 10px 20px -10px rgba(0,0,0,0.5)",
          },
        },
      })}
      {...props}
    />
  );
};

const PembelianSiswaPPDB = () => {
  const [filter, setFilter] = useState<{ step: number; stagingId?: number }>({
    step: 1,
    stagingId: null,
  });

  const {
    data: stagings,
    isSuccess,
    isFetching,
  } = useQuery({
    queryKey: ["get_last_offset_batch"],
    queryFn: () => getLastoffset("PEMBELIAN"),
    staleTime: 0,
    notifyOnChangeProps: "all",
  });

  const { data: user } = useQuery({
    queryFn: jwtDecode,
    queryKey: ["session"],
  });

  // const grade = user?.data?.student
  const cardSMK = [
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

  function ContentSelesaiPembelian() {
    return (
      <Paper
        withBorder
        radius="md"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
          padding: "2rem",
        })}
      >
        <Stack maw={800} mx={"auto"}>
          <Text
            align={"center"}
            weight={500}
            style={{
              fontSize: "clamp(1rem, 3.4783vw + 0.3043rem, 1.2rem)",
            }}
          >
            Selamat! anda telah menyelesaikan step pembelian. <br /> Silakan
            melanjutkan ke step pengembalian{" "}
          </Text>
          <Button mx={"auto"} component={Link} to={"/ppdb/main/pengembalian"}>Lanjutkan</Button>
        </Stack>
      </Paper>
    );
  }
  const cardSMP = [
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
      label: "Cetak Kartu Peserta",
      icon: FaAddressCard,
      content: <StepCetakKartu />,
    },
    {
      index: 4,
      label: "Cetak Kartu Peserta",
      icon: FaAddressCard,
      content: <ContentSelesaiPembelian />,
    },
  ];

  const queryFilter = useFilter(filter);
  const location = useLocation();
  const navigate = useNavigate();
  const grade = user?.data?.student?.grade;

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

  const stagingCardFilterByGrade =
    isSuccess && stagings?.data?.filter((staging) => staging?.grade === grade);

  return (
    <Page title={"Pembelian"}>
      <PageLabel label={"Pembelian"} />
      <Stack className={"style-box max-w-[100rem] mx-auto"}>
        <StyledTabs grade={grade} value={`${filter.step}`} onTabChange={toStep}>
          <>
            <>
              {isFetching ? (
                <Skeleton mt={40} width={"100%"} height={200} visible />
              ) : (
                <>
                  {isSuccess && (
                    <ScrollArea
                      w={"100%"}
                      display={"flex"}
                      type="always"
                      sx={{ display: "block" }}
                      offsetScrollbars
                    >
                      {grade === "SMK" && (
                        <TabList
                          activeTabIndex={+filter.step}
                          card={stagingCardFilterByGrade?.map(
                            (staging, index) => {
                              return {
                                label: staging.name,
                                index: staging.index,
                                icon: cardSMK[index]?.icon,
                                is_done: staging.is_done === 1,
                              };
                            }
                          )}
                        />
                      )}
                      {grade === "SMP" && (
                        <TabList
                          activeTabIndex={+filter.step}
                          card={stagingCardFilterByGrade?.map(
                            (staging, index) => {
                              return {
                                label: staging.name,
                                index: staging.index,
                                icon: cardSMP[index]?.icon,
                                is_done: staging.is_done === 1,
                              };
                            }
                          )}
                        />
                      )}
                    </ScrollArea>
                  )}
                </>
              )}
            </>

            <Divider my={20} />

            {isFetching ? (
              <Skeleton mt={40} width={"100%"} height={200} visible />
            ) : (
              <>
                {grade == "SMK" &&
                  cardSMK.find((c) => c.index === filter.step)?.content}
                {grade == "SMP" &&
                  cardSMP.find((c) => c.index === filter.step)?.content}
              </>
            )}
          </>
        </StyledTabs>
      </Stack>
    </Page>
  );
};

export default PembelianSiswaPPDB;
