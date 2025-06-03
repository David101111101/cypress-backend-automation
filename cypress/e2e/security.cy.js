describe ('Security Tests', () => {

it.skip('should navigate between domains', () => {
    //goes to our local host fine
cy.visit('/')
//shows the error when trying to go to a different domain
cy.visit('https://todo-cypress-iota.vercel.app')
cy.get("#title").type("Test")
})


 it.skip("navego a un dominio", ()=>{
        cy.visit("https://todo-cypress-iota.vercel.app");
        //saves the text of the h1 element in an alias
        cy.get("h1").invoke("text").as("titulo");
    });



    it.skip("navego a otro dominio", ()=>{
        cy.visit("/");
        //uses the alias to log the text of the h1 element
        cy.log(this.titulo);
        //cy.get("h1").invoke('text').as("titulo");
    })




it.only('should navigate in 2 domains in the same test', () => {
    cy.visit('https://todo-cypress-iota.vercel.app');
            cy.get('h1').first().invoke('text').then((text) => {
                // Useing cypress .env to store the text variable
                Cypress.env('textvariable', text);

            // Retrieve the stored variable
            cy.log(Cypress.env('textvariable'));
            });

        cy.origin('https://www.duckduckgo.com', () => {
            cy.visit('/');
            cy.log(Cypress.env('textvariable'));
        });

        cy.visit('/');

});


});