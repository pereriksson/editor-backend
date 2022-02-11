const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLFloat,
    GraphQLNonNull
} = require('graphql');
const UserType = require("./user.js");
const DocumentType = require("./document.js");
const express = require("express");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        documents: {
            type: new GraphQLList(DocumentType),
            description: 'A list of all documents',
            resolve: async (parent, args, req) => {
                await req.app.get("db").connect();
                return await req.app.get("db").getDocuments(req.payload._id)
            }
        }
    })
})

module.exports = RootQueryType;