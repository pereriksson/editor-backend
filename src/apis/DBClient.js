const {DATABASE_HOSTNAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_DATABASE, DATABASE_COLLECTION} = require("../constants.js");
const {MongoClient} = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

class DBClient {
    async getDocuments() {
        const url = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOSTNAME}`;

        const client = new MongoClient(url);

        await client.connect();
        const db = client.db(DATABASE_DATABASE);
        const documents = db.collection(DATABASE_COLLECTION);

        const query = {};

        const cursor = await documents.find(query);

        const result = await cursor.toArray();

        await client.close();

        return result;
    }

    async getDocument(id) {
        const url = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOSTNAME}`;

        const client = new MongoClient(url);

        await client.connect();
        const db = client.db(DATABASE_DATABASE);
        const documents = db.collection(DATABASE_COLLECTION);

        const _id = new ObjectId(id);
        const query = {_id};

        const cursor = await documents.find(query);

        const result = await cursor.toArray();

        await client.close();

        return result[0];
    }

    async updateDocument(id, document) {
        const url = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOSTNAME}`;

        const client = new MongoClient(url);

        await client.connect();
        const db = client.db(DATABASE_DATABASE);
        const documents = db.collection(DATABASE_COLLECTION);

        const _id = new ObjectId(id);
        const filter = { _id };

        const update = {
            $set: document
        };
        delete update.$set._id;

        await documents.updateOne(filter, update);

        await client.close();
    }
}

module.exports = DBClient;