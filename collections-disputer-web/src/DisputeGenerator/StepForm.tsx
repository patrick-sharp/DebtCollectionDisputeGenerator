import React from "react";
import Step from "./Step";

export default function StepForm({
  children
}: {
  children: string | React.ReactChildren;
}) {
  return (
    <div className="step-form">
      <Step>{children}</Step>
    </div>
  );
}
