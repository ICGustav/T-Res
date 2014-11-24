var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var statesSchema = new Schema({
	name: String,
	type: Number
},{_id:false});

mongoose.model('states', statesSchema);