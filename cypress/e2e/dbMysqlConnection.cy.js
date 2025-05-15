// This test will check if the DB connection is working and if the query returns a result.
describe('Test DB connection with Google Cloud SQL', () => {
  it('should return the current date from the DB', () => {
    cy.task('queryDb', { query: 'SELECT NOW() as now' }).then((result) => {
      expect(result).to.be.an('array');
      expect(result[0]).to.have.property('now');
      cy.log('Current time from DB: ' + result[0].now);
    });
  });
});

