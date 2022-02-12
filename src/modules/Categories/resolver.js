import model from './model.js'
import tokenFunction from '../../utils/jwt.js'

export default {
    Query: {
        categories: async (_, args) => {
            return await model.categories(args)
        }
    },

    Mutation: {
        addCategories: async (_, args, context) => {
            try {
                // console.log(context);
                const token = context.token
		        if(!token) {
		        	throw new Error("user is not authorized!")
		        }
            
		        const { userId, userAgent } = tokenFunction.verify(token)
            
		        if(context.userAgent != userAgent) {
		        	throw new Error("token is invalid!")
		        }

                if(userId != "1") throw new Error("Sorry you are not admin!!!")
                const [ category ] = await model.addCategories(args)
                return {
					status: 200,
					message: "The category has been succesfully added",
					category: category
				}
            } catch(error) {
				return {
					status: 400,
					message: error.message,
					data: null
				}
			}
        },
        
        updateCategories: async (_, args, context) => {
            try {
                const token = context.token
		        if(!token) {
		        	throw new Error("user is not authorized!")
		        }
            
		        const { userId, userAgent } = tokenFunction.verify(token)
            
		        if(context.userAgent != userAgent) {
		        	throw new Error("token is invalid!")
		        }

                if(userId != "1") throw new Error("Sorry you are not admin!!!")

                const [ category ] = await model.updateCategories(args)
                if(category){
                    return {
                        status: 200,
                        message: "The category has been succesfully updated",
                        data: category
                    }
                } else throw new Error("There is no such category!")
            } catch(error) {
				return {
					status: 400,
					message: error.message,
					data: null
				}
			}
        },

        deleteCategories: async (_, args, context) => {
            try {
                const token = context.token
		        if(!token) {
		        	throw new Error("user is not authorized!")
		        }
            
		        const { userId, userAgent } = tokenFunction.verify(token)
            
		        if(context.userAgent != userAgent) {
		        	throw new Error("token is invalid!")
		        }

                if(userId != "1") throw new Error("Sorry you are not admin!!!")

                const [ category ] = await model.deleteCategories(args)
                if(category){
                    return {
                        status: 200,
                        message: "The category has been succesfully deleted",
                        data: category
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
    }
}