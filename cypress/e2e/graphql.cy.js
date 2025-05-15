describe   ('GraphQL API Tests', () => {
      it('should return all users from graphql', async () =>  {

        const gqlQuery = `query pokemons($limit: Int, $offset: Int) {
          pokemons(limit: $limit, offset: $offset) {
            count
            next
            previous
            status
            message
              results{
                url
                name
                image
              }
            }
          
        }`
        const gqlVariables = {
          limit: 20,
          offset: 0
        }
        cy.request({
          method: 'POST',
          url: 'https://graphql-pokeapi.graphcdn.app/',
          body: {
            query: gqlQuery,
            variables: gqlVariables
          }
        }).then((response) => {
            cy.log(response)
          expect(response.status).to.eq(200)
          expect(response.body.data.pokemons.count).to.be.greaterThan(0)
        })
      })
    })