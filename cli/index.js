"use strict";

const Block = require("./src/block");
const Blockchain = require("./src/blockchain");

async function main() {
  // Create a new blockchain.
  const blockchain = await new Blockchain();

  // Add blocks to the chain.
  await blockchain.addBlock(new Block({ data: "Block 1" }));
  await blockchain.addBlock(new Block({ data: "Block 2" }));
  await blockchain.addBlock(new Block({ data: "Block 3" }));
  await blockchain.addBlock(new Block({ data: "Block 4" }));

  // Call print method to print the chain.
  blockchain.print();
}

// Call main function.
main();
