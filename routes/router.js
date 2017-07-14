const express = require('express')
const hangLogic = require('../models/hangLogic')
const gen = hangLogic.gen
const compareGuess = hangLogic.compareGuess

var chosenWord = ""
var display = ""
var correctGuess = ""
var guessCounter = 8
var diff = ""
var guesses = []

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
  display = ('X'.repeat(chosenWord.length))
  res.render('index', {
    title: `Hangman (${diff})`,
    theWord: chosenWord,
    displayWord: display,
    hiddenButton: 'hidden',
    guessCounter: guessCounter
  })
})

router.post('/hangman/guess', function(req, res) {
  if (guessCounter <= 0) {
    res.send('GAMEOVER!')
  }
  const guess = req.body.guess
  guesses.push(guess)
  let compare = display
  display = compareGuess(guess, chosenWord, display)
  if (display === chosenWord) {
    res.send('YOU WIN!')
  }
  if (compare === display) {
    guessCounter = guessCounter - 1
  }
  console.log(display);
  res.render('index', {
    title: `Hangman (${diff})`,
    theWord: chosenWord,
    displayWord: display,
    hiddenButton: 'hidden',
    guessCounter: guessCounter,
    guessedLeters: guesses
  })
})

module.exports = router
