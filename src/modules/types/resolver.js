import { GraphQLScalarType, Kind } from 'graphql'
import { GraphQLUpload } from 'graphql-upload'


const ageScalar = new GraphQLScalarType({
	name: 'Age',
	description: 'This is an positive integer value for representing person\'s age. Range from 1-100',
	serialize: checkAge, 
	parseValue: checkAge,
	parseLiteral: function (AST) {
		if(AST.kind == Kind.INT) {
			return checkAge(AST.value)
		} else throw new Error("Age value must Int!")
	}
})

function checkAge (value) {
	if(!Number.isInteger(+value)) throw new Error("Age value must be Int!")
	if(value < 1 || value > 100) throw new Error("Age value must be between 1-100!")

	return value
}



const contactScalar = new GraphQLScalarType({
	name: 'Contact',
	description: 'This is a string for representing contacts',
	serialize: checkContact, 
	parseValue: checkContact,
	parseLiteral: function (AST) {
		if(AST.kind == Kind.STRING) {
			return checkContact(AST.value)
		} else throw new Error("Contact value must String!")
	}
})

function checkContact (value) {
	if(!(typeof value == 'string')) throw new Error("Contact value must be String!")
	if(!(/^998[389][012345789][0-9]{7}$/).test(value)) throw new Error("Contact value must be valid contact!")
	
	return value
}


export default {
	Age: ageScalar,
	Contact: contactScalar,
	Upload: GraphQLUpload,

	Gender: {
		male: 1,
		female: 2
	}
}