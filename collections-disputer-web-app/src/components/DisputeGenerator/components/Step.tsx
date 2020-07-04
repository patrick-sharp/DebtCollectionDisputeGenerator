import React from "react";
import { Box } from "@chakra-ui/core";

export default function Step({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) {
  return (
    <Box {...rest} className="step">
      {children}
    </Box>
  );
}
