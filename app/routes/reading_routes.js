// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
const mongoose = require('mongoose')

// pull in Mongoose model for readings
const Reading = require('../models/reading')
const User = require('../models/user')
// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { reading: { title: '', text: 'foo' } } -> { reading: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /readings
router.get('/readings', requireToken, (req, res, next) => {
  req.body.owner = req.user._id

  User.findById(req.user._id)
    .then(user => {
      console.log(User)
      // `readings` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return user.readings.map(reading => reading.toObject())
    })
    // respond with status 200 and JSON of the readings
    .then(readings => res.status(200).json({ readings: readings }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /readings/5a7db6c74d55bc51bdf39793
router.get('/readings/:id', requireToken, (req, res, next) => {
  req.body.owner = req.user._id
  // console.log('router.get(/readings/:ID)')
  // console.log(req.user)
  User.findById(req.user._id)
    .then(user => {
       for(x = 0; x < user.readings.length; x++) {
         if(user.readings[x]._id == req.params.id)
         {
           console.log('YES!!')
           console.log(user.readings[x])
           res.status(200).send( {reading: user.readings[x]} )

         }
        }
      })
    // respond with status 200 and JSON of the readings
    //.then(readings => res.status(200).json({ readings: readings }))
    // if an error occurs, pass it to the handler
    .catch(next)
})


// CREATE
// POST /readings
router.post('/readings', requireToken, (req, res, next) => {
  // set owner of new reading to be current user

  req.body.owner = req.user._id
  console.log('What is req.body: ', req.body)
  // First find the signedIn user's document
  User.findById(req.user._id)
    .then(user => {
      user.readings.push(req.body)
      user.save(err => {
        if(!err) {
          res.status(201).json({ reading: req.body })
        }
      })
    })
    .catch(next)
})

// UPDATE
// PATCH /readings/5a7db6c74d55bc51bdf39793
router.patch('/readings/:id', requireToken, (req, res, next) => {
  req.body.owner = req.user._id
  console.log('router.delete(/readings/:ID)')
  User.findById(req.user._id)
    .then(user => {
      console.log('Update req.body=', req.body)
      console.log('user.readings=', user.readings)
      for(x = 0; x < user.readings.length; x++){
        if(user.readings[x]._id == req.body.id){
          console.log('*******Found it ******')
          user.readings[x].systolic = req.body.systolic
          user.readings[x].diastolic = req.body.diastolic
          user.readings[x].pulse = req.body.pulse
        }
      }
      console.log('Modified-user.readings=', user.readings)
      user.save(err => {
        if(!err) {
          res.status(204).json({ reading: req.params.id })
        }
      })
    })
    .catch(next)
})


// DESTROY
// DELETE /readings/5a7db6c74d55bc51bdf39793
router.delete('/readings/:id', requireToken, (req, res, next) => {
  req.body.owner = req.user._id
  console.log('router.delete(/readings/:ID)')
  User.findById(req.user._id)
    .then(user => {
      user.readings.pull(req.params.id)
      user.save(err => {
        if(!err) {
          res.status(204).json({ reading: req.params.id })
        }
      })
    })
    .catch(next)
})

module.exports = router
