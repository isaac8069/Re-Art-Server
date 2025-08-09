// Express and Passport
const express = require('express')
const passport = require('passport')

// Mongoose models
const Piece = require('../models/piece')
const Profile = require('../models/profile')

// Custom error utilities
const { handle404 } = require('../../lib/custom_errors')

// Middleware
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// =======================
// INDEX: Get all pieces
// GET /api/pieces
// =======================
router.get('/', async (req, res, next) => {
  try {
    const pieces = await Piece.find()
    res.status(200).json({ pieces: pieces.map(p => p.toObject()) })
  } catch (err) {
    next(err)
  }
})

// =======================
// INDEX by Profile Tags
// GET /api/pieces/profile/:profileId
// =======================
router.get('/profile/:profileId', async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.profileId).then(handle404)
    const pieces = await Piece.find({ tags: { $in: profile.tags } })
    res.status(200).json({ pieces: pieces.map(p => p.toObject()) })
  } catch (err) {
    next(err)
  }
})

// =======================
// SHOW: Get a single piece
// GET /api/pieces/:id
// =======================
router.get('/:id', async (req, res, next) => {
  try {
    const piece = await Piece.findById(req.params.id).then(handle404)
    res.status(200).json({ piece: piece.toObject() })
  } catch (err) {
    next(err)
  }
})

// =======================
// CREATE: Add a new piece
// POST /api/pieces
// =======================
router.post('/', async (req, res, next) => {
  try {
    const piece = await Piece.create(req.body)
    res.status(201).json({ piece: piece.toObject() })
  } catch (err) {
    next(err)
  }
})

// =======================
// DESTROY: Delete a piece
// DELETE /api/pieces/:id
// =======================
router.delete('/:id', async (req, res, next) => {
  try {
    const piece = await Piece.findById(req.params.id).then(handle404)
    await piece.deleteOne()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

// =======================
// UPDATE: Modify a piece
// PATCH /api/pieces/:id
// =======================
router.patch('/:id', requireToken, removeBlanks, async (req, res, next) => {
  try {
    const piece = await Piece.findById(req.params.id).then(handle404)
    await piece.updateOne(req.body.piece)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
