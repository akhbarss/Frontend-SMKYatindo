import React from "react";
import { Loader, Select } from "@mantine/core";
import { getLookup } from "../apis/lookup";
import { useQuery } from "@tanstack/react-query";

const SelectStatus = (props: {
  type: string;
  value?: string;
  readonly?: boolean;
  label?: string;
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
          readOnly={props.readonly}
          label={props.label}
          onChange={props.onChange}
          data={
            isSuccess &&
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
