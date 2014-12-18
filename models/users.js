var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usersSchema = new Schema({
	profile: {
		type: Schema.ObjectId,
		ref: 'profiles'
	},
	seats: [{
		type: Schema.ObjectId,
		ref: 'seats'
	}],
	userTypes: [{
		type: Schema.ObjectId,
		ref: 'userTypes'
	}],
	address: {
		type: Schema.ObjectId,
		ref: 'address'
	}
},{});

mongoose.model('users', usersSchema);