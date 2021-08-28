class DBClient {
    constructor() {
        this.documents = []
    }

    generateId() {
        return [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    }

    connect() {
        return Promise.resolve();
    }

    disconnect() {
        return Promise.resolve();
    }

    getDocuments() {
        return this.documents;
    }

    async getDocument(id) {
        return this.documents.find(d => d._id === id);
    }

    async updateDocument(_id, document) {
        const index = this.documents.findIndex(d => d._id === _id);
        for (const [key, value] of Object.entries(document)) {
            this.documents[index][key] = value;
        }
        return this.documents[index];
    }

    async createDocument(document) {
        document._id = this.generateId();
        this.documents.push(document);
        return document;
    }
}

module.exports = DBClient;