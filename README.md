ABQs Financial Wellness Resource Wizard
===============================
Check out our prototype [here] (http://codeforamerica.github.io/abq-financial-wellness-wizard/)

This is a prototype application created by the City of Albuquerque Code for America Fellows. It helps people understand their own financial wellness by giving them an evaluation and using that data to generate a report and recommendations as to what things to do to help you grow financially.

Creating a New Survey and Report for an Organization
===============================
## Create Formkeep Survey
1. Log in to Formkeep
1. Create a new bucket for the data
1. Pay for the bucket ($7 a month) (will only except 4 request to demo)
1. Paste in this 'Thank You Page' url `http://codeforamerica.github.io/abq-financial-wellness-wizard/thanks.html`
1. Make a copy of the unique Formkeep id, this is needed for the url

## Create Google Sheet
1. In the google spreadsheet, add a new tab.
1. Name it the name of the business, replacing any spaces with a dash. For example, if the business is 'Two Hours' the tab should be named 'two-hours'. Remove any special characters like '&'.
1. Copy over the table headers from another tab.

## Create Zapier Hook
1. Login to Zapier
1. Create a new action that connects FormKeep to Google Sheets
1. If Formkeep gets a submission create a row in google sheets
1. Select FormKeep bucket
1. Select Google Sheet (can select tab)
1. Before the next step we'll need to submit the form

## FWC Survey
1. Now go to the survey `/abq-financial-wellness-wizard/?formkeep=` at the end of the url add the Formkeep ID that you made a copy of above
1. Fill out the entire survey for testing and submit it

## Back to Formkeep and Zapier
1. Go back to Formkeep and finish your setup
1. Go back to Zapier
1. Now match each field to columns in the google sheet (this task is done one by one)
1. Submit and create the Zapier action

## Testing and Validating
1. Go to your Google Sheet tab and remove the row that says "Added by Zapier, ensuring we can access this spreadsheet. Feel free to delete it after you are all set up!" If that line doesn't exist then the Zapier hook was not created correctly and your want to go back to those steps. Also, make sure to remove the row so you don't have an empty row of data.
1. Test your form by submitting it at this url `/abq-financial-wellness-wizard/?formkeep=` + your Formkeep ID
1. Check the google spreadsheet to make sure your data came in
1. Submit form a couple of times to create example data
1. Demo the report by going to this url `/abq-financial-wellness-wizard/manage/?b=` add the name of your tab in Google Sheet. If the tab name is 'two-hours' then the url would be `/abq-financial-wellness-wizard/?b=two-hours`

Deploying this application
===============================
**Prerequisites:** Ruby is installed.

* Install dependencies: `bundle`
* Run Jekyll: `jekyll serve --watch`

For further documentation on using Jekyll you can go to <a href="http://www.jekyllrb.com" target="_blank">Jekyllrb.com</a>.

Contacting Us
===============================
For more information you can contact us at <a href="mailto:albuquerque@codeforamerica.org">albuquerque@codeforamerica.org</a>