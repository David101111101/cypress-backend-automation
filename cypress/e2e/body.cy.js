describe('Probando el Body', () => {
  
  it('Validar el body', () => {

    cy.request('employees/1')
    .its('body')
    .its('first_name')
    .should('eq', 'Juan')

    cy.request('employees/1').then(res => {

      //Using expect
      expect(res.status).to.be.equal(200)
      expect(res.body['first_name']).to.be.equal('Juan')
      expect(res.body['last_name']).to.be.equal('Palmer')
      expect(res.headers['content-type']).to.be.equal('application/json')


      
      //Using wrap para obtener la sintaxis normal de cypress
      cy.wrap(res).its('status').should('eq', 200)
      cy.wrap(res).its('headers').its('content-type').should('include', 'application/json')
      cy.wrap(res).its('body').its('first_name').should('eq', 'Juan')
      cy.wrap(res).its('body').its('last_name').should('eq', 'Palmer')
    })
    
  })


})