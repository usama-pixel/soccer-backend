const mongoose = require('mongoose')

const Schema = mongoose.Schema

const matchSchema = new Schema({
  team1: {
    type: String,
    required: true
  },
  team2: {
    type: String,
    required: true
  },
  date: {
    type: Schema.Types.Date,
    required: true
  },
  // detailed Score card
  goalKeeperSave: {
    type: Number,
    required: true
  },
  highestScorer: {
    type: String,
    required: true
  },
  mostAssists: {
    type: String,
    required: true
  },
  bestDefance: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Match', matchSchema)