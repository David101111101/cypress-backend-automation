const { defineConfig } = require("cypress");
const mysql = require("mysql2"); 
const values = {};


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
