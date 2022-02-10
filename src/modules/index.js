import CategoryModule from './Categories/index.js'
import UserModule from './Users/index.js'

export default {
    typeDefs: [
        CategoryModule.typeDefs,
        UserModule.typeDefs,
    ],
    resolvers: [
        CategoryModule.resolvers,
        UserModule.resolvers,
    ]
}