import { Button, IconButton } from "@chakra-ui/core";
import React from "react";
import Step from "../components/Step";
import { WizardContext } from "../WizardContext";

export default function DisputeLetter() {
  const {
    wizard: { next, previous },
  } = React.useContext(WizardContext);

  return (
    <div id="DisputeLetter">
      <Step>TODO</Step>{" "}
      <IconButton
        aria-label={"Previous Step"}
        icon={"arrow-back"}
        onClick={previous}
      />
      <Button leftIcon={"arrow-forward"} onClick={next}>
        Next
      </Button>
    </div>
  );
}
