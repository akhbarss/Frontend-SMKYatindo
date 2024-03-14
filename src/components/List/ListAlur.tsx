import {
  Accordion,
  AccordionControlProps,
  Box,
  Center,
  Divider,
  Skeleton,
  Text,
} from "@mantine/core";
import { AlurPendaftaran } from "../../apis/alur/getAlur";
import { useAlurFormContext } from "../../context/form-context";
import { useAlur } from "../../hooks/useAlur";
import { useModal } from "../../hooks/useModal";
import { DarkTheme } from "../../utils/darkTheme";
import { ButtonDelete, ButtonEdit } from "../Button";
import TiptapOutput from "../Fields/FieldTiptapOutput";
import DataKosong from "../Result/DataKosong";

type ListAlurProps = {
  grade: "SMP" | "SMK";
  alur: AlurPendaftaran[];
};

function AccordionControl({
  propss,
  data,
}: {
  propss: AccordionControlProps;
  data: AlurPendaftaran;
}): JSX.Element {
  const form = useAlurFormContext();
  const { openEdit, openDelete } = useModal();
  return (
    <Center>
      <Accordion.Control {...propss} className="font-bold" />
      <div className="px-[16px] flex gap-[8px]">
        <ButtonEdit
          onClick={() => {
            form.setValues({
              desc: data.content,
              grade: data.grade,
              title: data.title,
              id: data.id,
            });
            openEdit();
          }}
        />
        <ButtonDelete
          onClick={() => {
            openDelete();
            form.setValues({ id: data.id });
          }}
        />
      </div>
    </Center>
  );
}

const ListAlur = ({ alur, grade }: ListAlurProps) => {
  const dark = DarkTheme();
  const { isLoading } = useAlur();

  return (
    <>
      <Box>
        <Text
          weight={600}
          sx={(theme) => ({
            fontSize: 20,
            [theme.fn.largerThan("sm")]: {
              fontSize: 24,
            },
          })}
        >
          {grade}
        </Text>
        <Divider />
      </Box>

      <Box className="flex flex-col gap-[16px] px-[40px]">
        <Accordion multiple variant="separated" chevronPosition="left">
          {isLoading ? (
            <Skeleton height={80} />
          ) : alur?.length > 0 ? (
            alur?.map((item) => {
              return (
                <Accordion.Item
                  key={item.id}
                  value={item.id.toString()}
                  mb={20}
                  sx={(theme) => ({
                    boxShadow: "0 4px 10px -6px black",
                    backgroundColor: `${dark ? theme.colors.dark[9] : "white"}`,
                    padding: "0.5rem 0.5rem",
                    border: "0.0625rem solid #dee2e6",
                    "&[data-active]": {
                      backgroundColor: dark ? theme.colors.dark[9] : "white",
                      border: "0.0625rem solid #dee2e6",
                    },
                  })}
                >
                  <AccordionControl
                    propss={{
                      id: item.id.toString(),
                      children: <h2>{item.title}</h2>,
                    }}
                    data={item}
                  />
                  <Accordion.Panel
                    sx={{
                      borderTop: `1px solid ${dark ? "gray" : "#d9d9d9"}`,
                    }}
                  >
                    <TiptapOutput desc={item.content} />
                  </Accordion.Panel>
                </Accordion.Item>
              );
            })
          ) : (
            <DataKosong message="Data kosong" />
          )}
        </Accordion>
      </Box>
    </>
  );
};

export default ListAlur;
