import { Flex } from "@chakra-ui/core";
import React from "react";
import { Step, Steps, Wizard } from "react-albus";
import BiographyForm from "../steps/BiographyForm";
import CollectionsAgencyDetailsForm from "../steps/CollectionsAgencyDetailsForm";
import DisputeDetailsForm from "../steps/DisputeDetailsForm";
import DisputeLetter from "../steps/DisputeLetter";
import Output from "../steps/Output";
import SupportingDocumentsUploader from "../steps/SupportingDocumentsUploader";
import { WizardContext } from "../WizardContext";
import { BreadCrumbs } from "./Breadcrumbs/BreadCrumbs";
import "./Wizard.scss";

export const stepMappings = {
  1: {
    id: "1",
    label: "Step 1: Biographical Information",
    component: <BiographyForm />,
  },
  2: {
    id: "2",
    label: "Step 2: Dispute Details",
    component: <DisputeDetailsForm />,
  },

  3: {
    id: "3",
    label: "Step 3: Collections Agency Details",
    component: <CollectionsAgencyDetailsForm />,
  },
  4: { id: "4", label: "Step 4: Dispute Letter", component: <DisputeLetter /> },

  5: {
    id: "5",
    label: "Step 5: Supporting Documents",
    component: <SupportingDocumentsUploader />,
  },
  6: { id: "6", label: "Step 6: Print", component: <Output /> },
};
export default function WizardWrapper() {
  return (
    <Flex id="Wizard" maxW={["full", "6xl"]} flexDir="column" m={"auto"}>
      <Wizard
        // history={history}
        // basename={url}
        render={(wizard) => (
          <WizardContext.Provider
            value={{
              wizard,
              stepMappings,
            }}
          >
            <BreadCrumbs />
            <Flex w={"full"} m={"auto"}>
              {/* <div className={cx(styles["step-wrapper"])}> */}
              <Steps>
                {Object.values(stepMappings).map(({ id, component }) => (
                  <Step key={id} id={id}>
                    {component}
                  </Step>
                ))}
              </Steps>
              {/* </div>{" "} */}
            </Flex>
          </WizardContext.Provider>
        )}
      />
    </Flex>
  );
}
