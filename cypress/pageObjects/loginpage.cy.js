 export default class LoginWebPage {
  constructor() {
    this.URL = 'https://zero.webappsecurity.com/login.html';
    this.userInput = '#user_login';
    this.passwordInput = '#user_password';
    this.loginButton = '#login_form > div.form-actions > input';
    this.tabs = {
      account_summary_tab: '#account_summary_tab',
      account_activity_tab: '#account_activity_tab',
      transfer_founds_tab: '#transfer_funds_tab',
    };
    this.error = '.alert.alert-error';
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