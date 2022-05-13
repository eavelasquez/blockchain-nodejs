# Blockchain Node.js

## About this project
This project is a Node.js application that is used to create a blockchain. It is a proof of concept about how to create a blockchain in Node.js.

## Run

```bash
npm install
npm start
```

### Output

```bash
Block -
      hash: b2d4584ba9e60abf7adcdb1e47921802c3eb1cfc8efcb22883c58665ad5ef6e0
      height: 0
      body: {"data":"Genesis Block"}
      timestamp: 1650129156
      previousHash: null
      ----------------------------

Block -
      hash: 201f5d435112108c9a1586a5af99485f10ad9559f39c4d87094798407d62c424
      height: 1
      body: {"data":"Block 1"}
      timestamp: 1650129156
      previousHash: b2d4584ba9e60abf7adcdb1e47921802c3eb1cfc8efcb22883c58665ad5ef6e0
      ----------------------------

Block -
      hash: 42ef700d7ba17db4d1a8e283faafa993b00306ddb72daf1e05513bd6d17f4a0f
      height: 2
      body: {"data":"Block 2"}
      timestamp: 1650129156
      previousHash: 201f5d435112108c9a1586a5af99485f10ad9559f39c4d87094798407d62c424
      ----------------------------

Block -
      hash: dbae06fe129a16f0039276215e65f1fa71e5d3b4d581ce943f7c001cf260264f
      height: 3
      body: {"data":"Block 3"}
      timestamp: 1650129156
      previousHash: 42ef700d7ba17db4d1a8e283faafa993b00306ddb72daf1e05513bd6d17f4a0f
      ----------------------------

Block -
      hash: 5f2c1d8e8c00c1df8b2cd0cc308682b88c9d7aec7a98777301fd9f48b4543a0f
      height: 4
      body: {"data":"Block 4"}
      timestamp: 1650129156
      previousHash: dbae06fe129a16f0039276215e65f1fa71e5d3b4d581ce943f7c001cf260264f
      ----------------------------
```
