 describe("Interceptando network requests", ()=>{

    it("Repaso de request", ()=>{
        cy.request("https://pokeapi.co/api/v2/pokemon/ditto").then(response =>{
            expect(response.body).to.have.property("name", "ditto");
            expect(response.status).to.eq(200);
            cy.log(response.body);
        });
    });

    it('Prueba de intercept simple', ()=>{
        cy.intercept("GET","https://pokeapi.co/api/v2/pokemon-species/1").as("bulbasaur");

        cy.visit("/");

        cy.contains("Bulbasaur").parent().parent().within( element=>{
            cy.wrap(element).contains("Más detalles").click();
        });
        
        /*cy.wait("@bulbasaur").then((interception) =>{
            cy.log(interception);
            expect(interception.response.body).to.have.property("name", "bulbasaur");
            expect(interception.response.statusCode).to.eq(200);
        });*/
        
        //cy.wait('@bulbasaur',{timeout: 2000});

        cy.wait('@bulbasaur').its('response.statusCode').should('eq',200);
    });
});
