import { Button, IconButton } from "@chakra-ui/core";
import React from "react";
import StepForm from "../components/StepForm";
import { WizardContext } from "../WizardContext";

export default function DisputeDetailsForm() {
  const {
    wizard: { next, previous },
  } = React.useContext(WizardContext);
  return (
    <div id="DisputeDetailsForm">
      <StepForm>
        TODO
        <IconButton
          aria-label={"Previous Step"}
          icon={"arrow-back"}
          onClick={previous}
        />
        <Button leftIcon={"arrow-forward"} onClick={next}>
          Next
        </Button>
      </StepForm>
    </div>
  );
}
