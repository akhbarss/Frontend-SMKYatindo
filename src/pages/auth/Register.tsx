import { Paper } from "@mantine/core";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Page from "../../components/Page.tsx";

const Register = () => {
  const [value, setValue] = useState("masuk");
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/ppdb/login";

  return (
    <Page title={"Login"}>
      <Paper className={` pt-[13vh] min-h-[100vh]`}>
        <h1>Login</h1>


      </Paper>
    </Page>
  );
};

export default Register;
