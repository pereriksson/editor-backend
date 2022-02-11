const bcrypt = require("../apis/bcrypt");
const {JWT_SECRET} = require("../constants");
const jwt = require("jsonwebtoken");

const getDocuments = async (req, res) => {
    const client = req.app.get("db");
    await client.connect();

    const documents = await client.getDocuments(req.payload._id);
    await client.disconnect();

    res.json(documents);
};

const getDocument = async (req, res) => {
    const client = req.app.get("db");
    await client.connect();

    const document = await client.getDocument(req.params.id, req.payload._id);
    await client.disconnect();

    res.json(document);
};

const updateDocument = async (req, res) => {
    const client = req.app.get("db");
    await client.connect();

    await client.updateDocument(req.params.id, req.body);

    const document = await client.getDocument(req.params.id);
    await client.disconnect();

    res.json(document);
};

const createDocument = async (req, res) => {
    const client = req.app.get("db");
    await client.connect();

    const parsedJwtToken = jwt.decode(req.headers.authorization.split(" ")[1]);

    const document = await client.createDocument({
        ...req.body,
        collaborators: [
            client.getEntityReference(parsedJwtToken._id)
        ]
    });
    await client.disconnect();

    res.json(document);
}

const login = async (req, res) => {
    const db = req.app.get("db");
    await db.connect();
    const user = await db.getUserByUsername(req.body.username);

    if (!user) {
        res.json({
            success: false,
            error: "Username or password is incorrect."
        });
        return false;
    }

    const passwordsMatch = bcrypt.checkPassword(req.body.password, user.password);

    if (!passwordsMatch) {
        res.json({
            success: false,
            error: "Username or password is incorrect."
        });
        return false;
    }

    const payload = user;

    // Important - do not expose!
    delete payload.password;

    const jwtToken = jwt.sign(payload, JWT_SECRET, {expiresIn: "1h"});

    res.json({
        success: true,
        token: jwtToken,
        user: payload
    });
}

const register = async (req, res) => {
    const db = req.app.get("db");
    await db.connect();

    if (!req.body.username) {
        res.json({
            success: false,
            error: "A username must be supplied."
        });
        return false;
    }

    if (!req.body.password) {
        res.json({
            success: false,
            error: "A password must be supplied."
        });
        return false;
    }

    const existingUser = await db.getUserByUsername(req.body.username);

    if (existingUser) {
        res.json({
            success: false,
            error: "The username is already taken."
        });
        return false;
    }

    const user = await db.createUser({
        username: req.body.username,
        password: req.body.password
    });

    res.send(user);
}

module.exports = {
    getDocument,
    getDocuments,
    updateDocument,
    createDocument,
    login,
    register
};