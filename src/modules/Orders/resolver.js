import model from './model.js'

export default {
    Query: {
        orders: async (_, args) => {
            return await model.orders(args)
        }
    },

    Mutation: {
        addOrder: async (_, args) => {
            try {
                const [ order ] = await model.addOrder(args)
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
        
        updateOrder: async (_, args) => {
            try {
                const [ order ] = await model.updateOrder(args)
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

        deleteOrder: async (_, args) => {
            try {
                const [ order ] = await model.deleteOrder(args)
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