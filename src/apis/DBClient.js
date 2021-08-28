const {DATABASE_HOSTNAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_DATABASE, DATABASE_COLLECTION} = require("../constants.js");
const {MongoClient} = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

class DBClient {
    async connect() {
        const url = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOSTNAME}`;

        this.client = new MongoClient(url);

        await this.client.connect();
        const db = this.client.db(DATABASE_DATABASE);
        this.collection = db.collection(DATABASE_COLLECTION);
    }

    async disconnect() {
        await this.client.close();
    }

    async getDocuments() {
        const query = {};
        const cursor = await this.collection.find(query);
        const result = await cursor.toArray();
        return result;
    }

    async getDocument(id) {
        const _id = new ObjectId(id);
        const query = {_id};
        const cursor = await this.collection.find(query);
        const result = await cursor.toArray();
        return result[0];
    }

    async updateDocument(id, document) {
        const _id = new ObjectId(id);
        const filter = { _id };

        const update = {
            $set: document
        };
        delete update.$set._id;

        await this.collection.updateOne(filter, update);
    }

    async createDocument(document) {
        const result = await this.collection.insertOne(document);
        document._id = result.insertedId;
        return document;
    }
}

module.exports = DBClient;