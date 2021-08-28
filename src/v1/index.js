const express = require("express");
const DBClient = require("../apis/DBClient.js");

const router = express.Router();

router.get("/documents", async (req, res) => {
    const client = new DBClient();
    await client.connect();

    const documents = await client.getDocuments();
    await client.disconnect();

    res.json(documents);
});

router.get("/documents/:id", async (req, res) => {
    const client = new DBClient();
    await client.connect();

    const document = await client.getDocument(req.params.id);
    await client.disconnect();

    res.json(document);
});

router.put("/documents/:id", async (req, res) => {
    const client = new DBClient();
    await client.connect();

    await client.updateDocument(req.params.id, req.body);

    const document = await client.getDocument(req.params.id);
    await client.disconnect();

    res.json(document);
});

router.post("/documents", async (req, res) => {
    const client = new DBClient();
    await client.connect();

    const document = await client.createDocument(req.body);
    await client.disconnect();

    res.json(document);
});

module.exports = router;