import { Box, Flex, Heading } from "@chakra-ui/core";
import { self, State, useState } from "@hookstate/core";
// import DisputeGeneratorContext from "./disputeGeneratorContext";
import { IDispute } from "@typeDefs/types";
import _ from "lodash";
import React from "react";
import { DisputeGlobalState } from "./disputeGeneratorState";

export const CurrentData = () => {
  // const { disputes, currentDisputeIndex } = useContext(DisputeGeneratorContext);
  // const dispute = disputes[currentDisputeIndex];

  // const state = useState<IDisputeGeneratorState>(DisputeGlobalState);
  // const disputeState: State<IDispute> = useState<IDispute>(state.disputes[0]);
  const disputeState: State<IDispute> = useState<IDispute>(
    DisputeGlobalState.disputes[0]
  );
  const dispute: IDispute = disputeState[self].value;
  return _.isEmpty(dispute) ? (
    <Flex
      flexDirection={"column"}
      d={["none", "flex"]}
      borderLeft={"1px solid"}
      p={5}
      borderColor={"gray.100"}
      backgroundColor={"gray.50"}
    >
      <Heading borderBottom={"1px solid"}>Current Data:</Heading>
      <Flex>
        <DisputeDisplay dispute={dispute} />
      </Flex>
    </Flex>
  ) : (
    <></>
  );
};

const DisputeDisplay = ({ dispute }: { dispute: IDispute }) => {
  return <Box>{dispute?.claimee?.name?.first}</Box>;
};
