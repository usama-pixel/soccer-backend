const mongoose = require('mongoose')

const Schema = mongoose.Schema

const teamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  totalGoals: {
    type: Number,
    required: true
  },
  shotsPG: {
    type: Number,
    required: true
  },
  discipline: {
    type: Number,
    required: true
  },
  possession: {
    type: Number,
    required: true
  },
  pass: {
    type: Number,
    required: true
  },
  aerialsWon: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },

  players: [{ type: Schema.Types.ObjectId, ref: 'Player', required: true }],
})

module.exports = mongoose.model('Team', teamSchema)