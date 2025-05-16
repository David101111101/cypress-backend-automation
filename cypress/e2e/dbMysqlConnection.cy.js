// This test will check if the DB connection is working and if the query returns a result.
describe('Test DB connection with Google Cloud SQL', () => {
  it('should return the current date from the DB', () => {
    cy.task('queryDb', { query: 'SELECT NOW() as now' }).then((result) => {
      expect(result).to.be.an('array');
      expect(result[0]).to.have.property('now');
      cy.log('Current time from DB: ' + result[0].now);
    });
  });

  it.skip('should create the "platzi" table successfully', () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS platzi (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        course VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    cy.task('queryDb', { query: createTableQuery }).then((result) => {
      cy.log('✅ "platzi" table created or already exists.');
    });
  });

  it.skip('should insert a record into the "platzi" table', () => {
    const insertQuery = `
      INSERT INTO platzi (name, course)
      VALUES ('test testing', 'Cypress AutomatinoTesting');
    `;

    cy.task('queryDb', { query: insertQuery }).then((result) => {
      cy.wrap(result.insertId).as('id');// Store the inserted ID for later use and print it in the Cypress log
      cy.log('✅ Record inserted into "platzi" table.');
    });
  });

  it.skip('should retrieve records from the "platzi" table', () => {
    const selectQuery = 'SELECT * FROM platzi';

    cy.task('queryDb', { query: selectQuery }).then((result) => {
      expect(result).to.be.an('array');
      expect(result.length).to.be.greaterThan(0);
      cy.log('Records retrieved from "platzi" table: ', result);
    });
  });

  it.skip('should update a record in the "platzi" table', function() {
    const updateQuery = `UPDATE platzi SET name = 'test testing updated' WHERE id = ${this.id}`;
    
    cy.task('queryDb', { query: updateQuery }).then((result) => {
      expect(result.affectedRows).to.equal(1);
      cy.log(`✅ Record ${this.id} updated in "platzi" table.`);
    });
  });

  it.skip('should delete a record from the "platzi" table', function() {
    // Use the ID stored in the previous test
    const deleteQuery = `DELETE FROM platzi WHERE id = ${this.id}`;

    cy.task('queryDb', { query: deleteQuery }).then((result) => {
      expect(result.affectedRows).to.equal(1);
      cy.log(`✅ Record ${this.id} deleted from "platzi" table.`);
      cy.log('Records retrieved from "platzi" table: ', result);
    });
  })

   it.skip('should drop the "platzi" table successfully', () => {
    const dropTableQuery = 'DROP TABLE platzi';

    cy.task('queryDb', { query: dropTableQuery }).then((result) => {
      cy.log('✅ "platzi" table dropped successfully.');
    });
  })

});

