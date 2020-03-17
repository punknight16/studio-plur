var express = require("express");
var path = require('path');
var fs = require('fs');

var payment = require('./_scripts/stripe.js');

var app = express();
app.use(express.json());

app.get('/', function(req, res) {
	var stream = fs.createReadStream(__dirname+'/_pages/entry.html');
	stream.pipe(res);
});

app.get('/entry', function(req, res) {
	var stream = fs.createReadStream(__dirname+'/_pages/entry.html');
	stream.pipe(res);
});

app.get('/home', function(req, res){
	var stream = fs.createReadStream(__dirname+'/_pages/home.html');
	stream.pipe(res);
});

app.get('/payment', function(req, res){
	var stream = fs.createReadStream(__dirname+'/_pages/payment.html');
	stream.pipe(res);
});


app.post('/ajax/confirm_payment', async (req, res) => {
	return payment(req, res);
})

app.listen(3000, function(){
	console.log('server running on 3000');
})

app.use('/_static', express.static(path.join(__dirname, '/_static')));