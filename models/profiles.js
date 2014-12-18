var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userProfilesSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'users'
	},
	name: String,
	first_name: String,
	last_name: String,
	below_18: Boolean,
	email: String,
	mobile: String,
	modified: { type: Date, default: Date.now }
},{});

mongoose.model('profiles', userProfilesSchema);