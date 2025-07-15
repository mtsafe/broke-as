const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    setupNodeEvents(on, config) {},
    specPattern: "src/**/*.cy.{js,ts,jsx,tsx}",
    excludeSpecPattern: "**/examples/*.spec.{js,ts,jsx,tsx}",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
