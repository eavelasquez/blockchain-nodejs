# Blockchain Node.js API

## About this project

This project is a Node.js API for the Ethereum blockchain that can be used to interact with the Contacts smart contract. It was built using [Truffle Framework](https://trufflesuite.com/truffle/) to compile and deploy the smart contract in [Ganache](https://trufflesuite.com/ganache/) that allows us to quickly start an Ethereum blockchain.

## Prerequisites

  * [Node.js](https://nodejs.org/) - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
  * [Ganache](https://trufflesuite.com/ganache/) - Ganache is a test network that runs on top of the [Ethereum Virtual Machine](https://ethereum.org/).
  * [Truffle Framework](https://trufflesuite.com/truffle/) - Truffle is a tool that helps us compile and deploy our smart contract.
  * [MetaMask](https://metamask.io/) - MetaMask is a browser extension that allows us to interact with the Ethereum blockchain.

## Setup Instructions

1. Setting up the environment

    1. Install Node.js [here](https://nodejs.org/en/download/).
    1. Install Truffle (`npm install truffle -g`) and Download Ganache (quick-start a blockchain instance option).
    1. Install MetaMask [here](https://metamask.io/).

1. Setting up Metamask

    1. Recovery account using seed phrase provided in the Ganache environment.
    1. Add Ganache network to MetaMask.
        - Network Name: Ganache
        - RPC URL: http://localhost:7545
        - Chain ID: 1337
        - Currency Symbol: ETH
    1. Add the smart contract address to the `contractAddress` variable in the `config.js` file.

1. Setting up API

    To install dependencies, run `pnpm install`.
    To run the API, run `pnpm start`.

1. Deploying the smart contract

    Run `npm run deploy:contracts` to deploy the smart contract (requires `truffle` globally installed).

## API

  * GET /api/contacts
    * Returns all the contacts in the blockchain.
  * GET /api/contacts/:id
    * Returns the contact information for the given id.
    * Returns `null` if the address is not found.
  * POST /api/contacts { string name, string phone }
    * Creates a new contact.
    * Returns the contact information.
  * PUT /api/contacts/:id { string name, string phone }
    * Updates the contact information for the given id.
    * Returns the contact information.
  * DELETE /api/contacts/:id
    * Deletes the contact information for the given id.
    * Returns `null` if the id is not found.

### Example

This is an example body for a POST and PUT request:

```json
{
  "name": "Ai",
  "phone": "777-777-5555"
}
```
