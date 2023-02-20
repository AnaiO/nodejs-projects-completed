const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

// SCHEMAS
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  }
});

const ExerciseSchema = mongoose.Schema({
  description: {
    required: true,
    type: String
  },
  duration: {
    required: true,
    type: Number
  },
  date: {
    type: Date,
    required: false
  },
  username: {
    type: String,
  }
});


// MODELS
const User = mongoose.model('User', UserSchema);
const Exercise = mongoose.model('Exercise', ExerciseSchema);


// MIDDLEWARES ROUTING
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


// USERS
app.post('/api/users', (req, res) => {
  let usernameData = req.body.username;

  User.create({ username: usernameData }, (err, userCreated) => {
    if (err) return console.log(err);

    res.json(userCreated);
  })
});

app.get('/api/users', (req, res) => {
  User.find( (err, usersList) => {

    if (err) return console.log(err);
    res.json(usersList)
  }) 
});

// EXERCISES
app.post('/api/users/:_id/exercises', (req, res) => {
  let { description, duration, date } = req.body;
  let userId = req.params._id;

  if (!date) {
    date = new Date();
    console.log('pas de date')

  } else {
    date = new Date(date);
  }

  User.findById(userId, (err, user) => {
    if (err) return console.log(err);

    Exercise.create({
      description,
      duration,
      date,
      username: user.username
    }, (err, exerciseCreated) => {
      if (err) return console.log(err);

      const { description, duration, date } = exerciseCreated;
      res.json({
        username: user.username,
        description,
        duration,
        date: new Date(date).toDateString(),
        _id: user._id
      });
    });
  });
})

// LOGS
app.get('/api/users/:_id/logs', (req, res) => {
  const userId = req.params._id;
  const { from, to, limit } = req.query;

  User.findById(userId, (err, user) => {
    if (err) return console.log(err);
    if (!user) res.json({ message: 'Le user nexiste pas' })

    let filters = {};
    let dateObj = {};

    if (from) {
      dateObj['$gte'] = new Date(from);
    }

    if (to) {
      dateObj['$lt'] = new Date(to);
    }

    if (from || to) {
      filters.date = dateObj;
    }

    let notNullLimit = limit ?? 0;
    filters.username = user.username;
    
    //get all exercices
    Exercise.find(filters)
      .limit(+notNullLimit)
      .exec((err, exercises) => {
        if (err) return console.log(err);
        
        const logs = exercises.map(e => ({
          description: e.description,
          duration: e.duration,
          date: e.date.toDateString()
        }));

        res.json({
          username: user.username,
          count: exercises.length,
          _id: user._id,
          log: logs
        })
      });
  })
})





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
