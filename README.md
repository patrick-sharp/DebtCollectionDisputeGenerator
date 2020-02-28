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