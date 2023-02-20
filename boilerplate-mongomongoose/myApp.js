require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true });

let PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', PersonSchema);

const createAndSavePerson = (done) => {
  var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});

  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
});
}

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, function(error, data) {
    if (error) return console.error(error);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  }, function(error, data) {
    if (error) console.error(error);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods: food
  }, function(error, data) {
    if (error) console.log(error);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(error, data) {
    if (error) console.error(error);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(error, person) {
    if (error) console.error(error);
    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson)
    })
  })

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({
    name: personName
  }, { age: ageToSet }, { new: true }, (err, updated) => {
    if (err) return console.log(err);
    done(null, updated);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deleted) => {
    if (err) return console.log(err);
    done(null, deleted);

  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove}, (err, data) => {
    if (err) return console.log(err);
    done(null, data);

  })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  let querry = Person.find({ favoriteFoods: foodToSearch});
  querry.sort({ name: 1 }).limit(2).select({ age: 0 }).exec((err, data) => {
    if (err) return console.log(err);
    done(null, data);

  })

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
