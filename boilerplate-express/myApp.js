let express = require('express');
require('dotenv').config();
let bodyParser = require('body-parser');
let app = express();

let absolutePath = __dirname + '/views/index.html'

let handler = function(req, res) {
  res.sendFile(absolutePath);
}

app.use(bodyParser.urlencoded({extended: false})
);


app.route('/name').get(function(req, res) {
    let queryParams = req.query;

    res.json({
      name: `${queryParams.first + ' ' + queryParams.last}`
    })
  }).post(function(req, res) {
    let postParams = req.body

    res.json({
      name: `${postParams.first + ' ' + postParams.last}`
    })
  }); 

app.get('/:word/echo', function(req, res) {
  let word = req.params.word;

  res.json({
    echo: word
  })
});


app.use('/public', express.static(__dirname + '/public'));

app.get('/', handler);

// app.get('/json', handlerJson);




































 module.exports = app;
