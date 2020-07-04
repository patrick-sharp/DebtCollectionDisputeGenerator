import React from "react";
import { Divider, Flex } from "@chakra-ui/core";
// import "./../../app.css";

export default function RightBar({ children }: { children: React.ReactNode }) {
  return (
    <Flex d={"column"}>
      <Divider dir={"horizontal"} />
      {children}
      <Divider dir={"horizontal"} />
    </Flex>
  );
}
