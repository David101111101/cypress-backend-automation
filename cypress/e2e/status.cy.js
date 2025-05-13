describe ('Probando el Status de la API', ()=>{
    it('Validar el status de la API exitoso',()=>{

        cy.request('employees').its('status').should('eq', 200)

    });

     it('Debe de validar el status code fallido',()=>{
        cy.request({url:'employees/4', failOnStatusCode: false})
        .its('status')
        .should('eq', 404)
    });
})



