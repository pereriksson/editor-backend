const express = require("express");
const {getDocuments, getDocument, updateDocument, createDocument, login} = require("./routes.js");

const router = express.Router();

router.get("/documents", getDocuments);
router.get("/documents/:id", getDocument);
router.put("/documents/:id", updateDocument);
router.post("/documents", createDocument);
router.post("/login", login);

module.exports = router;