# DebtCollectionDisputeGenerator
Web app to generate proper forms and shipping labels for disputing united states collections agency claims

## What this is
A web app that allows you to:
  - generate dispute claim forms for the three credit reporting agencies + the collections agency whose collection claim you would like to dispute
  - generate return and destination shipping labels for all four recipients of the dispute forms
  - generate PDF packet including all forms, any letters of explanation, supplementary evidence documents, etc. for up to a six month period (1 per month) to be disputed monthly.

## Architecture
  - CreateReactApp react app
  - Information about collection agencies and credit reporting agencies currently hardcoded

## Deployment
  - We use Netlify to S3

## Design
  - What does this form look like?
  - What do I need to fill it out?
  - What techniques?
      - HTML forms for Wizard
      - Wireframe?
  - What's on the shipping label?
    - return address
    - dest address
  - 4 envelopes
    - identical contents
    - Equifax, Experian, Transunion
      - and the collections agency
  - dozens of collections agencies
  - What's in each packet
    - six packets (1 per month) * four recipients
  TODO: ANALYZE FORMS GLEAN


## User questions
  - Where/when/how do I need to file this form?
  - How much time does it take to fill out?
  - Where will I need to go to find the information?

## User flow
  1. Access application
  2. Fill out multi-step wizard - REPEAT THIS FOR EVERY DISPUTE BEING FILED:
    - Enter biographical information
    - Enter details of collection / dispute
    - Enter details about collections agency
    - Enter contents of letter of dispute
    - Upload supporting documents (e.g. ID card or driver's license, bank statements, proof of settled balance)
  3. Download your personalized and dated packet of collections dispute forms
    - Default is 4 per month for 6 months
    - Each packet contains:
      * Shipping labels to be pasted onto envelopes containing the forms
      * Collection dispute form
      * Collection dispute letter
      * A copy of each supporting document

## Every part of the form

### To
  - (pick one or more)
    - Equifax
      - P.O. Box 740256
        Atlanta, GA 30374-0256
    - Transunion
      - P.O. Box 2000
        Chester, PA 19022-2000
    - Experian
      - P.O. Box 12
        Allen, TX 75013
  - Debt collector's info
    - Debt collector name
    - Debt collector address
    - Account number for the debt, if you have it

### From
  - Name
    - First
    - Middle
    - Maiden/former
    - Last
    - Jr/Sr

  - Address
    - Street address
    - City
    - State
    - Zip

  - Contact
    - Primary Telephone (extension optional)
    - Secondary Telephone (extension optional)
    - email address

  - Personal
    - MM/DD/YYYY birthday
    - Social Security Number
    - Signature
      - Date of signature

### Spouse
  - Name
    - First
    - Middle
    - Maiden/former
    - Last
    - Jr/Sr
  - Personal
    - MM/DD/YYYY birthday
    - Social Security Number
    - Signature
      - Date of signature

### Innaccurate Item (duplicate as needed)
  - Company name
  - Account number
  - Reason for dispute (pick one or more)
    - Not My Account
    - Account Closed
    - Paid In Full
    - Never Paid Late
    - In Bankruptcy
    - Paid Before Collection/Charge Off
    - Other
  - Description

### Checkbox
  - Checkbox: checked or not
    - When the box is checked, if my credit file changes after the investigation or I add a consumer statement to my credit file, please send an updated report to the companies who have received my report in the past two years.


## Every part of the letter

### Header
  - Your info
    - Name
    - Return address
    - Date
  
  - Collector's info
    - Debt collector name
    - Debt collector address
    - Account number for the debt, if you have it
      - In the header, preface this with "Re:" or something
  
### Text

Dear [Debt collector name]:

You contacted me by [phone/mail], on [date] and claim I am responsible for a debt with [name of creditor].

Please answer these questions so that I can verify whether I have any responsibility for this debt.

1.	To whom do you think I owe this debt and what amount do you claim I owe? I will need the name, address and account number for the creditor, in addition to the amount owed. If this debt started with a different creditor, I will need the name, address and account number for the original creditor, the amount owed and the date when the debt was transferred.
2.	Please provide a valid basis for the debt, such as the original contract between me and original creditor. Tell me the date the debt became delinquent and the date the last payment was made.
3.	Provide me a copy of the last billing statement from the original creditor. If any fees or additional interest charges have been added to that statement, explain how those fees or additional interest charges are permitted, either by the original contract or by law.
4.	If any payments have been made on the account since the last billing from the original creditor, please show an itemized list of those payments with dates and amount paid for each item.
5.	Does your agency have a debt collection license in (name of your state)? If so, please provide the name on the license, the license number and the telephone number of the state agency that issued the license. If you do not have a license, please explain why.

I requested this information so that I can make an informed decision on whether I am responsible for the debt. I will need your response to make that decision and would be open to communicating with you on this matter.  I would like to know if you are prepared to accept less than the balance you claim is owed. If so, put your offer in writing with the amount you will accept to fully resolve the matter.

Please treat this debt as being in dispute. I look forward to your response. Thank you for your cooperation.

Sincerely,
[Name]
