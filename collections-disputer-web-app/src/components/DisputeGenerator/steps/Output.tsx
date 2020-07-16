import { IconButton } from "@chakra-ui/core";
import React from "react";
import Step from "../components/Step";
import { WizardContext } from "../WizardContext";

export default function Output() {
  const {
    wizard: { previous },
  } = React.useContext(WizardContext);

  return (
    <div id="Output">
      <Step>TODO</Step>
      <IconButton
        aria-label={"Previous Step"}
        icon={"arrow-back"}
        onClick={previous}
      />
    </div>
  );
}
