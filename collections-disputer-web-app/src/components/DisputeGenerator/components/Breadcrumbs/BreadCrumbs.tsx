import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Icon,
  Text,
  Tooltip,
} from "@chakra-ui/core";
import React from "react";
import { WizardContext } from "../../WizardContext";

export const BreadCrumbs = () => {
  const { stepMappings } = React.useContext(WizardContext);

  return (
    <Breadcrumb w={"100%"} spacing={"20px"} my={10}>
      {Object.values(stepMappings).map((step) => (
        <BreadCrumbStep key={step.id} id={step.id} />
      ))}
    </Breadcrumb>
  );
};

export const BreadCrumbStep = ({ id }: { id: string | number }) => {
  const { wizard, stepMappings } = React.useContext(WizardContext);
  const { step, steps } = wizard;
  const activeIndex = steps.findIndex((st) => st.id === step.id);
  const thisIndex = steps.findIndex((st) => st.id === id);
  const active = activeIndex >= thisIndex;

  const label = stepMappings[id].label;

  return (
    <Tooltip aria-label={label} label={label} shouldWrapChildren>
      <BreadcrumbItem isCurrentPage={active}>
        <BreadcrumbLink as={"span"} fontWeight={active ? "bold" : "normal"}>
          <Flex align={"center"} py={1}>
            <Text
              px={3}
              py={1}
              isTruncated={true}
              // maxW={`calc(50vw / ${steps.length})`}
              backgroundColor={active ? "" : "gray.50"}
            >
              {/* {label} */}
              Step {id}
            </Text>
            <Icon color="black.300" name="chevron-right" />
          </Flex>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Tooltip>
  );
};
