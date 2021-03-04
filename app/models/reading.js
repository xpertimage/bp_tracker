const mongoose = require('mongoose')

const readingSchema = new mongoose.Schema({
  systolic: {
    type: Number,
    required: true
  },
  diastolic: {
    type: Number,
    required: true
  },
  pulse: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Reading', readingSchema)
