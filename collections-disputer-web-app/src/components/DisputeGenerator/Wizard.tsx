import { Button, Dialog, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import cx from "classnames";
import React from "react";
import { Step, Steps, Wizard } from "react-albus";
import { BreadCrumbs } from "./BreadCrumbs";
import BiographyForm from "./steps/BiographyForm";
import CollectionsAgencyDetailsForm from "./steps/CollectionsAgencyDetailsForm";
import DisputeDetailsForm from "./steps/DisputeDetailsForm";
import DisputeLetter from "./steps/DisputeLetter";
import Output from "./steps/Output";
import SupportingDocumentsUploader from "./steps/SupportingDocumentsUploader";
import styles from "./Wizard.module.css";
import "./Wizard.scss";
import { WizardContext } from "./WizardContext";

const stepMappings = {
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
  const [showWelcome, setShowWelcome] = React.useState(true);
  return (
    <div id="Wizard">
      <Dialog
        isOpen={showWelcome}
        className={styles["welcome-modal"]}
        title={"Welcome Back"}
        onClose={() => setShowWelcome(false)}
      >
        <p>Thanks for signing up! Let's pick up where we started.</p>
        <Button
          intent={Intent.PRIMARY}
          icon={IconNames.TICK_CIRCLE}
          onClick={() => setShowWelcome(false)}
        >
          Sounds Good
        </Button>
      </Dialog>
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
            <div className={cx(styles["step-wrapper"])}>
              <Steps>
                {Object.values(stepMappings).map(({ id, component }) => (
                  <Step id={id}>{component}</Step>
                ))}
              </Steps>
            </div>
          </WizardContext.Provider>
        )}
      />
    </div>
  );
}
