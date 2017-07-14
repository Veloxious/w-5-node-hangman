const express = require('express')
const fs = require('fs')

const app = express()

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
var correctGuess = []
var guessCounter = 8
var chosenWord = ""

function gen(difficulty) {
  switch (difficulty) {
    case 'easy':
      for (var i = 0; i < words.length; i++) {
        var newWord = words[Math.floor(Math.random() * (words.length))]
        if (newWord.length <= 6 && newWord.length >= 4) {
          console.log(newWord);
          return newWord
        }
      }
      break
    case 'normal':
      for (var i = 0; i < words.length; i++) {
        var newWord = words[Math.floor(Math.random() * (words.length))]
        if (newWord.length <= 8 && newWord.length >= 6) {
          console.log(newWord);
          return newWord
        }
      }
      break
    case 'hard':
      for (var i = 0; i < words.length; i++) {
        var newWord = words[Math.floor(Math.random() * (words.length))]
        if (newWord.length >= 8) {
          console.log(newWord);
          return newWord
        }
      }
      break
  }
}

function compareGuess(guess) {
  console.log(guess);
  for (var i = 0; i < chosenWord.length; i++) {
    if (chosenWord[i] === guess) {
      return correctGuess.splice(i, 1, `${guess}`)
    } else {
      return console.log('badguess');
    }
      //// TODO: verifie check against word string then add correct guess to correct array.
    }
  }


module.exports = {
  gen: gen,
  compareGuess: compareGuess
}
