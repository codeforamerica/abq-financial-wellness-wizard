ABQs Financial Wellness Resource Wizard
===============================
Check out our prototype [here] (http://codeforamerica.github.io/abq-financial-wellness-wizard/)

This is a prototype application created by the City of Albuquerque Code for America Fellows. It helps people understand their own financial wellness by giving them an evaluation and using that data to generate a report and recommendations as to what things to do to help you grow financially.

===============================

#Deploying this application:

In order to deploy this code you will need to install the Jekyll gem through your command line with `gem install jekyll` (you need Ruby installed to do this).

Once you've done that you should simply be able to run the Jekyll command `jekyll serve` or `jekyll serve --watch` and see the site hosted on your localhost:4000 (with `--watch` it will listen for updates).

In order to deploy the site to your own github repo you'll first need to set up your `gh-pages` branch and make that your default branch in your GitHub repositories settings. That will make your site appear at http:[username].github.io/[repo name].

Lastly, you'll need to set the config.yml file to reflect your new base and sub URLs before you push to `gh-pages`. Example:`url: "http://codeforamerica.github.io/"` and `baseurl: "abq-financial-wellness-wizard"`. Don't forget to set the title and description as well.

For further documentation on using Jekyll you can go to <a href="http://www.jekyllrb.com" target="_blank">Jekyllrb.com</a>.

===============================

For more info you can contact us at <a href="mailto:albuquerque@codeforamerica.org">albuquerque@codeforamerica.org</a>