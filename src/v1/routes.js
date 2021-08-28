const DBClient = require("../apis/DBClient.js");

const getDocuments = async (req, res) => {
    const client = new DBClient();
    await client.connect();

    const documents = await client.getDocuments();
    await client.disconnect();

    res.json(documents);
};

const getDocument = async (req, res) => {
    const client = new DBClient();
    await client.connect();

    const document = await client.getDocument(req.params.id);
    await client.disconnect();

    res.json(document);
};

const updateDocument = async (req, res) => {
    const client = new DBClient();
    await client.connect();

    await client.updateDocument(req.params.id, req.body);

    const document = await client.getDocument(req.params.id);
    await client.disconnect();

    res.json(document);
};

const createDocument = async (req, res) => {
    const client = new DBClient();
    await client.connect();

    const document = await client.createDocument(req.body);
    await client.disconnect();

    res.json(document);
}

module.exports = {
    getDocument,
    getDocuments,
    updateDocument,
    createDocument
};