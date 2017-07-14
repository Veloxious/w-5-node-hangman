const express = require('express')
const hangLogic = require('../models/hangLogic')
const gen = hangLogic.gen
const compareGuess = hangLogic.compareGuess

var chosenWord = ""
var correctGuess = []
var guessCounter = 8
var diff = ""


const router = express.Router()

router.get('/', function(req, res) {
  res.render('index', {
    title: 'New Game',
    hiddenForm: 'hidden'
  })
})

router.post('/:difficulty', function(req, res) {
  diff = req.params.difficulty
  console.log(diff);
  chosenWord = gen(diff)
  correctGuess = []
  correctGuess.push('X'.repeat(chosenWord.length))
  res.render('index', {
    title: `Hangman (${diff})`,
    theWord: chosenWord,
    displayWord: correctGuess,
    hiddenButton: 'hidden'
  })
})

router.post('/hangman/guess', function(req, res) {
  const guess = req.body.guess
  console.log(guess);
  compareGuess(guess)
  res.render('index', {
    title: `Hangman (${diff})`,
    theWord: chosenWord,
    displayWord: correctGuess,
    hiddenButton: 'hidden'
  })
})

module.exports = router
