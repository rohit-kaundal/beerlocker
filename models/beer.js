
//Load mongoose
var mongoose = require('mongoose');

//Define schema

var BeerSchema  = new mongoose.Schema({
	name: String,
	type: String,
	qty: Number
});

// Export the model
module.exports = mongoose.model('Beer', BeerSchema);