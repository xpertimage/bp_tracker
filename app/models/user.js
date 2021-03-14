const mongoose = require('mongoose')
const Reading = require('./reading')
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  token: String,

  readings: [
    {type: new mongoose.Schema({
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
     }
   }, {
     timestamps: true
   })}
  ]
},
{
  timestamps: true,
  toObject: {
    // remove `hashedPassword` field when we call `.toObject`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
})

module.exports = mongoose.model('User', userSchema)
