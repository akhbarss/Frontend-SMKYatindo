import React from "react";
import { Loader, MultiSelect } from "@mantine/core";
import { getLookup } from "../apis/lookup";
import { useQuery } from "@tanstack/react-query";

const MultiSelectStatus = (props: {
  type: string;
  value?: string[];
  readOnly?: boolean;
  label?: string;
  searchable?: boolean;
  onChange?: (value: string | null | string[]) => void;
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
        <MultiSelect
          value={props.value}
          // readOnly={props.readonly}
          maxSelectedValues={2}
          label={props.label}
          onChange={props.onChange}
          searchable={props.searchable}
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

export default MultiSelectStatus;
