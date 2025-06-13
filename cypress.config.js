const { defineConfig } = require('cypress');
const { allureCypress } = require("allure-cypress/reporter");
const mysql = require("mysql2");

const values = {};

module.exports = defineConfig({
  e2e: {
    setupNodeEvents: (on, config) => {
      // Setup Allure plugin
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });

      // Register custom tasks
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

        save(textvariable) {
          const key = Object.keys(textvariable)[0];
          values[key] = textvariable[key];
          return null;
        },

        getInfo(key) {
          console.log('getInfo called with key:', key, '→', values[key]);
          return values[key] ?? "There's no value";
        },
      });

      return config;
    },

    env: {
      allureReuseAfterSpec: true,
    },

    excludeSpecPattern: [
      "**/1-getting-started/*.js",
      "**/2-advanced-examples/*.js",
    ],

   // baseUrl: "http://localhost:3000",
   baseUrl: " http://host.docker.internal:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
