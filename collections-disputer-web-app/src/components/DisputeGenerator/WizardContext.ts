import React from "react";
import { WizardContext as AlbusContext } from "react-albus";
export const WizardContext = React.createContext<{
  wizard: AlbusContext;
  stepMappings: { [id: string]: { id: string; label: string } };
}>({ wizard: {} as AlbusContext, stepMappings: {} });
