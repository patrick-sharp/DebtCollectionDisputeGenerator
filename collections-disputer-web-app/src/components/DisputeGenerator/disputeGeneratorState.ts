import { createState } from "@hookstate/core";
import { IDisputeGeneratorState } from "@typeDefs/types";
export const DisputeGlobalState = createState<IDisputeGeneratorState>({
  disputes: [],
  currentDisputeIndex: 0,
  loading: false,
});
