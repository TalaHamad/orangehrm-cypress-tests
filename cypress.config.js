const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",

    async setupNodeEvents(on, config) {
      return require("./cypress/plugins")(on, config);
    },

    specPattern: "cypress/e2e/**/*.feature",
  },
});
