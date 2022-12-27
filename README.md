# Crypto tx
This app allows users to connect a wallet and display past transactions for the user address on the Polygon Mumbai testnet.


---

The app was build using:
- [Next.js](https://nextjs.org/)
- [RainbowKit](https://www.rainbowkit.com/)
- [wagmi](https://wagmi.sh/)
- [Chakra UI](https://chakra-ui.com/)

👀 [View the Live Demo](https://crypto-tx-anjasudol.vercel.app/)

## Getting Started

### Add Local dependencies
set up the local configuration file.

```bash
cp .env.local.example .env.local
```

This will create a file called `.env.local`. Open up that file and fill in the `NEXT_PUBLIC_ALCHEMY_API_KEY=` and `NEXT_POLYSCAL_API_KEY=` environment variables.

It is recommended to use Yarn to avoid dependency collisions: [Yarn](https://classic.yarnpkg.com/en/docs/install)

```bash
git clone https://github.com/annasudol/crypto-tx.git
cd crypto-tx

yarn install
yarn run dev
```

This will start up the Next.js development server. Your site will be available at http://localhost:3000/

To interact with the app, be sure to switch your MetaMask Network to Polygon Mumbai Testnet network
