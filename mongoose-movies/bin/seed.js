const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');

const dbName = 'celebrities';
mongoose.connect(`mongodb://localhost/${dbName}`);

const celebrities = [
  {
  name: "Jason Statham",
  occupation: "Actor",
  catchPhrase: "If you're going to do something, do it with style!"
  },
  {
  name: "Kevin Bacon",
  occupation: "Actor",
  catchPhrase: "I have a natural swagger."
  },
  {
  name: "Pamela Anderson",
  occupation: "Actress",
  catchPhrase: "I am what I am and I'm a horrible liar. I can't do it. I'm just very candid."
  }
];

Celebrity.create(celebrities, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${celebrities.length} celebrities`)
  mongoose.connection.close();
});