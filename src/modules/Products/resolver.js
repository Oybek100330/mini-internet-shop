import model from './model.js'
import { finished } from 'stream/promises'
import { GraphQLUpload } from 'graphql-upload'
import path from 'path'
import fs from 'fs'
import tokenFunction from '../../utils/jwt.js'

export default {

    Upload: GraphQLUpload,

    Query: {
        products: async (_, args) => {
            return await model.products(args)
        }
    },

    Mutation: {
        addProduct: async (_, { product_name, price, short_desc, long_desc, file, category_id }) => {
            try {
                const { token } = req.headers

		        if(!token) {
		        	throw new Error("user is not authorized!")
		        }
            
		        const { userId, agent } = tokenFunction.verify(token)
            
		        if(!(req.headers['user-agent'] == agent)) {
		        	throw new Error("token is invalid!")
		        }

                if(userId != 1) throw new Error("Sorry you are not admin!!!")

                const { createReadStream, filename, mimetype, encoding } = await file
                if(['image/jpeg', 'image/jpg', 'image/png'].indexOf(mimetype) == -1 ) {
                    throw new Error("Filetype must be 'jpeg', 'jpg' or 'png'")
                }
                file = await file
                const [ Product ] = await model.addProduct({ product_name, price, short_desc, long_desc, file, category_id })
                console.log(file);
                const stream = createReadStream()
                const fileAddress = path.join(process.cwd(), 'images', filename)
                const imgUrl = '/images/'+ filename
                const out = fs.createWriteStream(fileAddress)
                stream.pipe(out)
                await finished(out)
                Product.imgUrl = imgUrl
                console.log(Product)

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
                const { token } = req.headers

		        if(!token) {
		        	throw new Error("user is not authorized!")
		        }
            
		        const { userId, agent } = tokenFunction.verify(token)
            
		        if(!(req.headers['user-agent'] == agent)) {
		        	throw new Error("token is invalid!")
		        }

                if(userId != 1) throw new Error("Sorry you are not admin!!!")

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
                const { token } = req.headers

		        if(!token) {
		        	throw new Error("user is not authorized!")
		        }
            
		        const { userId, agent } = tokenFunction.verify(token)
            
		        if(!(req.headers['user-agent'] == agent)) {
		        	throw new Error("token is invalid!")
		        }

                if(userId != 1) throw new Error("Sorry you are not admin!!!")

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

    // File: {
    //     filename: parent => console.log(parent.filename),
    //     mimetype: parent => console.log(parent.mimetype),
    //     encoding: parent => console.log(parent.encoding),
    // }
}