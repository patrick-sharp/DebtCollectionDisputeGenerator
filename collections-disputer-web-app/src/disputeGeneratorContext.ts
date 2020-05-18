import React from "react";
import { DisputeGeneratorState } from "./types/types";

export interface DisputeGeneratorContextType extends DisputeGeneratorState {
  setState: Function;
}

const DisputeGeneratorContext = React.createContext<
  DisputeGeneratorContextType
>({ disputes: [], currentDisputeIndex: 0, setState: () => {} });

export default DisputeGeneratorContext;
