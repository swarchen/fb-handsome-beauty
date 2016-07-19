var mongoose = require('mongoose');

var FeedSchema = new mongoose.Schema({
	link : {type : String, required : true},
	_id :  {type : String, required : true},
	likes : {type : Number, default : 0},
	comments : {type : Number, default : 0},
	updateDate: { type: Date, default: Date.now },
	likesGrowth: {type : Number, default : 0},
	commentsGrowth: {type : Number, default : 0}
	
});


mongoose.model('Feed', FeedSchema);