import { defineConfig } from "cypress";
import cypressMetamask from '@positionex/cypress-metamask-v3/cypress/plugins';

require('dotenv').config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      cypressMetamask(on, {
        secretWordsOrPrivateKey: "that olive candy yellow void certain burden result spike leader dose news",
        network: 'PolygonMumbai',
        password: 'TestMetaMask',
      });
      return config;
      // implement node event listeners here
    },
  },
});
