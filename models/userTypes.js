var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userTypesSchema = new Schema({
	name: String,
	num: Number
},{});

mongoose.model('user_types', userTypesSchema);