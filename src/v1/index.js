const express = require("express");
const DBClient = require("../apis/DBClient.js");

const router = express.Router();

router.get("/documents", async (req, res) => {
    const client = new DBClient();

    const documents = await client.getDocuments();

    res.json(documents);
});

router.get("/documents/:id", async(req, res) => {
    const client = new DBClient();

    const document = await client.getDocument(req.params.id);

    res.json(document);
});

module.exports = router;