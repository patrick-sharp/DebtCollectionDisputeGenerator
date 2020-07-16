import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/core";
import { self, useState } from "@hookstate/core";
import _ from "lodash";
import React from "react";
import { IDisputeGeneratorState } from "../../types/types";
import { restoreState, storeState } from "../../utils";
import Wizard from "./components/Wizard";
import { CurrentData } from "./CurrentData";
import "./DisputeGenerator.scss";
import { DisputeGlobalState } from "./disputeGeneratorState";

export class OLD_DisputeGenerator extends React.Component {
  state: IDisputeGeneratorState = restoreState() ?? {
    disputes: [],
    currentDisputeIndex: 0,
  };

  componentWillUnmount() {
    storeState(this.state);
  }

  render() {
    /* const setState = (newState: IDisputeGeneratorState) => {
      // this.setState.bind(this);

      const _state = _.cloneDeep(this.state);

      _.merge(_state, newState);
      this.setState(_state);
    }; */

    /* const setCurrentState = (newDispute: Partial<IDispute>) => {
      const disputes = _.cloneDeep(this.state.disputes);

      const _dispute = {
        ...disputes[this.state.currentDisputeIndex],
        ...newDispute,
      };

      disputes[this.state.currentDisputeIndex] = _dispute;

      const _state = { ...this.state, disputes };

      setState(_state);
    }; */

    /* const contextValue = {
      ...this.state,
      setState: setState.bind(this),
      setCurrentState: setCurrentState.bind(this),
    }; */
    return (
      <div id="DisputeGenerator">
        {/* <DisputeGeneratorContext.Provider value={contextValue}> */}
        <WelcomeModal />

        <Wizard />
        <CurrentData />
        {/*</DisputeGeneratorContext.Provider> */}
      </div>
    );
  }
}

export default function DisputeGenerator() {
  return (
    <div id="DisputeGenerator">
      {/* <DisputeGeneratorContext.Provider value={contextValue}> */}
      <WelcomeModal />

      <Wizard />
      <CurrentData />
      {/* </DisputeGeneratorContext.Provider> */}
    </div>
  );
}

const WelcomeModal = () => {
  // TODO: better assumption criteria for those who've started the app already
  const name = useState(DisputeGlobalState.disputes[0].claimee.name)[self]
    .value;

  const { isOpen, onClose } = useDisclosure(_.isNil(name?.first));

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome Back</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Thanks for getting started! Let's pick up where we started.</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>OK!</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
