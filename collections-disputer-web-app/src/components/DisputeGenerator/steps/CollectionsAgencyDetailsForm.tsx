import React from "react";
import StepForm from "../components/StepForm";
import { WizardContext } from "../WizardContext"
import { Button, IconButton } from "@chakra-ui/core";

export default function CollectionsAgencyDetailsForm() {
  const {
    wizard: { next, previous },
  } = React.useContext(WizardContext);

  return (
    <div id="CollectionsAgencyDetailsForm">
      <StepForm>TODO</StepForm>{" "}
      <IconButton aria-label={"Previous Step"} icon={"arrow-back"} onClick={previous} />
      <Button leftIcon={"arrow-forward"} onClick={next}>Next</Button>
    </div>
  );
}
