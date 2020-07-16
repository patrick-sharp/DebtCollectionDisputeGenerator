import moment from "moment";
// import { InferType } from "yup";
import {
  DisputeSchema,
  DisputeItemSchema,
  DisputeItemEventDetailsSchema,
  DisputeReasonSchema,
  ClaimeeSchema,
  ClaimeeNameSchema,
  PersonalInfoSchema,
  ContactInfoSchema,
  DebtCollectorSchema,
  AddressSchema,
  SpouseSchema,
} from "./schemas";

export type IDateLike = Date | string | moment.Moment;

export type IDisputeGeneratorState = {
  disputes: IDispute[];
  currentDisputeIndex: number;
  loading?: boolean;
};

export type IDispute = ReturnType<typeof DisputeSchema.validateSync>;

export type IDisputeItem = ReturnType<typeof DisputeItemSchema.validateSync>;

export type IDisputeItemEventDetails = ReturnType<
  typeof DisputeItemEventDetailsSchema.validateSync
>;

export type IFreeformDisputeLetter = {
  body: string;
  type: "freeform";
};

export type ILetterTemplate = any;

export type ITemplateDisputeLetter = {
  type: "template";
  template: ILetterTemplate;
};

export type IDisputeLetter = IFreeformDisputeLetter | ITemplateDisputeLetter;

export type IDisputeReason = ReturnType<
  typeof DisputeReasonSchema.validateSync
>;

export type IClaimee = ReturnType<typeof ClaimeeSchema.validateSync>;

export type ISpouse = ReturnType<typeof SpouseSchema.validateSync>;
// export type ISpouse = Omit<IClaimee, "contactInfo" | "address" | "spouse">;

export type IClaimeeName = ReturnType<typeof ClaimeeNameSchema.validateSync>;

export type IPersonalInfo = ReturnType<typeof PersonalInfoSchema.validateSync>;

export type IContactInfo = ReturnType<typeof ContactInfoSchema.validateSync>;

export type IDebtCollector = ReturnType<
  typeof DebtCollectorSchema.validateSync
>;

export type IAddress = ReturnType<typeof AddressSchema.validateSync>;
