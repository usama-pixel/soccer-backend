const mongoose = require('mongoose')

const Schema = mongoose.Schema

const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  appearance: {
    type: Number,
    required: true
  },
  goals: {
    type: Number,
    required: true
  },
  assists: {
    type: Number,
    required: true
  },
  crossAccuracy: {
    type: Number,
    required: true
  },
  keyPasses: {
    type: Number,
    required: true
  },
  tackles: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String
  },
  setup: {
    type: String
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
})

module.exports = mongoose.model('Player', playerSchema)