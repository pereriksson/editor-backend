// Database
const DATABASE_HOSTNAME = process.env.DATABASE_HOSTNAME;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_DATABASE = process.env.DATABASE_DATABASE;
const DATABASE_DOCUMENTS_COLLECTION = process.env.DATABASE_DOCUMENTS_COLLECTION;
const DATABASE_USERS_COLLECTION = process.env.DATABASE_USERS_COLLECTION;

// JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Bcrypt
const BCRYPT_SALT_ROUNDS = 12;

// Express
const PORT = process.env.PORT || 1337;
const WEBSOCKET_CORS_HOSTNAMES = process.env.WEBSOCKET_CORS_HOSTNAMES;

module.exports = {
    DATABASE_HOSTNAME,
    DATABASE_PASSWORD,
    DATABASE_USER,
    DATABASE_DATABASE,
    DATABASE_DOCUMENTS_COLLECTION,
    DATABASE_USERS_COLLECTION,
    PORT,
    WEBSOCKET_CORS_HOSTNAMES,
    BCRYPT_SALT_ROUNDS,
    JWT_SECRET
}