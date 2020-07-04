import _ from "lodash";
import { IDisputeGeneratorState } from "./types/types";
import { useState, useDebugValue } from "react";

const localStorageStateKey = "state";

export function restoreState(): null | IDisputeGeneratorState {
  const localState = localStorage.getItem(localStorageStateKey);
  if (!_.isNull(localState)) {
    try {
      const parsedState: IDisputeGeneratorState = JSON.parse(localState);
      return parsedState;
    } catch (e) {
      console.error(e);
    }
  }
  return null;
}

export function storeState(state: IDisputeGeneratorState): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(localStorageStateKey, serializedState);
  } catch (e) {
    console.error(e);
  }
}

export function useNamedState<T>(initialValue: T, name: string) {
  const [value, setValue] = useState<T>(initialValue);
  useDebugValue(`${name}: ${value}`);
  return [value, setValue];
}
