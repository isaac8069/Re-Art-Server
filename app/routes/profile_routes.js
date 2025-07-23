const express = require('express');
const passport = require('passport');
const Profile = require('../models/profile');
const { handle404 } = require('../../lib/custom_errors');
const removeBlanks = require('../../lib/remove_blank_fields');

const requireToken = passport.authenticate('bearer', { session: false });
const router = express.Router();

// =======================
// INDEX: Get all profiles
// GET /profiles
// =======================
router.get('/profiles', async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate('tags');
    res.status(200).json({ profiles: profiles.map(p => p.toObject()) });
  } catch (err) {
    next(err);
  }
});

// =======================
// SHOW: Get profile by ID
// GET /profiles/:id
// =======================
router.get('/profiles/:id', async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id).populate('tags').then(handle404);
    res.status(200).json({ profile: profile.toObject() });
  } catch (err) {
    next(err);
  }
});

// =======================
// SHOW: Get profile by userId
// GET /profiles/user/:userId
// =======================
router.get('/profiles/user/:userId', async (req, res, next) => {
  try {
    const profiles = await Profile.find({ userId: req.params.userId }).populate('tags').then(handle404);
    res.status(200).json({ profiles });
  } catch (err) {
    next(err);
  }
});

// =======================
// CREATE: Add a new profile
// POST /profiles
// =======================
router.post('/profiles', requireToken, removeBlanks, async (req, res, next) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json({ profile: profile.toObject() });
  } catch (err) {
    next(err);
  }
});

// =======================
// DESTROY: Delete a profile
// DELETE /profiles/:id
// =======================
router.delete('/profiles/:id', async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id).then(handle404);
    await profile.deleteOne();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// =======================
// UPDATE: Modify profile by userId
// PATCH /profiles/user/:userId
// =======================
router.patch('/profiles/user/:userId', requireToken, removeBlanks, async (req, res, next) => {
  try {
    const profiles = await Profile.find({ userId: req.params.userId }).then(handle404);
    await Profile.updateOne({ userId: req.params.userId }, req.body);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// =======================
// UPDATE: Modify profile by ID
// PATCH /profiles/:id
// =======================
router.patch('/profiles/:id', requireToken, removeBlanks, async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id).then(handle404);
    await profile.updateOne(req.body);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
