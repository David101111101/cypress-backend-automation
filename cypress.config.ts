import { defineConfig } from "cypress";
// Importing the Allure plugin for Cypress html reports and screenshots
import { allureCypress } from "allure-cypress/reporter";

// Importing MySQL library to handle database connections
import mysql from "mysql2";

const values = {};


export default defineConfig({
 // reporter: "cypress-multi-reporters",
 // reporterOptions: {
 //   configFile: "reporter-config.json",
 // },

  e2e: {
    setupNodeEvents: (on, config) => {
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      // Custom task plugin to query the database
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


    








     

      


      // Custom task plugin to save data in a variable and use it in multiple tests
          save(textvariable){
            const key = Object.keys(textvariable)[0];
            values[key] = textvariable[key];
            return null;
          },
          getInfo(key) {
            console.log('getInfo called with key:', values);
              return values[key] ?? "There's no value"
               
          }        
        
    

        
     });
     return config;
    },
    env: {
    allureReuseAfterSpec: true
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
