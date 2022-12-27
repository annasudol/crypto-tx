import { defineConfig } from "cypress";
import cypressMetamask from '@positionex/cypress-metamask-v3/cypress/plugins';

require('dotenv').config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      cypressMetamask(on, {
        secretWordsOrPrivateKey: process.env.SECRET_WORDS,
        network: 'PolygonMumbai',
        password: 'TestMetaMask',
      });
      return config;
    },
  },
});
