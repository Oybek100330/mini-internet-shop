import queryParser from './helpers/queryParser.js'

export default function ({ req, res }) {
	const { operation, fieldName, variables } = queryParser(req.body)
	// console.log(operation, fieldName, variables)
	if(fieldName == '__schema') return 

	return
}
