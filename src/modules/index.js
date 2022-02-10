import CategoryModule from './Categories/index.js'
import UserModule from './Users/index.js'
import OrderModule from './Orders/index.js'
import ProductModule from './Products/index.js'
import OrderProductModule from './Order_products/index.js'

export default {
    typeDefs: [
        CategoryModule.typeDefs,
        UserModule.typeDefs,
        OrderModule.typeDefs,
        ProductModule.typeDefs,
        OrderProductModule.typeDefs,
    ],
    resolvers: [
        CategoryModule.resolvers,
        UserModule.resolvers,
        OrderModule.resolvers,
        ProductModule.resolvers,
        OrderProductModule.resolvers,
    ]
}