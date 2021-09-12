if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Database
const DATABASE_HOSTNAME = process.env.DATABASE_HOSTNAME;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_DATABASE = process.env.DATABASE_DATABASE;
const DATABASE_COLLECTION = process.env.DATABASE_COLLECTION;

// Express
const PORT = process.env.PORT || 1337;
const WEBSOCKET_CORS_HOSTNAMES = process.env.WEBSOCKET_CORS_HOSTNAMES;

module.exports = {
    DATABASE_HOSTNAME,
    DATABASE_PASSWORD,
    DATABASE_USER,
    DATABASE_DATABASE,
    DATABASE_COLLECTION,
    PORT,
    WEBSOCKET_CORS_HOSTNAMES
}