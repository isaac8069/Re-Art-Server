// Express and Passport
const express = require('express');
const passport = require('passport');

// Mongoose model
const Example = require('../models/example');

// Custom error utilities
const { handle404, requireOwnership } = require('../../lib/custom_errors');

// Middleware
const removeBlanks = require('../../lib/remove_blank_fields');
const requireToken = passport.authenticate('bearer', { session: false });

// Router
const router = express.Router();

// =======================
// INDEX
// GET /examples
// =======================
router.get('/examples', requireToken, async (req, res, next) => {
  try {
    const examples = await Example.find();
    res.status(200).json({ examples: examples.map((e) => e.toObject()) });
  } catch (err) {
    next(err);
  }
});

// =======================
// SHOW
// GET /examples/:id
// =======================
router.get('/examples/:id', requireToken, async (req, res, next) => {
  try {
    const example = await Example.findById(req.params.id).then(handle404);
    res.status(200).json({ example: example.toObject() });
  } catch (err) {
    next(err);
  }
});

// =======================
// CREATE
// POST /examples
// =======================
router.post('/examples', requireToken, async (req, res, next) => {
  try {
    req.body.example.owner = req.user.id;
    const example = await Example.create(req.body.example);
    res.status(201).json({ example: example.toObject() });
  } catch (err) {
    next(err);
  }
});

// =======================
// UPDATE
// PATCH /examples/:id
// =======================
router.patch('/examples/:id', requireToken, removeBlanks, async (req, res, next) => {
  delete req.body.example.owner; // Prevent changing ownership

  try {
    const example = await Example.findById(req.params.id).then(handle404);
    requireOwnership(req, example);
    await example.updateOne(req.body.example);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// =======================
// DESTROY
// DELETE /examples/:id
// =======================
router.delete('/examples/:id', requireToken, async (req, res, next) => {
  try {
    const example = await Example.findById(req.params.id).then(handle404);
    requireOwnership(req, example);
    await example.deleteOne();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
