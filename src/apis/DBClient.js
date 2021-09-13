const {DATABASE_HOSTNAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_DATABASE, DATABASE_USERS_COLLECTION,DATABASE_DOCUMENTS_COLLECTION} = require("../constants.js");
const {MongoClient} = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

class DBClient {
    getEntityReference(id) {
        return ObjectId(id);
    }

    async connect() {
        const url = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOSTNAME}`;

        this.client = new MongoClient(url);

        await this.client.connect();
        this.db = this.client.db(DATABASE_DATABASE);
        this.usersCollection = this.db.collection(DATABASE_USERS_COLLECTION);
        this.documentsCollection = this.db.collection(DATABASE_DOCUMENTS_COLLECTION);
    }

    async disconnect() {
        await this.client.close();
    }

    async getDocuments() {
        const query = {};
        const cursor = await this.documentsCollection.find(query);
        const result = await cursor.toArray();
        return result;
    }

    async getUser(id) {
        const _id = new ObjectId(id);
        const query = {_id};
        const cursor = await this.usersCollection.find(query);
        const result = await cursor.toArray();
        return result[0];
    }

    async getUserByUsername(username) {
        const query = {username};
        const cursor = await this.usersCollection.find(query);
        const result = await cursor.toArray();
        return result[0];
    }

    async getDocument(id) {
        const _id = new ObjectId(id);
        const query = {_id};
        const cursor = await this.documentsCollection.find(query);
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

        await this.documentsCollection.updateOne(filter, update);
    }

    async createDocument(document) {
        const result = await this.documentsCollection.insertOne(document);
        document._id = result.insertedId;
        return document;
    }
}

module.exports = DBClient;