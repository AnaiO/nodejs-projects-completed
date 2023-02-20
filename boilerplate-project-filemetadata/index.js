var express = require('express');
var cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

var app = express();

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', function(req, res) {
  const file = req.files.upfile;
  res.json(
    {
      name: file.name,
      type: file.mimetype,
      size: file.size
    }
  )
}
);




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
