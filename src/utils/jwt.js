import jwt from 'jsonwebtoken'
const TOKEN_TIME = 60 * 60 * 24

export default {
	sign: (payload) => jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: TOKEN_TIME }),
	verify: (token) => jwt.verify(token, process.env.TOKEN_KEY)
}