'use strict';

const sha256 = require('crypto-js/sha256');
const Block = require('./block');

module.exports = class Blockchain {
  /**
   * @description - This method is constructor for the Blockchain class.
   */
  constructor() {
    this.chain = [];
    this.height = -1;
    this.initializeChain();
  }

  /**
   * @description - This method is used to initialize the chain.
   */
  async initializeChain() {
    if (this.height === -1) {
      this.addBlock(new Block({ data: "Genesis Block" }));
    }
  }

  /**
   * @description - This method is used to add a block to the chain.
   * @param {Block} block
   * @returns {Promise<Block>}
   */
  addBlock(block) {
    const self = this;
    return new Promise(async (resolve, reject) => {
      block.height = self.chain.length;
      block.timestamp = new Date().getTime().toString().slice(0, -3);

      if (self.chain.length > 0) {
        block.previousHash = self.chain[self.chain.length - 1].hash;
      }

      const errors = await self.validateChain();
      if (errors.length > 0) {
        reject(new Error("This chain is invalid: ", errors));
      }

      // Add block to the chain.
      block.hash = sha256(JSON.stringify(block)).toString();
      self.chain.push(block);
      resolve(block);
    });
  }

  /**
   * @description - This method is used to validate the chain.
   * @returns {Array} - Returns an array of errors.
   */
  validateChain() {
    const self = this;
    const errors = [];
    return new Promise((resolve, _reject) => {
      if (self.chain.length === 0) {
        resolve(errors);
      }

      self.chain.map(async (block) => {
        try {
          const isValid = await block.validate();
          if (!isValid) {
            errors.push(new Error(`The block at height ${block.height} is invalid.`));
          }
        } catch (error) {
          errors.push(error);
        }
      });

      resolve(errors);
    });
  }

  /**
   * @description - This method is used to print the blockchain as a string.
   */
  print() {
    const self = this;
    for (let block of self.chain) {
      console.log(block.toString());
    }
  }
}
