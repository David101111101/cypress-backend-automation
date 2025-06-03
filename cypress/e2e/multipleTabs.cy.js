
describe ('Should navigate between tabs', () => {


it.skip('verifies it goes to urls with html target _blank ', () => {
cy.visit('https://demoqa.com/links')
cy.get('#simpleLink').click()

})


it.only('opens the site but in the same tab ', () => {
cy.visit('https://demoqa.com/links')
cy.get('#simpleLink').invoke('removeAttr', 'target').click()
cy.url().should('include', 'simpleLink')
})

})
