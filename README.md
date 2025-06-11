To run a local server:
In node terminal:
npm run runServer

To open Cypress dashboard:
Bash terminal:
 npx cypress open



Multiple reports
npm run report -- --spec cypress/e2e/login.cy.js

To generate the html report with mocha and junit
npm run mochawesome:report

To generate the html report with Allure

npm run test:allure cypress/e2e/login.cy.js