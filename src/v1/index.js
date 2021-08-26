const express = require("express");
const DBClient = require("../apis/DBClient.js");

const router = express.Router();

router.get("/documents", async (req, res) => {
    const client = new DBClient();

    const documents = await client.getDocuments();

    res.json(documents);
});

module.exports = router;