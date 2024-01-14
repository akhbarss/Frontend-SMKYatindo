import React from "react";
import { Divider, Text, Box } from "@mantine/core";

type TPageLabel = {
  label: string;
};

const PageLabel: React.FC<TPageLabel> = ({ label }) => {
  return (
    <>
      <Box className="w-full">
        <Text
          weight={600}
          sx={(theme) => ({
            fontSize: 20,
            [theme.fn.largerThan("sm")]: {
              fontSize: 30,
            },
          })}
        >
          {label}
        </Text>
        <Divider />
      </Box>
    </>
  );
};

export default PageLabel;
