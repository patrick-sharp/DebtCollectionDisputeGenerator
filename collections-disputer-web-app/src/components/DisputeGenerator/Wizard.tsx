import React from "react";
// import DisputeGeneratorContext from "../../disputeGeneratorContext";
import StepZilla from "react-stepzilla";
import BiographyForm from "./steps/BiographyForm";
import DisputeDetailsForm from "./steps/DisputeDetailsForm";
import CollectionsAgencyDetailsForm from "./steps/CollectionsAgencyDetailsForm";
import DisputeLetter from "./steps/DisputeLetter";
import SupportingDocumentsUploader from "./steps/SupportingDocumentsUploader";
import Output from "./steps/Output";

export default function Wizard() {
  // const { currentDisputeIndex: _currentDisputeIndex } = React.useContext(
    // DisputeGeneratorContext
  // );
  const steps = [
    { name: "Step 1: Biographical Information", component: <BiographyForm /> },
    { name: "Step 2: Dispute Details", component: <DisputeDetailsForm /> },
    {
      name: "Step 3: Collections Agency Details",
      component: <CollectionsAgencyDetailsForm />,
    },
    { name: "Step 4: Dispute Letter", component: <DisputeLetter /> },
    {
      name: "Step 5: Supporting Documents",
      component: <SupportingDocumentsUploader />,
    },
    { name: "Step 6: Print", component: <Output /> },
  ];
  return (
    <div id="wizard">
      <StepZilla steps={steps} />
    </div>
  );
}
