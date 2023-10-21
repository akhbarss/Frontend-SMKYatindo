import { Paper } from "@mantine/core";
import React from "react";
import TransitionIn from "../components/transitionIn";

type TPageContent = {
  children: React.ReactNode;
};

const PageContent = ({ children }: TPageContent) => {
  return (
    <TransitionIn>
      <Paper
        // className='page-content px-[0] md:px-[3rem] mt-[4rem] min-h-[100vh]'
        sx={(theme) => ({
          background:
            theme.colorScheme === "dark" ? theme.colors.dark[9] : "white",
          paddingBottom: "1rem",
          // paddingInline: "1.5rem"
        })}
      >
        {children}
      </Paper>
    </TransitionIn>
  );
};

export default PageContent;
