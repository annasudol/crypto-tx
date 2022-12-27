import { defineConfig } from "cypress";
import cypressMetamask from '@positionex/cypress-metamask-v3/cypress/plugins';
// Load local .env
// SECRET_WORDS = "that olive candy yellow void certain burden result spike leader dose news"
// PASSWORD = TestMetaMask
// METAMASK_VERSION = latest
// NETWORK_NAME = PolygonMumbai
// RPC_URL = https://matic-mumbai.chainstacklabs.com
//   =80001
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
