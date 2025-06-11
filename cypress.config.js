import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";
const mysql = require("mysql2"); 

export default defineConfig({
 // reporter: "cypress-multi-reporters",
 // reporterOptions: {
 //   configFile: "reporter-config.json",
 // },
  e2e: {
    setupNodeEvents: (on, config) => {
      allureCypress(on, config);
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
    experimentalSessionAndOrigin: true,
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
