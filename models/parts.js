var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var partsSchema = new Schema({
	tables: [{
		type : Schema.ObjectId,
		ref: 'tables'
	}],
	name: String,
	order: Number,
	state: {
		type: Schema.ObjectId,
		ref: 'states'
	}
},{_id:false});

mongoose.model('parts', partsSchema);