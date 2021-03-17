// Include express
const express = require('express')
// Include mongoose
const mongoose = require('mongoose')
// Include router
const router = express.Router()
// Require the dog model/schema
const Dog = require('../models/dog')
// Require errors
const { handle404, requireOwnership} = require('./../../lib/custom_errors')
// Require passport
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

// POST /create an dog/dog
router.post('/dogs', requireToken, (req, res, next) => {
  const dogData = req.body.dog
  console.log(req.body)
  dogData.owner = req.user._id
  console.log('this is dog data', dogData)
  Dog.create(dogData)
    .then(dog => res.status(201).json(dog))
    .catch(next)
})

// GET /index of dogs/dogs
router.get('/dogs', requireToken, (req, res, next) => {
  const userId = req.user._id
  Dog.find({ owner: userId })
    .then(dog => res.json(dog))
    .catch(next)
})

// PATCH /update dogs/dogs/:id
router.patch('/dogs/:id', requireToken, (req, res, next) => {
  delete req.body.dog.owner
  Dog.findById(req.params.id)
    .then(handle404)
    .then(dog => {
      requireOwnership(req, dog)
      return dog.updateOne(req.body.dog)
    })
    .then (() => res.sendStatus(204))
    .catch(next)
})

// DELETE /delete dogs/dogs/:id
router.delete('/dogs/:id', requireToken, (req, res, next) => {
  console.log('The request params', req.params)
    Dog.findById(req.params.id)
      .then(handle404)
      .then(dog => {
        requireOwnership(req, dog)
        dog.deleteOne()
      })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
