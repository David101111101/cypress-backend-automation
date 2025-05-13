describe('Probando el Header de la API', () => {
  it('Validar el header y el content type de la API', () => {
      cy.request('employees').its('headers').its('content-type').should('include','application/json');
  })
}) 