const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLFloat,
    GraphQLNonNull
} = require('graphql');

const UserType = require("./user.js");

const DocumentType = new GraphQLObjectType({
    name: 'Document',
    description: 'This represents a document',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        contents: { type: new GraphQLNonNull(GraphQLString) },
        collaborators: {
            type: new GraphQLList(UserType),
            resolve: async (document, args, req) => {
                await req.app.get("db").connect();
                return document.collaborators.map(async _id => await req.app.get("db").getUser(_id.toString()))
            }
        }
    })
})

module.exports = DocumentType;