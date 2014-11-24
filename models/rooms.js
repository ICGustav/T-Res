var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var roomsSchema = new Schema({
	parts: [{
		type : Schema.ObjectId,
		ref: 'parts'
	}],
	name: String,
	order: Number,
	state: {
		type: Schema.ObjectId,
		ref: 'states'
	}
},{_id:false});

mongoose.model('rooms', roomsSchema);