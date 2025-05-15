const { defineConfig } = require("cypress");
const mysql = require("mysql2"); 

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        queryDb({ query }) {
          const connection = mysql.createConnection({
            host: config.env.DB_HOST,
            user: config.env.DB_USER,
            password: config.env.DB_PASSWORD,
            database: config.env.DB_NAME,
            port: config.env.DB_PORT || 3306,
          });

          return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
              if (error) {
                 console.error('DB Query Error:', error);

                reject(error);
              } else {
                resolve(results);
              }
              connection.end();
            });
          });
        },
      });

      return config;
    },

    excludeSpecPattern: [
      "**/1-getting-started/*.js",
      "**/2-advanced-examples/*.js",
    ],
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
