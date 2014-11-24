var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userTypesSchema = new Schema({
	name: String,
	type: Number
},{_id:false});

mongoose.model('userTypes', userTypesSchema);