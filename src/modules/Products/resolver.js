import model from './model.js'
import { finished } from 'stream/promises'
import { GraphQLUpload } from 'graphql-upload'
import path from 'path'
import fs from 'fs'

export default {
    Query: {
        products: async (_, args) => {
            return await model.products(args)
        }
    },

    Mutation: {
        addProduct: async (_, args) => {
            try {
                const { picture } = args 
                const { createReadStream, filename, mimetype, encoding } = await picture
                const stream = createReadStream()
                const fileAddress = path.join(process.cwd(), 'images', filename)
                const imgUrl = 'images'+ filename
                const out = fs.createWriteStream(fileAddress)
                stream.pipe(out)
                await finished(out)
                const [ Product ] = await model.addProduct(args)
                Product.picture = imgUrl
                
		
      		    // return fileAddress
                return {
					status: 200,
					message: "The product has been succesfully added",
					product: Product
				}
            } catch(error) {
				return {
					status: 400,
					message: error.message,
					data: null
				}
			}
        },
        
        updateProduct: async (_, args) => {
            try {
                const [ product ] = await model.updateProduct(args)
                if(product){
                    return {
                        status: 200,
                        message: "The product has been succesfully updated",
                        product: product
                    }
                } else throw new Error("There is no such product!")
            } catch(error) {
				return {
					status: 400,
					message: error.message,
					data: null
				}
			}
        },

        deleteProduct: async (_, args) => {
            try {
                const [ product ] = await model.deleteProduct(args)
                if(product){
                    return {
                        status: 200,
                        message: "The product has been succesfully deleted",
                        product: product
                    }
                } else throw new Error("There is no such product!")
            } catch(error) {
				return {
					status: 400,
					message: error.message,
					data: null
				}
			}
        }
    },

    Upload: GraphQLUpload
}