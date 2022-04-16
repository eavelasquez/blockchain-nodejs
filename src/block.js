"use strict";

const SHA256 = require("crypto-js/sha256");
const hex2ascii = require("hex2ascii");

module.exports = class Block {
  /**
   * @description - This method is constructor for the Block class.
   * @param {*} data - Data to be added to the block.
   */
  constructor(data) {
    this.hash = null;
    this.height = 0;
    this.body = Buffer.from(JSON.stringify(data).toString("hex"));
    this.timestamp = 0;
    this.previousHash = null;
  }

  /**
   * @description - This method is used to validate a hash.
   */
  validate() {
    const self = this;
    return new Promise((resolve, _reject) => {
      let currentHash = self.hash;

      self.hash = SHA256(JSON.stringify({ ...self, hash: null })).toString();

      currentHash != self.hash ? resolve(false) : resolve(true);
    });
  }

  /**
   * @description - This method is used to calculate the hash of the block.
   * @returns {*} - Returns the data of the block.
   */
  getBlockData() {
    const self = this;
    return new Promise((resolve, reject) => {
      let encodedData = self.body;
      let decodedData = hex2ascii(encodedData);
      let dataObject = JSON.parse(decodedData);

      if (dataObject === "Genesis Block") {
        reject(new Error("This is the Genesis Block"));
      }

      resolve(dataObject);
    });
  }

  /**
   * @description - This method is used to convert the block to a string.
   * @returns {string} - Returns the block as a string.
   */
  toString() {
    const { hash, height, body, timestamp, previousHash } = this;
    return `Block -
      hash: ${hash}
      height: ${height}
      body: ${body}
      timestamp: ${timestamp}
      previousHash: ${previousHash}
      ----------------------------
    `;
  }
};
