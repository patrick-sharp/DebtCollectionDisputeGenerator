import React from "react";
import { IDisputeGeneratorState, IDispute } from "@typeDefs/types";

export interface DisputeGeneratorContextType extends IDisputeGeneratorState {
  setState: (state: Partial<IDisputeGeneratorState>) => void;
  setCurrentState: (dispute: Partial<IDispute>) => void;
}

const DisputeGeneratorContext = React.createContext<
  DisputeGeneratorContextType
>({
  disputes: [],
  currentDisputeIndex: 0,
  setState: () => {},
  setCurrentState: () => {},
});

export default DisputeGeneratorContext;
