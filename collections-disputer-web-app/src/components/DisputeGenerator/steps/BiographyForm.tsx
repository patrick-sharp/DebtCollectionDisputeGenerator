import {
  Divider,
  FormControl,
  FormLabel,
  Skeleton,
  Spinner,
  Stack,
  Switch,
} from "@chakra-ui/core";
import AutoSave from "@components/FormikAutosave";
import { self, useState } from "@hookstate/core";
import { IClaimee, ISpouse } from "@typeDefs/types";
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
  );

  if (!disputes[self].value && !loading) {
    disputes[self].set([]);
  }

  const disputeState =
    // disputes[currentDisputeIndex.value][self].value ?? ({} as IDispute);
    disputes[currentDisputeIndex.value][self].ornull;

  if (!disputeState) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  const dispute = disputeState[self].value;

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
      birthdate: moment().toDate().toISOString(),
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

  // const spouseState = useState(
  // DisputeGlobalState.disputes[current].claimee.spouse
  // )[self].ornull;
  const disputesState = useState(DisputeGlobalState.disputes)[self].ornull;

  const spouseState = disputesState[current].claimee.spouse;

  if (!spouseState[self]) {
    return (
      <>
        <Spinner />{" "}
      </>
    );
  }

  const spouse = spouseState[self].value;

  function handleUpdate(values: NonNullable<ISpouse>) {
    values ? spouseState[self].merge(values) : null;
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
      birthdate: moment().toDate().toISOString(),
      ssn: 0,
    },
  } as NonNullable<ISpouse>;

  if (spouse) {
    _.merge(initialValues ? initialValues.name : {}, spouse.name);
    _.merge(
      initialValues ? initialValues.personalInfo : {},
      spouse?.personalInfo ?? {}
    );
  }

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
