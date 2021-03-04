// Include express
const express = require('express')
// Include mongoose
const mongoose = require('mongoose')
// Include router
const router = express.Router()
// Require the breed model/schema
const Breed = require('../models/breed')
// Require errors
const { handle404, requireOwnership} = require('./../../lib/custom_errors')
// Require passport
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })



// POST /create an breed/dog
router.post('/breeds', requireToken, (req, res, next) => {
  const breedData = req.body.breed
  console.log(req.body)
  breedData.owner = req.user._id
  Breed.create(breedData)
    .then(breed => res.status(201).json(breed))
    .catch(next)
})

// GET /index of breeds/dogs
router.get('/breeds', requireToken, (req, res, next) => {
  const userId = req.user._id
  Breed.find({ owner: userId })
    .then(breed => res.json(breed))
    .catch(next)
})

// PATCH /update breeds/dogs/:id
router.patch('/breeds/:id', requireToken, (req, res, next) => {
  delete req.body.breed.owner
  Breed.findById(req.params.id)
    .then(handle404)
    .then(breed => {
      requireOwnership(req, breed)
      return breed.updateOne(req.body.breed)
    })
    .then (() => res.sendStatus(204))
    .catch(next)
})

// DELETE /delete breeds/dogs/:id
router.delete('/breeds/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Breed.findById(id)
    .then(handle404)
    .then(breed => requireOwnership(req, breed))
    .then(breed => {
      breed.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
