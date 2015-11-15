//TO DO:
//      "A POST" 
//      GET JSON
//      CHECK IF JSON LOGIN IS CORRECT
//           IF IT IS CORRECT 
//                CHECK IF THERE IS ALREADY DATA UNDER THAT NAME, REPLACE IT
//                OTHERWISE STORE IN MONGODB
//           OTHERWISE dowhat?
//      "A GET" WITH A LOGIN
//      RETURN THE LAST KNOWN LOCATION OF THAT LOGIN
//      "A GET"
//      RETURN HTML WITH ALL PREVIOUS CHECKINS IN THE FOLLOWING FORM:
//           kaytea checked in at 41.903056, 12.454444 on 
//           2015-02-22T04:53:57.214Z and wrote "Hello World".

//Initalizations
var express = require('express');
var bodyParser = require('body-parser');// Required for HTTP query or post
var validator = require('validator');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongo initialization and connect to database
// nodemongoexample is the name of the database
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://heroku_mkb3pmd4:rth4e48hvh5c0rk58sbvht301b@ds053944.mongolab.com:53944/heroku_mkb3pmd4';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	if(!error){
		console.log("Server Connection Successfull!");	
	}
});
var login_list = ['mchow', 'kaytea', 'CindyLytle', 'BenHarris', 'JeremyMaletic', 'LeeMiller', 'EricDapper', 'RichRumfelt', 'VanAmmerman', 'VicJohnson', 'ErinHolleman', 'PatFitzgerald', 'CheriVasquez', 'HarleyRhoden', 'JanetGage', 'HarleyConnell', 'GlendaMaletic', 'JeffSoulen', 'MarkHair', 'RichardDrake', 'CalvinStruthers', 'LeslieDapper', 'JefflynGage', 'PaulRamsey', 'BobPicky', 'RonConnelly', 'FrancieCarmody', 'ColleenSayers', 'TomDapper', 'MatthewKerr', 'RichBiggerstaff', 'MarkHarris', 'JerryRumfelt', 'JoshWright', 'LindyContreras', 'CameronGregory', 'MarkStruthers', 'TravisJohnson', 'RobertHeller', 'CalvinMoseley', 'HawkVasquez', 'LayneDapper', 'HarleyIsdale', 'GaylaSoulen', 'MatthewRichards', 'RoyDuke', 'GaylaRodriquez', 'FrancieGeraghty', 'LisaLytle', 'ErinHair', 'CalvinGraham', 'VanRhoden', 'KeithRumfelt', 'GlendaSmith', 'KathrynJohnson', 'FredVandeVorde', 'SheriMcKelvey', 'RoyMiller', 'PatIsdale', 'JoseRodriquez', 'KelleyRumfelt', 'JanetKinsey', 'RonCampbell', 'BenKerr', 'RobDennison', 'BobOwens', 'CherylLytle', 'LisaSoulen', 'TravisDuke', 'CindyGregory', 'JoyceVandeVorde', 'MatthewScholl', 'RobJohnson', 'EricHawthorn', 'CameronRodriquez', 'JoshRamsey', 'CalvinDuke', 'SheriHeller', 'LeaAmmerman', 'LayneVasquez', 'IMConnell', 'BenHauenstein', 'ColleenKerr', 'HawkRichards', 'LeaIsdale', 'RickSoulen', 'RoyMcFatter', 'KyleContreras', 'MaryHeller', 'KathrynFitzgerald', 'JanetRiedel', 'PatHawthorn', 'KeithHauenstein', 'BenRichards', 'RickVasquez', 'KelleyAmmerman', 'EvanConnelly', 'KendallRumfelt', 'TravisIsdale', 'RobContreras', 'JavierRussell', 'ColleenCampbell', 'JeremyConnelly', 'BenKinsey', 'JanetScholl', 'PaulaLewis', 'LeslieMcFatter', 'MatthewMcAda', 'LeeMuilman', 'KyleMoseley', 'JeffRhoden', 'AnitaHolleman', 'JefflynMcKelvey', 'BobContreras', 'RobFitzgerald', 'BenJohnson'];

app.post('/sendLocation', function(req, res){
	console.log('hello world: sendLocation');
	//get the data from the post
	var login = req.body.login;
	var lat = req.body.lat;
	var lng = req.body.lng;
	var msg = req.body.message;
	console.log(login);
	console.log(lat);
	console.log(lng);
	console.log(msg); 

	db.collection('people', function(err, collection){
		db.collection('people').insert("{'login': login}", function(er, element){
			console.log("Insert Successfull!");
		});
	});

if (typeof login === 'string' && Number(lat) && Number(lng) && typeof msg === 'string'){
	console.log("Data is valid!");
}else{
	console.log("Data is not valid!");
}
	//if the login is valid, put the info into the db
});

app.get('/latest.json', function(req, res){
	console.log('hello world: latest.json');
});

app.get('/', function(req, res){
	console.log('hello world: root');
	res.sendfile(__dirname + '/index.html');
	
});

app.listen(process.env.PORT || 3000);

