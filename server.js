// load express
var express = require('express');
//Load mongoose driver
var mongoose = require('mongoose');
// Load body parser
var bodyParser = require('body-parser');
// Load Beer Model
var Beer = require('./models/beer.js');

//Connect to db
//mongoose.connect('mongodb://localhost:27017/beerlocker');

// Init app
var app = express();

//Use body parser
app.use(bodyParser.urlencoded({
	extended:true
}));

//Set port
var port = process.env.port || 3000;

// Create express router
var router = express.Router();

// Main route
router.get('/', function(req,res){
	res.json({name:"BeerLocker API", ver:'1.0.0', author:'Rohit Kaundal'});
});


// Registering beer route
var beerRoutes  = router.route('/beers');
// Configure route

//Create beer
beerRoutes.post(function(req,res){
	// create beer model
	var beer = new Beer();

	// Set beer properties
	beer.name = req.body.name;
	beer.type = req.body.type;
	beer.qty = req.body.qty;

	beer.save(function(err){
		if(err) res.send(err);
		res.json({message:'Beer added !', data:beer});
	});

});

//Fetch beer
beerRoutes.get(function(req,res){
	Beer.find(function(err,beers){
		if(err) res.send(err);
		res.json(beers);
	});
});

// Single beer route
var singleBeer = router.route('/beers/:beerid');
singleBeer.get(function(req,res){
	Beer.findById(req.body.beerid, function(err,beer){
		if(err) res.send(err);
		res.json(beer);
	});
})


//Register all routes to /apiv1
app.use('/apiv1', router);

//Start server
app.listen(port);

