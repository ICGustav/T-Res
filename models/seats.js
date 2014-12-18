var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var seatsSchema = new Schema({
	pofile: {
		type : Schema.ObjectId,
		ref: 'profiles'
	},
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