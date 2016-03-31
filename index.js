#!/usr/bin/env node

var chalk       = require('chalk'),
    chalkStyles = require('./chalkStyles.json'),
    phrases     = require('./phrases.json')

const util = {

  getRandomIndex(arr) {
    return Math.floor(Math.random() * arr.length)
  },

  getItem(arr, index, ignoreItem) {
    var arrCopy = arr.slice(),
        selection = arrCopy[index]

    if (selection === ignoreItem) {
      arrCopy.splice(arrCopy.indexOf(ignoreItem), 1)
      return arrCopy[index]
    }

    return selection
  }

}

const phrase = {

  choose(ignorePhrase) {
    util.getItem(phrases, util.getRandomIndex(phrases))
  },

  build(first, second) {
    var firstIndex  = util.getRandomIndex(chalkStyles),
        secondIndex = util.getRandomIndex(chalkStyles),
        firstStyle  = util.getItem(chalkStyles, firstIndex),
        secondStyle = util.getItem(chalkStyles, secondIndex, firstStyle)

    return `Made with ${chalk[firstStyle](first)} and ${chalk[secondStyle](second)}`
  },

  format(phrase) {
    return `\n\t'${phrase}'\n'`
  },

  generate() {
    var phraseOne = phrase.choose(),
     phraseTwo    = phrase.choose(phraseOne),
     finalPhrase  = phrase.build(phraseOne, phraseTwo)

    return phrase.format(finalPhrase)
  }

}

exports.util   = util
exports.phrase = phrase
