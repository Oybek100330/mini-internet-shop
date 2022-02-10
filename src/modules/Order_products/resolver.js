import model from './model.js'

export default {
    Query: {
        orderProducts: async (_, args) => {
            return await model.orderProducts(args)
        }
    },

    Mutation: {
        addOrderProducts: async (_, args) => {
            try {
                const [ orderProduct ] = await model.addOrderProducts(args)
                return {
					status: 200,
					message: "The orderProduct has been succesfully added",
					orderProduct: orderProduct
				}
            } catch(error) {
				return {
					status: 400,
					message: error.message,
					data: null
				}
			}
        },
        
        updateOrderProducts: async (_, args) => {
            try {
                const [ orderProduct ] = await model.updateOrderProducts(args)
                if(orderProduct){
                    return {
                        status: 200,
                        message: "The orderProduct has been succesfully updated",
                        orderProduct: orderProduct
                    }
                } else throw new Error("There is no such orderProduct!")
            } catch(error) {
				return {
					status: 400,
					message: error.message,
					data: null
				}
			}
        },

        deleteOrderProducts: async (_, args) => {
            try {
                const [ orderProduct ] = await model.deleteOrderProducts(args)
                if(orderProduct){
                    return {
                        status: 200,
                        message: "The product has been succesfully deleted",
                        orderProduct: orderProduct
                    }
                } else throw new Error("There is no such orderProduct!")
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