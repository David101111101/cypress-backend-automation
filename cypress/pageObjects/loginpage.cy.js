 export default class LoginWebPage {
  constructor() {
    this.URL = 'https://practicetestautomation.com/practice-test-login/';
    this.userInput = '#username';
    this.passwordInput = '#password';
    this.loginButton = '#submit';
    this.tabs = {
      account_summary_tab: '#menu-item-20 > a',
      account_activity_tab: '#menu-item-21 > a',
      transfer_founds_tab: '#menu-item-19 > a',
    };
    this.error = '#error';
  }

  visit() {
    cy.visit(this.URL);
  }

  isLoadPage() {
    cy.get(this.loginButton).should('be.visible');
    cy.get(this.passwordInput).should('be.visible');
    cy.get(this.userInput).should('be.visible');
  }

  validateSuccessfulLogin() {
    cy.get(this.tabs.account_activity_tab).should('be.visible');
    cy.get(this.tabs.account_summary_tab).should('be.visible');
    cy.get(this.tabs.transfer_founds_tab).should('be.visible');
  }

  doLogin(username, password) {
    cy.get(this.userInput).type(username);
    cy.get(this.passwordInput).type(password);
    cy.get(this.loginButton).click();
  }

  isErrorDisplayed() {
    cy.get(this.error).should('be.visible');
  }
}