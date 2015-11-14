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
//           2015-02-22T04:53:57.214Z and wrote "Hello world".


var express = require('express');// Initialization

var bodyParser = require('body-parser');// Required for HTTP query or post
var validator = require('validator');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongo initialization and connect to database
// process.env.MONGOLAB_URI is the environment variable on Heroku for the MongoLab add-on
// process.env.MONGOHQ_URL is the environment variable on Heroku for the MongoHQ add-on
// If environment variables not found, fall back to mongodb://localhost/nodemongoexample
// nodemongoexample is the name of the database
var mongoUri = process.env.MONGOLAB_URI;
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	var document = {title:'food',category:'icecream'}//insert a food item
    db.collection('food').insert(document);
	db = databaseConnection;
});

//var login_list = ['mchow', 'kaytea', 'CindyLytle', 'BenHarris', 'JeremyMaletic', 'LeeMiller', 'EricDapper', 'RichRumfelt', 'VanAmmerman', 'VicJohnson', 'ErinHolleman', 'PatFitzgerald', 'CheriVasquez', 'HarleyRhoden', 'JanetGage', 'HarleyConnell', 'GlendaMaletic', 'JeffSoulen', 'MarkHair', 'RichardDrake', 'CalvinStruthers', 'LeslieDapper', 'JefflynGage', 'PaulRamsey', 'BobPicky', 'RonConnelly', 'FrancieCarmody', 'ColleenSayers', 'TomDapper', 'MatthewKerr', 'RichBiggerstaff', 'MarkHarris', 'JerryRumfelt', 'JoshWright', 'LindyContreras', 'CameronGregory', 'MarkStruthers', 'TravisJohnson', 'RobertHeller', 'CalvinMoseley', 'HawkVasquez', 'LayneDapper', 'HarleyIsdale', 'GaylaSoulen', 'MatthewRichards', 'RoyDuke', 'GaylaRodriquez', 'FrancieGeraghty', 'LisaLytle', 'ErinHair', 'CalvinGraham', 'VanRhoden', 'KeithRumfelt', 'GlendaSmith', 'KathrynJohnson', 'FredVandeVorde', 'SheriMcKelvey', 'RoyMiller', 'PatIsdale', 'JoseRodriquez', 'KelleyRumfelt', 'JanetKinsey', 'RonCampbell', 'BenKerr', 'RobDennison', 'BobOwens', 'CherylLytle', 'LisaSoulen', 'TravisDuke', 'CindyGregory', 'JoyceVandeVorde', 'MatthewScholl', 'RobJohnson', 'EricHawthorn', 'CameronRodriquez', 'JoshRamsey', 'CalvinDuke', 'SheriHeller', 'LeaAmmerman', 'LayneVasquez', 'IMConnell', 'BenHauenstein', 'ColleenKerr', 'HawkRichards', 'LeaIsdale', 'RickSoulen', 'RoyMcFatter', 'KyleContreras', 'MaryHeller', 'KathrynFitzgerald', 'JanetRiedel', 'PatHawthorn', 'KeithHauenstein', 'BenRichards', 'RickVasquez', 'KelleyAmmerman', 'EvanConnelly', 'KendallRumfelt', 'TravisIsdale', 'RobContreras', 'JavierRussell', 'ColleenCampbell', 'JeremyConnelly', 'BenKinsey', 'JanetScholl', 'PaulaLewis', 'LeslieMcFatter', 'MatthewMcAda', 'LeeMuilman', 'KyleMoseley', 'JeffRhoden', 'AnitaHolleman', 'JefflynMcKelvey', 'BobContreras', 'RobFitzgerald', 'BenJohnson'];

/*app.post('/feedme', function(request, response) {
	var food = request.body.food;
	var toInsert = {
		"food": food,
	};
	db.collection('fooditems', function(error, coll) {
		var id = coll.insert(toInsert, function(error, saved) {
			if (error) {
				response.send(500);
			}
			else {
				response.send(200);
			}
	    });
	});
});*/

app.get('/', function(request, response) {
	console.log ("Hi!");
	response.set('Content-Type', 'text/html');
	var indexPage = '';
	db.collection('fooditems', function(err, collection) {
		collection.find().toArray(function(err, cursor) {
			if (!err) {
				indexPage += "<!DOCTYPE HTML><html><head><title>What Did You Feed Me?</title></head><body><h1>What Did You Feed Me?</h1>";
				for (var count = 0; count < cursor.length; count++) {
					indexPage += "<p>You fed me " + cursor[count].food + "!</p>";
				}
				indexPage += "</body></html>"
				response.send(indexPage);
			} else {
				response.send('<!DOCTYPE HTML><html><head><title>What Did You Feed Me?</title></head><body><h1>Whoops, something went terribly wrong!</h1></body></html>');
			}
		});
	});
});

// Oh joy! http://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of
app.listen(process.env.PORT || 3000);

//Initialization
//var express = require('express');

//Required if we need to use HTTP query or post parameters
//var bodyParser = require('body-parser');
//var validator = require('validator');
//var app = express();

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));

//Mongo intitalization
//var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost';
//var MongoClient = require('mongodb').MongoClient, format = require('util').format;
//var db = MongoClient.connnect(mongoUri, function(error, databaseConnection){
//	db = databaseConnection;
//});

//List of accepted usernames

//APP POST EXAMPLE
/*
app.post('/sendLocation', function(request, response){
	var login = request.body.login;
	var lat = request.body.lat;
	var lng = request.body.lng;
	var message = request.body.message;
	var created_at = request.body.created_at;
	var valid_login = false;
	for(int i = 0; i<login_list.length; i++){
		if(login_list[i] == login){
			valid_login = true;
			break;
		}
	}
	if(valid_login == true){
		var toInsert = {
			"login": login,
			"lat": lat,
			"lng": lng,
			"message": message,
			"created_at": created_at,
		};
		db.collection('people', function(error, coll){
			var id = coll.insert(toInsert, function(error, saved){
				if(error){
					response.send({});
				}else{
					//SEND BACK A JSON OF THE DB
					response.send(collection.find(););
				}
			});
		});
	}
*/
//http://stackoverflow.com/questions/4720343/loading-basic-html-in-node-js
/*
var fs = require('fs');

app.use(express.static(__dirname+'/public'));

app.set('port', (process.env.PORT || 8000));/5000

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


*/
//app.get('/', function(request, response) {
//	response.writeHeader(200, {"content_type": "text/html"});
//        response.write(html);
//        response.end();
//	});
//});

/*
app.get('/', function(request, response) {
	fs.readFile('./index.html', function(err, html){
		if(err){
		    throw error;
		}
		response.writeHeader(200, {"content_type": "text/html"});
                response.write(html);
                response.end();
	    });
});

*/
//app.get('/cool', function(request, response){
//	response.send(cool());
//});

//app.listen(app.get('port'), function() {
//  console.log('Node app is running on port', app.get('port'));
//});