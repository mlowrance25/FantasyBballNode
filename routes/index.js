var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
	console.log('We are here');
	res.render('index',{
		title : 'Fantasy Helper'
	});
});

module.exports = router;
