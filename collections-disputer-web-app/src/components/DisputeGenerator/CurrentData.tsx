import { Flex, Heading, Box } from "@chakra-ui/core";
import _ from "lodash";
import React, { useContext } from "react";
import DisputeGeneratorContext from "./disputeGeneratorContext";
import { IDispute } from "@typeDefs/types";

export const CurrentData = () => {
  const { disputes, currentDisputeIndex } = useContext(DisputeGeneratorContext);
  const dispute = disputes[currentDisputeIndex];
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
