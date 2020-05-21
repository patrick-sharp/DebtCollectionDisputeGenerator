import cx from "classnames";
import _ from "lodash";
import React from "react";
import styles from "./BreadCrumbs.module.css";
import { WizardContext } from "./WizardContext";
import RightBar from "./RightBar";
import { Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export const BreadCrumbs = () => {
  const { wizard, stepMappings } = React.useContext(WizardContext);
  const { steps: allSteps } = wizard;

  let steps = allSteps;

  return (
    <RightBar>
      <div className={cx("logo", styles["logo"])}>
        <Icon icon={IconNames.LAYOUT_SKEW_GRID} />
      </div>
      <div className={cx(styles["breadcrumbs"])}>
        {Object.values(stepMappings).map((step) => (
          <BreadCrumbStep key={step.id} id={step.id} />
        ))}
      </div>
    </RightBar>
  );
};

export const BreadCrumbStep = ({ id }: { id: string | number }) => {
  const { wizard } = React.useContext(WizardContext);
  const { step, steps } = wizard;
  const activeIndex = steps.findIndex((st) => st.id === step.id);
  const thisIndex = steps.findIndex((st) => st.id === id);
  const active = activeIndex >= thisIndex;

  return (
    <>
      {_.first(steps).id !== id && (
        <div
          className={cx(styles["breadcrumb-step"], styles["connector"], {
            [styles["active"]]: active,
          })}
        />
      )}

      <div
        className={cx(styles["breadcrumb-step"], styles["number"], {
          [styles["active"]]: active,
        })}
      >
        <span className={styles["step-number"]}>
          <>{steps.findIndex((step) => step.id === id) + 1}</>
        </span>
      </div>
    </>
  );
};
