const express = require("express");
const {GRAPHQL_GRAPHIQL} = require("../constants");
const {getDocuments, getDocument, updateDocument, createDocument, login, register, invite} = require("./routes.js");
const {GraphQLSchema} = require("graphql");
const RootQueryType = require("./graphql/root.js");
const {graphqlHTTP} = require("express-graphql");

const router = express.Router();

router.get("/documents", getDocuments);
router.get("/documents/:id", getDocument);
router.put("/documents/:id", updateDocument);
router.post("/documents", createDocument);
router.post("/login", login);
router.post("/register", register);
router.post("/invite", invite);

const schema = new GraphQLSchema({
    query: RootQueryType
});

router.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: GRAPHQL_GRAPHIQL
}))

module.exports = router;