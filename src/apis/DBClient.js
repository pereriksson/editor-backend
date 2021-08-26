const {DATABASE_HOSTNAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_DATABASE, DATABASE_COLLECTION} = require("../constants.js");
const {MongoClient} = require("mongodb");

class DBClient {
    async getDocuments() {
        const url = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOSTNAME}`;

        const client = new MongoClient(url);

        await client.connect();
        const db = client.db(DATABASE_DATABASE);
        const documents = db.collection(DATABASE_COLLECTION);

        const query = {};

        const cursor = documents.find(query);

        const result = await cursor.toArray();

        await client.close();

        return result;
    }
}

module.exports = DBClient;