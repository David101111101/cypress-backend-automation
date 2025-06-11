To run a local server In node terminal:
npm run runServer

To open Cypress dashboard:
 npx cypress open



**************
To generate the html report with Allure

npx cypress run --spec "cypress/e2e/login.cy.js" && allure generate allure-results --clean && allure open


//only runs the test
npx cypress run --spec "cypress/e2e/login.cy.js"

//generates the html allure report:
npm run allure:report




**************



Multiple reports
npm run report -- --spec cypress/e2e/login.cy.js

To generate the html report with mocha and junit
npm run mochawesome:report


