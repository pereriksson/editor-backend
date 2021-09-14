const {DATABASE_HOSTNAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_DATABASE, DATABASE_USERS_COLLECTION,DATABASE_DOCUMENTS_COLLECTION} = require("../constants.js");
const {MongoClient} = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

class DBClient {
    getEntityReference(id) {
        return ObjectId(id);
    }

    async connect() {
        const auth = (DATABASE_USER && DATABASE_PASSWORD) ?
            `${DATABASE_USER}:${DATABASE_PASSWORD}@`
            : "";

        const url = `mongodb://${auth}${DATABASE_HOSTNAME}`;

        this.client = new MongoClient(url);

        await this.client.connect();
        this.db = this.client.db(DATABASE_DATABASE);
    }

    async disconnect() {
        await this.client.close();
    }

    async createCollection(name) {
        await this.db.createCollection(name);
    }

    async dropCollection(name) {
        await this.db.collection(name).drop();
    }

    async getDocuments() {
        this.usersCollection = this.db.collection(DATABASE_USERS_COLLECTION);
        this.documentsCollection = this.db.collection(DATABASE_DOCUMENTS_COLLECTION);
        const query = {};
        const cursor = await this.documentsCollection.find(query);
        const result = await cursor.toArray();
        return result;
    }

    async getUser(id) {
        this.usersCollection = this.db.collection(DATABASE_USERS_COLLECTION);
        this.documentsCollection = this.db.collection(DATABASE_DOCUMENTS_COLLECTION);
        const _id = new ObjectId(id);
        const query = {_id};
        const cursor = await this.usersCollection.find(query);
        const result = await cursor.toArray();
        return result[0];
    }

    async getUserByUsername(username) {
        this.usersCollection = this.db.collection(DATABASE_USERS_COLLECTION);
        this.documentsCollection = this.db.collection(DATABASE_DOCUMENTS_COLLECTION);
        const query = {username};
        const cursor = await this.usersCollection.find(query);
        const result = await cursor.toArray();

        return result[0];
    }

    async getDocument(id) {
        this.usersCollection = this.db.collection(DATABASE_USERS_COLLECTION);
        this.documentsCollection = this.db.collection(DATABASE_DOCUMENTS_COLLECTION);
        const _id = new ObjectId(id);
        const query = {_id};
        const cursor = await this.documentsCollection.find(query);
        const result = await cursor.toArray();
        return result[0];
    }

    async updateDocument(id, document) {
        this.usersCollection = this.db.collection(DATABASE_USERS_COLLECTION);
        this.documentsCollection = this.db.collection(DATABASE_DOCUMENTS_COLLECTION);
        const _id = new ObjectId(id);
        const filter = { _id };

        const update = {
            $set: document
        };
        delete update.$set._id;

        await this.documentsCollection.updateOne(filter, update);
    }

    async createDocument(document) {
        this.usersCollection = this.db.collection(DATABASE_USERS_COLLECTION);
        this.documentsCollection = this.db.collection(DATABASE_DOCUMENTS_COLLECTION);
        const result = await this.documentsCollection.insertOne(document);
        document._id = result.insertedId;
        return document;
    }

    async createUser(user) {
        this.usersCollection = this.db.collection(DATABASE_USERS_COLLECTION);
        this.documentsCollection = this.db.collection(DATABASE_DOCUMENTS_COLLECTION);
        const result = await this.usersCollection.insertOne(user);
        user._id = result.insertedId;
        return user;
    }
}

module.exports = DBClient;