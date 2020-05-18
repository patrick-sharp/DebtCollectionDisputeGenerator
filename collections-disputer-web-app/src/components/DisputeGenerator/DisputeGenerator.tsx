import React from "react";
import "./DisputeGenerator.scss";
import { DisputeGeneratorState } from "../../types/types";
import DisputeGeneratorContext from "../../disputeGeneratorContext";
import { restoreState } from "../../utils";
import Wizard from "./Wizard";

export default class DisputeGenerator extends React.Component {
  state: DisputeGeneratorState = restoreState() ?? {
    disputes: [],
    currentDisputeIndex: 0
  };
  render() {
    const contextValue = {...this.state, setState: this.setState.bind(this)}
    return (
      <div id="DisputeGenerator">
        <DisputeGeneratorContext.Provider value={contextValue}>
          <Wizard />
        </DisputeGeneratorContext.Provider>
      </div>
    );
  }
}
