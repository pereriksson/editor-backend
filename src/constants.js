// Database
const DATABASE_HOSTNAME = process.env.DATABASE_HOSTNAME || "cluster0.zp46i.mongodb.net";
const DATABASE_USER = process.env.DATABASE_USER || "user";
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "38IjSUubHI0TE4Ij";
const DATABASE_DATABASE = process.env.DATABASE_DATABASE || "editor";
const DATABASE_COLLECTION = process.env.DATABASE_COLLECTION || "documents";

// Express
const PORT = process.env.PORT || 1337;

module.exports = {
    DATABASE_HOSTNAME,
    DATABASE_PASSWORD,
    DATABASE_USER,
    DATABASE_DATABASE,
    DATABASE_COLLECTION,
    PORT
}