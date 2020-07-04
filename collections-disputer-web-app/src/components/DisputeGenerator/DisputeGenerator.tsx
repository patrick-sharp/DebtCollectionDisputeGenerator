import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/core";
import { IDispute } from "@typeDefs/types";
import _ from "lodash";
import React, { useContext, useState } from "react";
import { IDisputeGeneratorState } from "../../types/types";
import { restoreState, storeState } from "../../utils";
import Wizard from "./components/Wizard";
import "./DisputeGenerator.scss";
import DisputeGeneratorContext from "./disputeGeneratorContext";
import { CurrentData } from "./CurrentData";

export default class DisputeGenerator extends React.Component {
  state: IDisputeGeneratorState = restoreState() ?? {
    disputes: [],
    currentDisputeIndex: 0,
  };

  componentWillUnmount() {
    storeState(this.state);
  }

  render() {
    const setState = (newState: IDisputeGeneratorState) => {
      // this.setState.bind(this);

      const _state = _.cloneDeep(this.state);

      _.merge(_state, newState);
      this.setState(_state);
    };

    const setCurrentState = (newDispute: Partial<IDispute>) => {
      const disputes = _.cloneDeep(this.state.disputes);

      const _dispute = {
        ...disputes[this.state.currentDisputeIndex],
        ...newDispute,
      };

      disputes[this.state.currentDisputeIndex] = _dispute;

      const _state = { ...this.state, disputes };

      setState(_state);
    };

    const contextValue = {
      ...this.state,
      setState: setState.bind(this),
      setCurrentState: setCurrentState.bind(this),
    };
    return (
      <div id="DisputeGenerator">
        <DisputeGeneratorContext.Provider value={contextValue}>
          <WelcomeModal />

          <Wizard />
          <CurrentData />
        </DisputeGeneratorContext.Provider>
      </div>
    );
  }
}

const WelcomeModal = () => {
  const { disputes } = useContext(DisputeGeneratorContext);
  const [showWelcome, setShowWelcome] = useState(_.isEmpty(disputes));

  return (
    <Modal isOpen={showWelcome} onClose={() => setShowWelcome(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome Back</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Thanks for getting started! Let's pick up where we started.</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setShowWelcome(false)}>OK!</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
