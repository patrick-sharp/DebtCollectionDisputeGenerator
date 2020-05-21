import _ from "lodash";
import React from "react";
import StepForm from "../StepForm";
import DisputeGeneratorContext from "../../../disputeGeneratorContext";
import { Formik } from "formik";
import moment from "moment";
import { Dispute } from "types/types";
import { Claimee } from "types/types";
import { Spouse } from "types/types";

export default function BiographyForm() {
  const { disputes, currentDisputeIndex } = React.useContext(
    DisputeGeneratorContext
  );
  const dispute = disputes[currentDisputeIndex] ?? ({} as Dispute);
  const { hasSpouse } = dispute;
  return (
    <div id="BiographyForm">
      <StepForm>
        <ClaimeeBiography />
        {hasSpouse ? <SpouseBiography /> : ""}
      </StepForm>
    </div>
  );
}

function ClaimeeBiography() {
  const { setState, ...state } = React.useContext(DisputeGeneratorContext);
  function handleUpdate(values: Omit<Claimee, "spouse">) {
    const disputes = _.cloneDeep(state.disputes);
    const dispute = disputes[state.currentDisputeIndex];
    dispute.claimee = values as Claimee;

    setState({ disputes });
  }
  const initialValues: Omit<Claimee, "spouse"> = {
    address: {
      name: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zip: 0,
      country: "USA",
    },
    name: {
      first: "",
      middle: "",
      maidenOrFormer: "",
      last: "",
      juniorOrSenior: false,
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
  return (
    <Formik initialValues={initialValues} onSubmit={handleUpdate}></Formik>
  );
}

function SpouseBiography() {
  const { setState, ...state } = React.useContext(DisputeGeneratorContext);
  function handleUpdate(values: Spouse) {
    const disputes = _.cloneDeep(state.disputes);
    const dispute = disputes[state.currentDisputeIndex];
    dispute.claimee = values as Claimee;

    setState({ disputes });
  }
  const initialValues: Spouse = {
    name: {
      first: "",
      middle: "",
      maidenOrFormer: "",
      last: "",
      juniorOrSenior: false,
    },
    personalInfo: {
      birthdate: moment().format("YYYY-mm-dd"),
      ssn: 0,
    },
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleUpdate}></Formik>
  );
}
