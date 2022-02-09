import { makeExecutableSchema } from '@graphql-tools/schema'

import CategoryModule from './Categories/index.js'

export default {
    typeDefs: [
        CategoryModule.typeDefs,
    ],
    resolvers: [
        CategoryModule.resolvers,
    ]
}