describe('Probando el Error Message', () => {
  it('Validar el status code fallido y el message de error', () => {
    cy.request({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon/99999999',
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.be.equal(404)
      expect(res.body).to.be.equal('Not Found')
      //expect(res.headers['content-type']).to.be.equal('application/json')
    })
  })


  //uses .to.have.property to get the text from the OBJECT of the error message from the incorrect url of the API
  it('Validar el status code fallido y el message de error Rick and Morty', () => {
    cy.request({
      method: 'GET',
      url: 'https://rickandmortyapi.com/api/location/11111',
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.be.equal(404)
      expect(res.body).to.have.property('error', "Location not found")
    })
  })



})