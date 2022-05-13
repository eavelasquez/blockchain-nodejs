"use strict";

const cors = require("cors");
const express = require("express");
const mongodb = require("mongodb").MongoClient;
const Web3 = require("web3");

const config = require("./config.js");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("⬅️ ", req.method, req.path, req.body ?? req.query);
  next();
});

let web3;

if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
}

// Connect to MongoDB
mongodb.connect(
  config.mongodbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  async (err, client) => {
    if (err) {
      console.log(`error connecting to MongoDB: ${err}`);
      process.exit(1);
    }

    const db = client.db("Cluster0");
    const accounts = await web3.eth.getAccounts();
    const contacts = new web3.eth.Contract(
      config.contactABI,
      config.contactAddress
    );

    routes(app, db, accounts, contacts);
    app.listen(config.port, () => {
      console.log(`Listening on port ${config.port} 🚀`);
    });
  }
);
