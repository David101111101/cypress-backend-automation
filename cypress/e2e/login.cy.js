
import LoginWebPage from '../pageObjects/loginpage.cy.js'; //imports POM



describe.skip('Test de Login', () => {
  let loginWebPage, data;
  const loginData = require('../fixtures/loginData'); //saved data 

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


describe.skip("Loging with Fixtures", () => {
  let loginWebPage;
  beforeEach(()  => {
    loginWebPage = new LoginWebPage();
    loginWebPage.visit();
  });


  it("LogIn using fixtures variables", ()  => {
  
        cy.fixture("credentials").then(credentials => {
          loginWebPage.doLogin(credentials.username, credentials.password);
        });
        loginWebPage.validateSuccessfulLogin()
  });

  it("Incorrect LogIn with fixtures", ()  => {
    
        cy.fixture("incorrectCredentials").then(credentials => {
          loginWebPage.doLogin(credentials.username, credentials.password);
        });
        loginWebPage.isErrorDisplayed()
  });



  it("Multiple log ins using an object", ()  => {
    
        cy.fixture("incorrectCredentials").then(credentials => {
          loginWebPage.doLogin(credentials.username, credentials.password);
        });
        loginWebPage.isErrorDisplayed()
  });





});

const cretentialsObjectForLogIn = [
{
    name: "credentials",
    title: "Correct Log In"
},
{
    name: "incorrectCredentials",
    title: "Incorrect Log In"
}
]

cretentialsObjectForLogIn.forEach(credentials => {
  let loginWebPage = new LoginWebPage();
  describe.only(credentials.title, () => {
    
      beforeEach(() => {
        loginWebPage.visit();
      });

      it("logging in with multiple fixtures", function() {
        loginWebPage.isLoadPage();
        cy.fixture(credentials.name).then(credentials => {
          loginWebPage.doLogin(credentials.username, credentials.password);
        });
      })


  })

})
