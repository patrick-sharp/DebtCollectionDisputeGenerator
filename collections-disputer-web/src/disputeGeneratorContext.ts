import React from "react";
import { DisputeGeneratorState } from "./types/types";

export interface DisputeGeneratorContextType extends DisputeGeneratorState {}

const DisputeGeneratorContext = React.createContext<
  DisputeGeneratorContextType
>({ disputes: [], currentDisputeIndex: 0 });
export default DisputeGeneratorContext;
