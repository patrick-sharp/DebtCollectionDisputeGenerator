import {
  Divider,
  FormControl,
  FormLabel,
  Skeleton,
  Stack,
  Switch,
} from "@chakra-ui/core";
import AutoSave from "@components/FormikAutosave";
import { self, useState } from "@hookstate/core";
import { IClaimee, IDispute, ISpouse } from "@typeDefs/types";
import { Form, Formik } from "formik";
import _ from "lodash";
import moment from "moment";
import React, { ChangeEvent } from "react";
import { Step } from "react-albus";
import { BioDataGroup, inputGroupMetaData } from "../components/StepForm";
// import DisputeGeneratorContext from "../disputeGeneratorContext";
import { ClaimeeSchema } from "./../../../types/schemas";
import StepButtons from "./../components/StepButtons";
import { DisputeGlobalState } from "./../disputeGeneratorState";

export default function BiographyForm() {
  // const { disputes, currentDisputeIndex } = React.useContext(
  // DisputeGeneratorContext
  // );

  const { disputes, loading, currentDisputeIndex } = useState(
    DisputeGlobalState
  )[self].get();

  if (!disputes[self].get() && !loading) {
    disputes[self].set([]);
  }

  const dispute = disputes[currentDisputeIndex.value] ?? ({} as IDispute);

  return (
    <Step id="BiographyForm">
      <Stack spacing={10}>
        {_.isNil(dispute) ? (
          <Skeleton />
        ) : (
          <>
            <ClaimeeBiography />
            <SpouseSwitch />
          </>
        )}
        {!_.isNil(dispute) ? (
          dispute?.hasSpouse ? (
            <Stack spacing={5}>
              <Divider />
              <SpouseBiography /> <Divider />
            </Stack>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        <StepButtons
          canNext={
            _.isNil(dispute)
              ? false
              : ClaimeeSchema.isValidSync(dispute?.claimee)
          }
        />
      </Stack>
    </Step>
  );
}

function ClaimeeBiography() {
  // const { setState, ...state } = React.useContext(DisputeGeneratorContext);

  // const state = useState()[self].value;

  const index = useState(DisputeGlobalState.currentDisputeIndex).value;

  const claimee = useState(DisputeGlobalState.disputes[index].claimee);

  function handleUpdate(values: Omit<IClaimee, "spouse">) {
    claimee[self].merge(values);
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
      birthdate: moment().toDate(),
      ssn: 0,
    },
  };

  _.merge(initialValues, _.omit(claimee[self].value, "spouse"));
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
  const current = useState(DisputeGlobalState.currentDisputeIndex).value;

  const spouse = useState(DisputeGlobalState.disputes[current].claimee.spouse);

  function handleUpdate(values: ISpouse) {
    spouse[self].merge(values);
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
      birthdate: moment().toDate(),
      ssn: 0,
    },
  };

  _.merge(initialValues, _.merge(initialValues, spouse[self].value));

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

const SpouseSwitch = ({ ...rest }) => {
  const hasSpouse = useState(
    DisputeGlobalState.disputes[DisputeGlobalState.currentDisputeIndex.value]
      .hasSpouse
  );

  function setSpouse(e: ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    hasSpouse[self].set(!!checked);
  }

  return (
    <FormControl {...rest}>
      <FormLabel htmlFor="has-spouse">I have a spouse</FormLabel>
      <Switch id="has-spouse" value={hasSpouse.value} onChange={setSpouse} />
    </FormControl>
  );
};
