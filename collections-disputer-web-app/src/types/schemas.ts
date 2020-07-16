import * as yup from "yup";

// const omit = (obj: any, ...keys: string[]) =>
//   Object.entries(obj)
//     .filter(([k]) => !keys.includes(k))
//     .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});

// export const DateLikeSchema = yup.date();
export const DateLikeSchema = yup.string();

export const AddressSchema = yup.object({
  name: yup.string().defined(),
  street1: yup.string(),
  street2: yup.string(),
  city: yup.string(),
  state: yup.string(),
  zip: yup.number(),
  country: yup.string(),
});

export const DebtCollectorSchema = yup.object({
  address: AddressSchema.defined(),
  name: yup.string(),
  phone: yup.string(),
});

export const DisputeReasonSchema = yup.object({
  notMyAccount: yup.boolean(),
  accountClosed: yup.boolean(),
  paidInFull: yup.boolean(),
  neverPaidLate: yup.boolean(),
  inBankruptcy: yup.boolean(),
  paidBeforeCollectionOrChargeOff: yup.boolean(),
  other: yup.string(),
});
export const DisputeItemEventDetailsSchema = yup.object({
  contactMethod: yup.string().oneOf(["phone", "email"] as const),
  dateOfDispute: DateLikeSchema.defined(),
});
export const ClaimeeNameSchema = yup.object({
  first: yup.string().required(),
  middle: yup.string(),
  maidenOrFormer: yup.string(),
  last: yup.string(),
  juniorOrSenior: yup.string(),
});
export const ContactInfoSchema = yup.object({
  primaryPhone: yup.string(),
  alternatePhone: yup.string(),
  email: yup.string(),
});
export const PersonalInfoSchema = yup.object({
  birthdate: DateLikeSchema.defined(),
  ssn: yup.number(),
});
export const DisputeItemSchema = yup.object({
  companyName: yup.string(),
  accountNumber: yup.string(),
  disputeReason: DisputeReasonSchema.defined(),
  disputeDescription: yup.string(),
  updateBureauIfCreditChanges: yup.boolean(),
  disputeEventDetails: DisputeItemEventDetailsSchema.defined(),
});

const claimeeSchemaObject = {
  address: AddressSchema.defined(),
  name: ClaimeeNameSchema.defined(),
  contactInfo: ContactInfoSchema.defined(),
  personalInfo: PersonalInfoSchema.defined(),
};

export const SpouseSchema = yup.object({
  name: ClaimeeNameSchema.defined(),
  personalInfo: PersonalInfoSchema.defined(),
});

export const ClaimeeSchema = yup.object({
  ...claimeeSchemaObject,
  spouse: SpouseSchema.defined() /* .notRequired() */,
});
export const DisputeLetterSchema = yup.object({
  body: yup.string(),
  type: yup.string().oneOf(["freeform", "template"] as const),
});
export const DisputeSchema = yup
  .object({
    debtCollector: DebtCollectorSchema.defined(),
    claimee: ClaimeeSchema.defined() /* .notRequired() */,
    items: yup.array(DisputeItemSchema.defined()).defined(),
    letter: DisputeLetterSchema.defined(),
    hasSpouse: yup.boolean().defined(),
  })
  .defined();
