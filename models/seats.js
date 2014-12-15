var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var seatsSchema = new Schema({
	//user_id: {
	//	type : Schema.ObjectId,
	//	ref: 'users'
	//},
	table: {
		type : Schema.ObjectId,
		ref: 'tables'
	},
	full_name: String,
	below_18: Boolean,
	order: Number,
	state: {
			type : Schema.ObjectId,
			ref: 'states'
		},
	modified: { type: Date, default: Date.now }
},{});

mongoose.model('seats', seatsSchema);