var express = require('express');
var app = express();
var path = require('path');
var csv = require('express-csv');

// Serve back static files
app.use(express.static('public'));

app.get('/getcsv', function(req, res) {

  // Object that is being sent through the app
  var mongoObject = {
    _id: '1234',
    firstName: 'Chris',
    lastName: 'Stanton',
    message: 'This works'
  };

  // create an array from the mongo object so we can use .unshift() later
  var data = [mongoObject];

  // create a header row from the object's keys/properties
  var headers = Object.keys(mongoObject);

  // push keys array to the beginning of data array
  data.unshift(headers);

  console.log('data: ', data);

  res.attachment('testing.csv');   // not really used
  res.csv(data);
})

// Handle index file separately
app.get('/', function(req, res) {
  res.sendFile(path.resolve('/public/index.html'));
});

// Port Listening
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
