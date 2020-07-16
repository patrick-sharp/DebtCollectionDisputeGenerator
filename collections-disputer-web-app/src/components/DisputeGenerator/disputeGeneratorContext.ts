import React from "react";
import { IDisputeGeneratorState, IDispute } from "@typeDefs/types";

export interface _DisputeGeneratorContextType extends IDisputeGeneratorState {
  setState: (state: Partial<IDisputeGeneratorState>) => void;
  setCurrentState: (dispute: Partial<IDispute>) => void;
}

export const _DisputeGeneratorContext = React.createContext<
  _DisputeGeneratorContextType
>({
  disputes: [],
  currentDisputeIndex: 0,
  setState: () => {},
  setCurrentState: () => {},
});
