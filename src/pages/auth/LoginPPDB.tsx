import {
  Paper,
  Timeline,
  TextInput,
  Box,
  Text,
  Stepper,
  Group,
  Button
} from "@mantine/core";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Page from "../../components/Page.tsx";
import { BsCheck } from "react-icons/bs";

const LoginPPDB = () => {

  const [active, setActive] = useState(0);
  const [highestStepVisited, setHighestStepVisited] = useState(active);

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };

  // Allow the user to freely go back and forth between visited steps.
  const shouldAllowSelectStep = (step: number) => highestStepVisited >= step && active !== step;

  return (
    <Page title={"Login"}>
      <Paper className={`flex  min-h-[100vh]`}>
        <Box
          className="flex-[2] p-[4rem]"
        >

          <Stepper
            active={active}
            onStepClick={setActive}
            breakpoint="sm"
            radius={"xs"}
          >
            <Stepper.Step


              label="Identitas Diri"
              // description="Create an account"
              allowStepSelect={shouldAllowSelectStep(0)}
              icon={<BsCheck size={30} />}
            >
              <TextInput
                label="No Whatsapp"
                withAsterisk
              />
            </Stepper.Step>
            <Stepper.Step
              label="Informasi Kredensial"
              // description="Verify email"
              allowStepSelect={shouldAllowSelectStep(1)}
              icon={<BsCheck size={30} />}
            >
              <>Step 2 : Verify email</>
            </Stepper.Step>

            <Stepper.Completed>
              <>Completed, click back button to get to previous step</>
            </Stepper.Completed>
          </Stepper>




          <Group position="center" mt="xl">
            <Button variant="default" onClick={() => handleStepChange(active - 1)}>
              Back
            </Button>
            <Button onClick={() => handleStepChange(active + 1)}>Next step</Button>
          </Group>

        </Box>

        <Box
          className="flex-[1] bg-slate-700"
        >

        </Box>
      </Paper>
    </Page>
  );
};

export default LoginPPDB;
