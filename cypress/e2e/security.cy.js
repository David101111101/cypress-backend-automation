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




it.skip('should navigate in 2 domains in the same test', () => {

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



it.only("should save data in a variable using plugin from cypress.config", () => {
    // Visit the first domain and get the text of the h1 element
    cy.visit("/");
    cy.get("p").first().invoke("text").then((text) => {
        // Save the text in a variable using a custom task
        cy.task("save", { texto : text });
        console.log("Texto guardado:", text);
    });

});

it.only("should get data from the plugin and use it in multiple tests",function () {
    cy.visit("https://todo-cypress-iota.vercel.app");

        cy.task("getInfo", "texto").then((values) => {
            cy.get("#title").type(values);
        });
});



});