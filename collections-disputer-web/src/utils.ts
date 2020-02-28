import _ from "lodash";
import { DisputeGeneratorState } from "./types/types";

const localStorageStateKey = "state";

export function restoreState(): null | DisputeGeneratorState {
  const localState = localStorage.getItem(localStorageStateKey);
  if (!_.isNull(localState)) {
    try {
      const parsedState: DisputeGeneratorState = JSON.parse(localState);
      return parsedState;
    } catch (e) {
      console.error(e);
    }
  }
  return null;
}

export function storeState(state: DisputeGeneratorState): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.storeItem(localStorageStateKey, serializedState);
  } catch (e) {
    console.error(e);
  }
}
