const express = require('express')
const fs = require('fs')

const app = express()

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
var guessCounter = 8
var chosenWord = ""

function gen(difficulty) {
  switch (difficulty) {
    case 'easy':
      for (var i = 0; i < words.length; i++) {
        var newWord = words[Math.floor(Math.random() * (words.length))]
        if (newWord.length <= 6 && newWord.length >= 4) {
          return newWord
        }
      }
      break
    case 'normal':
      for (var i = 0; i < words.length; i++) {
        var newWord = words[Math.floor(Math.random() * (words.length))]
        if (newWord.length <= 8 && newWord.length >= 6) {
          return newWord
        }
      }
      break
    case 'hard':
      for (var i = 0; i < words.length; i++) {
        var newWord = words[Math.floor(Math.random() * (words.length))]
        if (newWord.length >= 8) {
          return newWord
        }
      }
      break
  }
}

function compareGuess(guess, chosenWord, display) {
  for (var i = 0; i < chosenWord.length; i++) {
    if (chosenWord[i] === guess && chosenWord[i] !== display[i]) {
      let ar = display.split('')
      ar.splice(i, 1, guess)
      return ar.join('')
    }
  }
  return display
}

module.exports = {
  gen: gen,
  compareGuess: compareGuess
}
