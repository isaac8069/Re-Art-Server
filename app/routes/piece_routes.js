// Express and Passport
const express = require('express');
const passport = require('passport');

// Mongoose models
const Piece = require('../models/piece');
const Profile = require('../models/profile');

// Custom error utilities
const { handle404 } = require('../../lib/custom_errors');

// Middleware
const removeBlanks = require('../../lib/remove_blank_fields');
const requireToken = passport.authenticate('bearer', { session: false });

const router = express.Router();

// =======================
// INDEX: Get all pieces
// GET /pieces
// =======================
router.get('/pieces', async (req, res, next) => {
  try {
    console.log("Fetching all pieces");
    const pieces = await Piece.find();
    res.status(200).json({ pieces: pieces.map(piece => piece.toObject()) });
  } catch (err) {
    next(err);
  }
});

// =======================
// INDEX by Profile Tags
// GET /pieces/profile/:profileId
// =======================
router.get('/pieces/profile/:profileId', async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.profileId).then(handle404);
    const pieces = await Piece.find({ tags: { $in: profile.tags } }).then(handle404);
    res.status(200).json({ pieces });
  } catch (err) {
    next(err);
  }
});

// =======================
// SHOW: Get a single piece
// GET /pieces/:id
// =======================
router.get('/pieces/:id', async (req, res, next) => {
  try {
    const piece = await Piece.findById(req.params.id).then(handle404);
    res.status(200).json({ piece: piece.toObject() });
  } catch (err) {
    next(err);
  }
});

// =======================
// CREATE: Add a new piece
// POST /pieces
// =======================
router.post('/pieces', async (req, res, next) => {
  try {
    const piece = await Piece.create(req.body);
    res.status(201).json(piece);
  } catch (err) {
    next(err);
  }
});

// =======================
// DESTROY: Delete a piece
// DELETE /pieces/:id
// =======================
router.delete('/pieces/:id', async (req, res, next) => {
  try {
    const piece = await Piece.findById(req.params.id).then(handle404);
    await piece.deleteOne();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// =======================
// UPDATE: Modify a piece
// PATCH /pieces/:id
// =======================
router.patch('/pieces/:id', requireToken, removeBlanks, async (req, res, next) => {
  try {
    const piece = await Piece.findById(req.params.id).then(handle404);
    await piece.updateOne(req.body.piece);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
