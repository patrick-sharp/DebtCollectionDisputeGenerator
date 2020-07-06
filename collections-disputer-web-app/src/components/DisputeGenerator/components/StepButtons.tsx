import { Button, ButtonGroup, IconButton } from "@chakra-ui/core";
import React, { useContext } from "react";
import { WizardContext } from "../WizardContext";

const StepButtons = ({ canNext = false, canPrevious = false }) => {
  const { wizard } = useContext(WizardContext);
  const { steps, step } = wizard;

  return (
    <ButtonGroup>
      {step.id !== steps[0].id && <PreviousButton can={canPrevious} />}
      {<NextButton can={canNext} />}
    </ButtonGroup>
  );
};

const NextButton = ({ can = false }) => {
  const { wizard } = useContext(WizardContext);
  const { next } = wizard;
  return (
    <Button
      isDisabled={!can}
      leftIcon={"arrow-forward"}
      onClick={next}
      aria-label={"Next Step"}
    >
      Next
    </Button>
  );
};

const PreviousButton = ({ can = false }) => {
  const { wizard } = useContext(WizardContext);
  const { previous } = wizard;
  return (
    <IconButton
      isDisabled={!can}
      aria-label={"Previous Step"}
      icon={"arrow-back"}
      onClick={previous}
    />
  );
};

export default StepButtons;
