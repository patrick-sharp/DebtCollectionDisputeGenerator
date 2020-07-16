import { createState, State } from "@hookstate/core";
import { IDisputeGeneratorState } from "@typeDefs/types";
export const DisputeGlobalState: State<IDisputeGeneratorState> = createState<
  IDisputeGeneratorState
>({
  disputes: [
    {
      debtCollector: {
        address: {
          name: "",
          state: "",
          street1: "",
          street2: "",
          city: "",
          zip: 98122,
          country: "",
        },
        name: "",
        phone: "",
      },
      claimee: {
        spouse: {
          name: {
            first: "",
            last: "",
            middle: "",
            maidenOrFormer: "",
            juniorOrSenior: "",
          },
          personalInfo: { birthdate: new Date().toISOString(), ssn: 0 },
        },
        address: {
          name: "",
          state: "",
          street1: "",
          street2: "",
          city: "",
          zip: 98122,
          country: "",
        },
        name: {
          first: "",
          last: "",
          middle: "",
          maidenOrFormer: "",
          juniorOrSenior: "",
        },
        personalInfo: {
          birthdate: new Date().toISOString(),
          ssn: 0,
        },
        contactInfo: {
          primaryPhone: "",
          alternatePhone: "",
          email: "",
        },
      },
      items: [],
      letter: {
        type: "freeform",
        body: "",
      },
      hasSpouse: true,
    },
  ],
  currentDisputeIndex: 0,
  loading: false,
});
