var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Feed = mongoose.model('Feed');

router.get('/likes',function(req, res, next){
	Feed.find({})
	.sort({'likes': -1})
	.limit(20)
	.exec(function(err, feeds) {
    	res.json(feeds);
	})
})

router.get('/comments',function(req, res, next){
	Feed.find({})
	.sort({'comments': -1})
	.limit(20)
	.exec(function(err, feeds) {
    	res.json(feeds);
	})
})

router.get('/more/:category/:count',function(req, res, next){
	var query = {};
	query[req.params.category] = -1;
	var count = req.params.count;
	Feed.find({})
	.sort(query)
	.skip(count * 20)
	.limit(20)
	.exec(function(err, feeds) {
    	res.json(feeds);
	})
})

router.get('/postcount',function(req, res, next){
	var count = req.params.count;
	Feed
	.count(function(err, count) {
		console.log(count);
    	res.json(count);
	})
})

router.get('/likesgrowth',function(req, res, next){
	Feed.find({})
	.sort({'likesGrowth': -1})
	.limit(20)
	.exec(function(err, feeds) {
    	res.json(feeds);
	})
})

router.get('/commentsgrowth',function(req, res, next){
	Feed.find({})
	.sort({'commentsGrowth': -1})
	.limit(20)
	.exec(function(err, feeds) {
    	res.json(feeds);
	})
})

router.delete('/delete/:_id',function(req, res, next){
	var id = req.params._id;
	Feed.findOneAndRemove({_id:id}, function(err, status) {
		//console.log(status);
		res.json(status);
	  });
})

module.exports = router;
