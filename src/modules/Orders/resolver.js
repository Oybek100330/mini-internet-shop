import model from './model.js'
import tokenFunction from '../../utils/jwt.js'

export default {
    Query: {
        orders: async (_, { order_id, user_id, isPaid, pagination: {page, limit}}, context) => {
            const token = context.token
		        if(!token) {
		        	throw new Error("user is not authorized!")
		        }
            
		        const { userId, userAgent } = tokenFunction.verify(token)
                
                if(!userId) throw new Error("Sorry you are not authorized!!!")
		        if(context.userAgent != userAgent) {
		        	throw new Error("token is invalid!")
		        }
            return await model.orders({ order_id, user_id: userId, isPaid, pagination: {page, limit}})
        }
    },

    Mutation: {
        addOrder: async (_, {user_id, isPaid}, context) => {
            try {
                const token = context.token
		        if(!token) {
		        	throw new Error("user is not authorized!")
		        }
            
		        const { userId, userAgent } = tokenFunction.verify(token)
                
                if(!userId) throw new Error("Sorry you are not authorized!!!")
		        if(context.userAgent != userAgent) {
		        	throw new Error("token is invalid!")
		        }

                const [ order ] = await model.addOrder({user_id: userId, isPaid: "f"})
                return {
					status: 200,
					message: "The order has been succesfully added",
					order: order
				}
            } catch(error) {
				return {
					status: 400,
					message: error.message,
					data: null
				}
			}
        },
        
        updateOrder: async (_, { order_id, isPaid, user_id }, context) => {
            try {
                const token = context.token
		        if(!token) {
		        	throw new Error("user is not authorized!")
		        }
            
		        const { userId, userAgent } = tokenFunction.verify(token)
                
                if(!userId) throw new Error("Sorry you are not authorized!!!")
		        if(context.userAgent != userAgent) {
		        	throw new Error("token is invalid!")
		        }
                const [ order ] = await model.updateOrder({ order_id, isPaid, user_id: userId })
                if(order){
                    return {
                        status: 200,
                        message: "The order has been succesfully updated",
                        order: order
                    }
                } else throw new Error("There is no such order!")
            } catch(error) {
				return {
					status: 400,
					message: error.message,
					data: null
				}
			}
        }, 

        deleteOrder: async (_, { order_id, user_id }, context) => {
            try {
                const token = context.token
		        if(!token) {
		        	throw new Error("user is not authorized!")
		        }
            
		        const { userId, userAgent } = tokenFunction.verify(token)
                
                if(!userId) throw new Error("Sorry you are not authorized!!!")
		        if(context.userAgent != userAgent) {
		        	throw new Error("token is invalid!")
		        }
                const [ order ] = await model.deleteOrder({ order_id, user_id: userId })
                if(order){
                    return {
                        status: 200,
                        message: "The order has been succesfully deleted",
                        order: order
                    }
                } else throw new Error("There is no such order!")
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