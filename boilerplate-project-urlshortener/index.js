require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .catch(e => console.error('connection erreur: ', e.message));

const WebsiteSchema = new mongoose.Schema(
  {
    original_url: {
      type: String,
      required: true
    },
    short_url: {
      type: Number,
      required: true
    }
  }
);

const Website = mongoose.model('Website', WebsiteSchema);

// Basic Configuration
const port = process.env.PORT || 3000;

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({extended: false})
);

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});



app.post('/api/shorturl', (req, res) => {
  console.log(req.body, 'req body');
  const url = req.body.url;

  if ( !validURL(url) ) {
    res.json({ error: 'invalid url' });
  } else {
    Website.estimatedDocumentCount((err, count) => {
      if (err) return console.error(err);
      
      Website.create({
        original_url: url,
        short_url: parseInt(count) + 1
      }, (err, website) => {
        if (err) return console.log(err);
        res.json(website);
      });
    });
  } 
});

app.get('/api/shorturl/:shorturl', (req, res) => {
  const shorturl = parseInt(req.params.shorturl);
  console.log(shorturl, 'PAAAAAAAAAARSE');
  if (!shorturl) {
    console.log(req.params, 'SHORTURL');
    return console.log('PROBLEME DE NUMERO DANS LURL');
  } else {
    Website.findOne({ short_url: shorturl }, (err, website) => {
      if (err) return console.log(err);

      res.redirect(website.original_url);
    });
  }
});

// app.get('/api/createWebsite', (req, res) => {
//   Website.create(
//     {
//       original_url: "www.coolurl.com",
//       short_url: 12345
//     }, 
//     (err, data) => {
//       if (err) return console.error(err);
//       res.json({message: "ce qui suit est enregistré: " + data})
//     });
// });

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
