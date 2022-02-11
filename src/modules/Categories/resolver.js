import model from './model.js'

export default {
    Query: {
        categories: async (_, args) => {
            return await model.categories(args)
        }
    },

    Mutation: {
        addCategories: async (_, args) => {
            try {
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
        
        updateCategories: async (_, args) => {
            try {
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

        deleteCategories: async (_, args) => {
            try {
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