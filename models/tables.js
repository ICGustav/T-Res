var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tablesSchema = new Schema({
	seats: [{
		type : Schema.ObjectId,
		ref: 'seats'
	}],
	name: String,
	order: Number,
	state: {
		type: Schema.ObjectId,
		ref: 'states'
	}
},{_id:false});

mongoose.model('tables', tablesSchema);