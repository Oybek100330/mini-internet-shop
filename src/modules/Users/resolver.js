import model from './model.js'
import tokenFunction from '../../utils/jwt.js'

export default {
    Query: {
        users: async (_, args) => {
            return await model.users(args)
        }
    },

    Mutation: {
        register: async (_, args) => {
            try {
                const [ user ] = await model.addUser(args)
                return {
					status: 200,
					// message: "The new user has been succesfully registered",
                    token: tokenFunction.sign({ userId: user.user_id}),
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

        login: async (_, args) => {
            try {
                const [ user ] = await model.login(args)
                if(user){
                    return {
                        status: 200,
                        message: "The new user has been succesfully logged in",
                        token: tokenFunction.sign({ userId: user.user_id }),
                        user: user
                    }
                } else throw new Error("Wrong username or password!")
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