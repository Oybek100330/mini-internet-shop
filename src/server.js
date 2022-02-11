import { 
    ApolloServerPluginLandingPageGraphQLPlayground, 
    ApolloServerPluginDrainHttpServer,
  } from 'apollo-server-core'
  import { makeExecutableSchema } from '@graphql-tools/schema'
  import { ApolloServer } from 'apollo-server-express'
  import express from 'express'
  import http from 'http'
  import path from 'path'
  import context from './context.js'
  import '../config.js'
  
  import module from './modules/index.js'
import { GraphQLUpload, graphqlUploadExpress } from 'graphql-upload'
  const schema = makeExecutableSchema({
    typeDefs: module.typeDefs,
    resolvers: module.resolvers,
  })
  
  async function startApolloServer() {
  
      const app = express()
      app.use(graphqlUploadExpress())
      app.use('/files/', express.static(path.join(process.cwd(), 'images')))
      const httpServer = http.createServer(app)
  
      const server = new ApolloServer({
          introspection: true,
          context,
          schema: schema,
          plugins: [
              ApolloServerPluginLandingPageGraphQLPlayground(),
              ApolloServerPluginDrainHttpServer({ httpServer })
          ],
      })
      
      await server.start()
      server.applyMiddleware({ app })
      await new Promise(resolve => httpServer.listen({ port: process.env.PORT || 4000 }, resolve))
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  }
  
  startApolloServer()