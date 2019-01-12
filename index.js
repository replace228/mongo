var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    urlencodeParser = bodyParser.urlencoded({ extend: false });

var mongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost/sandbox',
    database;

app.use(express.static('client'));

app.post('/enroll', urlencodeParser, function(request, response) {
  var records = database.collection('records');
  records.insertOne({
    firstName: request.body.firstName,
    lastName: request.body.lastName
  }, function(err, result) {
    response.redirect('/records.html');
  });
});

app.get('/records', function(request, response) {
  var records = database.collection('records');
  records.find().toArray(function(err, documents) {
    response.send(JSON.stringify(documents));
  })
});

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  database = client.db('sandbox');
  app.listen(8080);
});
