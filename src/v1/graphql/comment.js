const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLFloat,
    GraphQLNonNull
} = require('graphql');

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    description: 'This represents a comment',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLString) },
        node: { type: new GraphQLNonNull(GraphQLFloat) },
        comment: { type: new GraphQLNonNull(GraphQLString) }
    })
})

module.exports = CommentType;