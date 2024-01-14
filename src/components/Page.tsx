import React from "react";
import { Helmet } from "react-helmet";

type TPage = {
  title: string;
  children: any;
};

const Page: React.FC<TPage> = ({ title, children }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
};

export default Page;
