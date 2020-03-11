import moment from "moment";

export type DateLike = Date | string | moment.Moment;

export interface DisputeGeneratorState {
  disputes: Dispute[];
  currentDisputeIndex: number;
}

export interface Dispute {
  debtCollector: DebtCollector;
  claimee: Claimee;
  items: Array<DisputeItem>;
  letter: DisputeLetter;
  hasSpouse: boolean;
}

export interface DisputeItem {
  companyName: string;
  accountNumber: string;
  disputeReason: DisputeReason;
  disputeDescription: string;
  updateBureauIfCreditChanges: boolean;
  disputeEventDetails: DisputeItemEventDetails;
}

export interface LetterTemplate {}

export interface FreeformDisputeLetter {
  body: string;
  type: "freeform";
}

export interface TemplateDisputeLetter {
  type: "template";
  template: LetterTemplate;
}

export type DisputeLetter = FreeformDisputeLetter | TemplateDisputeLetter;

export interface DisputeItemEventDetails {
  contactMethod: "phone" | "email";
  dateOfDispute: DateLike;
}

export interface DisputeReason {
  notMyAccount: boolean;
  accountClosed: boolean;
  paidInFull: boolean;
  neverPaidLate: boolean;
  inBankruptcy: boolean;
  paidBeforeCollectionOrChargeOff: boolean;
  other: string;
}

export interface Claimee {
  address: Address;
  name: ClaimeeName;
  contactInfo: ContactInfo;
  personalInfo: PersonalInfo;
  spouse: Spouse;
}

export type Spouse = Omit<Claimee, "contactInfo" | "address" | "spouse">;

export interface ClaimeeName {
  first: string;
  middle: string;
  maidenOrFormer: string;
  last: string;
  juniorOrSenior: "junior" | "senior" | false;
}

export interface PersonalInfo {
  birthdate: DateLike;
  ssn: number;
}

export interface ContactInfo {
  primaryPhone: string;
  alternatePhone: string;
  email: string;
}

export interface DebtCollector {
  address: Address;
  name: string;
  phone: string;
}

export interface Address {
  name: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: number;
  country: "USA";
}
