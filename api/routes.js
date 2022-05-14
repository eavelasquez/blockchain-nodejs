"use strict";

/**
 * @module routes.js
 * @description Routes for the API
 * @author Esteban Velasquez
 * @param {object} app - Express app
 * @param {object} _db - MongoDB connection
 * @param {object} accounts - Web3 accounts
 * @param {object} contract - Web3 contracts
 */
const routes = (app, _db, accounts, contacts) => {
  app.get("/", (_req, res) => {
    res.send("Hello World! I am a contact API");
  });

  app.post("/contacts", async (req, res) => {
    const { name, phone } = req.body;
    const contact = await contacts.methods.createContact(name, phone).send({
      from: accounts[0],
    });

    res.json(contact);
  });

  app.get("/contacts", async (_req, res) => {
    let cache = [];
    const count = await contacts.methods.count().call();

    for (let i = 0; i < count; i++) {
      const contact = await contacts.methods.contacts(i).call();
      cache = [...cache, contact];
    }

    res.json(cache);
  });

  app.get("/contacts/:id", async (req, res) => {
    const { id } = req.params;
    const contact = await contacts.methods.contacts(id).call();

    res.json(contact);
  });

  app.put("/contacts/:id", async (req, res) => {
    const { id } = req.params;
    const { name, phone } = req.body;
    const contact = await contacts.methods.updateContact(id, name, phone).send({
      from: accounts[0],
    });

    res.json(contact);
  });

  app.delete("/contacts/:id", async (req, res) => {
    const { id } = req.params;
    const contact = await contacts.methods.removeContact(id).send({
      from: accounts[0],
    });

    res.json(contact);
  });
};

module.exports = routes;
