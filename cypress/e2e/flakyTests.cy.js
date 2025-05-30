// This test suite is designed to demonstrate flaky tests.
describe('Flaky Tests', () => {
    it('should pass on first run', () => {
        cy.visit('https://example.com');
        cy.get('h1').should('contain', 'Example Domain');
    });

    it('should fail on second run', () => {
        cy.visit('https://example.com');
        cy.get('h1').should('contain', 'Non-existent Text'); // This will fail
    });

    it('should pass on third run', () => {
        cy.visit('https://example.com');
        cy.get('h1').should('contain', 'Example Domain');
    });
});
