import moment from "moment";

export type IDateLike = Date | string | moment.Moment;

export interface IDisputeGeneratorState {
  disputes: IDispute[];
  currentDisputeIndex: number;
}

export interface IDispute {
  debtCollector: IDebtCollector;
  claimee: IClaimee;
  items: Array<IDisputeItem>;
  letter: IDisputeLetter;
  hasSpouse: boolean;
}

export interface IDisputeItem {
  companyName: string;
  accountNumber: string;
  disputeReason: IDisputeReason;
  disputeDescription: string;
  updateBureauIfCreditChanges: boolean;
  disputeEventDetails: IDisputeItemEventDetails;
}

export interface ILetterTemplate {}

export interface IFreeformDisputeLetter {
  body: string;
  type: "freeform";
}

export interface ITemplateDisputeLetter {
  type: "template";
  template: ILetterTemplate;
}

export type IDisputeLetter = IFreeformDisputeLetter | ITemplateDisputeLetter;

export interface IDisputeItemEventDetails {
  contactMethod: "phone" | "email";
  dateOfDispute: IDateLike;
}

export interface IDisputeReason {
  notMyAccount: boolean;
  accountClosed: boolean;
  paidInFull: boolean;
  neverPaidLate: boolean;
  inBankruptcy: boolean;
  paidBeforeCollectionOrChargeOff: boolean;
  other: string;
}

export interface IClaimee {
  address: IAddress;
  name: IClaimeeName;
  contactInfo: IContactInfo;
  personalInfo: IPersonalInfo;
  spouse: ISpouse;
}

export type ISpouse = Omit<IClaimee, "contactInfo" | "address" | "spouse">;

export interface IClaimeeName {
  first: string;
  middle: string;
  maidenOrFormer: string;
  last: string;
  juniorOrSenior: "junior" | "senior" | "";
}

export interface IPersonalInfo {
  birthdate: IDateLike;
  ssn: number;
}

export interface IContactInfo {
  primaryPhone: string;
  alternatePhone: string;
  email: string;
}

export interface IDebtCollector {
  address: IAddress;
  name: string;
  phone: string;
}

export interface IAddress {
  name: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: number;
  country: "USA";
}
