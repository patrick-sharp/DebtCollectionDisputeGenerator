import {
  Box,
  Collapse,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  PseudoBox,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/core";
import { IClaimee, ISpouse } from "@typeDefs/types";
import { Field, FieldProps, useFormikContext } from "formik";
import _ from "lodash";
import React from "react";
import * as yup from "yup";

export default function StepForm({
  children,
  stepProps,
  ...rest
}: {
  children: React.ReactNode;
  stepProps?: any;
}) {
  return (
    <Box {...rest} className="step-form">
      {children}
      {/* <Step {...stepProps}>{children}</Step> */}
    </Box>
  );
}

export const InputRow = ({
  field,
  category,
  parentPath,
}: {
  category: string;
  parentPath: string;
  field: keyof typeof inputMetaData;
}) => {
  const data = inputMetaData[field] || ({} as any);

  const fieldPath = `${category}.${field}`;

  return (
    <Field
      name={fieldPath}
      validate={
        data?.yup
          ? validateViaYup(data.yup)
          : _.isFunction(data?.validate)
          ? data.validate
          : undefined
      }
    >
      {({ field: inputProps /* form */ }: FieldProps) => (
        <FormControl>
          <FormLabel w={"100%"} htmlFor={field}>
            {data?.label ?? field}
          </FormLabel>
          <Input
            {...inputProps}
            {..._.omit(data, "label")}
            name={fieldPath}
            id={parentPath + "." + fieldPath}
            style={{ width: "40em" }}
            aria-describedby={data.hint ? data.hint : undefined}
          />
          {data.hint ? (
            <FormHelperText w={"100%"} id={`${fieldPath}-helper-text`}>
              {data.hint}
            </FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
      )}
    </Field>
  );
};

export const BioDataGroup = ({
  name: categoryName,
  category: categoryChildrenKeys,
  isOpen: defaultIsOpen = true,
  parentPath = "",
}: {
  name: keyof typeof inputGroupMetaData;
  category: any;
  isOpen: boolean;
  parentPath: string;
}) => {
  const { isOpen, onToggle } = useDisclosure(defaultIsOpen || true);

  const { errors = {}, values = {}, touched } = useFormikContext<
    Omit<IClaimee, "spouse"> | ISpouse
  >();

  // TODO: force open if child is focused

  // TODO: correct done / error for form groups
  const touchedAtAll = !_.isEmpty((touched as any)[categoryName]);
  const error = !_.isEmpty((errors as any)[categoryName]);
  const done =
    touchedAtAll &&
    !error &&
    Object.values((values as any)?.[categoryName] ?? {}).every(
      _.negate(_.isNil)
    );
  return (
    <Box borderWidth={"1px"} borderColor={1}>
      <PseudoBox
        _hover={{ cursor: "pointer" }}
        p={5}
        onClick={onToggle}
        backgroundColor={"gray.50"}
        as={Flex}
        d={"flex"}
        justifyContent={"space-between"}
      >
        {/* <Heading> */}
        <Text w={"100%"} textAlign={"left"}>
          {inputGroupMetaData[categoryName]?.label ??
            (isOpen ? "Hide" : "Show")}
        </Text>
        {done ? (
          <Icon name={"check"} />
        ) : error ? (
          <Icon name={"warning"} color={"red.600"} />
        ) : (
          ""
        )}
        {/* </Heading> */}
      </PseudoBox>
      <Collapse isOpen={isOpen} p={5}>
        <Stack key={categoryName} spacing={5}>
          {Object.keys(categoryChildrenKeys).map(
            (field: keyof typeof inputMetaData) => (
              <InputRow
                key={field}
                field={field}
                category={categoryName}
                parentPath={parentPath}
              />
            )
          )}
        </Stack>
      </Collapse>
    </Box>
  );
};
export const inputGroupMetaData = {
  address: {
    label: "Address",
  },
  name: {
    label: "Name",
  },
  contactInfo: {
    label: "Contact Info",
  },
  personalInfo: {
    label: "Personal Info",
  },
};

export const inputMetaData: Record<string, Record<string, any>> = {
  name: {
    type: "text",
    label: "Name",
  },
  street1: {
    type: "text",
    label: "Street 1",
  },
  street2: {
    type: "text",
    label: "Street 2",
  },
  city: {
    type: "text",
    label: "City",
  },
  state: {
    type: "text",
    label: "State",
  },
  zip: {
    type: "text",
    label: "Zip",
  },
  country: {
    type: "text",
    label: "Country",
  },
  first: {
    type: "text",
    label: "First Name",
  },
  middle: {
    type: "text",
    label: "Middle Name",
  },
  maidenOrFormer: {
    type: "text",
    label: "Maiden or former Name",
  },
  last: {
    type: "text",
    label: "Last Name",
  },
  juniorOrSenior: {
    type: "text",
    label: "Prefix ",
    hint: "Junior or senior, etc",
  },
  primaryPhone: {
    type: "phone",
    label: "Primary phone",
  },
  alternatePhone: {
    type: "phone",
    label: "Alternate phone",
  },
  email: {
    type: "text",
    label: "Email",
  },
  birthdate: {
    type: "date",
    label: "Birthdate",
  },
  ssn: {
    type: "number",
    label: "Ssn",
  },
};

export function validateViaYup(schema: any) {
  return function validate(value: any) {
    if (yup.isSchema(schema)) {
      return schema.isValidSync(value);
    } else {
      console.error("Not valid schema:", schema, value);
    }
  };
}
