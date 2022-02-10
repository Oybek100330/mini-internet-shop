import model from './model.js'

export default {
    Query: {
        users: async (_, args) => {
            return await model.users(args)
        }
    },

    Mutation: {
        addUser: async (_, args) => {
            try {
                const [ user ] = await model.addUser(args)
                return {
					status: 200,
					message: "The user has been succesfully added",
					user: user
				}
            } catch(error) {
				return {
					status: 400,
					message: error.message,
					data: null
				}
			}
        },
        
        updateUser: async (_, args) => {
            try {
                const [ user ] = await model.updateUser(args)
                if(user){
                    return {
                        status: 200,
                        message: "The user has been succesfully updated",
                        user: user
                    }
                } else throw new Error("There is no such user!")
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