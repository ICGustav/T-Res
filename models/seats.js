var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var seatsSchema = new Schema({
	user: {
		type : Schema.ObjectId,
		ref: 'users'
	},
	name: String,
	order: Number,
	state: {
		type: Schema.ObjectId,
		ref: 'states'
	}
},{_id:false});

mongoose.model('seats', seatsSchema);