const express = require('express');
const router = express.Router();
const Celebrity = require('./../models/celebrity')


// GET '/celebrities'
router.get('/', (req, res, next) => {
  Celebrity.find({})
    .then( (allTheCelebritiesFromDB) => res.render('celebrities/index', {allTheCelebritiesFromDB} ))
    .catch( (err) => console.log(err));
});

router.get('/show', (req, res, next) => {
  const { _id } = req.query;

  Celebrity.findOne({ _id })
    .then( (celebrity) => res.render('celebrities/show', { celebrity } ))
    .catch( (err) => console.log(err));
});

router.get('/new', (req, res, next) => {
  res.render('celebrities/new')
});

router.post('/add', function(req, res, next) {
  const {name, occupation, catchPhrase} = req.body;

  const newCelebrity = new Celebrity({name, occupation, catchPhrase});

  newCelebrity.save()
    .then( (celebrity) => res.redirect('/celebrities'))
    .catch( (err) => console.log(err));
});

router.post('/:_id/delete', (req, res, next) => {
  const { _id } = req.params; 

  Celebrity.findByIdAndRemove({ _id })
    .then( (celebrity) => res.redirect('/celebrities'))
    .catch( (err) => console.log(err));
});

router.get('/:_id/edit/', (req, res, next) => {
  const { _id } = req.params;

  Celebrity.findOne({ _id })
    .then( (celebrity) => res.render('celebrities/edit', { celebrity } ))
    .catch( (err) => console.log(err));
});

router.post('/:_id', (req, res, next) => {
  const { _id } = req.params;
  const {name, occupation, catchPhrase} = req.body;
  console.log('IDDDDDDDDDDDD',{ _id })
  console.log('BODDDDYYYYY',{name, occupation, catchPhrase})
 
  Celebrity.findOneAndUpdate( { _id }, { $set: {name, occupation, catchPhrase} },{new: true} )
 .then( (celebrities) => res.redirect('/celebrities'))
  .catch( (err) => console.log(err));
 });

module.exports = router;