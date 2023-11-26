/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Loader, Select, SelectItem } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getLookup } from "../apis/lookup";

const SelectStatus = (props: {
  type: string;
  value?: string;
  readOnly?: boolean;
  label?: string;
  searchable?: boolean;
  data?: string | SelectItem[];
  onChange?: (value: string | null) => void;
}) => {
  const {
    data: response,
    isLoading,
    isSuccess,
  } = useQuery({
    queryFn: () => getLookup(props.type),
    queryKey: ["get_lookup_data", props.type],
  });

  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && (
        <Select
          value={props.value}
          readOnly={props.readOnly}
          label={props.label}
          onChange={props.onChange}
          searchable={props.searchable}
          styles={{
            input: {
              backgroundColor: props.readOnly && "#2A166F",
              color: props.readOnly && "white",
              fontWeight: `${props.readOnly ? "bolder" : "normal"}`
            }
          }}
          // @ts-ignore
          data={
            props.data
              ? props.data
              : isSuccess &&
              response.data.map((d) => {
                return {
                  value: d.value,
                  label: d.name,
                };
              })
          }
          {...props}
        />
      )}
    </>
  );
};

export default SelectStatus;
