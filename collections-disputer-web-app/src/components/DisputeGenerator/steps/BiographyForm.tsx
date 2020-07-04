import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Stack,
  Switch,
} from "@chakra-ui/core";
import AutoSave from "@components/FormikAutosave";
import { IClaimee, IDispute, ISpouse } from "@typeDefs/types";
import { Form, Formik } from "formik";
import _ from "lodash";
import moment from "moment";
import React, { ChangeEvent } from "react";
import { BioDataGroup, inputGroupMetaData } from "../components/StepForm";
import DisputeGeneratorContext from "../disputeGeneratorContext";
import { WizardContext } from "../WizardContext";

export default function BiographyForm() {
  const {
    wizard: { next },
  } = React.useContext(WizardContext);
  const { disputes, currentDisputeIndex } = React.useContext(
    DisputeGeneratorContext
  );
  const dispute = disputes[currentDisputeIndex] ?? ({} as IDispute);
  const { hasSpouse } = dispute;
  return (
    <div id="BiographyForm">
      <Stack spacing={10}>
        <ClaimeeBiography />
        <SpouseSwitch />
        {hasSpouse ? (
          <Stack spacing={5}>
            <Divider />
            <SpouseBiography /> <Divider />
          </Stack>
        ) : (
          ""
        )}
        <Button leftIcon={"arrow-forward"} onClick={next}>
          Next
        </Button>
      </Stack>
    </div>
  );
}

function ClaimeeBiography() {
  const { setState, ...state } = React.useContext(DisputeGeneratorContext);
  function handleUpdate(values: Omit<IClaimee, "spouse">) {
    const disputes = _.cloneDeep(state.disputes);
    const dispute = disputes[state.currentDisputeIndex];
    dispute.claimee = values as IClaimee;

    setState({ disputes });
  }
  const initialValues: Omit<IClaimee, "spouse"> = {
    name: {
      first: "",
      middle: "",
      maidenOrFormer: "",
      last: "",
      juniorOrSenior: "",
    },
    address: {
      name: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zip: 0,
      country: "USA",
    },
    contactInfo: {
      primaryPhone: "",
      alternatePhone: "",
      email: "",
    },
    personalInfo: {
      birthdate: moment().format("YYYY-mm-dd"),
      ssn: 0,
    },
  };

  _.merge(
    initialValues,
    _.omit(state.disputes[state.currentDisputeIndex].claimee, "spouse")
  );
  return (
    <Formik initialValues={initialValues} onSubmit={handleUpdate}>
      <Form>
        <AutoSave />
        <Stack spacing={10}>
          {Object.entries(initialValues).map(
            (
              [name, category]: [keyof typeof inputGroupMetaData, any],
              index
            ) => (
              <BioDataGroup
                key={name}
                name={name}
                category={category}
                isOpen={index === 0}
                parentPath={"claimee"}
              />
            )
          )}
        </Stack>
      </Form>
    </Formik>
  );
}

function SpouseBiography() {
  const { setState, ...state } = React.useContext(DisputeGeneratorContext);
  function handleUpdate(values: ISpouse) {
    const disputes = _.cloneDeep(state.disputes);
    const dispute = disputes[state.currentDisputeIndex];
    dispute.claimee = values as IClaimee;

    setState({ disputes });
  }
  const initialValues: ISpouse = {
    name: {
      first: "",
      middle: "",
      maidenOrFormer: "",
      last: "",
      juniorOrSenior: "",
    },
    personalInfo: {
      birthdate: moment().format("YYYY-mm-dd"),
      ssn: 0,
    },
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleUpdate}>
      <Form>
        <AutoSave />
        <Stack spacing={10}>
          {Object.entries(initialValues).map(
            (
              [name, category]: [keyof typeof inputGroupMetaData, any],
              index
            ) => (
              <BioDataGroup
                key={name}
                name={name}
                category={category}
                isOpen={index === 0}
                parentPath={"spouse"}
              />
            )
          )}
        </Stack>
      </Form>
    </Formik>
  );
}

const SpouseSwitch = () => {
  const { disputes, currentDisputeIndex, setCurrentState } = React.useContext(
    DisputeGeneratorContext
  );
  const dispute = disputes[currentDisputeIndex] ?? ({} as IDispute);
  const { hasSpouse } = dispute;

  function setSpouse(e: ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    setCurrentState({ hasSpouse: checked });
  }

  return (
    <FormControl>
      <FormLabel htmlFor="has-spouse">I have a spouse</FormLabel>
      <Switch id="has-spouse" value={hasSpouse} onChange={setSpouse} />
    </FormControl>
  );
};
