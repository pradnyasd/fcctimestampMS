var express = require('express');
var app = express();

const http = require('http');
const fs = require('fs');

const getDate = date => ({
unix: date.getTime(),
utc: date.toUTCString()
});

app.get('/api/timestamp/', function(req, res){
const dateString = req.url.split("/api/timestamp/")[1];
let timestamp;
if(dateString === undefined || dateString.trim === ""){
  timestamp = getDate(new Date());
}
else{
  const date = !isNaN(dateString) ? new Date(parseInt(dateString)) : new Date(dateString);
  if(!NaN(date.getTime())){
    timestamp = getDate(date);
  }
  else{
    timestamp = { error: 'Invalid Date' }
  };
}
res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify(timestamp));
});


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
res.json({greeting: 'hello API'});
});



// listen for requests :slightly_smiling_face:
var listener = app.listen(process.env.PORT, function () {
console.log('Your app is listening on port ' + listener.address().port);
});
