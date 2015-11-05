ABQs Financial Wellness Resource Wizard
===============================
Check out our prototype [here] (http://codeforamerica.github.io/abq-financial-wellness-wizard/)

This is a prototype application created by the City of Albuquerque Code for America Fellows. It helps people understand their own financial wellness by giving them an evaluation and using that data to generate a report and recommendations as to what things to do to help you grow financially.

Creating a New Survey
===============================
## Create Formkeep Survey
1. Log in to Formkeep
1. Create a new bucket for the data
1. Pay for the bucket ($7 a month) (will only except 4 request to demo)
1. Make a copy of the unique formkeep id, this is needed for the url

## Create Google Sheet
1. In the google spreadsheet, add a new tab.
1. Name it the name of the business, replacing any spaces with a dash. For example, if the business is 'Two Hours' the tab should be named 'two-hours'. Remove any special characters like '&'.

## Create Zapier Hook
1. Login to Zapier
1. Create a new action that connects FormKeep to Google Sheets
1. If Formkeep gets a submission create a row in google sheets
1. Select FormKeep bucket
1. Select Google Sheet (can select tab)
1. Match each field to columns in the google sheet (this task is done one by one)
1. Submit and create the Zapier action

Deploying this application
===============================
**Prerequisitesi:** Ruby is installed.

* Install dependencies: `bundle`
* Run Jekyll: `jekyll serve --watch`

For further documentation on using Jekyll you can go to <a href="http://www.jekyllrb.com" target="_blank">Jekyllrb.com</a>.

Contacting Us
===============================
For more information you can contact us at <a href="mailto:albuquerque@codeforamerica.org">albuquerque@codeforamerica.org</a>
