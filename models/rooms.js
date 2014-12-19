var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var roomsSchema = new Schema({
	parts: [
		{_id: {
			type : Schema.ObjectId,
			ref: 'parts'
			}
		}],
	name: String,
	positioning: String,
	order: Number
},{});

mongoose.model('rooms', roomsSchema);