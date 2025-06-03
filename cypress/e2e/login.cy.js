
import LoginWebPage from '../pageObjects/loginpage'; //import del POM
const loginData = require('../fixtures/loginData'); //data guardada

let loginWebPage, data;

describe('Test de Login', () => {
  beforeEach(() => {
    loginWebPage = new LoginWebPage();
    loginWebPage.visit();
    loginWebPage.isLoadPage();
  });
  it('Do wrong login', () => {
    data = loginData.wrong;
    loginWebPage.doLogin(data.username, data.password);
    loginWebPage.isErrorDisplayed();
  });
  it('Do correct login', () => {
    data = loginData.correct;
    loginWebPage.doLogin(data.username, data.password);
    loginWebPage.validateSuccessfulLogin();
  });
});