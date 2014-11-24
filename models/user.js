var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	email: String,
	firstname: String,
	lastname: String,
	age: Number,
	mobil: String,
	userTypes: [{
		type: Schema.ObjectId,
		ref: 'userTypes'
	}],
	address: {
		type: Schema.ObjectId,
		ref: 'address'
	}
},{_id:false});

mongoose.model('user', userSchema);